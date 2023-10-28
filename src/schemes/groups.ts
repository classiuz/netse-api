import z from 'zod'

export const groupsScheme = z.object({
  name: z.string(),
  towers: z.string()
})

export const validateGroup = (value: typeof groupsScheme) => {
  return groupsScheme.safeParse(value)
}

export const validatePartialGroup = (value: typeof groupsScheme) => {
  return groupsScheme.partial().safeParse(value)
}
