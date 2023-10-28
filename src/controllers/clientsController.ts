import { CLIENT_MESSAGE } from '@/const/messages'
import clientsModel from '@/models/clientsModel'
import { validateClient, validatePartialClient } from '@/schemes/clients'
import createResponse from '@/utils/createResponse'
import zodParseError from '@/utils/zodParseError'
import type { Request, Response } from 'express'

const getAllClients = async (req: Request, res: Response) => {
  try {
    const data = await clientsModel.getAllClients()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await clientsModel.getClientById({ id: Number(id) })

    if (data.length === 0) {
      const response = createResponse({ code: 404, message: CLIENT_MESSAGE.NOT_FOUND(id) })
      return res.status(404).json(response).end()
    }

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const createClient = async (req: Request, res: Response) => {
  const result = validateClient(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  try {
    await clientsModel.createClient(result.data)
    const response = createResponse({ code: 201, message: CLIENT_MESSAGE.CREATED(`${result.data.lastName} ${result.data.firstName}`), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = validatePartialClient(req.body)

  if (!result.success) {
    const error = zodParseError({ errors: result.error })
    const response = createResponse({ code: 400, error })
    return res.status(400).json(response).end()
  }

  if (Object.keys(result.data).length === 0) {
    const response = createResponse({ code: 400, error: CLIENT_MESSAGE.EMPTY_UPDATE(id) })
    return res.status(400).json(response).end()
  }

  try {
    const client = await clientsModel.getClientById({ id: Number(id) })

    if (client.length === 0) {
      const response = createResponse({ code: 404, message: CLIENT_MESSAGE.NOT_FOUND(id) })
      return res.status(404).json(response).end()
    }

    await clientsModel.updateClient({ id: Number(id), newData: result.data })
    const response = createResponse({ code: 200, message: CLIENT_MESSAGE.UPDATE(id), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const client = await clientsModel.getClientById({ id: Number(id) })

    if (client.length === 0) {
      const response = createResponse({ code: 404, message: CLIENT_MESSAGE.NOT_FOUND(id) })
      return res.status(404).json(response).end()
    }

    await clientsModel.deleteClient({ id: client[0].id })
    const response = createResponse({ code: 200, message: CLIENT_MESSAGE.DELETE(client[0].id) })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
}
