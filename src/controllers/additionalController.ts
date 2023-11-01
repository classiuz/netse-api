import { ADDITIONAL_MESSAGE } from '@/const/messages'
import additionalsModel from '@/models/additionalsModel'
import { validateAdditional, validatePartialAdditional } from '@/schemes/additionals'
import { additionalExists, additionalAlreadyExists } from '@/services/additionalsServices'
import { emptyUpdate } from '@/services/generalServices'
import { serviceExists } from '@/services/servicesServices'
import { userExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllAdditional = async (req: Request, res: Response) => {
  try {
    const data = await additionalsModel.getAllAdditionals()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getAdditionalByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const data = await additionalExists({ name })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createAdditional = async (req: Request, res: Response) => {
  try {
    const result = validateAdditional(req.body)
    await additionalAlreadyExists({ name: result.data.name })
    await userExists({ username: result.data.createdBy })
    await serviceExists({ name: result.data.service })

    await additionalsModel.createAdditional(result.data)
    const response = createResponse({ code: 201, message: ADDITIONAL_MESSAGE.CREATED(result.data.name), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateAdditional = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const result = validatePartialAdditional(req.body)
    await emptyUpdate({ data: result.data, message: ADDITIONAL_MESSAGE.EMPTY_UPDATE(name) })
    await additionalExists({ name })

    if (result.data.name !== undefined) {
      await additionalAlreadyExists({ name: result.data.name })
    }

    if (result.data.createdBy !== undefined) {
      await userExists({ username: result.data.createdBy })
    }

    if (result.data.service !== undefined) {
      await serviceExists({ name: result.data.service })
    }

    await additionalsModel.updateAdditional({ name, newData: result.data })
    const response = createResponse({ code: 200, message: ADDITIONAL_MESSAGE.UPDATE(name), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteAdditional = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const additional = await additionalExists({ name })

    await additionalsModel.deleteAdditional({ name: additional[0].name })
    const response = createResponse({ code: 200, message: ADDITIONAL_MESSAGE.DELETE(additional[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllAdditional,
  getAdditionalByName,
  createAdditional,
  updateAdditional,
  deleteAdditional
}
