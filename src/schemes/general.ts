import z from 'zod'

export const address = z.object({
  province: z.string(),
  neighborhood: z.string(),
  direction: z.string()
})

export const coordinates = z.object({
  lat: z.number(),
  lng: z.number()
})
