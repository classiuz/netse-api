import { ResponseError } from '@/lib/errors'
import { USERS_MESSAGES, API_KEYS_MESSAGE, SERVICES_MESSAGE, SERVICES_AREAS_MESSAGE, SALES_MESSAGE, PLANS_MESSAGE, BLACKLIST_MESSAGE, ADDITIONAL_MESSAGE } from '@/lib/messages'

import usersModels from '@/models/usersModel'
import apiKeysModel from '@/models/apiKeysModel'
import servicesModel from '@/models/servicesModel'
import servicesAreasModel from '@/models/servicesAreasModel'
import salesModel from '@/models/salesModel'
import plansModel from '@/models/plansModel'
import blacklistModel from '@/models/blacklistModel'
import additionalsModel from '@/models/additionalsModel'

import type { UserOnlyUsername, GetUserProps } from '@/types/user'
import type { ApiKeyOnlyName } from '@/types/apiKeys'
import type { ServiceAreaOnlyName } from '@/types/servicesAreas'
import type { SalesOnlyDocument, SalesOnlyId } from '@/types/sales'
import type { PlanOnlyName } from '@/types/plans'
import type { AdditionalOnlyName } from '@/types/additional'

export const generalsServices = {
  emptyUpdate: async ({ data, message }: { data: object, message: string }) => {
    if (Object.keys(data).length === 0) {
      throw new ResponseError({ status: 400, message })
    }
  }
}

export const usersServices = {
  exists: async ({ username, selectFields }: GetUserProps) => {
    const users = await usersModels.getUserByUsername({ username, selectFields })

    if (users.length === 0) {
      throw new ResponseError({ status: 404, message: USERS_MESSAGES.NOT_FOUND(username) })
    }

    return users
  },

  alreadyExists: async ({ username }: UserOnlyUsername) => {
    const users = await usersModels.getUserByUsername({ username })

    if (users.length >= 1) {
      throw new ResponseError({ status: 409, message: USERS_MESSAGES.ALREADY_CREATED(username) })
    }

    return users
  }
}

export const apiKeysServices = {
  exists: async ({ name }: ApiKeyOnlyName) => {
    const apiKeys = await apiKeysModel.getApiKeyByName({ name })

    if (apiKeys.length === 0) {
      throw new ResponseError({ status: 404, message: API_KEYS_MESSAGE.NOT_FOUND(name) })
    }

    return apiKeys
  },

  alreadyExists: async ({ name }: ApiKeyOnlyName) => {
    const apiKeys = await apiKeysModel.getApiKeyByName({ name })

    if (apiKeys.length >= 1) {
      throw new ResponseError({ status: 409, message: API_KEYS_MESSAGE.ALREADY_CREATED(name) })
    }

    return apiKeys
  }
}

export const servicesServices = {
  exists: async ({ name }: { name: string }) => {
    const services = await servicesModel.getServiceByName({ name })

    if (services.length === 0) {
      throw new ResponseError({ status: 404, message: SERVICES_MESSAGE.NOT_FOUND(name) })
    }

    return services
  },

  alreadyExists: async ({ name }: { name: string }) => {
    const services = await servicesModel.getServiceByName({ name })

    if (services.length >= 1) {
      throw new ResponseError({ status: 409, message: SERVICES_MESSAGE.ALREADY_CREATED(name) })
    }

    return services
  }
}

export const servicesAreasServices = {
  exists: async ({ name }: ServiceAreaOnlyName) => {
    const serviceArea = await servicesAreasModel.getServicesAreaByName({ name })

    if (serviceArea.length === 0) {
      throw new ResponseError({ status: 404, message: SERVICES_AREAS_MESSAGE.NOT_FOUND(name) })
    }

    return serviceArea
  },

  alreadyExists: async ({ name }: ServiceAreaOnlyName) => {
    const serviceArea = await servicesAreasModel.getServicesAreaByName({ name })

    if (serviceArea.length >= 1) {
      throw new ResponseError({ status: 409, message: SERVICES_AREAS_MESSAGE.ALREADY_CREATED(name) })
    }

    return serviceArea
  }

}

export const salesServices = {
  exists: async ({ id }: SalesOnlyId) => {
    const sales = await salesModel.getSaleById({ id })

    if (sales.length === 0) {
      throw new ResponseError({ status: 404, message: SALES_MESSAGE.NOT_FOUND(id) })
    }

    return sales
  },

  alreadyExists: async ({ document }: SalesOnlyDocument) => {
    const sales = await salesModel.getSaleByDocument({ document })

    if (sales.length >= 1) {
      throw new ResponseError({ status: 409, message: SALES_MESSAGE.ALREADY_CREATED(document) })
    }

    return sales
  }
}

export const plansServices = {
  exists: async ({ name }: PlanOnlyName) => {
    const plans = await plansModel.getPlanByName({ name })

    if (plans.length === 0) {
      throw new ResponseError({ status: 404, message: PLANS_MESSAGE.NOT_FOUND(name) })
    }

    return plans
  },

  alreadyExists: async ({ name }: PlanOnlyName) => {
    const plans = await plansModel.getPlanByName({ name })

    if (plans.length >= 1) {
      throw new ResponseError({ status: 409, message: PLANS_MESSAGE.ALREADY_CREATED(name) })
    }

    return plans
  }
}

export const blacklistServices = {
  exists: async ({ clientId }: { clientId: string }) => {
    const blacklist = await blacklistModel.getBlacklistById({ clientId })

    if (blacklist.length === 0) {
      throw new ResponseError({ status: 404, message: BLACKLIST_MESSAGE.NOT_FOUND(clientId) })
    }

    return blacklist
  },

  alreadyExists: async ({ clientId }: { clientId: string }) => {
    const blacklist = await blacklistModel.getBlacklistById({ clientId })

    if (blacklist.length >= 1) {
      throw new ResponseError({ status: 409, message: BLACKLIST_MESSAGE.ALREADY_CREATED(clientId) })
    }

    return blacklist
  }
}

export const additionalsServices = {
  exists: async ({ name }: AdditionalOnlyName) => {
    const additionals = await additionalsModel.getAdditionalByName({ name })

    if (additionals.length === 0) {
      throw new ResponseError({ status: 404, message: ADDITIONAL_MESSAGE.NOT_FOUND(name) })
    }

    return additionals
  },

  alreadyExists: async ({ name }: AdditionalOnlyName) => {
    const additionals = await additionalsModel.getAdditionalByName({ name })

    if (additionals.length >= 1) {
      throw new ResponseError({ status: 409, message: ADDITIONAL_MESSAGE.ALREADY_CREATED(name) })
    }

    return additionals
  }
}
