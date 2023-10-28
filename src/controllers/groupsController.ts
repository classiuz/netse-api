import { GROUPS_MESSAGE } from '@/const/messages'
import groupsModel from '@/models/groupsModel'
import { validateGroup, validatePartialGroup } from '@/schemes/groups'
import createResponse from '@/utils/createResponse'
import zodParseError from '@/utils/zodParseError'
import type { Request, Response } from 'express'

const getAllGroups = async (req: Request, res: Response) => {
  try {
    const data = await groupsModel.getAllGroups()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getGroupByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const data = await groupsModel.getGroupByName({ name })

    if (data.length === 0) {
      const response = createResponse({ code: 404, message: GROUPS_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const createGroup = async (req: Request, res: Response) => {
  const result = validateGroup(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  const alreadyCreated = await groupsModel.getGroupByName({ name: result.data.name })

  if (alreadyCreated.length >= 1) {
    const response = createResponse({ code: 409, message: GROUPS_MESSAGE.ALREADY_CREATED(result.data.name) })
    return res.status(409).json(response).end()
  }

  try {
    await groupsModel.createGroup(result.data)
    const response = createResponse({ code: 201, message: GROUPS_MESSAGE.CREATED(result.data.name), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const updateGroup = async (req: Request, res: Response) => {
  const { name } = req.params
  const result = validatePartialGroup(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  if (Object.keys(result.data).length === 0) {
    const response = createResponse({ code: 400, error: GROUPS_MESSAGE.EMPTY_UPDATE(name) })
    return res.status(400).json(response).end()
  }

  try {
    const group = await groupsModel.getGroupByName({ name })

    if (group.length === 0) {
      const response = createResponse({ code: 404, message: GROUPS_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    await groupsModel.updateGroup({ name, newData: result.data })
    const response = createResponse({ code: 200, message: GROUPS_MESSAGE.UPDATE(name), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const deleteGroup = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const group = await groupsModel.getGroupByName({ name })

    if (group.length === 0) {
      const response = createResponse({ code: 404, message: GROUPS_MESSAGE.NOT_FOUND(name) })
      return res.status(404).json(response).end()
    }

    await groupsModel.deleteGroup({ name: group[0].name })
    const response = createResponse({ code: 200, message: GROUPS_MESSAGE.DELETE(group[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

export default {
  getAllGroups,
  getGroupByName,
  createGroup,
  updateGroup,
  deleteGroup
}
