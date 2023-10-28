import z from 'zod'

export const blacklistScheme = z.object({
  clientId: z.string(),
  reason: z.string(),
  createdBy: z.string()
})

export const validateBlacklist = (value: typeof blacklistScheme) => {
  return blacklistScheme.safeParse(value)
}

export const validatePartialBlacklist = (value: typeof blacklistScheme) => {
  return blacklistScheme.partial().safeParse(value)
}
