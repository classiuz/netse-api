import type { ResponseCode } from '@/types/response'
import type { ParseReturn } from '@/types/error'

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
