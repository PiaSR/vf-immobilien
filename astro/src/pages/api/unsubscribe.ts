import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabaseClient';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return htmlResponse('Ungültiger Link', 'Dieser Abmeldelink ist ungültig.', 400);
  }

  // Old unsubscribe links contain Sanity document IDs (not UUIDs) — show a graceful error
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return htmlResponse('Ungültiger Link', 'Dieser Abmeldelink ist ungültig.', 400);
  }

  let subscriber: { id: string; first_name?: string; active?: boolean } | null = null;
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('id, first_name, active')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    subscriber = data;
  } catch (err) {
    console.error('Unsubscribe fetch error:', err);
    return htmlResponse('Fehler', 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', 500);
  }

  if (!subscriber) {
    return htmlResponse('Nicht gefunden', 'Kein Suchabo mit diesem Link gefunden.', 404);
  }

  const name = subscriber.first_name ? `${subscriber.first_name}, Sie wurden` : 'Sie wurden';

  if (!subscriber.active) {
    return htmlResponse(
      'Bereits abgemeldet',
      `${name} sind bereits vom Suchabo abgemeldet.`
    );
  }

  try {
    const { error } = await supabase
      .from('subscribers')
      .update({ active: false })
      .eq('id', id);
    if (error) throw error;
  } catch (err) {
    console.error('Unsubscribe update error:', err);
    return htmlResponse('Fehler', 'Die Abmeldung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.', 500);
  }

  return htmlResponse(
    'Abmeldung erfolgreich',
    `${name} erfolgreich vom Suchabo abgemeldet. Sie erhalten keine weiteren Objektbenachrichtigungen.`
  );
};

function htmlResponse(heading: string, message: string, status = 200): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${heading} – VF Immobilien</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 40px 20px; background: #f4f7f4; font-family: Georgia, serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .card { background: #fff; border-radius: 8px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    h1 { color: #1a3329; font-size: 22px; margin: 0 0 16px; font-weight: normal; }
    p { color: #4a5c52; font-size: 15px; line-height: 1.6; margin: 0 0 32px; }
    a.btn { display: inline-block; background: #1a3329; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${heading}</h1>
    <p>${message}</p>
    <a class="btn" href="https://vf-immobilien.at">Zur Startseite</a>
  </div>
</body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
