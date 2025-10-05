// netlify/functions/get-properties.js

import 'dotenv/config';
import { createClient } from '@sanity/client'; 

// Initialize Sanity Client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, 
  useCdn: true, 
  apiVersion: '2023-01-01',
});

// Helper to build the GROQ filter string
const buildGroqFilter = (params) => {
    let filters = ['_type == "property"', 'available == true']; // Only show available properties
    
    // 1. Vermarktungsart (Category)
    if (params['vermarktungsart']) {
        const type = params['vermarktungsart'].toLowerCase(); // 'miete' or 'kauf'
        // Assumes 'category' document has a 'slug' field matching 'miete' or 'kauf'
        filters.push(`marketingType->slug.current == "${type}"`);
    }

    // 2. Objektart (Property Type - supports multiple selection)
    if (params['objektart']) {
        const types = params['objektart'].split(',').map(t => t.trim());
        // Match propertyType (string field) against selected types (case-sensitive as per schema)
        filters.push(`propertyType in [${types.map(t => `"${t}"`).join(', ')}]`);
    }
    
    // 3. Ort / Lage (Location - supports multiple selection)
    if (params['lage']) {
        const locations = params['lage'].split(',').map(l => l.trim());
        // Match if locationVienna OR locationSurrounding is one of the selected locations
        const locationFilters = locations.map(l => `locationVienna == "${l}" || locationSurrounding == "${l}"`);
        filters.push(`(${locationFilters.join(' || ')})`);
    }

    // 4. Ausstattung (Amenities - Multi-reference)
    if (params['ausstattung']) {
        const amenities = params['ausstattung'].split(',').map(a => a.trim());
        // Match if the property has ALL of the selected amenities
        // Assumes 'ausstattung' document has a 'title' that matches the amenity name exactly
        filters.push(`count(ausstattung[]->title[@in [${amenities.map(a => `"${a}"`).join(', ')}]]) == ${amenities.length}`);
    }

    // 5. Größe (Zimmer / Fläche)
    if (params['zimmer-min']) {
        filters.push(`rooms >= ${parseInt(params['zimmer-min'])}`);
    }
    if (params['zimmer-max']) {
        filters.push(`rooms <= ${parseInt(params['zimmer-max'])}`);
    }
    if (params['flaeche-min']) {
        filters.push(`livingArea >= ${parseInt(params['flaeche-min'])}`);
    }
    if (params['flaeche-max']) {
        filters.push(`livingArea <= ${parseInt(params['flaeche-max'])}`);
    }
    
    // 6. Preis
    const minPrice = params['preis-min'] ? parseInt(params['preis-min']) : null;
    const maxPrice = params['preis-max'] ? parseInt(params['preis-max']) : null;

    if (minPrice || maxPrice) {
        // Price check must be dynamic based on the marketing type in the property document itself
        const priceChecks = [];

        // Purchase Price Check (for 'Kauf' category)
        if (minPrice) priceChecks.push(`(marketingType->title == "Kauf" && purchasePrice >= ${minPrice})`);
        if (maxPrice) priceChecks.push(`(marketingType->title == "Kauf" && purchasePrice <= ${maxPrice})`);
        
        // Rental Price Check (for 'Miete' category)
        if (minPrice) priceChecks.push(`(marketingType->title == "Miete" && rentalPrice >= ${minPrice})`);
        if (maxPrice) priceChecks.push(`(marketingType->title == "Miete" && rentalPrice <= ${maxPrice})`);

        // If no price filter is provided, simply skip this logic
        if (priceChecks.length > 0) {
            filters.push(`(${priceChecks.join(' || ')})`);
        }
    }
    
    return filters.map(f => `(${f})`).join(' && ');
};

export const handler = async (event) => {
  try {
    if (!process.env.SANITY_PROJECT_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing SANITY_PROJECT_ID environment variable.' }),
      };
    }
    
    const { queryStringParameters } = event;

    // --- 1. Fetch Filter Options (For client-side use, if needed, but mainly for validation/logic) ---
    // NOTE: This step is optional if the client-side form is updated to fetch this data itself.
    // However, fetching this data here confirms we have necessary context for validation.
    
    const optionsQuery = `{
        "propertyTypes": *[_type == "property"][0].propertyType.options.list[].value,
        "ausstattung": *[_type == "ausstattung"].title,
        "categories": *[_type == "category"].slug.current,
        // Since districts are hardcoded in the schema, you can get them via:
        "viennaDistricts": *[_type == "property"][0].locationVienna.options.list[].value
    }`;

    // const options = await sanityClient.fetch(optionsQuery);
    // You can use the 'options' object here to validate incoming 'queryStringParameters'

    // --- 2. Fetch Filtered Properties ---
    
    const filter = buildGroqFilter(queryStringParameters);

    // Define the GROQ projection
    const projection = `{
      _id,
      title,
      'slug': slug.current,
      'marketingType': marketingType->title,
      'propertyType': propertyType,
      'location': select(defined(locationVienna) => locationVienna, locationSurrounding), // Combine location fields
      livingArea,
      rooms,
      'price': select(marketingType->title == "Kauf" => purchasePrice, rentalPrice),
      'mainImage': mainImage.asset->url,
    }`;
    
    // Final GROQ query for the filtered properties
    const query = `*[${filter}]${projection}`;
    
    const items = await sanityClient.fetch(query);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }), 
    };
  } catch (err) {
    console.error('Error in main function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Server error' }),
    };
  }
};