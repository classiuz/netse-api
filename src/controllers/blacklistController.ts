import { BLACKLIST_MESSAGE } from '@/const/messages'
import blacklistModel from '@/models/blacklistModel'
import { checkIfBlacklistExists, checkBlacklistAlreadyExists, checkBlackistScheme, checkPartialBlacklistScheme } from '@/services/blacklistServices'
import { checkEmptyUpdate } from '@/services/generalServices'
import { checkIfUserExists } from '@/services/usersServices'
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
    const data = await checkIfBlacklistExists({ clientId })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createBlacklist = async (req: Request, res: Response) => {
  try {
    const result = await checkBlackistScheme({ blacklist: req.body })
    await checkBlacklistAlreadyExists({ clientId: result.data.clientId })
    await checkIfUserExists({ username: result.data.createdBy })

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
    const result = await checkPartialBlacklistScheme({ blacklist: req.body })
    await checkEmptyUpdate({ data: result.data, message: BLACKLIST_MESSAGE.EMPTY_UPDATE(clientId) })
    await checkIfBlacklistExists({ clientId })

    if (result.data.createdBy !== undefined) {
      await checkIfUserExists({ username: result.data.createdBy })
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
    const blacklist = await checkIfBlacklistExists({ clientId })

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
