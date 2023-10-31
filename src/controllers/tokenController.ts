import { TOKEN_MESSAGE } from '@/const/messages'
import tokenModel from '@/models/tokenModel'
import { CheckTokenScheme, checkIfTokenExists, checkTokenAlreadyExits } from '@/services/tokensServices'
import { checkIfUserExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await tokenModel.getAllTokens()
    const response = createResponse({ code: 200, data: [{ ...tokens }] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createToken = async (req: Request, res: Response) => {
  try {
    const result = await CheckTokenScheme({ token: req.body })
    await checkTokenAlreadyExits({ name: result.data.name })
    await checkIfUserExists({ username: result.data.createdBy })

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
    const token = await checkIfTokenExists({ name })

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
