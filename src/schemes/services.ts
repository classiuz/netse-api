import z from 'zod'

export const servicesScheme = z.object({
  name: z.string(),
  alternativeName: z.string(),
  createdBy: z.string()
})

export const validateService = (value: typeof servicesScheme) => {
  return servicesScheme.safeParse(value)
}

export const validatePartialService = (value: typeof servicesScheme) => {
  return servicesScheme.partial().safeParse(value)
}
