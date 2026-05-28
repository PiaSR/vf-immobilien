import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

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

  // --- 3. Check if this email already has an active subscription ---
  const existing = await sanityWriteClient.fetch(
    `*[_type == "subscriber" && email == $email && active == true][0]._id`,
    { email }
  );

  if (existing) {
    return new Response(
      JSON.stringify({ error: 'Diese E-Mail-Adresse hat bereits ein aktives Suchabo.' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --- 4. Build the subscriber document ---
  const subscriber: Record<string, any> = {
    _type: 'subscriber',
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    active: true,
    subscribedAt: new Date().toISOString(),
    vermarktungsart,
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

  // --- 5. Save to Sanity ---
  try {
    await sanityWriteClient.create(subscriber);

    return new Response(
      JSON.stringify({ success: true, message: 'Suchabo erfolgreich eingerichtet!' }),
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