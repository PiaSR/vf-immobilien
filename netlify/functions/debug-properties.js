import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async () => {
  try {
    const { WEBFLOW_API_KEY, WEBFLOW_PROPERTIES_COLLECTION_ID } = process.env;

    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });

    if (!propertiesRes.ok) {
      throw new Error(`Webflow API error: ${propertiesRes.statusText}`);
    }

    const propertiesData = await propertiesRes.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(propertiesData.items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};