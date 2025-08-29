// netlify/functions/get-properties.js

import 'dotenv/config';
import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { 
      WEBFLOW_API_KEY, 
      WEBFLOW_PROPERTIES_COLLECTION_ID, 
      KATEGORIE_COLLECTION_ID,
      AUSSTATTUNG_COLLECTION_ID
    } = process.env;

    if (!WEBFLOW_API_KEY || !WEBFLOW_PROPERTIES_COLLECTION_ID || !KATEGORIE_COLLECTION_ID || !AUSSTATTUNG_COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables' }),
      };
    }
    
    // --- Step 1: Fetch all necessary collection data for mapping ---
    let kategorieIdToNameMap = {};
    let ausstattungIdToNameMap = {};
    let immobilientypIdToNameMap = {};
    let lageWienIdToNameMap = {};

    // Fetch the main properties collection schema to get options
    const propertiesSchemaRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    const propertiesSchemaData = await propertiesSchemaRes.json();
    
    // Find option fields in the schema and create lookup maps
    const immobilientypField = propertiesSchemaData.fields.find(f => f.slug === 'immobilientyp');
    if (immobilientypField) {
        immobilientypIdToNameMap = immobilientypField.validations.options.reduce((map, opt) => {
            map[opt.id] = opt.name;
            return map;
        }, {});
    }

    const lageWienField = propertiesSchemaData.fields.find(f => f.slug === 'lage-wien-2');
    if (lageWienField) {
        lageWienIdToNameMap = lageWienField.validations.options.reduce((map, opt) => {
            map[opt.id] = opt.name;
            return map;
        }, {});
    }

    // Fetch and map the Kategorie (Reference) collection
    const kategorieRes = await fetch(`https://api.webflow.com/v2/collections/${KATEGORIE_COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    const kategorieData = await kategorieRes.json();
    kategorieIdToNameMap = kategorieData.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});

    // Fetch and map the Ausstattung (Multi-Reference) collection
    const ausstattungRes = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    const ausstattungData = await ausstattungRes.json();
    ausstattungIdToNameMap = ausstattungData.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
    
    // --- Step 2: Fetch all properties ---
    const { queryStringParameters } = event;
    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    if (!propertiesRes.ok) {
      return { statusCode: propertiesRes.status, body: JSON.stringify({ error: `Webflow API error: ${propertiesRes.statusText}` }) };
    }
    const propertiesData = await propertiesRes.json();
    const items = propertiesData.items || [];
    
    // --- Step 3: Filter properties using the created maps ---
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

      // Filter by 'objektart' (now using the map created from the schema)
      if (queryStringParameters['objektart']) {
        const selectedObjektart = queryStringParameters['objektart'].split(',');
        const propertyImmobilientypName = immobilientypIdToNameMap[immobilientypId];
        if (!propertyImmobilientypName || !selectedObjektart.includes(propertyImmobilientypName)) return false;
      }

      // Filter by 'lage' (now using the map created from the schema)
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
        const ausstattungNameToIdMap = Object.keys(ausstattungIdToNameMap).reduce((map, id) => {
            map[ausstattungIdToNameMap[id]] = id;
            return map;
        }, {});
        const selectedAusstattungIds = selectedAusstattungNames.map(name => ausstattungNameToIdMap[name]).filter(Boolean);
        const propertyAusstattungIds = ausstattung ? ausstattung.map(a => a.id) : [];
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