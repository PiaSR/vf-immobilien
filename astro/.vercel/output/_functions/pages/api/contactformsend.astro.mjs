import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const resend = new Resend("re_X9jHRhCb_2b9BroXWVg2bYYKyDTpahKqE");
  let params;
  const serverTime = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const rawBody = await request.text();
    console.log("--- SERVER DEBUG START ---");
    console.log(`[${serverTime}] API RECEIVED RAW BODY:`, rawBody);
    params = new URLSearchParams(rawBody);
    console.log("PARSED KEYS:", Array.from(params.keys()));
    console.log("--- SERVER DEBUG END ---");
  } catch (error) {
    console.error("Server Side Parsing Error:", error);
    return new Response(JSON.stringify({
      error: `Fehler beim Lesen des Anfragetextes auf dem Server.`,
      server_time: serverTime,
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const getField = (key) => {
    const value = params.get(key);
    return (value || "").trim();
  };
  const email = getField("email");
  const message = getField("message");
  const propertyId = getField("property-id");
  const propertyTitle = getField("property-title");
  const propertyAddress = getField("property-address");
  const context = getField("context");
  if (!email || !message) {
    console.error(`[${serverTime}] Validation failed. Extracted Email: "${email}", Extracted Message: "${message}"`);
    const parsedData = Object.fromEntries(params.entries());
    return new Response(
      JSON.stringify({
        error: "Email und Nachricht sind erforderlich.",
        // --- DEBUGGING DATEN ---
        server_time: serverTime,
        raw_body_received: Array.from(params.keys()).length === 0 ? "Empty or Malformed Body Received" : "Raw Body Parsed Successfully",
        parsed_data_by_server: parsedData,
        // WAS WIRKLICH GEPARST WURDE
        extracted_email: email,
        extracted_message: message
        // -------------------------
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const firstName = getField("first-name");
  const lastName = getField("last-name");
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const phone = getField("phone");
  let subject = `Neue Kontaktanfrage von ${fullName} | VF Immobilien Website`;
  if (propertyId && propertyTitle) {
    subject = `🏠 ANFRAGE ZU OBJEKT: ${propertyTitle} | ${fullName}`;
  } else if (context === "Sidebar Agent Card") {
    subject = `🙋‍♂️ Allgemeine Makler-Anfrage | ${fullName}`;
  }
  let body = `
  --- KONTAKTDATEN ---
  Name: ${fullName} 
  Email: ${email}
  Telefon: ${phone}

`;
  if (propertyId && propertyTitle) {
    body += `
  --- OBJEKTINTERESSE ---
  Interessiert an Objekt: ${propertyTitle}
  Interne ID: ${propertyId}
  Adresse: ${propertyAddress}
  
  
  `;
  } else {
    body += `
  --- ANFRAGE-TYP ---
  Dies ist eine allgemeine Kontaktanfrage (kein spezifisches Objekt).
  Quelle: ${context || "Kontaktformular Allgemein"}
  
  `;
  }
  body += `
--- NACHRICHT ---

${message}
`;
  try {
    const { error } = await resend.emails.send({
      from: "no-reply@vf-immobilien.at",
      to: "office@vf-immobilien.at",
      subject,
      html: body.replace(/\n/g, "<br>")
    });
    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ error: "Fehler beim Senden der E-Mail über Resend.", details: error }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, message: "Email erfolgreich gesendet!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API Route Error (Resend call failed):", error);
    return new Response(
      JSON.stringify({ error: "Interner Serverfehler (Resend)" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
