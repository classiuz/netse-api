import { GENERAL_MESSAGES } from '@/const/messages'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

const notFoundMiddleware = (req: Request, res: Response) => {
  const response = createResponse({ code: 404, extendsMessage: GENERAL_MESSAGES.DOCUMENTATION_TIP })
  res.status(404).json(response).end()
}

export default notFoundMiddleware
