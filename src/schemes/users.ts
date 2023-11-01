import z from 'zod'
import zodParseError from '@/utils/zodParseError'
import { ValidationError } from '@/errors/validationError'

export const usersScheme = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const validateUser = (value: typeof usersScheme) => {
  const result = usersScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

export const validatePartialUser = (value: typeof usersScheme) => {
  const result = usersScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
