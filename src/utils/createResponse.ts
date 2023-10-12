import { RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/const/response'
import type { ResponseCode } from '@/types/response'

interface CreateResponseProps {
  code: ResponseCode
  data: unknown[]
}

const createResponse = ({ code, data }: CreateResponseProps) => {
  return {
    status: RESPONSE_STATUS[code],
    message: RESPONSE_MESSAGES[code],
    data
  }
}

export default createResponse
