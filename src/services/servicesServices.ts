import { SERVICES_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import { ValidationError } from '@/errors/validationError'
import servicesModel from '@/models/servicesModel'
import { validatePartialService, validateService } from '@/schemes/services'
import zodParseError from '@/utils/zodParseError'

export const checkIfServiceExists = async ({ name }: { name: string }) => {
  const services = await servicesModel.getServiceByName({ name })

  if (services.length === 0) {
    throw new ResponseError({ status: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
  }

  return services
}

export const checkServiceAlreadyExists = async ({ name }: { name: string }) => {
  const services = await servicesModel.getServiceByName({ name })

  if (services.length >= 1) {
    throw new ResponseError({ status: 409, message: SERVICES_MESSAGE.ALREADY_CREATED(name) })
  }

  return services
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkServiceScheme = async ({ service }: { service: any }) => {
  const result = validateService(service)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkPartialServiceScheme = async ({ service }: { service: any }) => {
  const result = validatePartialService(service)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
