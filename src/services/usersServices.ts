import { USERS_MESSAGES } from '@/const/messages'
import usersModels from '@/models/usersModel'
import zodParseError from '@/utils/zodParseError'
import { ResponseError } from '@/errors/responseError'
import { validatePartialUser, validateUser } from '@/schemes/users'
import { ValidationError } from '@/errors/validationError'
import type { UserOnlyUsername } from '@/types/user'

export const checkIfUserExists = async ({ username }: UserOnlyUsername) => {
  const users = await usersModels.getUserByUsername({ username })

  if (users.length === 0) {
    throw new ResponseError({ status: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
  }

  return users
}

export const checkUserAlreadyExits = async ({ username }: UserOnlyUsername) => {
  const users = await usersModels.getUserByUsername({ username })

  if (users.length >= 1) {
    throw new ResponseError({ status: 409, message: USERS_MESSAGES.ALREADY_CREATED(username) })
  }

  return users
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkUserScheme = async ({ user }: { user: any }) => {
  const result = validateUser(user)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkPartialUserScheme = async ({ user }: { user: any }) => {
  const result = validatePartialUser(user)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    throw new ValidationError({ status: 400, error })
  }

  return result
}
