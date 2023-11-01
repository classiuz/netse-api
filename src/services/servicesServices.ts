import { SERVICES_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import servicesModel from '@/models/servicesModel'

export const serviceExists = async ({ name }: { name: string }) => {
  const services = await servicesModel.getServiceByName({ name })

  if (services.length === 0) {
    throw new ResponseError({ status: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
  }

  return services
}

export const serviceAlreadyExists = async ({ name }: { name: string }) => {
  const services = await servicesModel.getServiceByName({ name })

  if (services.length >= 1) {
    throw new ResponseError({ status: 409, message: SERVICES_MESSAGE.ALREADY_CREATED(name) })
  }

  return services
}
