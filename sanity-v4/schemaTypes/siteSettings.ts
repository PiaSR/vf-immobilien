// schemaTypes/siteSettings.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Website Title',
      type: 'string',
      description: 'The name of your website',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Website Description',
      type: 'text',
      description: 'For SEO and social sharing'
    }),
    defineField({
      name: 'logo',
      title: 'Website Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' }
          ]
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings' // Always shows this title in the CMS
      }
    }
  }
})