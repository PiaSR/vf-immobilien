// publicTransport.js

import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Öffentliche Anbindung',
  name: 'publicTransport',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
  ],
})