import type { ResponseCode } from '@/types/response'

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
