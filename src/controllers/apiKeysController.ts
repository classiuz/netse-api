import { API_KEYS_MESSAGE } from '@/lib/messages'
import apiKeysModel from '@/models/apiKeysModel'
import { validateApiKey } from '@/schemes/apiKeys'
import { apiKeysServices, usersServices } from '@/lib/services'
import { createResponse, handleError } from '@/lib/utils'

import type { Request, Response } from 'express'

const getAllApiKeys = async (req: Request, res: Response) => {
  try {
    const data = await apiKeysModel.getAllApiKeys()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createApiKey = async (req: Request, res: Response) => {
  try {
    const result = validateApiKey(req.body)
    await apiKeysServices.alreadyExists({ name: result.data.name })
    await usersServices.exists({ username: result.data.createdBy })

    const apiKey = await apiKeysModel.createApiKey(result.data)
    const response = createResponse({ code: 201, message: API_KEYS_MESSAGE.CREATED(result.data.name), data: [apiKey] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteApiKey = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const apiKey = await apiKeysServices.exists({ name })

    await apiKeysModel.deleteApiKey({ name: apiKey[0].name })
    const response = createResponse({ code: 200, message: API_KEYS_MESSAGE.DELETE(apiKey[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllApiKeys,
  createApiKey,
  deleteApiKey
}
