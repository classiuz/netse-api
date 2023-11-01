import z from 'zod'
import { ValidationError } from '@/errors/validationError'
import zodParseError from '@/utils/zodParseError'

export const blacklistScheme = z.object({
  clientId: z.string(),
  reason: z.string(),
  createdBy: z.string()
})

export const validateBlacklist = (value: typeof blacklistScheme) => {
  const result = blacklistScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialBlacklist = (value: typeof blacklistScheme) => {
  const result = blacklistScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
