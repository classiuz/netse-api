import { BLACKLIST_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import { ValidationError } from '@/errors/validationError'
import blacklistModel from '@/models/blacklistModel'
import { validateBlacklist, validatePartialBlacklist } from '@/schemes/blacklist'
import zodParseError from '@/utils/zodParseError'

export const checkIfBlacklistExists = async ({ clientId }: { clientId: string }) => {
  const blacklist = await blacklistModel.getBlacklistById({ clientId })

  if (blacklist.length === 0) {
    throw new ResponseError({ status: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
  }

  return blacklist
}

export const checkBlacklistAlreadyExists = async ({ clientId }: { clientId: string }) => {
  const blacklist = await blacklistModel.getBlacklistById({ clientId })

  if (blacklist.length >= 1) {
    throw new ResponseError({ status: 409, message: BLACKLIST_MESSAGE.ALREADY_CREATED(clientId) })
  }

  return blacklist
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkBlackistScheme = async ({ blacklist }: { blacklist: any }) => {
  const result = validateBlacklist(blacklist)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkPartialBlacklistScheme = async ({ blacklist }: { blacklist: any }) => {
  const result = validatePartialBlacklist(blacklist)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
