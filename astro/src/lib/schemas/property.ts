import { z } from 'zod'

export const PropertySchema = z.object({
  _id: z.string(),
  title: z.string(),
  propertyType: z.enum(['apartment', 'house', 'commercial']),
  description: z.string().optional(),
  type: z.enum(['Miete', 'Kauf']),
  price: z.number().optional(),
  address: z.string().optional(),
  rooms: z.number().optional(),
  floor: z.string().optional(),
  yearBuilt: z.number().optional(),
  energyCertificate: z.enum(['A', 'B', 'C', 'D']).optional(),
  ausstattung: z.array(z.string()).optional(),
  location: z.string().optional(),
  nearbyAmenities: z.array(z.string()).optional(),
  livingArea: z.number().optional(),
  plotSize: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  garden: z.boolean().optional(),
  garage: z.boolean().optional(),
  mainImage: z.object({
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  }).optional(),
  additionalImages: z.array(z.object({
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  })).optional(),
  videoLink: z.string().url().optional(),
  agentName: z.string().optional(),
  agentPhone: z.string().optional(),
  agentEmail: z.string().optional(),
})

export type Property = z.infer<typeof PropertySchema>
