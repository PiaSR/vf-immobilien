// src/lib/sanity.ts
import { createClient, type SanityClient } from '@sanity/client'

export const client: SanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: true
})