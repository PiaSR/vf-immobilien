import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';

export const prerender = false;

// Write client — needs a token with Editor or above permissions
const sanityWriteClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: false, // Must be false for writes
  token: import.meta.env.SANITY_WRITE_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  // --- 1. Parse the JSON body sent from the form ---
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Ungültige Anfrage.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // --- 2. Validate required fields ---
  const { firstName, lastName, email, vermarktungsart } = body;

  if (!firstName || !lastName || !email || !vermarktungsart) {
    return new Response(
      JSON.stringify({ error: 'Vorname, Nachname, E-Mail und Vermarktungsart sind erforderlich.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --- 3. Build the subscriber document ---
  const subscriber: Record<string, any> = {
    _type: 'subscriber',
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    active: true,
    vermarktungsart,
    // Clear optional fields first — they'll be re-set below if provided.
    // This ensures old values don't linger when someone updates their prefs.
    objektarten: [],
    bezirke: [],
    zimmerMin: null,
    zimmerMax: null,
    flaecheMin: null,
    flaecheMax: null,
    preisMin: null,
    preisMax: null,
  };

  // Only include optional fields if they have actual values
  if (body.objektarten?.length > 0) subscriber.objektarten = body.objektarten;
  if (body.bezirke?.length > 0) subscriber.bezirke = body.bezirke;
  if (body.zimmerMin != null && body.zimmerMin !== '') subscriber.zimmerMin = Number(body.zimmerMin);
  if (body.zimmerMax != null && body.zimmerMax !== '') subscriber.zimmerMax = Number(body.zimmerMax);
  if (body.flaecheMin != null && body.flaecheMin !== '') subscriber.flaecheMin = Number(body.flaecheMin);
  if (body.flaecheMax != null && body.flaecheMax !== '') subscriber.flaecheMax = Number(body.flaecheMax);
  if (body.preisMin != null && body.preisMin !== '') subscriber.preisMin = Number(body.preisMin);
  if (body.preisMax != null && body.preisMax !== '') subscriber.preisMax = Number(body.preisMax);

  // --- 5. Create or update ---
  try {
    const existingId = await sanityWriteClient.fetch(
      `*[_type == "subscriber" && email == $email][0]._id`,
      { email: email.trim().toLowerCase() }
    );
    const isUpdate = !!existingId;
    let savedId: string;

    if (isUpdate) {
      await sanityWriteClient.patch(existingId).set(subscriber).commit();
      savedId = existingId;
    } else {
      subscriber.subscribedAt = new Date().toISOString();
      const created = await sanityWriteClient.create(subscriber as { _type: string } & Record<string, any>);
      savedId = created._id;
    }

    try {
      await sendConfirmationEmail(subscriber, savedId, isUpdate);
    } catch (err) {
      console.error('Confirmation email error:', err);
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated: isUpdate,
        message: isUpdate
          ? 'Ihr Suchabo wurde aktualisiert!'
          : 'Suchabo erfolgreich eingerichtet!',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Sanity write error:', error);
    return new Response(
      JSON.stringify({ error: 'Fehler beim Speichern. Bitte versuchen Sie es später erneut.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// ─── Confirmation email ───────────────────────────────────────────────────────

async function sendConfirmationEmail(
  sub: Record<string, any>,
  subscriberId: string,
  isUpdate: boolean
) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'office@vf-immobilien.at',
    to: sub.email,
    subject: isUpdate
      ? 'Ihr Suchabo wurde aktualisiert – VF Immobilien'
      : 'Ihr Suchabo wurde eingerichtet – VF Immobilien',
    html: buildConfirmationEmailHtml(sub, subscriberId, isUpdate),
  });
}

function buildConfirmationEmailHtml(
  sub: Record<string, any>,
  subscriberId: string,
  isUpdate: boolean
): string {
  const vmLabel =
    sub.vermarktungsart === 'miete' ? 'Miete'
    : sub.vermarktungsart === 'kauf' ? 'Kauf'
    : 'Miete & Kauf';

  const fmtEur = (n: number) =>
    new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);

  const rows: [string, string][] = [
    ['Vermarktungsart', vmLabel],
    ['Objektart', sub.objektarten?.length > 0 ? sub.objektarten.join(', ') : 'Alle Objektarten'],
    ['Bezirke / Orte', sub.bezirke?.length > 0 ? sub.bezirke.join(', ') : 'Alle Bezirke & Orte'],
  ];

  if (sub.zimmerMin != null && sub.zimmerMax != null) rows.push(['Zimmer', `${sub.zimmerMin} – ${sub.zimmerMax}`]);
  else if (sub.zimmerMin != null) rows.push(['Zimmer', `ab ${sub.zimmerMin}`]);
  else if (sub.zimmerMax != null) rows.push(['Zimmer', `bis ${sub.zimmerMax}`]);

  if (sub.flaecheMin != null && sub.flaecheMax != null) rows.push(['Fläche', `${sub.flaecheMin} – ${sub.flaecheMax} m²`]);
  else if (sub.flaecheMin != null) rows.push(['Fläche', `ab ${sub.flaecheMin} m²`]);
  else if (sub.flaecheMax != null) rows.push(['Fläche', `bis ${sub.flaecheMax} m²`]);

  const prLabel =
    sub.vermarktungsart === 'miete' ? 'Miete'
    : sub.vermarktungsart === 'kauf' ? 'Kaufpreis'
    : 'Preis';
  if (sub.preisMin != null && sub.preisMax != null) rows.push([prLabel, `${fmtEur(sub.preisMin)} – ${fmtEur(sub.preisMax)}`]);
  else if (sub.preisMin != null) rows.push([prLabel, `ab ${fmtEur(sub.preisMin)}`]);
  else if (sub.preisMax != null) rows.push([prLabel, `bis ${fmtEur(sub.preisMax)}`]);

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 20px 10px 0;font-size:12px;color:#7a9a82;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0f4f1;">${label}</td>
        <td style="padding:10px 0;font-size:14px;color:#1a3329;font-weight:bold;vertical-align:top;border-bottom:1px solid #f0f4f1;">${value}</td>
      </tr>`
    )
    .join('');

  const unsubUrl = `https://vf-immobilien.at/api/unsubscribe?id=${subscriberId}`;
  const updateUrl = `https://vf-immobilien.at/subscription`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isUpdate ? 'Suchabo aktualisiert' : 'Suchabo eingerichtet'} – VF Immobilien</title>
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
              <p style="color:#a8c4b0;margin:8px 0 0;font-size:13px;letter-spacing:0.5px;">SUCHABO — ${isUpdate ? 'AKTUALISIERT' : 'EINGERICHTET'}</p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#ffffff;padding:40px;border-radius:0 0 8px 8px;">
              <p style="color:#2f3c35;font-size:16px;margin:0 0 8px;">Liebe/r ${sub.firstName},</p>
              <p style="color:#4a5c52;font-size:15px;line-height:1.6;margin:0 0 32px;">
                ${isUpdate
                  ? 'Ihre Suchpräferenzen wurden erfolgreich aktualisiert.'
                  : 'Ihr Suchabo wurde erfolgreich eingerichtet. Wir benachrichtigen Sie, sobald ein passendes Objekt inseriert wird.'}
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e8e3;border-radius:8px;overflow:hidden;margin-bottom:32px;">
                <tr>
                  <td colspan="2" style="padding:14px 20px;background-color:#f4f7f4;border-bottom:1px solid #e0e8e3;">
                    <p style="margin:0;font-size:11px;color:#7a9a82;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Ihre Suchpräferenzen</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:4px 20px 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${tableRows}
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${updateUrl}" style="display:inline-block;background-color:#1a3329;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;letter-spacing:0.5px;">
                      Präferenzen ändern
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #e0e8e3;margin:0 0 24px;" />

              <p style="color:#9ab0a0;font-size:12px;text-align:center;margin:0;line-height:1.8;">
                Sie erhalten diese E-Mail, weil Sie ein Suchabo bei VF Immobilien eingerichtet haben.<br />
                <a href="${unsubUrl}" style="color:#9ab0a0;">Vom Suchabo abmelden</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}