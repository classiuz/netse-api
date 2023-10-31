import z from 'zod'

export const addressScheme = z.object({
  province: z.string(),
  neighborhood: z.string(),
  direction: z.string()
})

export const coordinatesScheme = z.object({
  lat: z.number(),
  lng: z.number()
})
