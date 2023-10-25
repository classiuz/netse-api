import { RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/const/response'
import type { ResponseCode } from '@/types/response'

interface CreateResponseProps<DataType, ErrorType> {
  code: ResponseCode
  message?: string
  data?: DataType
  error?: ErrorType
}

const createResponse = <DataType, ErrorType>({ code, message, data, error }: CreateResponseProps<DataType, ErrorType>) => {
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
