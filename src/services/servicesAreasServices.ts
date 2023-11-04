import { SERVICES_AREAS_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import servicesAreasModel from '@/models/servicesAreasModel'
import type { ServiceAreaOnlyName } from '@/types/servicesAreas'

export const serviceAreaExists = async ({ name }: ServiceAreaOnlyName) => {
  const serviceArea = await servicesAreasModel.getServicesAreaByName({ name })

  if (serviceArea.length === 0) {
    throw new ResponseError({ status: 404, message: SERVICES_AREAS_MESSAGE.NOT_FOUND(name) })
  }

  return serviceArea
}

export const serviceAreaAlreadyExists = async ({ name }: ServiceAreaOnlyName) => {
  const serviceArea = await servicesAreasModel.getServicesAreaByName({ name })

  if (serviceArea.length >= 1) {
    throw new ResponseError({ status: 409, message: SERVICES_AREAS_MESSAGE.ALREADY_CREATED(name) })
  }

  return serviceArea
}
