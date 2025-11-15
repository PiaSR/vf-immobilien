// agent.js

import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Makler',
  name: 'agent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'agentImage',
      title: 'Maklerfoto',
      type: 'image',
    }),
  ],
})