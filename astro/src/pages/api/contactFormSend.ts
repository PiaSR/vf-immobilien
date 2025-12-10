import type { APIRoute } from 'astro';
import { Resend } from 'resend';
export const prerender = false;


// Initialisiere den Resend-Client
export const POST: APIRoute = async ({ request }) => {
 
  
  const resend = new Resend(import.meta.env.RESEND_API_KEY); 
  
  let params: URLSearchParams;
  // Eindeutige ID, um zu beweisen, dass dieser Code ausgeführt wird
  const serverTime = new Date().toISOString(); 

  try {
      // 1. Lese den rohen Body als Text
      const rawBody = await request.text();
      
      // SERVER LOG (Im Terminal sichtbar!):
      console.log('--- SERVER DEBUG START ---');
      console.log(`[${serverTime}] API RECEIVED RAW BODY:`, rawBody); 
      
      // 2. Erstelle URLSearchParams aus dem rohen Body-String
      params = new URLSearchParams(rawBody);
      
      // Logge alle KEYS, die der Server PARSEN konnte (Im Terminal sichtbar!)
      console.log('PARSED KEYS:', Array.from(params.keys()));
      console.log('--- SERVER DEBUG END ---');
      
  } catch (error) {
      console.error('Server Side Parsing Error:', error);
      return new Response(JSON.stringify({ 
          error: `Fehler beim Lesen des Anfragetextes auf dem Server.`,
          server_time: serverTime, 
          details: error instanceof Error ? error.message : String(error)
      }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' } 
      });
  }

  // Helper-Funktion zum Abrufen und Bereinigen von Werten
  const getField = (key: string): string => {
      const value = params.get(key);
      return (value || '').trim();
  }

  // Extrahiere die Formularfelder
  const email = getField('email');       
  const message = getField('message'); 
  const propertyId = getField('property-id'); // Is empty string if not present
  const propertyTitle = getField('property-title'); // Is empty string if not present
  const propertyAddress = getField('property-address'); 
  const context = getField('context');

  // Grundlegende Validierung
  if (!email || !message) {
    // Wenn die Validierung fehlschlägt, geben wir ALLE Debug-Infos zurück!
    console.error(`[${serverTime}] Validation failed. Extracted Email: "${email}", Extracted Message: "${message}"`);
    
    // Konvertiere URLSearchParams in ein einfaches Objekt für die JSON-Rückgabe
    const parsedData = Object.fromEntries(params.entries());

    return new Response(
      JSON.stringify({ 
        error: 'Email und Nachricht sind erforderlich.',
        // --- DEBUGGING DATEN ---
        server_time: serverTime, 
        raw_body_received: Array.from(params.keys()).length === 0 ? "Empty or Malformed Body Received" : "Raw Body Parsed Successfully",
        parsed_data_by_server: parsedData, // WAS WIRKLICH GEPARST WURDE
        extracted_email: email, 
        extracted_message: message, 
        // -------------------------
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  
  const firstName = getField('first-name');
  const lastName = getField('last-name');
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const phone = getField('phone');

  let subject = `Neue Kontaktanfrage von ${fullName} | VF Immobilien Website`;
  
  if (propertyId && propertyTitle) {
      subject = `🏠 ANFRAGE ZU OBJEKT: ${propertyTitle} | ${fullName}`;
  } else if (context === 'Sidebar Agent Card') {
      subject = `🙋‍♂️ Allgemeine Makler-Anfrage | ${fullName}`;
  }  let body = `
  --- KONTAKTDATEN ---
  Name: ${fullName} 
  Email: ${email}
  Telefon: ${phone}

`;

// Bedingte Property-Information hinzufügen
if (propertyId && propertyTitle) {
  body += `
  --- OBJEKTINTERESSE ---
  Interessiert an Objekt: ${propertyTitle}
  Interne ID: ${propertyId}
  Adresse: ${propertyAddress}
  
  
  `;
} else {
  // Wenn es keine Property-ID gibt, ist es eine allgemeine Anfrage.
  body += `
  --- ANFRAGE-TYP ---
  Dies ist eine allgemeine Kontaktanfrage (kein spezifisches Objekt).
  Quelle: ${context || 'Kontaktformular Allgemein'}
  
  `;
}

// Nachricht zum Schluss hinzufügen
body += `
--- NACHRICHT ---

${message}
`;
  // E-Mail über Resend senden 
  try {
    const { error } = await resend.emails.send({
      from: 'no-reply@vf-immobilien.at', 
      to: 'office@vf-immobilien.at', 
      subject: subject,
      html: body.replace(/\n/g, '<br>'),
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(JSON.stringify({ error: 'Fehler beim Senden der E-Mail über Resend.', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Email erfolgreich gesendet!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Route Error (Resend call failed):', error);
    return new Response(
      JSON.stringify({ error: 'Interner Serverfehler (Resend)' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
