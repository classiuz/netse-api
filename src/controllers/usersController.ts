import usersModels from '@/models/usersModel'
import createResponse from '@/utils/createResponse'
import { USERS_MESSAGES } from '@/const/messages'
import type { Request, Response } from 'express'
import { validatePartialUser, validateUser } from '@/schemes/users'

const getAllUsers = (req: Request, res: Response) => {
  const users = usersModels.getAllUsers()
  const response = createResponse({ code: 200, data: users })
  res.status(200).json(response).end()
}

const getUserByUsername = (req: Request, res: Response) => {
  const { username } = req.params
  const user = usersModels.getUserByUsername({ username })

  if (!user) {
    const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
    return res.status(404).send(response).end()
  }

  const response = createResponse({ code: 200, data: [user] })
  res.status(200).send(response).end()
}

const createUser = (req: Request, res: Response) => {
  const result = validateUser(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = usersModels.getUserByUsername({ username: result.data.username })

  if (alreadyCreated) {
    const response = createResponse({ code: 409, message: USERS_MESSAGES.ALREADY_CREATED(result.data.username) })
    return res.status(409).json(response).end()
  }

  const createdUser = usersModels.createUser(result.data)
  const response = createResponse({ code: 201, message: USERS_MESSAGES.CREATED(createdUser.username), data: [createdUser] })
  res.status(201).json(response).end()
}

const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const user = usersModels.getUserByUsername({ username })

  if (!user) {
    const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
    return res.status(404).send(response).end()
  }

  const result = validatePartialUser(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  const updatedUser = usersModels.updateUser({ username, newData: result.data })
  const response = createResponse({ code: 200, message: USERS_MESSAGES.UPDATE(username), data: [updatedUser] })
  res.status(200).json(response).end()
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser
}
