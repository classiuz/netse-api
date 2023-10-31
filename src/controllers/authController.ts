import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import { GENERAL_MESSAGES } from '@/const/messages'
import { SECRET_KEY } from '@/config/environment'
import { checkIfUserExists } from '@/services/usersServices'
import type { Request, Response } from 'express'

const authUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    const response = createResponse({ code: 422, message: 'The username or password was not provided.' })
    return res.status(422).json(response).end()
  }

  try {
    const user = await checkIfUserExists({ username })

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
    if (!isPasswordCorrect) {
      const response = createResponse({ code: 401, message: 'The password is invalid.' })
      return res.status(401).json(response).end()
    }

    const [{ password: mockPassword, ...rest }] = user
    if (!SECRET_KEY) throw new Error(GENERAL_MESSAGES.ENVIRONMENT_NOT_FOUND('SECRET_KEY'))
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
    const response = createResponse({ code: 200, data: { user: { ...rest }, token } })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  authUser
}
