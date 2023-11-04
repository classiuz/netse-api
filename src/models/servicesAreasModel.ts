import pool from '@/config/database'
import type { ServiceAreaReturn, ServiceAreaOnlyName, ServiceAreaObject, UpdateServiceAreaProps } from '@/types/servicesAreas'
import getDate from '@/utils/getDate'
import paramsJsonParse from '@/utils/paramsJsonParse'

const getAllServicesAreas = async () => {
  const [rows] = await pool.query('SELECT * FROM `services-areas`')
  return rows as ServiceAreaReturn[]
}

const getServicesAreaByName = async ({ name }: ServiceAreaOnlyName) => {
  const [rows] = await pool.query('SELECT * FROM `services-areas` WHERE name = ?', [name])
  return rows as ServiceAreaReturn[]
}

const createServiceArea = async ({ name, province, service, plans, additionals, location, range, monitoringId, createdBy }: ServiceAreaObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO `services-areas` (`name`, `province`, `service`, `plans`, `additionals`, `location`, `range`, `monitoringId`, `createdBy`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, province, service, JSON.stringify(plans), JSON.stringify(additionals), JSON.stringify(location), JSON.stringify(range), monitoringId, createdBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updateServiceArea = async ({ newData, name }: UpdateServiceAreaProps) => {
  const params = paramsJsonParse(newData)

  try {
    await pool.query('UPDATE `services-areas` SET ? WHERE `name` = ?', [params, name])
  } catch (error) {
    throw error
  }
}

const deleteServiceArea = async ({ name }: ServiceAreaOnlyName) => {
  try {
    await pool.query('DELETE FROM `services-areas` WHERE `name` = ?', [name])
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
