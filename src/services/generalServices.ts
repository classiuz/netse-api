import { ResponseError } from '@/errors/responseError'

export const checkEmptyUpdate = async ({ data, message }: { data: object, message: string }) => {
  if (Object.keys(data).length === 0) {
    throw new ResponseError({ status: 400, message })
  }
}
