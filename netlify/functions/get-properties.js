

// netlify/functions/get-properties.js
import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
  try {
    console.log('--- Environment Variables ---');
    console.log('WEBFLOW_API_KEY:', process.env.WEBFLOW_API_KEY);
    console.log('COLLECTION_ID:', process.env.WEBFLOW_PROPERTIES_COLLECTION_ID);
    console.log('----------------------------');

    const API_KEY = process.env.WEBFLOW_API_KEY;
    const COLLECTION_ID = process.env.WEBFLOW_PROPERTIES_COLLECTION_ID;

    if (!API_KEY || !COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing WEBFLOW_API_KEY or COLLECTION_ID' }),
      };
    }

    async function fetchPage(offset = 0) {
      try {
        const url = `https://api.webflow.com/collections/${COLLECTION_ID}/items?limit=100&offset=${offset}`;
        console.log(`Fetching offset ${offset} → URL: ${url}`);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });

        console.log(`Fetching offset ${offset} → status ${res.status}`);

        if (!res.ok) {
          const text = await res.text();
          console.error('Webflow API response:', text);
          throw new Error(`Webflow API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log('API Response:', data);

        return data;
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    }

    let items = [];
    let offset = 0;

    while (true) {
      try {
        const data = await fetchPage(offset);
        items = items.concat(data.items || []);
        if (!data.items || data.items.length < 100) break;
        offset += 100;
      } catch (err) {
        console.error('Pagination error:', err);
        break;
      }
    }

    // Normalize fields for frontend
    const normalized = items.map((i) => ({
      id: i._id,
      name: i.name,
      slug: i.slug,
      lage: (i.lage || '').trim(),
      vermarktungsart: (i.vermarktungsart || '').trim(),
      objektart: (i.objektart || '').trim(),
      ausstattung: typeof i.ausstattung === 'string'
        ? i.ausstattung.split(',').map((a) => a.trim())
        : Array.isArray(i.ausstattung) ? i.ausstattung : [],
      zimmer: i.zimmer ? parseInt(i.zimmer, 10) : null,
      wohnflaeche: i.wohnflaeche ? parseInt(i.wohnflaeche, 10) : null,
      preis: i.preis ? parseInt(i.preis, 10) : null,
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalized),
    };
  } catch (err) {
    console.error('Error in main function:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
};