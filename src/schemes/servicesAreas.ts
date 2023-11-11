import z from 'zod'
import { coordinatesScheme } from '@/schemes/general'
import { zodParseError } from '@/lib/utils'
import { ValidationError } from '@/lib/errors'

export const servicesAreasScheme = z.object({
  name: z.string(),
  province: z.string(),
  service: z.string(),
  plans: z.array(z.string()),
  additionals: z.array(z.string()),
  location: coordinatesScheme,
  range: z.array(coordinatesScheme),
  monitoringId: z.string(),
  createdBy: z.string()
})

export const validateServicesAreas = (value: typeof servicesAreasScheme) => {
  const result = servicesAreasScheme.safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result.data
}

export const validatePartialServicesAreas = (value: typeof servicesAreasScheme) => {
  const result = servicesAreasScheme.partial().safeParse(value)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result.data
}
