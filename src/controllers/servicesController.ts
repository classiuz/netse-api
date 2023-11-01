import { SERVICES_MESSAGE } from '@/const/messages'
import servicesModel from '@/models/servicesModel'
import { validatePartialService, validateService } from '@/schemes/services'
import { emptyUpdate } from '@/services/generalServices'
import { serviceExists, serviceAlreadyExists } from '@/services/servicesServices'
import { userExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllServices = async (req: Request, res: Response) => {
  try {
    const data = await servicesModel.getAllServices()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getServiceByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const data = await serviceExists({ name })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createService = async (req: Request, res: Response) => {
  try {
    const result = validateService(req.body)
    await serviceAlreadyExists({ name: result.data.name })
    await userExists({ username: result.data.createdBy })

    await servicesModel.createService(result.data)
    const response = createResponse({ code: 201, message: SERVICES_MESSAGE.CREATED(result.data.name), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateService = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const result = validatePartialService(req.body)
    await emptyUpdate({ data: result.data, message: SERVICES_MESSAGE.EMPTY_UPDATE(name) })
    await serviceExists({ name })

    if (result.data.name !== undefined) {
      await serviceAlreadyExists({ name: result.data.name })
    }

    if (result.data.createdBy !== undefined) {
      await userExists({ username: result.data.createdBy })
    }

    await servicesModel.updateService({ name, newData: result.data })
    const response = createResponse({ code: 200, message: SERVICES_MESSAGE.UPDATE(name), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteService = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const service = await serviceExists({ name })

    await servicesModel.deleteService({ name: service[0].name })
    const response = createResponse({ code: 200, message: SERVICES_MESSAGE.DELETE(service[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllServices,
  getServiceByName,
  createService,
  updateService,
  deleteService
}
