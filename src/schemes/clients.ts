import z from 'zod'
import { address, coordinates } from '@/schemes/general'

export const clientScheme = z.object({
  clientId: z.number().optional(),
  clientFirstName: z.string(),
  clientLastName: z.string(),
  clientDocument: z.number(),
  clientEmail: z.string().email(),
  clientAddress: address,
  clientCoordinates: coordinates,
  createdAt: z.string().optional()
})

export const validateClient = (value: typeof clientScheme) => {
  return clientScheme.safeParse(value)
}

export const validatePartialClient = (value: typeof clientScheme) => {
  return clientScheme.partial().safeParse(value)
}
