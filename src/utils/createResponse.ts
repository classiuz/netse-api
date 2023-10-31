import { RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/const/response'
import type { ResponseObject } from '@/types/response'

const createResponse = ({ code, message, data, error }: ResponseObject) => {
  if (data !== undefined) {
    return {
      status: RESPONSE_STATUS[code],
      message: message ?? RESPONSE_MESSAGES[code],
      data: data ?? []
    }
  }
  return {
    status: RESPONSE_STATUS[code],
    message: message ?? RESPONSE_MESSAGES[code],
    error: error ?? []
  }
}

export default createResponse
