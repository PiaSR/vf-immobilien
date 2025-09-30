import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Defines the schema for a single Office Contact Details document.
 * This is designed as a 'singleton' document.
 */
export default defineType({
  // The name used in the API and internally
  name: 'officeDetails',
  
  // The label displayed in the Sanity Studio
  title: 'Büro Kontaktdetails',
  
  // Defines it as a document type
  type: 'document',
  
  // Configuration to make it a conceptual singleton
  __experimental_actions: ['update', 'publish'],

  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(), // Basic validation for email format
      description: 'e.g., office@yourdomain.at',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., +43 1 123 45 67',
    }),
    defineField({
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., Hauptstraße 10',
    }),
    defineField({
      name: 'cityPostal',
      title: 'City and Postal Code',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., 1140 Wien, Österreich',
    }),
    
    // --- Office Times (Structured Array) ---
    defineField({
      name: 'officeHours',
      title: 'Regular Office Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dayRange',
          fields: [
            defineField({
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'e.g., Montag - Donnerstag or Freitag',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time Range',
              type: 'string',
              description: 'e.g., 9:00 - 16:00 or 9:00 - 12:00',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              days: 'days',
              time: 'time',
            },
            prepare(selection) {
              const {days, time} = selection;
              return {
                title: `${days}: ${time}`,
              }
            }
          }
        }),
      ],
      description: 'Add each block of office hours (e.g., Mon-Thu, Fri).',
    }),
    
    // --- Additional Information ---
    defineField({
      name: 'additionalInfo',
      title: 'Additional Appointment Info',
      type: 'string',
      rows: 2, // Hint that it might be a small block of text
      description: 'e.g., Termin nach telefonischer Vereinbarung erbeten.',
    }),
  ],
});