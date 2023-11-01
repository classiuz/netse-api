import { ADDITIONAL_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import additionalsModel from '@/models/additionalsModel'
import type { AdditionalOnlyName } from '@/types/additional'

export const additionalExists = async ({ name }: AdditionalOnlyName) => {
  const additionals = await additionalsModel.getAdditionalByName({ name })

  if (additionals.length === 0) {
    throw new ResponseError({ status: 404, message: ADDITIONAL_MESSAGE.NOT_FOUND(name) })
  }

  return additionals
}

export const additionalAlreadyExists = async ({ name }: AdditionalOnlyName) => {
  const additionals = await additionalsModel.getAdditionalByName({ name })

  if (additionals.length >= 1) {
    throw new ResponseError({ status: 409, message: ADDITIONAL_MESSAGE.ALREADY_CREATED(name) })
  }

  return additionals
}
