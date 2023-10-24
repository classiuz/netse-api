import bcrypt from 'bcrypt'
import { AUTH_MESSAGE } from '@/const/messages'
import tokenModel from '@/models/tokenModel'
import createResponse from '@/utils/createResponse'
import type { NextFunction, Request, Response } from 'express'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers.authorization

  if (!key) {
    const response = createResponse({ code: 401, message: AUTH_MESSAGE.MISSING_KEY })
    return res.status(401).json(response).end()
  }

  const tokens = await tokenModel.getAllTokensValues()

  for (const token of tokens) {
    const validKey = await bcrypt.compare(key, token.tokenValue)
    if (validKey) {
      next()
      return
    }
  }

  const response = createResponse({ code: 401, message: AUTH_MESSAGE.INVALID_KEY })
  res.status(401).json(response).end()
}

export default authMiddleware
