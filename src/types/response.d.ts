import type { RESPONSE_CODES, RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/lib/constants'

export type ResponseCode = keyof typeof RESPONSE_CODES
export type ResponseStatus = typeof RESPONSE_STATUS
export type ResponseMessage = typeof RESPONSE_MESSAGES

export interface ResponseObject {
  code: ResponseCode
  message?: string
  data?: unknown // TODO - Change Unknown type
  error?: unknown // TODO - Change Unknown type
}

export type ResponseReturn = {
  status: string
  message: string
  data: unknown // TODO - Change Unknown type
  error?: undefined
} | {
  status: string
  message: string
  error: unknown // TODO - Change Unknown type
  data?: undefined
}
