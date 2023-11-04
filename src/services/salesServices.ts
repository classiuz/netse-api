import { SALES_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import salesModel from '@/models/salesModel'
import type { SalesOnlyDocument, SalesOnlyId } from '@/types/sales'

export const salesExists = async ({ id }: SalesOnlyId) => {
  const sales = await salesModel.getSaleById({ id })

  if (sales.length === 0) {
    throw new ResponseError({ status: 404, message: SALES_MESSAGE.NOT_FOUND(id) })
  }

  return sales
}

export const salesAlreadyExists = async ({ document }: SalesOnlyDocument) => {
  const sales = await salesModel.getSaleByDocument({ document })

  if (sales.length >= 1) {
    throw new ResponseError({ status: 409, message: SALES_MESSAGE.ALREADY_CREATED(document) })
  }

  return sales
}
