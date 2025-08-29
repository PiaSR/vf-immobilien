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

      const propertyLage = lageWien || lageUmgebung;
      const propertyVermarktung = kategorie?.name || kategorie; // Correctly handle reference field
      const propertyObjektart = immobilientyp; // Option field returns a string

      // Filter by 'vermarktungsart'
      if (queryStringParameters['vermarktungsart'] && propertyVermarktung !== queryStringParameters['vermarktungsart']) return false;

      // Filter by 'objektart'
      if (queryStringParameters['objektart']) {
          const selectedObjektart = queryStringParameters['objektart'].split(',');
          if (!selectedObjektart.includes(propertyObjektart)) return false;
      }

      // Filter by 'lage'
      if (queryStringParameters['lage']) {
        const selectedLage = queryStringParameters['lage'].split(',');
        if (!selectedLage.includes(propertyLage)) return false;
      }
// Filter by 'ausstattung' using the name-to-ID map
if (queryStringParameters['ausstattung']) {
  // Convert the incoming names to their corresponding IDs
  const selectedAusstattungNames = queryStringParameters['ausstattung'].split(',');
  const selectedAusstattungIds = selectedAusstattungNames.map(name => ausstattungNameToIdMap[name]);

  const propertyAusstattungIds = item.fieldData.ausstattung ? item.fieldData.ausstattung.map(a => a.id) : [];
  const matches = selectedAusstattungIds.every(id => propertyAusstattungIds.includes(id));
  if (!matches) return false;
}

      // Determine the correct price based on vermarktungsart
      const propertyPrice = propertyVermarktung === 'Miete' ? mietpreis : kaufpreis;

      // Filter by numeric fields
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