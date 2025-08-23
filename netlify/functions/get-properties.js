// netlify/functions/get-properties.js
import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async () => {
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
        body: JSON.stringify({
          error:
            'Missing WEBFLOW_API_KEY, WEBFLOW_SITE_ID, or WEBFLOW_PROPERTIES_COLLECTION_ID',
        }),
      };
    }

    // ✅ 1. Fetch site info
    const siteRes = await fetch(
      `https://api.webflow.com/v2/sites/${SITE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!siteRes.ok) {
      throw new Error(
        `Webflow API error [Site Info]: ${siteRes.status} ${siteRes.statusText}`
      );
    }
    const siteInfo = await siteRes.json();
    console.log('Site Info:', siteInfo);

    // ✅ 2. Fetch collections
    const collectionsRes = await fetch(
      `https://api.webflow.com/v2/collections`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!collectionsRes.ok) {
      throw new Error(
        `Webflow API error [Collections]: ${collectionsRes.status} ${collectionsRes.statusText}`
      );
    }
    const collections = await collectionsRes.json();
    console.log('Collections:', collections);

    // ✅ 3. Fetch items from the properties collection
    const itemsRes = await fetch(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!itemsRes.ok) {
      throw new Error(
        `Webflow API error [Items]: ${itemsRes.status} ${itemsRes.statusText}`
      );
    }
    const itemsData = await itemsRes.json();
    console.log('Collection Items:', itemsData.items);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteInfo,
        collections,
        collectionItems: itemsData.items,
      }),
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
