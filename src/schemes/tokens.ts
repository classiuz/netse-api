import z from 'zod'
import { ValidationError } from '@/lib/errors'
import { zodParseError } from '@/lib/utils'

export const tokenScheme = z.object({
  name: z.string(),
  createdBy: z.string()
})

export const validateToken = (value: typeof tokenScheme) => {
  const result = tokenScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
