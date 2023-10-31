import z from 'zod'
import { coordinatesScheme } from '@/schemes/general'

export const coverageAreaScheme = z.object({
  name: z.string(),
  province: z.string(),
  service: z.string(),
  range: z.array(coordinatesScheme),
  plansId: z.array(z.number()),
  additionalsId: z.array(z.number()),
  createdBy: z.string()
})

export const validateCoverangeArea = (value: typeof coverageAreaScheme) => {
  return coverageAreaScheme.safeParse(value)
}

export const validatePartialCoverangeArea = (value: typeof coverageAreaScheme) => {
  return coverageAreaScheme.partial().safeParse(value)
}
