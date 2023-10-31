import z from 'zod'

export const additionalScheme = z.object({
  name: z.string(),
  price: z.string(),
  service: z.string(),
  createdBy: z.string()
})

export const validatePlan = (value: typeof additionalScheme) => {
  return additionalScheme.safeParse(value)
}

export const validatePartialPlan = (value: typeof additionalScheme) => {
  return additionalScheme.partial().safeParse(value)
}
