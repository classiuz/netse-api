import { TOKEN_MESSAGE } from '@/const/messages'
import tokenModel from '@/models/tokenModel'
import { validateToken } from '@/schemes/tokens'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

const getAllTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await tokenModel.getAllTokens()
    const response = createResponse({ code: 200, data: [{ ...tokens }] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const createToken = async (req: Request, res: Response) => {
  const result = validateToken(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = await tokenModel.getTokenByName({ name: result.data.name })

  if (alreadyCreated.length >= 1) {
    const response = createResponse({ code: 409, message: TOKEN_MESSAGE.ALREADY_CREATED(result.data.name) })
    return res.status(409).json(response).end()
  }

  try {
    const token = await tokenModel.createToken(result.data)
    const response = createResponse({ code: 201, message: TOKEN_MESSAGE.CREATED(result.data.name), data: [token] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const deleteToken = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const token = await tokenModel.getTokenByName({ name })

    if (token.length === 0) {
      const response = createResponse({ code: 404, message: TOKEN_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    await tokenModel.deleteToken({ name: token[0].name })
    const response = createResponse({ code: 200, message: TOKEN_MESSAGE.DELETE(token[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

export default {
  getAllTokens,
  createToken,
  deleteToken
}
