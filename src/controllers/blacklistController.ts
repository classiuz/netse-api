import { BLACKLIST_MESSAGE } from '@/const/messages'
import blacklistModel from '@/models/blacklistModel'
import usersModel from '@/models/usersModel'
import { validateBlacklist, validatePartialBlacklist } from '@/schemes/blacklist'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

const getAllBlacklist = async (req: Request, res: Response) => {
  try {
    const data = await blacklistModel.getAllBlacklist()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const getBlacklistByClientName = async (req: Request, res: Response) => {
  const { clientName } = req.params
  try {
    const data = await blacklistModel.getBlacklistByClientName({ clientName })

    if (data.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientName) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const createBlacklist = async (req: Request, res: Response) => {
  const result = validateBlacklist(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = await blacklistModel.getBlacklistByClientName({ clientName: result.data.clientName })

  if (alreadyCreated.length >= 1) {
    const response = createResponse({ code: 409, message: BLACKLIST_MESSAGE.ALREADY_CREATED(result.data.clientName) })
    return res.status(409).json(response).end()
  }

  const userExist = await usersModel.getUserByUsername({ username: result.data.addedBy })

  if (userExist.length === 0) {
    const response = createResponse({ code: 409, message: BLACKLIST_MESSAGE.USER_DONT_EXIST(result.data.addedBy) })
    return res.status(409).json(response).end()
  }

  try {
    await blacklistModel.createBlacklist(result.data)
    const response = createResponse({ code: 201, message: BLACKLIST_MESSAGE.CREATED(result.data.clientName), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const updateBlacklist = async (req: Request, res: Response) => {
  const { clientName } = req.params
  const result = validatePartialBlacklist(req.body)

  if (!result.success) {
    const response = createResponse({ code: 400, data: [{ error: JSON.parse(result.error.message) }] })
    return res.status(400).json(response).end()
  }

  try {
    const blacklist = await blacklistModel.getBlacklistByClientName({ clientName })

    if (blacklist.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientName) })
      return res.status(404).json(response).end()
    }

    await blacklistModel.updateBlacklist({ clientName, newData: result.data })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.UPDATE(clientName), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

const deleteBlacklist = async (req: Request, res: Response) => {
  const { clientName } = req.params

  try {
    const blacklist = await blacklistModel.getBlacklistByClientName({ clientName })

    if (blacklist.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientName) })
      return res.status(404).json(response).end()
    }

    await blacklistModel.deleteBlacklist({ clientName: blacklist[0].clientName })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.DELETE(blacklist[0].clientName) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, data: [{ error }] })
    res.status(500).json(response).end()
  }
}

export default {
  getAllBlacklist,
  getBlacklistByClientName,
  createBlacklist,
  updateBlacklist,
  deleteBlacklist
}
