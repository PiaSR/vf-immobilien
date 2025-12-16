import type { APIRoute } from 'astro';
// WICHTIG: Resend wird NICHT importiert, um Fehler bei der Initialisierung zu vermeiden!

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    
    // Nur die Umgebungsvariable abrufen
    const apiKey = import.meta.env.RESEND_API_KEY;
    
    // Prüfen, ob der Schlüssel existiert und lang genug ist
    if (!apiKey || apiKey.length < 10) {
        // Kritischer Fehlercode und Meldung zurückgeben
        console.error('CRITICAL ERROR: API key is NOT loaded correctly.');
        return new Response(JSON.stringify({ 
            status: 'KEY_MISSING_OR_INVALID',
            apiKeyLength: apiKey ? apiKey.length : 0,
            message: 'API Key is missing or invalid in Vercel. Cannot proceed.'
        }), { 
            // Verwenden Sie 403 Forbidden oder 500, um den Fehler zu kennzeichnen
            status: 403, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    // Wenn der Schlüssel existiert, eine erfolgreiche Antwort zurückgeben
    console.log(`SUCCESS: API Key loaded with length ${apiKey.length}.`);
    
    return new Response(JSON.stringify({ 
        status: 'KEY_LOADED_SUCCESSFULLY',
        apiKeyLength: apiKey.length,
        message: 'The function loaded the environment variable. Resend should now work.'
    }), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
    });
};