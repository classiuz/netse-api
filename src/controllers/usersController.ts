import bcrypt from 'bcrypt'
import usersModels from '@/models/usersModel'
import { USERS_MESSAGES } from '@/lib/messages'
import { usersServices, generalsServices } from '@/lib/services'
import { handleError, createResponse } from '@/lib/utils'

import type { Request, Response } from 'express'

import { validatePartialUser, validateUser } from '@/schemes/users'

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersModels.getAllUsers()
    const response = createResponse({ code: 200, data: users })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await usersServices.exists({ username })

    const response = createResponse({ code: 200, data: user })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const result = validateUser(req.body)
    await usersServices.alreadyExists({ username: result.data.username })

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
    const result = validatePartialUser(req.body)
    await generalsServices.emptyUpdate({ data: result.data, message: USERS_MESSAGES.EMPTY_UPDATE(username) })
    await usersServices.exists({ username })

    if (result.data.username !== undefined) {
      await usersServices.alreadyExists({ username: result.data.username })
    }

    if (result.data.password !== undefined) {
      const hashedPassword = await bcrypt.hash(result.data.password, 10)
      result.data.password = hashedPassword
    }

    await usersModels.updateUser({ username, newData: result.data })
    const { password, ...rest } = result.data
    const response = createResponse({ code: 200, message: USERS_MESSAGES.UPDATE(username), data: [{ ...rest }] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await usersServices.exists({ username })

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
