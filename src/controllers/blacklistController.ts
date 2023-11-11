import { BLACKLIST_MESSAGE } from '@/lib/messages'
import blacklistModel from '@/models/blacklistModel'
import { validateBlacklist, validatePartialBlacklist } from '@/schemes/blacklist'
import { generalsServices, usersServices, blacklistServices } from '@/lib/services'

import { createResponse, handleError } from '@/lib/utils'

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
    const data = await blacklistServices.exists({ clientId })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createBlacklist = async (req: Request, res: Response) => {
  try {
    const result = validateBlacklist(req.body)
    await blacklistServices.alreadyExists({ clientId: result.data.clientId })
    await usersServices.exists({ username: result.data.createdBy })

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
    await generalsServices.emptyUpdate({ data: result.data, message: BLACKLIST_MESSAGE.EMPTY_UPDATE(clientId) })
    await blacklistServices.exists({ clientId })

    if (result.data.clientId !== undefined) {
      await blacklistServices.alreadyExists({ clientId: result.data.clientId })
    }

    if (result.data.createdBy !== undefined) {
      await usersServices.exists({ username: result.data.createdBy })
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
    const blacklist = await blacklistServices.exists({ clientId })

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
