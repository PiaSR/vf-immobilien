import { sanityClient } from "../../lib/sanityClient";
import type { APIRoute } from "astro";

// --- Utility function to build the GROQ filter string ---
// This function now expects filter data to come from a FormData object (from the POST body)
const buildGroqFilter = (formData: FormData): string => {
  const filters: string[] = [];
  
  // Create a new URLSearchParams object from the FormData for consistent parameter access
  const params = new URLSearchParams(formData as any);
  
  // CRITICAL LOG: Log the raw form data for verification within the utility
  console.log('--- RAW POST BODY FORM DATA (In Utility):', params.toString(), '---');
  
  // 1. LOCATION (lage) Filter
  const lage = params.getAll("lage").filter(l => l.length > 0);
  if (lage.length > 0) {
    const viennaLocations = lage.filter(l => l.includes('. '));
    const surroundingLocations = lage.filter(l => !l.includes('. '));
    const locationFilters: string[] = [];
    
    if (viennaLocations.length > 0) {
        const quotedLocations = viennaLocations.map(l => `"${l}"`).join(', ');
        locationFilters.push(`locationVienna in [${quotedLocations}]`);
    }
    if (surroundingLocations.length > 0) {
        const quotedSurrounding = surroundingLocations.map(l => `"${l}"`).join(', ');
        locationFilters.push(`locationSurrounding in [${quotedSurrounding}]`);
    }

    if (locationFilters.length > 0) {
        filters.push(`(${locationFilters.join(" || ")})`);
    }
  }

  // 2. MARKETING TYPE (vermarktungsart) Filter & Conditional PRICE Filters
  const marketingType = params.get("vermarktungsart");
  
  // Log the marketing type value the server sees
  console.log('--- MARKETING TYPE RAW VALUE (from POST body):', marketingType, '---'); 
  
  if (marketingType && marketingType.length > 0) {
      const marketTitle = marketingType === 'miete' ? 'Miete' : 'Kauf';
      filters.push(`(defined(marketingType) && marketingType->title == "${marketTitle}")`); 

      // PRICE (preis) Filters (Checking against lowercase URL values)
      if (marketingType === 'kauf') {
          const preisKaufMin = params.get("preis-kauf-min");
          const preisKaufMax = params.get("preis-kauf-max");
          if (preisKaufMin && preisKaufMin.length > 0 && !isNaN(Number(preisKaufMin))) {
              filters.push(`purchasePrice >= ${preisKaufMin}`);
          }
          if (preisKaufMax && preisKaufMax.length > 0 && !isNaN(Number(preisKaufMax))) {
              filters.push(`purchasePrice <= ${preisKaufMax}`);
          }
      } else if (marketingType === 'miete') {
          const preisMieteMin = params.get("preis-miete-min");
          const preisMieteMax = params.get("preis-miete-max");
          if (preisMieteMin && preisMieteMin.length > 0 && !isNaN(Number(preisMieteMin))) {
              filters.push(`rentalPrice >= ${preisMieteMin}`);
          }
          if (preisMieteMax && preisMieteMax.length > 0 && !isNaN(Number(preisMieteMax))) {
              filters.push(`rentalPrice <= ${preisMieteMax}`);
          }
      }
  }
  
  // 3. OBJECT TYPE (objektart) Filter
  const objektart = params.getAll("objektart").filter(t => t.length > 0);
  if (objektart.length > 0) {
      const quotedTypes = objektart.map(t => `"${t}"`).join(', ');
      // Assuming 'propertyType' is the GROQ field name for the property type reference
      filters.push(`propertyType->title in [${quotedTypes}]`);
  }

  // 4. SIZE (groesse) Filters
  const zimmerMin = params.get("zimmer-min");
  const zimmerMax = params.get("zimmer-max");
  if (zimmerMin && zimmerMin.length > 0 && !isNaN(Number(zimmerMin))) { filters.push(`rooms >= ${zimmerMin}`); }
  if (zimmerMax && zimmerMax.length > 0 && !isNaN(Number(zimmerMax))) { filters.push(`rooms <= ${zimmerMax}`); }

  const flaecheMin = params.get("flaeche-min");
  const flaecheMax = params.get("flaeche-max");
  if (flaecheMin && flaecheMin.length > 0 && !isNaN(Number(flaecheMin))) { filters.push(`livingArea >= ${flaecheMin}`); }
  if (flaecheMax && flaecheMax.length > 0 && !isNaN(Number(flaecheMax))) { filters.push(`livingArea <= ${flaecheMax}`); }
  
  // 5. AMENITIES (ausstattung) Filter
  const ausstattung = params.getAll("ausstattung").filter(a => a.length > 0);
  if (ausstattung.length > 0) {
      const quotedAmenities = ausstattung.map(a => `"${a}"`).join(', ');
      filters.push(`count(ausstattung[]->title[@ in [${quotedAmenities}]]) == ${ausstattung.length}`);
  }

  // DEBUG: Final check on the filter array
  console.log('--- FINAL FILTERS ARRAY LENGTH:', filters.length, '---');
  
  return filters.join(" && ");
};

// --- Astro API Route Handler (MUST be POST to match client) ---
export const POST: APIRoute = async ({ request }) => {
  // CRITICAL: Read the FormData object from the POST request body
  const formData = await request.formData();
  
  const filterString = buildGroqFilter(formData);

  const query = `
    *[_type == "property" ${filterString ? '&& ' + filterString : ''}] | order(title asc) {
      "slug": slug.current,
      title,
      "marketingType": marketingType->title, 
      purchasePrice,
      rentalPrice,
      livingArea,
      rooms, 
      "price": coalesce(
        select(
          marketingType->title == "Miete" => rentalPrice, 
          marketingType->title == "Kauf" => purchasePrice
        ),
        rentalPrice,
        purchasePrice
      ),
      "imageUrl": mainImage.asset->url,
      "location": coalesce(locationVienna, locationSurrounding),
      "amenitiesList": ausstattung[]->title 
    }
  `;

  console.log('--- EXECUTING GROQ QUERY ---');
  console.log(query);
  console.log('--- FILTER STRING:', filterString, '---'); // Show the computed filter string
  console.log('------------------------------');

  try {
    const properties = await sanityClient.fetch(query);
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GROQ Filter Error:", error);
    return new Response(JSON.stringify({ 
        error: "Failed to fetch filtered properties. Check console for details.", 
        query: query,
        filterString: filterString
    }), {
      status: 500,
    });
  }
};
