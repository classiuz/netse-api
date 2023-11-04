import { SALES_MESSAGE } from '@/const/messages'
import salesModel from '@/models/salesModel'
import { validatePartialSales, validateSales } from '@/schemes/sales'
import { emptyUpdate } from '@/services/generalServices'
import { planExists } from '@/services/plansServices'
import { salesAlreadyExists, salesExists } from '@/services/salesServices'
import { serviceExists } from '@/services/servicesServices'
import { userExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllSales = async (req: Request, res: Response) => {
  try {
    const data = await salesModel.getAllSales()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await salesExists({ id: Number(id) })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createSale = async (req: Request, res: Response) => {
  try {
    const data = validateSales(req.body)
    await planExists({ name: data.plan })
    await salesAlreadyExists({ document: data.document })
    await userExists({ username: data.createdBy })
    await serviceExists({ name: data.service })

    await salesModel.createSale(data)
    const response = createResponse({ code: 201, message: SALES_MESSAGE.CREATED(`${data.lastName} ${data.firstName}`), data: [data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = validatePartialSales(req.body)
    await emptyUpdate({ data, message: SALES_MESSAGE.EMPTY_UPDATE(id) })
    await salesExists({ id: Number(id) })

    if (data.plan !== undefined) {
      await planExists({ name: data.plan })
    }

    if (data.service !== undefined) {
      await serviceExists({ name: data.service })
    }

    if (data.createdBy !== undefined) {
      await userExists({ username: data.createdBy })
    }

    await salesModel.updateSale({ id: Number(id), newData: data })
    const response = createResponse({ code: 200, message: SALES_MESSAGE.UPDATE(`${data.lastName} ${data.firstName}`), data: [data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteSales = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const sales = await salesExists({ id: Number(id) })

    await salesModel.deleteSales({ id: sales[0].id })
    const response = createResponse({ code: 200, message: SALES_MESSAGE.DELETE(`${sales[0].lastName} ${sales[0].firstName}`) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSales
}
