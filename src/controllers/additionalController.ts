import { ADDITIONAL_MESSAGE } from '@/lib/messages'
import additionalsModel from '@/models/additionalsModel'
import { validateAdditional, validatePartialAdditional } from '@/schemes/additionals'
import { generalsServices, servicesServices, usersServices, additionalsServices } from '@/lib/services'

import { createResponse, handleError } from '@/lib/utils'

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
    const data = await additionalsServices.exists({ name })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createAdditional = async (req: Request, res: Response) => {
  try {
    const result = validateAdditional(req.body)
    await additionalsServices.alreadyExists({ name: result.data.name })
    await usersServices.exists({ username: result.data.createdBy })
    await servicesServices.exists({ name: result.data.service })

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
    await generalsServices.emptyUpdate({ data: result.data, message: ADDITIONAL_MESSAGE.EMPTY_UPDATE(name) })
    await additionalsServices.exists({ name })

    if (result.data.name !== undefined) {
      await additionalsServices.alreadyExists({ name: result.data.name })
    }

    if (result.data.createdBy !== undefined) {
      await usersServices.exists({ username: result.data.createdBy })
    }

    if (result.data.service !== undefined) {
      await servicesServices.exists({ name: result.data.service })
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
    const additional = await additionalsServices.exists({ name })

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
