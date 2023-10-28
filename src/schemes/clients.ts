import z from 'zod'
import { address, coordinates } from '@/schemes/general'

export const clientScheme = z.object({
  firstName: z.string(),
  lastName: z.string(),
  document: z.number(),
  email: z.string().email(),
  address,
  coordinates
})

export const validateClient = (value: typeof clientScheme) => {
  return clientScheme.safeParse(value)
}

export const validatePartialClient = (value: typeof clientScheme) => {
  return clientScheme.partial().safeParse(value)
}
