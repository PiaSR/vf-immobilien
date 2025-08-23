// netlify/functions/get-properties.js
import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { WEBFLOW_API_KEY, WEBFLOW_PROPERTIES_COLLECTION_ID } = process.env;

    if (!WEBFLOW_API_KEY || !WEBFLOW_PROPERTIES_COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables' }),
      };
    }

    const { queryStringParameters } = event;

    const API_URL = `https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`;

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_KEY}`,
        'accept-version': 'v2',
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Webflow API error: ${res.statusText}` }),
      };
    }

    const data = await res.json();
    let items = data.items;

    // Server-side filtering logic based on query parameters
    const filteredItems = items.filter(item => {
      const { fieldData } = item;
      const { 
        vermarktungsart, 
        objektart, 
        lage, 
        ausstattung, 
        zimmer, 
        wohnflaeche, 
        preis 
      } = fieldData;

      // Filter by 'vermarktungsart'
      if (queryStringParameters['vermarktungsart'] && vermarktungsart !== queryStringParameters['vermarktungsart']) {
        return false;
      }

      // Filter by 'objektart' (assumes it's a multi-select field, adjust if needed)
      if (queryStringParameters['objektart'] && !queryStringParameters['objektart'].split(',').includes(objektart)) {
        return false;
      }

      // Filter by 'lage'
      if (queryStringParameters['lage'] && !queryStringParameters['lage'].split(',').includes(lage)) {
        return false;
      }

      // Filter by 'ausstattung' (assumes it's a multi-reference, needs complex matching)
      // This is a placeholder and will need refinement based on your exact field type
      if (queryStringParameters['ausstattung'] && !ausstattung?.some(a => queryStringParameters['ausstattung'].split(',').includes(a._id))) {
         return false;
      }

      // Filter by 'zimmer' range
      if (queryStringParameters['zimmer-min'] && zimmer < parseInt(queryStringParameters['zimmer-min'])) return false;
      if (queryStringParameters['zimmer-max'] && zimmer > parseInt(queryStringParameters['zimmer-max'])) return false;

      // Filter by 'wohnflaeche' range
      if (queryStringParameters['wohnflaeche-min'] && wohnflaeche < parseInt(queryStringParameters['wohnflaeche-min'])) return false;
      if (queryStringParameters['wohnflaeche-max'] && wohnflaeche > parseInt(queryStringParameters['wohnflaeche-max'])) return false;

      // Filter by 'preis' range
      if (queryStringParameters['preis-min'] && preis < parseInt(queryStringParameters['preis-min'])) return false;
      if (queryStringParameters['preis-max'] && preis > parseInt(queryStringParameters['preis-max'])) return false;

      return true;
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: filteredItems }),
    };
  } catch (err) {
    console.error('Error in main function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};