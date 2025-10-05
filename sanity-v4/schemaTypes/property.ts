// property.js

import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Immobilie',
  name: 'property',
  type: 'document',
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Titel von Inserat',
      type: 'string',
      // The `slug` from Webflow is 'titel-von-inserat'
    }),
    defineField({
      name: 'propertyType',
      title: 'Objektart',
      type: 'string',
      options: {
        list: [
          {title: 'Wohnung', value: 'Wohnung'},
          {title: 'Haus', value: 'Haus'},
          {title: 'Grundstueck', value: 'Grundstueck'},
          {title: 'Parkplatz', value: 'Parkplatz'},
          {title: 'Gewerbeimmobilie', value: 'Gewerbeimmobilie'},
        ],
      },
    }),
    defineField({
      name: 'marketingType',
      title: 'Vermarktungsart',
      type: 'reference',
      to: [{type: 'category'}],
      // This is a `Reference` field in Webflow with slug 'kategorie'
    }),
    defineField({
      name: 'available',
      title: 'Verfügbar?',
      type: 'boolean',
      // This is a `Switch` field in Webflow with slug 'verfugbar'
    }),
    defineField({
      name: 'description',
      title: 'Wohnung - Beschreibung',
      type: 'text',
      // Webflow uses `RichText`, so `text` is a good match. `slug` is 'beschreibung'
    }),

    // Location Details
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      // The `slug` from Webflow is 'adresse'
    }),
    defineField({
      name: 'locationVienna',
      title: 'Lage (Wien)',
      type: 'string',
      options: {
        list: [
          {title: '1. Innere Stadt', value: '1. Innere Stadt'},
          {title: '2. Leopoldstadt', value: '2. Leopoldstadt'},
          {title: '3. Landstraße', value: '3. Landstraße'},
          {title: '4. Wieden', value: '4. Wieden'},
          {title: '5. Margareten', value: '5. Margareten'},
          {title: '6. Mariahilf', value: '6. Mariahilf'},
          {title: '7. Neubau', value: '7. Neubau'},
          {title: '8. Josefstadt', value: '8. Josefstadt'},
          {title: '9. Alsergrund', value: '9. Alsergrund'},
          {title: '10. Favoriten', value: '10. Favoriten'},
          {title: '11. Simmering', value: '11. Simmering'},
          {title: '12. Meidling', value: '12. Meidling'},
          {title: '13. Hietzing', value: '13. Hietzing'},
          {title: '14. Penzing', value: '14. Penzing'},
          {title: '15. Rudolfsheim-Fünfhaus', value: '15. Rudolfsheim-Fünfhaus'},
          {title: '16. Ottakring', value: '16. Ottakring'},
          {title: '17. Hernals', value: '17. Hernals'},
          {title: '18. Währing', value: '18. Währing'},
          {title: '19. Döbling', value: '19. Döbling'},
          {title: '20. Brigittenau', value: '20. Brigittenau'},
          {title: '21. Floridsdorf', value: '21. Floridsdorf'},
          {title: '22. Donaustadt', value: '22. Donaustadt'},
          {title: '23. Liesing', value: '23. Liesing'},
        ],
      },
      // The `slug` from Webflow is 'lage-wien-2'
    }),
    defineField({
      name: 'locationSurrounding',
      title: 'Lage (Umgebung)',
      type: 'string',
      // The `slug` from Webflow is 'lage-umgebung'
    }),
    defineField({
      name: 'postalCodeSurrounding',
      title: 'Lage - Postleitzahl (Umgebung)',
      type: 'number',
      // The `slug` from Webflow is 'lage---postleitzahl-umgebung'
    }),
    defineField({
      name: 'locationDescription',
      title: 'Lage - Beschreibung',
      type: 'text',
      // The `slug` from Webflow is 'lage---beschreibung'
    }),

    // Property Details
    defineField({
      name: 'purchasePrice',
      title: 'Kaufpreis',
      type: 'number',
      // The `slug` from Webflow is 'preis'
    }),
    defineField({
      name: 'rentalPrice',
      title: 'Mietpreis',
      type: 'number',
      // The `slug` from Webflow is 'mietpreis'
    }),
    defineField({
      name: 'livingArea',
      title: 'Wohnfläche',
      type: 'number',
      // The `slug` from Webflow is 'quadratmeter'
    }),
    defineField({
      name: 'rooms',
      title: 'Zimmeranzahl',
      type: 'number',
      // The `slug` from Webflow is 'anzahl-von-zimmern'
    }),
    defineField({
      name: 'bathrooms',
      title: 'Anzahl von Bädern',
      type: 'number',
      // The `slug` from Webflow is 'anzahl-von-badern'
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Baujahr',
      type: 'string',
      // The `slug` from Webflow is 'baujahr'
    }),
    defineField({
      name: 'floor',
      title: 'Stockwerk',
      type: 'string',
      // The `slug` from Webflow is 'stockwerk'
    }),
    defineField({
      name: 'energyCertificate',
      title: 'Energiezertifikat',
      type: 'string',
      options: {
        list: [
          {title: 'A', value: 'A'},
          {title: 'B', value: 'B'},
          {title: 'C', value: 'C'},
          {title: 'D', value: 'D'},
        ],
      },
      // The `slug` from Webflow is 'energiezertifikat'
    }),
    defineField({
      name: 'parking',
      title: 'Parkplatz',
      type: 'boolean',
      // The `slug` from Webflow is 'parkplatz'
    }),
    defineField({
      name: 'garden',
      title: 'Garten',
      type: 'boolean',
      // The `slug` from Webflow is 'garten'
    }),

    // Amenities and Public Transport
    defineField({
      name: 'ausstattung',
      title: 'Ausstattung',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ausstattung'}]}],
      // The `slug` from Webflow is 'ausstattung' and it's a `MultiReference` field
    }),
    defineField({
      name: 'publicTransport',
      title: 'Öffentliche Anbindung',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'publicTransport'}]}],
      // The `slug` from Webflow is 'offentliche-anbindung' and it's a `MultiReference` field
    }),

    // Images
    defineField({
      name: 'mainImage',
      title: 'Titelfoto',
      type: 'image',
      // The `slug` from Webflow is 'image-1' and it's a single `Image`
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [{type: 'image'}],
      // The `slug` from Webflow is 'fotos' and it's a `MultiImage` field
    }),
    defineField({
      name: 'floorPlan',
      title: 'Grundriss',
      type: 'image',
      // The `slug` from Webflow is 'grundriss' and it's a single `Image`
    }),

    // Agent Information
    defineField({
      name: 'agent',
      title: 'Makler',
      type: 'reference',
      to: [{type: 'agent'}],
      // The `slug` from Webflow is 'makler' and it's a `Reference` field
    }),

    // Sanity-specific fields for linking to Webflow
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      // The `slug` from Webflow is 'name'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      // The `slug` from Webflow is 'slug'
    }),
  ],
})