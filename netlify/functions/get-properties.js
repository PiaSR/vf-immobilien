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

    if (!WEBFLOW_API_KEY || !WEBFLOW_PROPERTIES_COLLECTION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing core environment variables (WEBFLOW_API_KEY or WEBFLOW_PROPERTIES_COLLECTION_ID)' }),
      };
    }
    
    let kategorieIdToNameMap = {};
    let ausstattungIdToNameMap = {};
    let immobilientypIdToNameMap = {};
    let lageWienIdToNameMap = {};

    // Fetch the main properties collection schema to get options
    try {
        const propertiesSchemaRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}`, {
            headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
        });
        const propertiesSchemaData = await propertiesSchemaRes.json();
        
        const immobilientypField = propertiesSchemaData.fields.find(f => f.slug === 'immobilientyp');
        if (immobilientypField?.validations?.options) {
            immobilientypIdToNameMap = immobilientypField.validations.options.reduce((map, opt) => {
                map[opt.id] = opt.name;
                return map;
            }, {});
        }

        const lageWienField = propertiesSchemaData.fields.find(f => f.slug === 'lage-wien-2');
        if (lageWienField?.validations?.options) {
            lageWienIdToNameMap = lageWienField.validations.options.reduce((map, opt) => {
                map[opt.id] = opt.name;
                return map;
            }, {});
        }
    } catch (err) {
        console.error('Failed to fetch properties schema:', err);
    }

    // Fetch and map the Kategorie (Reference) collection
    if (KATEGORIE_COLLECTION_ID) {
        try {
            const kategorieRes = await fetch(`https://api.webflow.com/v2/collections/${KATEGORIE_COLLECTION_ID}/items`, {
                headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
            });
            const kategorieData = await kategorieRes.json();
            kategorieIdToNameMap = kategorieData.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
        } catch (err) {
            console.error('Failed to fetch Kategorie collection:', err);
        }
    }

    // Fetch and map the Ausstattung (Multi-Reference) collection
    if (AUSSTATTUNG_COLLECTION_ID) {
        try {
            const ausstattungRes = await fetch(`https://api.webflow.com/v2/collections/${AUSSTATTUNG_COLLECTION_ID}/items`, {
                headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
            });
            const ausstattungData = await ausstattungRes.json();
            ausstattungIdToNameMap = ausstattungData.items.reduce((map, item) => { map[item.id] = item.fieldData.name; return map; }, {});
        } catch (err) {
            console.error('Failed to fetch Ausstattung collection:', err);
        }
    }
    
    const { queryStringParameters } = event;

    const propertiesRes = await fetch(`https://api.webflow.com/v2/collections/${WEBFLOW_PROPERTIES_COLLECTION_ID}/items?limit=100`, {
      headers: { Authorization: `Bearer ${WEBFLOW_API_KEY}`, 'accept-version': 'v2' },
    });
    if (!propertiesRes.ok) {
      return { statusCode: propertiesRes.status, body: JSON.stringify({ error: `Webflow API error: ${propertiesRes.statusText}` }) };
    }
    const propertiesData = await propertiesRes.json();
    const items = propertiesData.items || [];
    
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

      if (queryStringParameters['vermarktungsart']) {
          const propertyKategorieName = kategorieIdToNameMap[kategorieId]?.toLowerCase().trim();
          const filterValue = queryStringParameters['vermarktungsart'].toLowerCase().trim();
          if (!propertyKategorieName || propertyKategorieName !== filterValue) return false;
      }

      if (queryStringParameters['objektart']) {
        const selectedObjektart = queryStringParameters['objektart'].split(',');
        const propertyImmobilientypName = immobilientypIdToNameMap[immobilientypId];
        if (!propertyImmobilientypName || !selectedObjektart.includes(propertyImmobilientypName)) return false;
      }

      if (queryStringParameters['lage']) {
        const selectedLage = queryStringParameters['lage'].split(',');
        const propertyLageWienName = lageWienIdToNameMap[lageWienId];
        const hasMatchingWienLage = propertyLageWienName && selectedLage.includes(propertyLageWienName);
        const hasMatchingUmgebungLage = lageUmgebung && selectedLage.includes(lageUmgebung);
        if (!hasMatchingWienLage && !hasMatchingUmgebungLage) return false;
      }

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