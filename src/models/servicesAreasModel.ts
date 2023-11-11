import { database } from '@/lib/config'
import { paramsJsonParse } from '@/lib/utils'
import type { ServiceAreaReturn, ServiceAreaOnlyName, ServiceAreaObject, UpdateServiceAreaProps } from '@/types/servicesAreas'

const getAllServicesAreas = async () => {
  const [rows] = await database.query('SELECT * FROM `services-areas`')
  return rows as ServiceAreaReturn[]
}

const getServicesAreaByName = async ({ name }: ServiceAreaOnlyName) => {
  const [rows] = await database.query('SELECT * FROM `services-areas` WHERE name = ?', [name])
  return rows as ServiceAreaReturn[]
}

const createServiceArea = async ({ name, province, service, plans, additionals, location, range, monitoringId, createdBy }: ServiceAreaObject) => {
  try {
    await database.query('INSERT INTO `services-areas` (`name`, `province`, `service`, `plans`, `additionals`, `location`, `range`, `monitoringId`, `createdBy`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, province, service, JSON.stringify(plans), JSON.stringify(additionals), JSON.stringify(location), JSON.stringify(range), monitoringId, createdBy]
    )
  } catch (error) {
    throw error
  }
}

const updateServiceArea = async ({ newData, name }: UpdateServiceAreaProps) => {
  const params = paramsJsonParse(newData)

  try {
    await database.query('UPDATE `services-areas` SET ? WHERE `name` = ?', [params, name])
  } catch (error) {
    throw error
  }
}

const deleteServiceArea = async ({ name }: ServiceAreaOnlyName) => {
  try {
    await database.query('DELETE FROM `services-areas` WHERE `name` = ?', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllServicesAreas,
  getServicesAreaByName,
  createServiceArea,
  updateServiceArea,
  deleteServiceArea
}
