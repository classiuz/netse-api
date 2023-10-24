import { RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/const/response'
import type { ResponseCode } from '@/types/response'

interface CreateResponseProps<DataType> {
  code: ResponseCode
  message?: string
  extendsMessage?: string
  data?: DataType
}

const createResponse = <DataType>({ code, message, extendsMessage, data }: CreateResponseProps<DataType>) => {
  return {
    status: RESPONSE_STATUS[code],
    message: `${message ?? RESPONSE_MESSAGES[code]}${` ${extendsMessage}`}`,
    data: data ?? []
  }
}

export default createResponse
