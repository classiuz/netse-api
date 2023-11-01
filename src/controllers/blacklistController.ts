import { BLACKLIST_MESSAGE } from '@/const/messages'
import blacklistModel from '@/models/blacklistModel'
import { validateBlacklist, validatePartialBlacklist } from '@/schemes/blacklist'
import { blacklistExists, blacklistAlreadyExists } from '@/services/blacklistServices'
import { emptyUpdate } from '@/services/generalServices'
import { userExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllBlacklist = async (req: Request, res: Response) => {
  try {
    const data = await blacklistModel.getAllBlacklist()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getBlacklistById = async (req: Request, res: Response) => {
  const { clientId } = req.params
  try {
    const data = await blacklistExists({ clientId })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createBlacklist = async (req: Request, res: Response) => {
  try {
    const result = validateBlacklist(req.body)
    await blacklistAlreadyExists({ clientId: result.data.clientId })
    await userExists({ username: result.data.createdBy })

    await blacklistModel.createBlacklist(result.data)
    const response = createResponse({ code: 201, message: BLACKLIST_MESSAGE.CREATED(result.data.clientId), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateBlacklist = async (req: Request, res: Response) => {
  const { clientId } = req.params
  try {
    const result = validatePartialBlacklist(req.body)
    await emptyUpdate({ data: result.data, message: BLACKLIST_MESSAGE.EMPTY_UPDATE(clientId) })
    await blacklistExists({ clientId })

    if (result.data.clientId !== undefined) {
      await blacklistAlreadyExists({ clientId: result.data.clientId })
    }

    if (result.data.createdBy !== undefined) {
      await userExists({ username: result.data.createdBy })
    }

    await blacklistModel.updateBlacklist({ clientId, newData: result.data })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.UPDATE(clientId), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteBlacklist = async (req: Request, res: Response) => {
  const { clientId } = req.params

  try {
    const blacklist = await blacklistExists({ clientId })

    await blacklistModel.deleteBlacklist({ clientId: blacklist[0].clientId })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.DELETE(blacklist[0].clientId) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllBlacklist,
  getBlacklistById,
  createBlacklist,
  updateBlacklist,
  deleteBlacklist
}
