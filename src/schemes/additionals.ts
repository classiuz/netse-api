import z from 'zod'
import { installmentsScheme } from './general'
import zodParseError from '@/utils/zodParseError'
import { ValidationError } from '@/errors/validationError'

export const additionalScheme = z.object({
  name: z.string(),
  price: z.number(),
  installmentsPrice: installmentsScheme.optional(),
  service: z.string(),
  createdBy: z.string()
})

export const validateAdditional = (value: typeof additionalScheme) => {
  const result = additionalScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialAdditional = (value: typeof additionalScheme) => {
  const result = additionalScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
