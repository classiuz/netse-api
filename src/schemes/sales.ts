import z from 'zod'
import { ValidationError } from '@/errors/validationError'
import zodParseError from '@/utils/zodParseError'
import { addressScheme, coordinatesScheme } from './general'

export const salesScheme = z.object({
  firstName: z.string(),
  lastName: z.string(),
  document: z.string(),
  phone: z.string(),
  alternativePhone: z.string().optional(),
  email: z.string().email(),
  address: addressScheme,
  coordinates: coordinatesScheme,
  service: z.string(),
  plan: z.string(),
  notes: z.string().optional(),
  status: z.string(),
  createdBy: z.string()
})

export const validateSales = (value: typeof salesScheme) => {
  const result = salesScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result.data
}

export const validatePartialSales = (value: typeof salesScheme) => {
  const result = salesScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result.data
}
