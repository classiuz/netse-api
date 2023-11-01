import z from 'zod'
import { ValidationError } from '@/errors/validationError'
import zodParseError from '@/utils/zodParseError'

export const servicesScheme = z.object({
  name: z.string(),
  alternativeName: z.string(),
  createdBy: z.string()
})

export const validateService = (value: typeof servicesScheme) => {
  const result = servicesScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialService = (value: typeof servicesScheme) => {
  const result = servicesScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
