import { createResponse } from '@/lib/utils'
import type { Request, Response } from 'express'

const notFoundMiddleware = (req: Request, res: Response) => {
  const response = createResponse({ code: 404 })
  res.status(404).json(response).end()
}

export default notFoundMiddleware
