import z from 'zod'
import { coordinatesScheme } from '@/schemes/general'
import zodParseError from '@/utils/zodParseError'
import { ValidationError } from '@/errors/validationError'

export const coverageAreaScheme = z.object({
  name: z.string(),
  province: z.string(),
  service: z.string(),
  plansName: z.array(z.string()),
  additionalsName: z.array(z.string()),
  location: coordinatesScheme,
  range: z.array(coordinatesScheme),
  createdBy: z.string()
})

export const validateCoverangeArea = (value: typeof coverageAreaScheme) => {
  const result = coverageAreaScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialCoverangeArea = (value: typeof coverageAreaScheme) => {
  const result = coverageAreaScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
