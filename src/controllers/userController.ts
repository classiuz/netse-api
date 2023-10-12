import { getAllUsers } from '@/models/userModel'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = getAllUsers()
    const response = createResponse({ code: 200, data: users })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUser = (req: Request, res: Response) => {
  const { userName } = req.params
  const users = getAllUsers()
  const user = users.find((user) => user.userName === userName)

  if (!user) {
    const response = createResponse({ code: 200, message: `The user ${userName} was not found.` })
    return res.status(200).send(response)
  }

  const response = createResponse({ code: 200, data: user })
  res.status(200).send(response)
}
