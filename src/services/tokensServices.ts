import { TOKEN_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import tokenModel from '@/models/tokenModel'
import type { TokenOnlyName } from '@/types/tokens'

export const tokenExists = async ({ name }: TokenOnlyName) => {
  const tokens = await tokenModel.getTokenByName({ name })

  if (tokens.length === 0) {
    throw new ResponseError({ status: 404, message: TOKEN_MESSAGE.NOT_FOUND(name) })
  }

  return tokens
}

export const tokenAlreadyExits = async ({ name }: TokenOnlyName) => {
  const tokens = await tokenModel.getTokenByName({ name })

  if (tokens.length >= 1) {
    throw new ResponseError({ status: 409, message: TOKEN_MESSAGE.ALREADY_CREATED(name) })
  }

  return tokens
}
