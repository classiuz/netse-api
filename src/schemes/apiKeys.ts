import z from 'zod'
import { ValidationError } from '@/lib/errors'
import { zodParseError } from '@/lib/utils'

export const apiKeysScheme = z.object({
  name: z.string(),
  createdBy: z.string()
})

export const validateApiKey = (value: typeof apiKeysScheme) => {
  const result = apiKeysScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
