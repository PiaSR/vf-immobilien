// netlify/functions/on-new-property.js
// Webhook target: receives new/updated property items
export async function handler(event) {
	const API_KEY = process.env.WEBFLOW_API_KEY;
	const PROPERTIES_COLLECTION_ID = process.env.WEBFLOW_PROPERTIES_COLLECTION_ID;
	const SUBS_COLLECTION_ID = process.env.WEBFLOW_SUBSCRIBERS_COLLECTION_ID;
  
	const RESEND_API_KEY = process.env.RESEND_API_KEY;
	const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@yourdomain.com";
  
	if (!API_KEY || !PROPERTIES_COLLECTION_ID || !SUBS_COLLECTION_ID || !RESEND_API_KEY) {
	  return { statusCode: 500, body: JSON.stringify({ error: "Missing env vars" }) };
	}
  
	// Helpers
	async function fetchAllFromCollection(collectionId) {
	  let items = [];
	  let offset = 0;
	  while (true) {
		const res = await fetch(
		  `https://api.webflow.com/collections/${collectionId}/items?limit=100&offset=${offset}`,
		  { headers: { Authorization: `Bearer ${API_KEY}`, "accept-version": "1.0.0" } }
		);
		if (!res.ok) throw new Error(`Webflow fetch error: ${res.status} ${res.statusText}`);
		const data = await res.json();
		items = items.concat(data.items || []);
		if (!data.items || data.items.length < 100) break;
		offset += 100;
	  }
	  return items;
	}
  
	function normalizeProperty(i) {
	  return {
		id: i._id,
		name: i.name,
		lage: (i.lage || "").toLowerCase().trim(),
		vermarktungsart: (i.vermarktungsart || "").toLowerCase().trim(),
		objektart: (i.objektart || "").toLowerCase().trim(),
		ausstattung: typeof i.ausstattung === "string"
		  ? i.ausstattung.split(",").map((a) => a.toLowerCase().trim())
		  : Array.isArray(i.ausstattung) ? i.ausstattung.map((a)=>a.toLowerCase().trim()) : [],
		zimmer: i.zimmer ? parseInt(i.zimmer, 10) : null,
		wohnflaeche: i.wohnflaeche ? parseInt(i.wohnflaeche, 10) : null,
		preis: i.preis ? parseInt(i.preis, 10) : null,
		slug: i.slug,
	  };
	}
  
	function matches(p, prefs) {
	  // Strings → lower-case
	  const selV = prefs.selectedVermarktung?.toLowerCase();
	  const selO = (prefs.selectedObjektart || []).map((v) => v.toLowerCase());
	  const selLW = (prefs.selectedLageWien || []).map((v) => v.toLowerCase());
	  const selLU = (prefs.selectedLageUmgebung || []).map((v) => v.toLowerCase());
	  const selA = (prefs.selectedAusstattung || []).map((v) => v.toLowerCase());
  
	  const zMin = Number.isFinite(+prefs.zimmerMin) ? +prefs.zimmerMin : undefined;
	  const zMax = Number.isFinite(+prefs.zimmerMax) ? +prefs.zimmerMax : undefined;
	  const wMin = Number.isFinite(+prefs.wohnMin) ? +prefs.wohnMin : undefined;
	  const wMax = Number.isFinite(+prefs.wohnMax) ? +prefs.wohnMax : undefined;
	  const pMin = Number.isFinite(+prefs.preisMin) ? +prefs.preisMin : undefined;
	  const pMax = Number.isFinite(+prefs.preisMax) ? +prefs.preisMax : undefined;
  
	  // Vermarktung
	  if (selV && p.vermarktungsart !== selV) return false;
  
	  // Objektart
	  if (selO.length && !selO.includes(p.objektart)) return false;
  
	  // Lage (Wien OR Umgebung)
	  if (selLW.length || selLU.length) {
		const inWien = selLW.includes(p.lage);
		const inUmgebung = selLU.includes(p.lage);
		if (!(inWien || inUmgebung)) return false;
	  }
  
	  // Ausstattung (every selected must be present)
	  if (selA.length && !selA.every((a) => p.ausstattung.includes(a))) return false;
  
	  // Zimmer
	  if (zMin !== undefined && (p.zimmer === null || p.zimmer < zMin)) return false;
	  if (zMax !== undefined && (p.zimmer === null || p.zimmer > zMax)) return false;
  
	  // Wohnfläche
	  if (wMin !== undefined && (p.wohnflaeche === null || p.wohnflaeche < wMin)) return false;
	  if (wMax !== undefined && (p.wohnflaeche === null || p.wohnflaeche > wMax)) return false;
  
	  // Preis
	  if (pMin !== undefined && (p.preis === null || p.preis < pMin)) return false;
	  if (pMax !== undefined && (p.preis === null || p.preis > pMax)) return false;
  
	  return true;
	}
  
	async function sendEmail(to, subject, html) {
	  const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
		  Authorization: `Bearer ${RESEND_API_KEY}`,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({
		  from: FROM_EMAIL,
		  to: [to],
		  subject,
		  html,
		}),
	  });
	  if (!res.ok) {
		const t = await res.text();
		throw new Error(`Resend error: ${res.status} ${t}`);
	  }
	}
  
	try {
	  // Webflow webhook payload includes the item; but we’ll be robust and refetch all properties, then match the newest.
	  const body = event.body ? JSON.parse(event.body) : {};
	  const maybeItem = body?.payload?.item || body?.item;
  
	  // If payload includes the item, normalize just that one; else fall back to “latest item” heuristic.
	  let newProperty;
	  if (maybeItem && maybeItem._id) {
		newProperty = normalizeProperty(maybeItem);
	  } else {
		const allProps = await fetchAllFromCollection(PROPERTIES_COLLECTION_ID);
		// sort newest first by updated date if present
		const sorted = allProps.sort(
		  (a, b) => new Date(b._updatedOn || b.updatedOn || 0) - new Date(a._updatedOn || a.updatedOn || 0)
		);
		newProperty = normalizeProperty(sorted[0]);
	  }
  
	  // Fetch all subscribers
	  const subs = await fetchAllFromCollection(SUBS_COLLECTION_ID);
  
	  // For each subscriber, parse preferences and match
	  const matchesList = [];
	  for (const s of subs) {
		const email = (s.email || "").trim();
		const prefsStr = s["preferences-json"] || s["preferences-json".replace(/-/g, "_")] || "";
		if (!email || !prefsStr) continue;
  
		let prefs;
		try { prefs = JSON.parse(prefsStr); } catch { continue; }
  
		if (matches(newProperty, prefs)) {
		  matchesList.push({ email, prefs });
		}
	  }
  
	  // Send emails
	  const propertyTitle = newProperty.name || "Neues Objekt";
	  const subject = `Neues Angebot: ${propertyTitle}`;
	  const details = `
		<p><strong>Ort:</strong> ${newProperty.lage || "-"}</p>
		<p><strong>Vermarktung:</strong> ${newProperty.vermarktungsart || "-"}</p>
		<p><strong>Objektart:</strong> ${newProperty.objektart || "-"}</p>
		<p><strong>Zimmer:</strong> ${newProperty.zimmer ?? "-"}</p>
		<p><strong>Wohnfläche:</strong> ${newProperty.wohnflaeche ?? "-"} qm</p>
		<p><strong>Preis:</strong> ${newProperty.preis ?? "-"} €</p>
	  `;
  
	  for (const m of matchesList) {
		await sendEmail(
		  m.email,
		  subject,
		  `<div>
			<p>Gute Neuigkeiten! Ein neues Inserat passt zu deinen Suchkriterien:</p>
			<h3>${propertyTitle}</h3>
			${details}
			<p><em>Sie erhalten diese Nachricht, weil Sie Alerts auf unserer Website abonniert haben.</em></p>
		  </div>`
		);
	  }
  
	  return { statusCode: 200, body: JSON.stringify({ ok: true, notified: matchesList.length }) };
	} catch (err) {
	  return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
	}
  }
  