import { TOKEN } from '@/const/tokens'
import createResponse from '@/utils/createResponse'
import type { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { key } = req.query
  const isAvailebleToken = key === TOKEN

  if (!key || !isAvailebleToken) {
    const response = createResponse({ code: 401 })
    return res.status(401).send(response)
  }

  next()
}

export default authMiddleware
