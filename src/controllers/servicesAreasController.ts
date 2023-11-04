import { SERVICES_AREAS_MESSAGE } from '@/const/messages'
import servicesAreasModel from '@/models/servicesAreasModel'
import { validateServicesAreas, validatePartialServicesAreas } from '@/schemes/servicesAreas'
import { additionalExists } from '@/services/additionalsServices'
import { emptyUpdate } from '@/services/generalServices'
import { planExists } from '@/services/plansServices'
import { serviceAreaAlreadyExists, serviceAreaExists } from '@/services/servicesAreasServices'
import { serviceExists } from '@/services/servicesServices'
import { userExists } from '@/services/usersServices'
import createResponse from '@/utils/createResponse'
import handleError from '@/utils/handleError'
import type { Request, Response } from 'express'

const getAllServicesAreas = async (req: Request, res: Response) => {
  try {
    const rawData = await servicesAreasModel.getAllServicesAreas()
    const data = await Promise.all(rawData.map(async ({ plans: initialPlans, additionals: initialadditionals, ...rest }) => {
      const [plans, additionals] = await Promise.all([
        Promise.all(initialPlans.map(async name => await planExists({ name }).then(plans => plans[0]))),
        Promise.all(initialadditionals.map(async name => await additionalExists({ name }).then(additionals => additionals[0])))
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
    const [{ plans: initialPlans, additionals: initialadditionals, ...rest }] = await serviceAreaExists({ name })
    const plans = await Promise.all(initialPlans.map(async (name) => {
      const plans = await planExists({ name })
      return plans[0]
    }))

    const additionals = await Promise.all(initialadditionals.map(async (name) => {
      const additionals = await additionalExists({ name })
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
    await serviceAreaAlreadyExists({ name: result.name })
    await serviceExists({ name: result.service })
    await userExists({ username: result.createdBy })

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
    await emptyUpdate({ data: result, message: SERVICES_AREAS_MESSAGE.EMPTY_UPDATE(name) })
    await serviceAreaExists({ name })

    if (result.name !== undefined) {
      await serviceAreaAlreadyExists({ name: result.name })
    }

    if (result.service !== undefined) {
      await serviceExists({ name: result.service })
    }

    if (result.createdBy !== undefined) {
      await userExists({ username: result.createdBy })
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
    const serviceArea = await serviceAreaExists({ name })

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
