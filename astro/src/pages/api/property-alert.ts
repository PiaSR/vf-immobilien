import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';
import { supabase } from '../../lib/supabaseClient';

export const prerender = false;

// --- Clients ---
const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
});

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// --- Types ---
interface Subscriber {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  vermarktungsart?: string;
  objektarten?: string[];
  bezirke?: string[];
  zimmerMin?: number;
  zimmerMax?: number;
  flaecheMin?: number;
  flaecheMax?: number;
  preisMin?: number;
  preisMax?: number;
}

interface Property {
  _id: string;
  name: string;
  slug: string;
  marketingTypeTitle: string; // "Miete" or "Kauf"
  propertyType: string;
  locationVienna?: string;
  locationSurrounding?: string;
  rooms?: number;
  livingArea?: number;
  purchasePrice?: number;
  rentalPrice?: number;
  imageUrl?: string;
  address?: string;
}

// --- Matching logic ---
// Returns true if property matches subscriber preferences.
// Empty preference = "no preference" (matches anything).
function propertyMatchesSubscriber(property: Property, subscriber: Subscriber): boolean {
  // 1. Vermarktungsart — required match
  if (subscriber.vermarktungsart && subscriber.vermarktungsart !== 'beides') {
    const subType = subscriber.vermarktungsart === 'miete' ? 'Miete' : 'Kauf';
    if (property.marketingTypeTitle !== subType) return false;
  }

  // 2. Objektart — OR match (property type must be in subscriber's list)
  if (subscriber.objektarten && subscriber.objektarten.length > 0) {
    if (!subscriber.objektarten.includes(property.propertyType)) return false;
  }

  // 3. Bezirk / Ort — OR match (property location must be in subscriber's list)
  if (subscriber.bezirke && subscriber.bezirke.length > 0) {
    const propertyLocation = property.locationVienna || property.locationSurrounding || '';
    if (!subscriber.bezirke.includes(propertyLocation)) return false;
  }

  // 4. Zimmer — range match
  if (subscriber.zimmerMin != null && property.rooms != null) {
    if (property.rooms < subscriber.zimmerMin) return false;
  }
  if (subscriber.zimmerMax != null && property.rooms != null) {
    if (property.rooms > subscriber.zimmerMax) return false;
  }

  // 5. Fläche — range match
  if (subscriber.flaecheMin != null && property.livingArea != null) {
    if (property.livingArea < subscriber.flaecheMin) return false;
  }
  if (subscriber.flaecheMax != null && property.livingArea != null) {
    if (property.livingArea > subscriber.flaecheMax) return false;
  }

  // 6. Preis — range match (compare against the relevant price field)
  // For "beides", check whichever price field the property has
  const price = property.marketingTypeTitle === 'Kauf'
    ? property.purchasePrice
    : property.rentalPrice;
  if (subscriber.preisMin != null && price != null) {
    if (price < subscriber.preisMin) return false;
  }
  if (subscriber.preisMax != null && price != null) {
    if (price > subscriber.preisMax) return false;
  }

  return true;
}

