import additionalsModel from '@/models/additionalsModel'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

const getAllAdditional = async (req: Request, res: Response) => {
  try {
    const data = await additionalsModel.getAllAdditionals()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getAdditionalByName = async (req: Request, res: Response) => {

}

const createAdditional = async (req: Request, res: Response) => {

}

const updateAdditional = async (req: Request, res: Response) => {

}

const deleteAdditional = async (req: Request, res: Response) => {

}

export default {
  getAllAdditional,
  getAdditionalByName,
  createAdditional,
  updateAdditional,
  deleteAdditional
}
