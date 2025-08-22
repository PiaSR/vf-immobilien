// netlify/functions/subscribe.js
export async function handler(event) {
	if (event.httpMethod === "OPTIONS") {
	  return {
		statusCode: 200,
		headers: {
		  "Access-Control-Allow-Origin": "*",
		  "Access-Control-Allow-Headers": "*",
		  "Access-Control-Allow-Methods": "POST, OPTIONS",
		},
		body: "",
	  };
	}
  
	if (event.httpMethod !== "POST") {
	  return { statusCode: 405, body: "Method Not Allowed" };
	}
  
	const API_KEY = process.env.WEBFLOW_API_KEY;
	const SUBS_COLLECTION_ID = process.env.WEBFLOW_SUBSCRIBERS_COLLECTION_ID;
	if (!API_KEY || !SUBS_COLLECTION_ID) {
	  return { statusCode: 500, body: JSON.stringify({ error: "Missing env vars" }) };
	}
  
	try {
	  const prefs = JSON.parse(event.body || "{}");
	  const email = (prefs.email || "").trim();
	  const name = (prefs.name || email || "Subscriber").trim();
  
	  if (!email) {
		return { statusCode: 400, body: JSON.stringify({ error: "Email required" }) };
	  }
  
	  const payload = {
		fields: {
		  name,
		  email,
		  "preferences-json": JSON.stringify(prefs),
		},
	  };
  
	  const res = await fetch(
		`https://api.webflow.com/collections/${SUBS_COLLECTION_ID}/items?live=true`,
		{
		  method: "POST",
		  headers: {
			Authorization: `Bearer ${API_KEY}`,
			"accept-version": "1.0.0",
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(payload),
		}
	  );
  
	  if (!res.ok) {
		const txt = await res.text();
		return { statusCode: res.status, body: JSON.stringify({ error: txt }) };
	  }
  
	  return {
		statusCode: 200,
		headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
		body: JSON.stringify({ ok: true }),
	  };
	} catch (err) {
	  return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
	}
  }
  