// netlify/functions/get-properties.js

import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { 
      WEBFLOW_API_KEY, 
      WEBFLOW_PROPERTIES_COLLECTION_ID, 
      KATEGORIE_COLLECTION_ID,
      AUSSTATTUNG_COLLECTION_ID,
      IMMOBILIENTYP_COLLECTION_ID, // ADD THIS ID TO YOUR .env FILE
      LAGE_WIEN_COLLECTION_ID // ADD THIS ID TO YOUR .env FILE
    } = process.env;

    if (!WEBFLOW_API_KEY || !WEBFLOW_PROPERTIES_COLLECTION_ID || !KATEGORIE_COLLECTION_ID || !AUSSTATTUNG_COLLECTION_ID || !IMMOBILIENTYP_COLLECTION_ID || !LAGE_WIEN_COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables' }),
      };
    }
    
    // Create maps for IDs to names
    let kategorieIdToNameMap = {};
    let ausstattungIdToNameMap = {};
    let immobilientypIdToNameMap = {};
    let lageWienIdToNameMap = {};
    
    // Fetch and map the Kategorie collection
    try {
      const res = await fetch(`https://api.webflow.com/v2/collections/${KATEGORIE_COLLECTION_ID}/items`, {
          headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
      });
      const data = await res.json();
      kategorieIdToNameMap = data.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
    } catch (err) { console.error('Failed to fetch Kategorie collection:', err); }

    // Fetch and map the Ausstattung collection
    try {
      const res = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
          headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
      });
      const data = await res.json();
      ausstattungIdToNameMap = data.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
    } catch (err) { console.error('Failed to fetch Ausstattung collection:', err); }

    // Fetch and map the Immobilientyp collection
    try {
      const res = await fetch(`https://api.webflow.com/v2/collections/${IMMOBILIENTYP_COLLECTION_ID}/items`, {
          headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
      });
      const data = await res.json();
      immobilientypIdToNameMap = data.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
    } catch (err) { console.error('Failed to fetch Immobilientyp collection:', err); }

    // Fetch and map the Lage (Wien) collection
    try {
      const res = await fetch(`https://api.webflow.com/v2/collections/${LAGE_WIEN_COLLECTION_ID}/items`, {
          headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
      });
      const data = await res.json();
      lageWienIdToNameMap = data.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
    } catch (err) { console.error('Failed to fetch Lage (Wien) collection:', err); }
    
    const { queryStringParameters } = event;

    // Fetch all properties
    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    if (!propertiesRes.ok) {
      console.error('Failed to fetch properties:', await propertiesRes.text());
      return { statusCode: propertiesRes.status, body: JSON.stringify({ error: `Webflow API error: ${propertiesRes.statusText}` }) };
    }
    const propertiesData = await propertiesRes.json();
    let items = propertiesData.items || [];
    
    // Server-side filtering logic
    const filteredItems = items.filter(item => {
      const { fieldData } = item;
      const {
          'kategorie': kategorieId, 
          'immobilientyp': immobilientypId,
          'lage-wien-2': lageWienId,
          'lage-umgebung': lageUmgebung,
          ausstattung,
          'anzahl-von-zimmern': zimmer,
          'quadratmeter': wohnflaeche,
          'preis': kaufpreis,
          'mietpreis': mietpreis,
      } = fieldData;

      // Filter by 'vermarktungsart'
      if (queryStringParameters['vermarktungsart']) {
          const propertyKategorieName = kategorieIdToNameMap[kategorieId]?.toLowerCase().trim();
          const filterValue = queryStringParameters['vermarktungsart'].toLowerCase().trim();
          if (!propertyKategorieName || propertyKategorieName !== filterValue) return false;
      }

      // Filter by 'objektart'
      if (queryStringParameters['objektart']) {
        const selectedObjektart = queryStringParameters['objektart'].split(',');
        const propertyImmobilientypName = immobilientypIdToNameMap[immobilientypId];
        if (!propertyImmobilientypName || !selectedObjektart.includes(propertyImmobilientypName)) return false;
      }

      // Filter by 'lage'
      if (queryStringParameters['lage']) {
        const selectedLage = queryStringParameters['lage'].split(',');
        const propertyLageWienName = lageWienIdToNameMap[lageWienId];
        const hasMatchingWienLage = propertyLageWienName && selectedLage.includes(propertyLageWienName);
        const hasMatchingUmgebungLage = lageUmgebung && selectedLage.includes(lageUmgebung);
        if (!hasMatchingWienLage && !hasMatchingUmgebungLage) return false;
      }

      // Filter by 'ausstattung'
      if (queryStringParameters['ausstattung']) {
        const selectedAusstattungNames = queryStringParameters['ausstattung'].split(',');
        const selectedAusstattungIds = selectedAusstattungNames
          .map(name => Object.keys(ausstattungIdToNameMap).find(key => ausstattungIdToNameMap[key] === name))
          .filter(Boolean);
        const propertyAusstattungIds = ausstattung?.map(a => a.id) || [];
        const matches = selectedAusstattungIds.every(id => propertyAusstattungIds.includes(id));
        if (!matches) return false;
      }
      
      // Filter by numeric fields (Numbers)
      const propertyPrice = (kategorieIdToNameMap[kategorieId] === 'Miete') ? mietpreis : kaufpreis;

      if (queryStringParameters['zimmer-min'] && zimmer < parseInt(queryStringParameters['zimmer-min'])) return false;
      if (queryStringParameters['zimmer-max'] && zimmer > parseInt(queryStringParameters['zimmer-max'])) return false;
      if (queryStringParameters['wohnflaeche-min'] && wohnflaeche < parseInt(queryStringParameters['wohnflaeche-min'])) return false;
      if (queryStringParameters['wohnflaeche-max'] && wohnflaeche > parseInt(queryStringParameters['wohnflaeche-max'])) return false;
      if (queryStringParameters['preis-min'] && propertyPrice < parseInt(queryStringParameters['preis-min'])) return false;
      if (queryStringParameters['preis-max'] && propertyPrice > parseInt(queryStringParameters['preis-max'])) return false;

      return true;
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