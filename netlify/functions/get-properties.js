// netlify/functions/get-properties.js

import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { WEBFLOW_API_KEY, WEBFLOW_PROPERTIES_COLLECTION_ID, AUSSTATTUNG_COLLECTION_ID } = process.env;

    if (!WEBFLOW_API_KEY || !WEBFLOW_PROPERTIES_COLLECTION_ID || !AUSSTATTUNG_COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables' }),
      };
    }

    const { queryStringParameters } = event;
// 1. Fetch the Ausstattung collection and create two maps: id to name and name to id.
const ausstattungRes = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
  headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
});
const ausstattungData = await ausstattungRes.json();

// Create a name-to-ID map for filtering
const ausstattungNameToIdMap = ausstattungData.items.reduce((map, item) => {
    map[item.fieldData.name] = item.id;
    return map;
}, {});

// Create an ID-to-name map for rendering
const ausstattungIdToNameMap = ausstattungData.items.reduce((map, item) => {
    map[item.id] = item.fieldData.name;
    return map;
}, {});

    // 2. Fetch all properties
    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });

    if (!propertiesRes.ok) {
      return { statusCode: propertiesRes.status, body: JSON.stringify({ error: `Webflow API error: ${propertiesRes.statusText}` }) };
    }

    const propertiesData = await propertiesRes.json();
    let items = propertiesData.items;

    // 3. Server-side filtering logic
    // Corrected filtering logic for your Netlify function

const filteredItems = items.filter(item => {
  const { fieldData } = item;
  const {
      'kategorie': kategorie,
      'immobilientyp': immobilientyp,
      'lage-wien-2': lageWien,
      'lage-umgebung': lageUmgebung,
      ausstattung,
      'anzahl-von-zimmern': zimmer,
      'quadratmeter': wohnflaeche,
      'preis': kaufpreis,
      'mietpreis': mietpreis,
  } = fieldData;

  // Filter by 'vermarktungsart' (Reference field)
  if (queryStringParameters['vermarktungsart']) {
      // Check if the property has a 'kategorie' and if its name matches the filter.
      // If 'kategorie' is null/undefined, it won't pass this check.
      if (!kategorie || kategorie.name !== queryStringParameters['vermarktungsart']) {
          return false;
      }
  }

  // Filter by 'objektart' (Option field)
  if (queryStringParameters['objektart']) {
      const selectedObjektart = queryStringParameters['objektart'].split(',');
      if (!immobilientyp || !selectedObjektart.includes(immobilientyp)) {
          return false;
      }
  }

  // Filter by 'lage' (Option and PlainText fields)
  if (queryStringParameters['lage']) {
      const selectedLage = queryStringParameters['lage'].split(',');
      const propertyLage = lageWien || lageUmgebung; // Combines the two location fields
      if (!propertyLage || !selectedLage.includes(propertyLage)) {
          return false;
      }
  }

  // Filter by 'ausstattung' (MultiReference field)
  if (queryStringParameters['ausstattung']) {
      // This is the most complex one. Your previous solution of mapping names to IDs is best.
      // Assuming you have the ausstattungNameToIdMap setup:
      const selectedAusstattungNames = queryStringParameters['ausstattung'].split(',');
      const selectedAusstattungIds = selectedAusstattungNames.map(name => ausstattungNameToIdMap[name]);
      const propertyAusstattungIds = ausstattung ? ausstattung.map(a => a.id) : [];
      const matches = selectedAusstattungIds.every(id => propertyAusstattungIds.includes(id));
      if (!matches) return false;
  }

  // Filter by numeric fields (Numbers)
  const propertyPrice = (kategorie && kategorie.name === 'Miete') ? mietpreis : kaufpreis;

  if (queryStringParameters['zimmer-min'] && zimmer < parseInt(queryStringParameters['zimmer-min'])) return false;
  if (queryStringParameters['zimmer-max'] && zimmer > parseInt(queryStringParameters['zimmer-max'])) return false;
  if (queryStringParameters['wohnflaeche-min'] && wohnflaeche < parseInt(queryStringParameters['wohnflaeche-min'])) return false;
  if (queryStringParameters['wohnflaeche-max'] && wohnflaeche > parseInt(queryStringParameters['wohnflaeche-max'])) return false;
  if (queryStringParameters['preis-min'] && propertyPrice < parseInt(queryStringParameters['preis-min'])) return false;
  if (queryStringParameters['preis-max'] && propertyPrice > parseInt(queryStringParameters['preis-max'])) return false;

  return true;
});
// 4. Map the final items to include the full Ausstattung names (using the ID-to-name map)
const finalItems = filteredItems.map(item => {
  const ausstattungNames = (item.fieldData.ausstattung || []).map(a => ausstattungIdToNameMap[a.id]);
  return {
    ...item,
    fieldData: {
      ...item.fieldData,
      ausstattungNames: ausstattungNames.filter(Boolean)
    }
  };
});

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: finalItems }),
    };
  } catch (err) {
    console.error('Error in main function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};