import type { RESPONSE_CODES, RESPONSE_MESSAGES, RESPONSE_STATUS } from '../const/response'

export type ResponseCode = keyof typeof RESPONSE_CODES
export type ResponseStatus = typeof RESPONSE_STATUS
export type ResponseMessage = typeof RESPONSE_MESSAGES
