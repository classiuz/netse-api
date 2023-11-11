import { SERVICES_AREAS_MESSAGE } from '@/lib/messages'
import servicesAreasModel from '@/models/servicesAreasModel'
import { validateServicesAreas, validatePartialServicesAreas } from '@/schemes/servicesAreas'
import { generalsServices, servicesServices, usersServices, servicesAreasServices, additionalsServices, plansServices } from '@/lib/services'

import { createResponse, handleError } from '@/lib/utils'

import type { Request, Response } from 'express'

const getAllServicesAreas = async (req: Request, res: Response) => {
  try {
    const rawData = await servicesAreasModel.getAllServicesAreas()
    const data = await Promise.all(rawData.map(async ({ plans: initialPlans, additionals: initialadditionals, ...rest }) => {
      const [plans, additionals] = await Promise.all([
        Promise.all(initialPlans.map(async name => await plansServices.exists({ name }).then(plans => plans[0]))),
        Promise.all(initialadditionals.map(async name => await additionalsServices.exists({ name }).then(additionals => additionals[0])))
      ])

      return {
        plans,
        additionals,
        ...rest
      }
    }))

    const response = createResponse({ code: 200, data })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const getServiceAreaByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const [{ plans: initialPlans, additionals: initialadditionals, ...rest }] = await servicesAreasServices.exists({ name })
    const plans = await Promise.all(initialPlans.map(async (name) => {
      const plans = await plansServices.exists({ name })
      return plans[0]
    }))

    const additionals = await Promise.all(initialadditionals.map(async (name) => {
      const additionals = await additionalsServices.exists({ name })
      return additionals[0]
    }))

    const response = createResponse({ code: 200, data: { ...rest, additionals, plans } })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const createServiceArea = async (req: Request, res: Response) => {
  try {
    const result = validateServicesAreas(req.body)
    await servicesAreasServices.alreadyExists({ name: result.name })
    await servicesServices.exists({ name: result.service })
    await usersServices.exists({ username: result.createdBy })

    await servicesAreasModel.createServiceArea(result)
    const response = createResponse({ code: 201, message: SERVICES_AREAS_MESSAGE.CREATED(result.name), data: [result] })
    res.status(201).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const updateServiceArea = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const result = validatePartialServicesAreas(req.body)
    await generalsServices.emptyUpdate({ data: result, message: SERVICES_AREAS_MESSAGE.EMPTY_UPDATE(name) })
    await servicesAreasServices.exists({ name })

    if (result.name !== undefined) {
      await servicesAreasServices.alreadyExists({ name: result.name })
    }

    if (result.service !== undefined) {
      await servicesServices.exists({ name: result.service })
    }

    if (result.createdBy !== undefined) {
      await usersServices.exists({ username: result.createdBy })
    }

    await servicesAreasModel.updateServiceArea({ name, newData: result })
    const response = createResponse({ code: 200, message: SERVICES_AREAS_MESSAGE.UPDATE(name), data: [result] })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

const deleteServiceArea = async (req: Request, res: Response) => {
  const { name } = req.params

  try {
    const serviceArea = await servicesAreasServices.exists({ name })

    await servicesAreasModel.deleteServiceArea({ name: serviceArea[0].name })
    const response = createResponse({ code: 200, message: SERVICES_AREAS_MESSAGE.DELETE(serviceArea[0].name) })
    res.status(200).json(response).end()
  } catch (error) {
    handleError({ error, res })
  }
}

export default {
  getAllServicesAreas,
  getServiceAreaByName,
  createServiceArea,
  updateServiceArea,
  deleteServiceArea
}
