import { PLANS_MESSAGE } from '@/const/messages'
import { ResponseError } from '@/errors/responseError'
import plansModel from '@/models/plansModel'
import type { PlanOnlyName } from '@/types/plans'

export const planExists = async ({ name }: PlanOnlyName) => {
  const plans = await plansModel.getPlanByName({ name })

  if (plans.length === 0) {
    throw new ResponseError({ status: 404, message: PLANS_MESSAGE.NOT_FOUND(name) })
  }

  return plans
}

export const planAlreadyExists = async ({ name }: PlanOnlyName) => {
  const plans = await plansModel.getPlanByName({ name })

  if (plans.length >= 1) {
    throw new ResponseError({ status: 409, message: PLANS_MESSAGE.ALREADY_CREATED(name) })
  }

  return plans
}
