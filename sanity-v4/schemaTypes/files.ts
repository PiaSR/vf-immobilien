import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'documentItem',
  title: 'Dokumente zum Download',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Document Titel',
      type: 'string',
      description: 'The title that will be displayed on the website (e.g., "Mietvertrag Muster")',
      validation: (Rule) => Rule.required(), 
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file', // Sanity's built-in type for file uploads
      description: 'Upload the PDF document here.',
      options: {
        // Restrict accepted file types to ensure only PDFs are uploaded
        accept: 'application/pdf', 
      },
      validation: (Rule) => Rule.required(),
    }),
   
  ],
  
  preview: {
    select: {
      title: 'title',
      
    },
  },
});