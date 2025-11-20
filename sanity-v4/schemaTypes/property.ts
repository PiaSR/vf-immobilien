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
description: 'Interner Titel'
      }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Externer Titel - wird in Objektanzeige verwendet.'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Auf "Generate" klicken.'
      
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
      name: 'availableDate',
      title: 'Verfügbar ab DATUM',
      type: 'string',
      description: "Entweder 'Sofort' oder Datum eingeben (z.B. 1. Jänner 2026)"
      // This is a `Switch` field in Webflow with slug 'verfugbar'
    }),
   

    // Location Details
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      description: 'Interne Info, gesamte Address (z.B. 12/5 Haupstrasse, 1020 Wien)'

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
      description: 'Wenn Objekt nicht in Wien - Ort eingeben (z.B. Perchtoldsdorf)'

    }),
    defineField({
      name: 'postalCodeSurrounding',
      title: 'Lage - Postleitzahl (Umgebung)',
      type: 'number',
      description: 'Wenn Objekt nicht in Wien - PLZ eingeben (z.B. 2453)'
    }),
    defineField({
      name: 'suburb',
      title: 'Grätzl',
      type: 'string',
      description: 'Notwending für Google Maps - Grätzl oder Wien (Umbgebung) Ort eingeben'
    }),

    // Property Details
    defineField({
      name: 'purchasePrice',
      title: 'Kaufpreis',
      type: 'number',
      description: 'Kaufpreis wenn Objekt zum Verkauf (Mietpreis Feld leer lassen)'
    }),
    defineField({
      name: 'rentalPrice',
      title: 'Mietpreis',
      type: 'number',
      description: 'Mietpreis wenn Objekt zur Miete (Kaufpreis Feld leer lassen)'
    }),
    defineField({
      name: 'livingArea',
      title: 'Wohnfläche',
      type: 'number',
      
    }),
    defineField({
      name: 'useableArea',
      title: 'Nutzfläche',
      type: 'number',
      
    }),
    defineField({
      name: 'rooms',
      title: 'Zimmeranzahl',
      type: 'number',
      
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bäderanzahl',
      type: 'number',
      
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Baujahr',
      type: 'string',
      
    }),
    defineField({
      name: 'floor',
      title: 'Stockwerk',
      type: 'string',
      description: 'Zahl oder Buchstaben eingeben (z.B. "4" oder "DG" oder "Dachgeschoss")'
    }),
    
    defineField({
      name: 'betriebskosten',
      title: 'Betriebskosten (inkl. USt.)',
      type: 'number',
      description: 'z.B., 107.45',
  }),
  defineField({
    name: 'heizkosten',
    title: 'Heizkosten (inkl. USt.)',
    type: 'number',
    description: 'z.B., 107.45',
}),
  defineField({
      name: 'provision',
      title: 'Provision',
      type: 'string', 
  }),
  defineField({
      name: 'hwb',
      title: 'Heizwärmebedarf (HWB)',
      type: 'string', 
      description: 'Nummer plus kWh/m² schreiben, e.g. 34,2 kWh/m²'
  }),
 
  defineField({
      name: 'gee',
      title: 'Gesamtenergieeffizienz-Faktor (fGEE)',
      type: 'string', 
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
        {title: 'E', value: 'E'},
        {title: 'F', value: 'F'},
        {title: 'G', value: 'G'},
      ],
    },
  }),
  // Loggia/Balcony details
  defineField({
    name: 'outdoorArea',
    title: 'Aussenfläche (optional)',
    type: 'number', 
    description: 'Nur die Zahl eingeben (ohne m²)'
  }),

  // Status Tags
  defineField({
    name: 'isFullyFurnished',
    title: 'Voll möbliert?',
    type: 'boolean',
  }),

    // Amenities and Public Transport
    defineField({
      name: 'ausstattung',
      title: 'Ausstattung',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ausstattung'}]}],
      
    }),
  
    defineField({
      name: 'propertyDescription',
      title: 'Wohnung - Beschreibung',
      type: 'text',
      
    }),
    defineField({
      name: 'locationDescription',
      title: 'Lage - Beschreibung',
      type: 'text',
      
    }),
    defineField({
      name: 'ausstattungDetails',
      title: 'Ausstattung (Detailierte Beschreibung / Bullet Points)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}], // Allow bullet points
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      description: 'Auflistung von Ausstattungsmerkmalen mit Bulletpoints (z.B. - Vollausgestattete Einbauküche).',
    }),


  
    // Images
    defineField({
      name: 'mainImage',
      title: 'Titelfoto',
      type: 'image',
      
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [{type: 'image'}],
      
    }),
    
 
    defineField({
      name: 'floorPlan',
      title: 'Grundriss',
      type: 'image',
      
    }),

    // Agent Information
    defineField({
      name: 'agent',
      title: 'Makler',
      type: 'reference',
      to: [{type: 'agent'}],
      
    }),

    
  ],
})