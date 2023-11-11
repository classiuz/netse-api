import { SALES_MESSAGE } from '@/lib/messages'
import salesModel from '@/models/salesModel'
import { validatePartialSales, validateSales } from '@/schemes/sales'
import { generalsServices, servicesServices, usersServices, salesServices, plansServices } from '@/lib/services'

import { createResponse, handleError } from '@/lib/utils'

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
    const data = await salesServices.exists({ id: Number(id) })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createSale = async (req: Request, res: Response) => {
  try {
    const data = validateSales(req.body)
    await plansServices.exists({ name: data.plan })
    await salesServices.alreadyExists({ document: data.document })
    await usersServices.exists({ username: data.createdBy })
    await servicesServices.exists({ name: data.service })

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
    await generalsServices.emptyUpdate({ data, message: SALES_MESSAGE.EMPTY_UPDATE(id) })
    await salesServices.exists({ id: Number(id) })

    if (data.plan !== undefined) {
      await plansServices.exists({ name: data.plan })
    }

    if (data.service !== undefined) {
      await servicesServices.exists({ name: data.service })
    }

    if (data.createdBy !== undefined) {
      await usersServices.exists({ username: data.createdBy })
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
    const sales = await salesServices.exists({ id: Number(id) })

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
