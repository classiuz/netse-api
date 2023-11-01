import { BLACKLIST_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import blacklistModel from '@/models/blacklistModel'

export const blacklistExists = async ({ clientId }: { clientId: string }) => {
  const blacklist = await blacklistModel.getBlacklistById({ clientId })

  if (blacklist.length === 0) {
    throw new ResponseError({ status: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
  }

  return blacklist
}

export const blacklistAlreadyExists = async ({ clientId }: { clientId: string }) => {
  const blacklist = await blacklistModel.getBlacklistById({ clientId })

  if (blacklist.length >= 1) {
    throw new ResponseError({ status: 409, message: BLACKLIST_MESSAGE.ALREADY_CREATED(clientId) })
  }

  return blacklist
}
