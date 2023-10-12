import type { Request, Response } from 'express'
import createResponse from '@/utils/createResponse'

const notFoundMiddleware = (req: Request, res: Response) => {
  const response = createResponse({ code: 404 })
  res.status(404).json(response)
}

export default notFoundMiddleware
