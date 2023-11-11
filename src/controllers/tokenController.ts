import { TOKEN_MESSAGE } from '@/lib/messages'
import tokenModel from '@/models/tokenModel'
import { validateToken } from '@/schemes/tokens'
import { tokensServices, usersServices } from '@/lib/services'
import { createResponse, handleError } from '@/lib/utils'

import type { Request, Response } from 'express'

const getAllTokens = async (req: Request, res: Response) => {
  try {
    const data = await tokenModel.getAllTokens()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createToken = async (req: Request, res: Response) => {
  try {
    const result = validateToken(req.body)
    await tokensServices.alreadyExists({ name: result.data.name })
    await usersServices.exists({ username: result.data.createdBy })

    const token = await tokenModel.createToken(result.data)
    const response = createResponse({ code: 201, message: TOKEN_MESSAGE.CREATED(result.data.name), data: [token] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteToken = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const token = await tokensServices.exists({ name })

    await tokenModel.deleteToken({ name: token[0].name })
    const response = createResponse({ code: 200, message: TOKEN_MESSAGE.DELETE(token[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllTokens,
  createToken,
  deleteToken
}
