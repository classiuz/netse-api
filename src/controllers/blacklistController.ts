import { BLACKLIST_MESSAGE } from '@/const/messages'
import blacklistModel from '@/models/blacklistModel'
import usersModel from '@/models/usersModel'
import { validateBlacklist, validatePartialBlacklist } from '@/schemes/blacklist'
import createResponse from '@/utils/createResponse'
import zodParseError from '@/utils/zodParseError'
import type { Request, Response } from 'express'

const getAllBlacklist = async (req: Request, res: Response) => {
  try {
    const data = await blacklistModel.getAllBlacklist()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getBlacklistById = async (req: Request, res: Response) => {
  const { clientId } = req.params
  try {
    const data = await blacklistModel.getBlacklistById({ clientId })

    if (data.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const createBlacklist = async (req: Request, res: Response) => {
  const result = validateBlacklist(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  const blacklist = await blacklistModel.getBlacklistById({ clientId: result.data.clientId })

  if (blacklist.length >= 1) {
    const response = createResponse({ code: 409, message: BLACKLIST_MESSAGE.ALREADY_CREATED(result.data.clientId) })
    return res.status(409).json(response).end()
  }

  const userExist = await usersModel.getUserByUsername({ username: result.data.createdBy })

  if (userExist.length === 0) {
    const response = createResponse({ code: 409, message: BLACKLIST_MESSAGE.USER_DONT_EXIST(result.data.createdBy) })
    return res.status(409).json(response).end()
  }

  try {
    await blacklistModel.createBlacklist(result.data)
    const response = createResponse({ code: 201, message: BLACKLIST_MESSAGE.CREATED(result.data.clientId), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const updateBlacklist = async (req: Request, res: Response) => {
  const { clientId } = req.params
  const result = validatePartialBlacklist(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  if (Object.keys(result.data).length === 0) {
    const response = createResponse({ code: 400, error: BLACKLIST_MESSAGE.EMPTY_UPDATE(clientId) })
    return res.status(400).json(response).end()
  }

  if (result.data.createdBy !== undefined) {
    const userExist = await usersModel.getUserByUsername({ username: result.data.createdBy })

    if (userExist.length === 0) {
      const response = createResponse({ code: 409, message: BLACKLIST_MESSAGE.USER_DONT_EXIST(result.data.createdBy) })
      return res.status(409).json(response).end()
    }
  }

  try {
    const blacklist = await blacklistModel.getBlacklistById({ clientId })

    if (blacklist.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
      return res.status(404).json(response).end()
    }

    await blacklistModel.updateBlacklist({ clientId, newData: result.data })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.UPDATE(clientId), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const deleteBlacklist = async (req: Request, res: Response) => {
  const { clientId } = req.params

  try {
    const blacklist = await blacklistModel.getBlacklistById({ clientId })

    if (blacklist.length === 0) {
      const response = createResponse({ code: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
      return res.status(404).json(response).end()
    }

    await blacklistModel.deleteBlacklist({ clientId: blacklist[0].clientId })
    const response = createResponse({ code: 200, message: BLACKLIST_MESSAGE.DELETE(blacklist[0].clientId) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

export default {
  getAllBlacklist,
  getBlacklistById,
  createBlacklist,
  updateBlacklist,
  deleteBlacklist
}
