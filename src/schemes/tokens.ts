import z from 'zod'

export const tokenScheme = z.object({
  name: z.string(),
  createdBy: z.string()
})

export const validateToken = (value: typeof tokenScheme) => {
  return tokenScheme.safeParse(value)
}

export const validatePartialToken = (value: typeof tokenScheme) => {
  return tokenScheme.partial().safeParse(value)
}
