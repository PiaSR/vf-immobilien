// ausstattung.js

import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Ausstattung',
  name: 'ausstattung',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
  ],
})