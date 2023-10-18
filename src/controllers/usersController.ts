import usersModels from '@/models/usersModel'
import createResponse from '@/utils/createResponse'
import { USERS_MESSAGES } from '@/const/messages'
import type { Request, Response } from 'express'
import { validatePartialUser, validateUser } from '@/schemes/users'

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersModels.getAllUsers()
    const response = createResponse({ code: 200, data: users })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params
  try {
    const user = await usersModels.getUserByUsername({ username })

    if (user.length === 0) {
      const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data: [user] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const createUser = async (req: Request, res: Response) => {
  const result = validateUser(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = await usersModels.getUserByUsername({ username: result.data.username })

  if (alreadyCreated.length >= 1) {
    const response = createResponse({ code: 409, message: USERS_MESSAGES.ALREADY_CREATED(result.data.username) })
    return res.status(409).json(response).end()
  }

  try {
    await usersModels.createUser(result.data)
    const response = createResponse({ code: 201, message: USERS_MESSAGES.CREATED(result.data.username), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params
  const user = await usersModels.getUserByUsername({ username })

  if (user.length === 0) {
    const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
    return res.status(404).json(response).end()
  }

  const result = validatePartialUser(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  try {
    await usersModels.updateUser({ username, newData: result.data })
    const response = createResponse({ code: 200, message: USERS_MESSAGES.UPDATE(username), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: { error } })
    res.status(500).json(response).end()
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params
  const user = await usersModels.getUserByUsername({ username })

  if (user.length === 0) {
    const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
    return res.status(404).json(response).end()
  }

  try {
    await usersModels.deleteUser({ username: user[0].username })
    const response = createResponse({ code: 200 })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: { error } })
    res.status(500).json(response).end()
  }
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}
