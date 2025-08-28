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

    // 1. Fetch the Ausstattung collection to create a lookup map
    const ausstattungRes = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });

    if (!ausstattungRes.ok) {
      throw new Error(`Failed to fetch Ausstattung: ${ausstattungRes.statusText}`);
    }

    const ausstattungData = await ausstattungRes.json();
    const ausstattungMap = ausstattungData.items.reduce((map, item) => {
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
        vermarktungsart,
        objektart,
        'lage-wien-2': lageWien, // Destructure with a new variable name for clarity
        'lage-umgebung': lageUmgebung, // Destructure with a new variable name for clarity
        ausstattung,
        zimmer,
        wohnflaeche,
        preis
      } = fieldData;

      // Combine both location fields into a single variable for filtering
    const propertyLage = lageWien || lageUmgebung;

      // Filter by 'vermarktungsart'
      if (queryStringParameters['vermarktungsart'] && vermarktungsart !== queryStringParameters['vermarktungsart']) return false;

      // Filter by 'objektart'
      if (queryStringParameters['objektart'] && !queryStringParameters['objektart'].split(',').includes(objektart)) return false;

      // Filter by 'lage'
      if (queryStringParameters['lage']) {
        const selectedLage = queryStringParameters['lage'].split(',');
        if (!selectedLage.includes(propertyLage)) return false;
        console.log('selectedLage:', selectedLage)
    }
   

      // Filter by 'ausstattung' - Now filters by the ID
      if (queryStringParameters['ausstattung']) {
        const selectedAusstattungIds = queryStringParameters['ausstattung'].split(',');
        const propertyAusstattungIds = ausstattung ? ausstattung.map(a => a.id) : [];
        const matches = selectedAusstattungIds.every(id => propertyAusstattungIds.includes(id));
        if (!matches) return false;
      }

      // Filter by numeric fields
      if (queryStringParameters['zimmer-min'] && zimmer < parseInt(queryStringParameters['zimmer-min'])) return false;
      if (queryStringParameters['zimmer-max'] && zimmer > parseInt(queryStringParameters['zimmer-max'])) return false;
      if (queryStringParameters['wohnflaeche-min'] && wohnflaeche < parseInt(queryStringParameters['wohnflaeche-min'])) return false;
      if (queryStringParameters['wohnflaeche-max'] && wohnflaeche > parseInt(queryStringParameters['wohnflaeche-max'])) return false;
      if (queryStringParameters['preis-min'] && preis < parseInt(queryStringParameters['preis-min'])) return false;
      if (queryStringParameters['preis-max'] && preis > parseInt(queryStringParameters['preis-max'])) return false;

      return true;
    });

    // 4. Map the filtered items to include the full Ausstattung names
    const finalItems = filteredItems.map(item => {
      const ausstattungNames = (item.fieldData.ausstattung || []).map(a => ausstattungMap[a.id]);
      return {
        ...item,
        fieldData: {
          ...item.fieldData,
          ausstattungNames: ausstattungNames.filter(Boolean) // Filter out any null/undefined entries
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