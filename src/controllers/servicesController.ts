import { SERVICES_MESSAGE } from '@/const/messages'
import servicesModel from '@/models/servicesModel'
import { checkEmptyUpdate } from '@/services/generalServices'
import { checkIfServiceExists, checkPartialServiceScheme, checkServiceAlreadyExists, checkServiceScheme } from '@/services/servicesServices'
import { checkIfUserExists } from '@/services/usersServices'
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
    const data = await checkIfServiceExists({ name })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createService = async (req: Request, res: Response) => {
  try {
    const result = await checkServiceScheme({ service: req.body })
    await checkServiceAlreadyExists({ name: result.data.name })
    await checkIfUserExists({ username: result.data.createdBy })

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
    const result = await checkPartialServiceScheme({ service: req.body })
    await checkIfServiceExists({ name })
    await checkEmptyUpdate({ data: result.data, message: SERVICES_MESSAGE.EMPTY_UPDATE(name) })

    if (result.data.createdBy !== undefined) {
      await checkIfUserExists({ username: result.data.createdBy })
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
    const service = await checkIfServiceExists({ name })

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
