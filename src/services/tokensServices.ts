import { TOKEN_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import { ValidationError } from '@/errors/validationError'
import tokenModel from '@/models/tokenModel'
import { validateToken } from '@/schemes/tokens'
import type { TokenOnlyName } from '@/types/tokens'
import zodParseError from '@/utils/zodParseError'

export const checkIfTokenExists = async ({ name }: TokenOnlyName) => {
  const tokens = await tokenModel.getTokenByName({ name })

  if (tokens.length === 0) {
    throw new ResponseError({ status: 404, message: TOKEN_MESSAGE.NOT_FOUND(name) })
  }

  return tokens
}

export const checkTokenAlreadyExits = async ({ name }: TokenOnlyName) => {
  const tokens = await tokenModel.getTokenByName({ name })

  if (tokens.length >= 1) {
    throw new ResponseError({ status: 409, message: TOKEN_MESSAGE.ALREADY_CREATED(name) })
  }

  return tokens
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckTokenScheme = async ({ token }: { token: any }) => {
  const result = validateToken(token)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
