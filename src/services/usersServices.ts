import { USERS_MESSAGES } from '@/const/messages'
import usersModels from '@/models/usersModel'
import { ResponseError } from '@/errors/responseError'
import type { UserOnlyUsername } from '@/types/user'

export const userExists = async ({ username }: UserOnlyUsername) => {
  const users = await usersModels.getUserByUsername({ username })

  if (users.length === 0) {
    throw new ResponseError({ status: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
  }

  return users
}

export const userAlreadyExits = async ({ username }: UserOnlyUsername) => {
  const users = await usersModels.getUserByUsername({ username })

  if (users.length >= 1) {
    throw new ResponseError({ status: 409, message: USERS_MESSAGES.ALREADY_CREATED(username) })
  }

  return users
}
