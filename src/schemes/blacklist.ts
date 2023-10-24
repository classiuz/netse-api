import z from 'zod'
import { address, coordinates } from '@/schemes/general'

export const blacklistScheme = z.object({
  document: z.number(),
  clientName: z.string(),
  email: z.string().email(),
  reason: z.string(),
  addedBy: z.string(),
  address,
  coordinates
})

export const validateBlacklist = (value: typeof blacklistScheme) => {
  return blacklistScheme.safeParse(value)
}

export const validatePartialBlacklist = (value: typeof blacklistScheme) => {
  return blacklistScheme.partial().safeParse(value)
}
