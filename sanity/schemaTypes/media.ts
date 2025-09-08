import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'image title',
      type: 'string',
      description: 'The name of your website',
      validation: Rule => Rule.required()
    })]
})