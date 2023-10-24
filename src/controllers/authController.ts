import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'
import createResponse from '@/utils/createResponse'
import usersModel from '@/models/usersModel'
import { USERS_MESSAGES } from '@/const/messages'
import { SECRET_KEY } from '@/config/environment'

const authUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    const response = createResponse({ code: 422, message: 'The username or password was not provided.' })
    return res.status(422).json(response).end()
  }

  try {
    const mockUser = await usersModel.getUserByUsername({ username })

    if (mockUser.length === 0) {
      const response = createResponse({ code: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
      return res.status(404).json(response).end()
    }

    const isPasswordCorrect = await bcrypt.compare(password, mockUser[0].password)
    if (!isPasswordCorrect) {
      const response = createResponse({ code: 401, message: 'The password is invalid.' })
      return res.status(401).json(response).end()
    }

    const [{ password: mockPassword, ...rest }] = mockUser
    if (!SECRET_KEY) throw new Error('SECRET_KEY was undefined')
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
    const response = createResponse({ code: 200, data: { user: { ...rest }, token } })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    return res.status(500).json(response).end()
  }
}

export default {
  authUser
}
