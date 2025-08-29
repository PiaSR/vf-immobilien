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

    // 1. Fetch the Ausstattung collection and create maps.
    // Use try/catch for this critical fetch
    let ausstattungNameToIdMap = {};
    let ausstattungIdToNameMap = {};
    try {
      const ausstattungRes = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
      });

      if (!ausstattungRes.ok) {
        throw new Error(`Webflow API error for Ausstattung: ${ausstattungRes.statusText}`);
      }

      const ausstattungData = await ausstattungRes.json();

      // Validate that items array exists and is an array
      if (Array.isArray(ausstattungData.items)) {
        ausstattungNameToIdMap = ausstattungData.items.reduce((map, item) => {
          map[item.fieldData.name] = item.id;
          return map;
        }, {});
        ausstattungIdToNameMap = ausstattungData.items.reduce((map, item) => {
          map[item.id] = item.fieldData.name;
          return map;
        }, {});
      }
    } catch (err) {
      console.error('Failed to fetch Ausstattung collection:', err);
      // It's safe to continue, just won't be able to filter by this field
    }

    // 2. Fetch all properties
    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });

    if (!propertiesRes.ok) {
      console.error('Failed to fetch properties:', await propertiesRes.text());
      return { statusCode: propertiesRes.status, body: JSON.stringify({ error: `Webflow API error: ${propertiesRes.statusText}` }) };
    }

    const propertiesData = await propertiesRes.json();
    
    // Check if the items property exists and is an array
    if (!Array.isArray(propertiesData.items)) {
      console.error('Webflow API response did not contain an "items" array.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid Webflow API response format.' }),
      };
    }

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

      // Filter by 'vermarktungsart' (Reference field)
      if (queryStringParameters['vermarktungsart']) {
        const propertyKategorieName = kategorie?.name?.toLowerCase().trim();;
        const filterValue = queryStringParameters['vermarktungsart'].toLowerCase().trim();
        if (!propertyKategorieName || propertyKategorieName !== filterValue) {
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
      // Corrected filtering logic for 'lage'
if (queryStringParameters['lage']) {
  const selectedLage = queryStringParameters['lage'].split(',');
  
  // Check if the property has a lageWien and it is included in the filter array
  const hasMatchingWienLage = lageWien && selectedLage.includes(lageWien);

  // Check if the property has a lageUmgebung and it is included in the filter array
  const hasMatchingUmgebungLage = lageUmgebung && selectedLage.includes(lageUmgebung);
  
  // If neither field matches the selected locations, return false
  if (!hasMatchingWienLage && !hasMatchingUmgebungLage) {
      return false;
  }
}

      // Filter by 'ausstattung' (MultiReference field)
      if (queryStringParameters['ausstattung']) {
        const selectedAusstattungNames = queryStringParameters['ausstattung'].split(',');
        const selectedAusstattungIds = selectedAusstattungNames
          .map(name => ausstattungNameToIdMap[name])
          .filter(Boolean); // Filter out any undefined IDs
          
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

    // 4. Map the final items to include the full Ausstattung names
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