// netlify/functions/get-properties.js
export async function handler() {
	const API_KEY = process.env.WEBFLOW_API_KEY;
	const COLLECTION_ID = process.env.WEBFLOW_PROPERTIES_COLLECTION_ID;
  
	if (!API_KEY || !COLLECTION_ID) {
	  return { statusCode: 500, body: JSON.stringify({ error: "Missing env vars" }) };
	}
  
	async function fetchPage(offset) {
	  const res = await fetch(
		`https://api.webflow.com/collections/${COLLECTION_ID}/items?limit=100&offset=${offset}`,
		{
		  headers: {
			Authorization: `Bearer ${API_KEY}`,
			"accept-version": "1.0.0",
		  },
		}
	  );
	  if (!res.ok) throw new Error(`Webflow API error: ${res.status} ${res.statusText}`);
	  return res.json();
	}
  
	try {
	  let items = [];
	  let offset = 0;
	  while (true) {
		const data = await fetchPage(offset);
		items = items.concat(data.items || []);
		if (!data.items || data.items.length < 100) break;
		offset += 100;
	  }
  
	  // (Optional) normalize fields to what your frontend expects
	  const normalized = items.map((i) => ({
		id: i._id,
		name: i.name,
		slug: i.slug,
		lage: (i.lage || "").trim(),
		vermarktungsart: (i.vermarktungsart || "").trim(),
		objektart: (i.objektart || "").trim(),
		ausstattung: typeof i.ausstattung === "string"
		  ? i.ausstattung.split(",").map((a) => a.trim())
		  : Array.isArray(i.ausstattung) ? i.ausstattung : [],
		zimmer: i.zimmer ? parseInt(i.zimmer, 10) : null,
		wohnflaeche: i.wohnflaeche ? parseInt(i.wohnflaeche, 10) : null,
		preis: i.preis ? parseInt(i.preis, 10) : null,
		// add whatever other fields you use on cards
	  }));
  
	  return {
		statusCode: 200,
		headers: {
		  "Access-Control-Allow-Origin": "*",
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(normalized),
	  };
	} catch (err) {
	  return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
	}
  }
  