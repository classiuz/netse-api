import z from 'zod'
import { ValidationError } from '@/errors/validationError'
import zodParseError from '@/utils/zodParseError'

export const plansScheme = z.object({
  name: z.string(),
  download: z.number(),
  upload: z.number(),
  price: z.number(),
  service: z.string(),
  createdBy: z.string()
})

export const validatePlan = (value: typeof plansScheme) => {
  const result = plansScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialPlan = (value: typeof plansScheme) => {
  const result = plansScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
