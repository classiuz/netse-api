import { ResponseError } from '@/errors/responseError'
import { ValidationError } from '@/errors/validationError'
import createResponse from './createResponse'
import type { Response } from 'express'

interface HandleErrorProps {
  error: unknown
  res: Response
}

const handleError = ({ error, res }: HandleErrorProps) => {
  if (error instanceof ResponseError) {
    const response = createResponse({ code: error.status, message: error.message })
    res.status(error.status).json(response).end()
    return
  }

  if (error instanceof ValidationError) {
    const response = createResponse({ code: error.status, error: error.error })
    res.status(error.status).json(response).end()
    return
  }

  const response = createResponse({ code: 500, error })
  res.status(500).json(response).end()
}

export default handleError
