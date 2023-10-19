import z from 'zod'

export const usersScheme = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const validateUser = (value: typeof usersScheme) => {
  return usersScheme.safeParse(value)
}

export const validatePartialUser = (value: typeof usersScheme) => {
  return usersScheme.partial().safeParse(value)
}
