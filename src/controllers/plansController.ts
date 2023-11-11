import { PLANS_MESSAGE } from '@/lib/messages'
import plansModel from '@/models/plansModel'
import { validatePartialPlan, validatePlan } from '@/schemes/plans'
import { generalsServices, servicesServices, usersServices, plansServices } from '@/lib/services'

import { createResponse, handleError } from '@/lib/utils'

import type { Request, Response } from 'express'

const getAllPlans = async (req: Request, res: Response) => {
  try {
    const data = await plansModel.getAllPlans()
    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getPlanByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const data = await plansServices.exists({ name })

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createPlan = async (req: Request, res: Response) => {
  try {
    const result = validatePlan(req.body)
    await plansServices.alreadyExists({ name: result.data.name })
    await usersServices.exists({ username: result.data.createdBy })
    await servicesServices.exists({ name: result.data.service })

    await plansModel.createPlan(result.data)
    const response = createResponse({ code: 201, message: PLANS_MESSAGE.CREATED(result.data.name), data: [result.data] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updatePlan = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const result = validatePartialPlan(req.body)
    await generalsServices.emptyUpdate({ data: result.data, message: PLANS_MESSAGE.EMPTY_UPDATE(name) })
    await plansServices.exists({ name })

    if (result.data.name !== undefined) {
      await plansServices.alreadyExists({ name: result.data.name })
    }

    if (result.data.createdBy !== undefined) {
      await usersServices.exists({ username: result.data.createdBy })
    }

    if (result.data.service !== undefined) {
      await servicesServices.exists({ name: result.data.service })
    }

    await plansModel.updatePlan({ name, newData: result.data })
    const response = createResponse({ code: 200, message: PLANS_MESSAGE.UPDATE(name), data: [result.data] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deletePlan = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const plan = await plansServices.exists({ name })

    await plansModel.deletePlan({ name: plan[0].name })
    const response = createResponse({ code: 200, message: PLANS_MESSAGE.DELETE(plan[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllPlans,
  getPlanByName,
  createPlan,
  updatePlan,
  deletePlan
}
