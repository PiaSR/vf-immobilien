// netlify/functions/get-properties.js
import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
  try {
    console.log('--- Environment Variables ---');
    console.log('WEBFLOW_API_KEY:', process.env.WEBFLOW_API_KEY);
    console.log('SITE_ID:', process.env.WEBFLOW_SITE_ID);
    console.log('COLLECTION_ID:', process.env.WEBFLOW_PROPERTIES_COLLECTION_ID);
    console.log('----------------------------');

    const API_KEY = process.env.WEBFLOW_API_KEY;
    const SITE_ID = process.env.WEBFLOW_SITE_ID;
    const COLLECTION_ID = process.env.WEBFLOW_PROPERTIES_COLLECTION_ID;

    if (!API_KEY || !SITE_ID || !COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing WEBFLOW_API_KEY, WEBFLOW_SITE_ID, or WEBFLOW_PROPERTIES_COLLECTION_ID' }),
      };
    }

    async function fetchCollections() {
      const res = await fetch(`https://api.webflow.com/v2/sites/${SITE_ID}/collections`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'accept-version': 'v2',
        },
      });

      if (!res.ok) {
        throw new Error(`Webflow API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Collections:', JSON.stringify(data, null, 2));
      return data.collections;
    }

    async function fetchCollectionItems(collectionId) {
      const res = await fetch(`https://api.webflow.com/v2/collections/${collectionId}/items?limit=100`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'accept-version': 'v2',
        },
      });

      if (!res.ok) {
        throw new Error(`Webflow API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Collection Items:', JSON.stringify(data, null, 2));
      return data.items;
    }
    
    // Call the functions directly to fetch collections and their items
    const collections = await fetchCollections();
    const collectionItems = await fetchCollectionItems(COLLECTION_ID);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collections,
        collectionItems,
      }),
    };
  } catch (err) {
    console.error('Error in main function:', err);
    console.error('Error stack trace:', err.stack);
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