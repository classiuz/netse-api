import type { ResponseCode } from '@/types/response'
import type { ParseReturn } from '@/types/error'

export class ResponseError extends Error {
  status: ResponseCode
  message: string

  constructor({ status, message }: { status: ResponseCode, message: string }) {
    super(message)
    this.name = 'ResponseError'
    this.status = status
    this.message = message
  }
}

export class ValidationError extends Error {
  status: ResponseCode
  error: ParseReturn[]

  constructor({ status, error }: { status: ResponseCode, error: ParseReturn[] }) {
    super(JSON.stringify(error))
    this.name = 'ValidationError'
    this.status = status
    this.error = error
  }
}