// --- Email HTML template ---
function buildEmailHtml(subscriber: Subscriber, property: Property): string {
  const price = property.marketingTypeTitle === 'Kauf' ? property.purchasePrice : property.rentalPrice;
  const priceLabel = property.marketingTypeTitle === 'Kauf' ? 'Kaufpreis' : 'Miete';
  const priceFormatted = price
    ? new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
    : 'Preis auf Anfrage';
  const location = property.locationVienna || property.locationSurrounding || '';
  const propertyUrl = `https://vf-immobilien.at/properties/${property.slug}`;
  const unsubUrl = `https://vf-immobilien.at/api/unsubscribe?id=${subscriber.id}`;
  const updateUrl = `https://vf-immobilien.at/subscription`;

  const hasRooms = property.rooms != null;
  const hasArea = property.livingArea != null;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Neues Objekt für Sie</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background-color:#1a3329;padding:32px 40px;border-radius:8px 8px 0 0;text-align:center;">
              <img src="https://vf-immobilien.at/logos/Viki-new-logo-only-green-1.svg" alt="VF Immobilien" width="52" height="50" style="display:block;margin:0 auto 16px;" />
              <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:normal;letter-spacing:1px;">VF Immobilien</h1>
              <p style="color:#a8c4b0;margin:8px 0 0;font-size:13px;letter-spacing:0.5px;">SUCHABO — NEUES OBJEKT</p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#ffffff;padding:40px;border-radius:0 0 8px 8px;">

              <p style="color:#2f3c35;font-size:16px;margin:0 0 24px;">Liebe/r ${subscriber.firstName},</p>
              <p style="color:#4a5c52;font-size:15px;line-height:1.6;margin:0 0 32px;">
                ein neues Objekt entspricht Ihrem Suchprofil:
              </p>

              <!-- Property card — entire card is the link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <a href="${propertyUrl}" style="display:block;text-decoration:none;border:1px solid #e0e8e3;border-radius:8px;overflow:hidden;color:inherit;">
                      ${property.imageUrl ? `
                      <img src="${property.imageUrl}" alt="${property.name}" width="600"
                        style="width:100%;max-width:600px;height:220px;object-fit:cover;display:block;" />` : ''}
                      <div style="padding:24px;">
                        <p style="margin:0 0 4px;font-size:11px;color:#7a9a82;text-transform:uppercase;letter-spacing:1px;">
                          ${property.marketingTypeTitle} · ${property.propertyType}${location ? ` · ${location}` : ''}
                        </p>
                        <h2 style="margin:0 0 20px;font-size:20px;color:#1a3329;font-weight:normal;">
                          ${property.name}
                        </h2>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            ${hasRooms ? `
                            <td style="padding:8px 16px 8px 0;border-right:1px solid #e0e8e3;text-align:center;">
                              <p style="margin:0;font-size:20px;font-weight:bold;color:#1a3329;">${property.rooms}</p>
                              <p style="margin:4px 0 0;font-size:11px;color:#7a9a82;text-transform:uppercase;">Zimmer</p>
                            </td>` : ''}
                            ${hasArea ? `
                            <td style="padding:8px 16px;${hasRooms ? 'border-right:1px solid #e0e8e3;' : ''}text-align:center;">
                              <p style="margin:0;font-size:20px;font-weight:bold;color:#1a3329;">${property.livingArea} m²</p>
                              <p style="margin:4px 0 0;font-size:11px;color:#7a9a82;text-transform:uppercase;">Wohnfläche</p>
                            </td>` : ''}
                            <td style="padding:8px 0 8px ${hasRooms || hasArea ? '16px' : '0'};text-align:center;">
                              <p style="margin:0;font-size:20px;font-weight:bold;color:#1a3329;">${priceFormatted}</p>
                              <p style="margin:4px 0 0;font-size:11px;color:#7a9a82;text-transform:uppercase;">${priceLabel}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #e0e8e3;margin:0 0 24px;" />

              <p style="color:#9ab0a0;font-size:12px;text-align:center;margin:0;line-height:1.8;">
                Sie erhalten diese E-Mail, weil Sie ein Suchabo bei VF Immobilien eingerichtet haben.<br />
                <a href="${updateUrl}" style="color:#9ab0a0;">Präferenzen ändern</a> · <a href="${unsubUrl}" style="color:#9ab0a0;">Vom Suchabo abmelden</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

// --- Webhook handler ---
export const POST: APIRoute = async ({ request }) => {
  // 1. Verify the webhook secret (set this in Sanity webhook settings)
  const webhookSecret = import.meta.env.SANITY_WEBHOOK_SECRET;
  if (webhookSecret) {
    const authHeader = request.headers.get('sanity-webhook-signature') || request.headers.get('authorization');
    if (!authHeader || !authHeader.includes(webhookSecret)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }

  // 2. Parse the webhook payload
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  // Sanity webhooks send the document in the payload
  // We only care about published property documents
  const documentId = payload._id || payload.documentId;
  const documentType = payload._type || payload.documentType;

  if (documentType !== 'property') {
    return new Response(JSON.stringify({ message: 'Not a property document, skipping.' }), { status: 200 });
  }

  if (!documentId) {
    return new Response(JSON.stringify({ error: 'No document ID in payload' }), { status: 400 });
  }

  // 3. Fetch the full property from Sanity (webhook payload may be partial)
  let property: Property;
  try {
    const result = await sanityClient.fetch(`
      *[_type == "property" && _id == $id][0] {
        _id,
        "name": coalesce(name, title),
        "slug": slug.current,
        "marketingTypeTitle": marketingType->title,
        propertyType,
        locationVienna,
        locationSurrounding,
        rooms,
        livingArea,
        purchasePrice,
        rentalPrice,
        address,
        "imageUrl": mainImage.asset->url
      }
    `, { id: documentId });

    if (!result) {
      return new Response(JSON.stringify({ message: 'Property not found in Sanity.' }), { status: 200 });
    }
    property = result;
  } catch (err) {
    console.error('Failed to fetch property:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch property from Sanity' }), { status: 500 });
  }

  // 4. Fetch all active subscribers
  let subscribers: Subscriber[] = [];
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('id, first_name, last_name, email, vermarktungsart, objektarten, bezirke, zimmer_min, zimmer_max, flaeche_min, flaeche_max, preis_min, preis_max')
      .eq('active', true);
    if (error) throw error;

    subscribers = (data ?? []).map(row => ({
      id:              row.id,
      firstName:       row.first_name,
      lastName:        row.last_name,
      email:           row.email,
      vermarktungsart: row.vermarktungsart,
      objektarten:     row.objektarten ?? [],
      bezirke:         row.bezirke ?? [],
      zimmerMin:       row.zimmer_min   ?? undefined,
      zimmerMax:       row.zimmer_max   ?? undefined,
      flaecheMin:      row.flaeche_min  ?? undefined,
      flaecheMax:      row.flaeche_max  ?? undefined,
      preisMin:        row.preis_min    ?? undefined,
      preisMax:        row.preis_max    ?? undefined,
    }));
  } catch (err) {
    console.error('Failed to fetch subscribers:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch subscribers' }), { status: 500 });
  }

  if (subscribers.length === 0) {
    return new Response(JSON.stringify({ message: 'No active subscribers.' }), { status: 200 });
  }

  // 5. Match subscribers and send emails
  const matched = subscribers.filter(sub => propertyMatchesSubscriber(property, sub));
  console.log(`Property "${property.name}": ${matched.length} of ${subscribers.length} subscribers matched.`);

  const emailResults = await Promise.allSettled(
    matched.map(subscriber =>
      resend.emails.send({
        from: 'office@vf-immobilien.at',
        to: subscriber.email,
        subject: `🏠 Neues Objekt: ${property.name}${property.locationVienna || property.locationSurrounding ? ` – ${property.locationVienna || property.locationSurrounding}` : ''}`,
        html: buildEmailHtml(subscriber, property),
      })
    )
  );

  const sent = emailResults.filter(r => r.status === 'fulfilled').length;
  const failed = emailResults.filter(r => r.status === 'rejected').length;

  console.log(`Emails sent: ${sent}, failed: ${failed}`);

  return new Response(
    JSON.stringify({
      success: true,
      matched: matched.length,
      emailsSent: sent,
      emailsFailed: failed,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};