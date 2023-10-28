import z from 'zod'

export const plansScheme = z.object({
  name: z.string(),
  price: z.string(),
  group: z.string()
})

export const validatePlan = (value: typeof plansScheme) => {
  return plansScheme.safeParse(value)
}

export const validatePartialPlan = (value: typeof plansScheme) => {
  return plansScheme.partial().safeParse(value)
}
