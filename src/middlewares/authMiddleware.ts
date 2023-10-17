import { KEY } from '@/config/environment'
import createResponse from '@/utils/createResponse'
import type { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers.authorization
  const isAvailebleToken = key === KEY

  if (!key || !isAvailebleToken) {
    const response = createResponse({ code: 401 })
    return res.status(401).json(response).end()
  }

  next()
}

export default authMiddleware
