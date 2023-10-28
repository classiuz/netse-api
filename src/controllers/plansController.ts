import plansModel from '@/models/plansModel'
import createResponse from '@/utils/createResponse'
import type { Request, Response } from 'express'

const getAllPlans = async (req: Request, res: Response) => {
  try {
    const data = await plansModel.getAllPlans()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    const response = createResponse({ code: 500, error })
    res.status(500).json(response).end()
  }
}

const getPlanById = async (req: Request, res: Response) => {

}

const createPlan = async (req: Request, res: Response) => {

}

const updatePlan = async (req: Request, res: Response) => {

}

const deletePlan = async (req: Request, res: Response) => {

}

export default {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
}
