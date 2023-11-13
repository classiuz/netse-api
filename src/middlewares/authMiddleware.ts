import bcrypt from 'bcrypt'
import { AUTH_MESSAGE } from '@/lib/messages'
import apiKeysModel from '@/models/apiKeysModel'
import { createResponse } from '@/lib/utils'
import type { NextFunction, Request, Response } from 'express'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const headersKey = req.headers.authorization
  const queryKey = req.query.key?.toString()
  const bodyKey = req.body.key as string
  const key = headersKey ?? queryKey ?? bodyKey

  if (!key) {
    const response = createResponse({ code: 401, message: AUTH_MESSAGE.MISSING_KEY })
    return res.status(401).json(response).end()
  }

  const apiKeys = await apiKeysModel.getAllApiKeysValues()
  for (const apiKey of apiKeys) {
    const validKey = await bcrypt.compare(key, apiKey.value)
    if (validKey) {
      next()
      return
    }
  }

  const response = createResponse({ code: 401, message: AUTH_MESSAGE.INVALID_KEY })
  res.status(401).json(response).end()
}

export default authMiddleware
