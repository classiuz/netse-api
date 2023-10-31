import usersModels from '@/models/usersModel'
import { USERS_MESSAGES } from '@/const/messages'
import { checkUserAlreadyExits, checkIfUserExists, checkUserScheme, checkPartialUserScheme } from '@/services/usersServices'
import handleError from '@/utils/handleError'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'
import { checkEmptyUpdate } from '@/services/generalServices'

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersModels.getAllUsers({})
    const response = createResponse({ code: 200, data: users })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await checkIfUserExists({ username })

    const response = createResponse({ code: 200, data: user })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await checkUserScheme({ user: req.body })
    await checkUserAlreadyExits({ username: result.data.username })

    await usersModels.createUser(result.data)
    const response = createResponse({ code: 201, message: USERS_MESSAGES.CREATED(result.data.username), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const result = await checkPartialUserScheme({ user: req.body })
    await checkIfUserExists({ username })
    await checkEmptyUpdate({ data: result.data, message: USERS_MESSAGES.EMPTY_UPDATE(username) })

    await usersModels.updateUser({ username, newData: result.data })
    const response = createResponse({ code: 200, message: USERS_MESSAGES.UPDATE(username), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await checkIfUserExists({ username })

    await usersModels.deleteUser({ username: user[0].username })
    const response = createResponse({ code: 200, message: USERS_MESSAGES.DELETE(user[0].username) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}
