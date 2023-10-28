import { SERVICES_MESSAGE } from '@/const/messages'
import servicesModel from '@/models/servicesModel'
import usersModel from '@/models/usersModel'
import { validatePartialService, validateService } from '@/schemes/services'
import createResponse from '@/utils/createResponse'
import zodParseError from '@/utils/zodParseError'
import type { Request, Response } from 'express'

const getAllServices = async (req: Request, res: Response) => {
  try {
    const data = await servicesModel.getAllServices()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getServiceByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const data = await servicesModel.getServiceByName({ name })

    if (data.length === 0) {
      const response = createResponse({ code: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const createService = async (req: Request, res: Response) => {
  const result = validateService(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = await servicesModel.getServiceByName({ name: result.data.name })

  if (alreadyCreated.length >= 1) {
    const response = createResponse({ code: 409, message: SERVICES_MESSAGE.ALREADY_CREATED(result.data.name) })
    return res.status(409).json(response).end()
  }

  const userExist = await usersModel.getUserByUsername({ username: result.data.createdBy })

  if (userExist.length === 0) {
    const response = createResponse({ code: 409, message: SERVICES_MESSAGE.USER_DONT_EXIST(result.data.createdBy) })
    return res.status(409).json(response).end()
  }

  try {
    await servicesModel.createService(result.data)
    const response = createResponse({ code: 201, message: SERVICES_MESSAGE.CREATED(result.data.name), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const updateService = async (req: Request, res: Response) => {
  const { name } = req.params
  const result = validatePartialService(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  if (Object.keys(result.data).length === 0) {
    const response = createResponse({ code: 400, error: SERVICES_MESSAGE.EMPTY_UPDATE(name) })
    return res.status(400).json(response).end()
  }

  if (result.data.createdBy !== undefined) {
    const userExist = await usersModel.getUserByUsername({ username: result.data.createdBy })

    if (userExist.length === 0) {
      const response = createResponse({ code: 409, message: SERVICES_MESSAGE.USER_DONT_EXIST(result.data.createdBy) })
      return res.status(409).json(response).end()
    }
  }

  try {
    const service = await servicesModel.getServiceByName({ name })

    if (service.length === 0) {
      const response = createResponse({ code: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    await servicesModel.updateService({ name, newData: result.data })
    const response = createResponse({ code: 200, message: SERVICES_MESSAGE.UPDATE(name), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const deleteService = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const user = await servicesModel.getServiceByName({ name })

    if (user.length === 0) {
      const response = createResponse({ code: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    await servicesModel.deleteService({ name: user[0].name })
    const response = createResponse({ code: 200, message: SERVICES_MESSAGE.DELETE(user[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

export default {
  getAllServices,
  getServiceByName,
  createService,
  updateService,
  deleteService
}
