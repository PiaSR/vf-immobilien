// category.js

import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Vermarktungsart',
  name: 'category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
  ],
})