import pool from '@/config/database'
import type { ServiceObject, ServiceOnlyName, ServiceReturn, UpdateServiceProps } from '@/types/services'
import getDate from '@/utils/getDate'

const getAllServices = async () => {
  const [rows] = await pool.query('SELECT id, name, alternativeName, createdBy, createdAt FROM services')
  return rows as ServiceReturn[]
}

const getServiceByName = async ({ name }: ServiceOnlyName) => {
  const [rows] = await pool.query('SELECT id, name, alternativeName, createdBy, createdAt FROM services WHERE name = ?', [name])
  return rows as ServiceReturn[]
}

const createService = async ({ name, createdBy, alternativeName }: ServiceObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO services (name, alternativeName, createdBy, createdAt) VALUES (?, ?, ?, ?)',
      [name, alternativeName, createdBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updateService = async ({ newData, name }: UpdateServiceProps) => {
  try {
    await pool.query('UPDATE services SET ? WHERE name = ?', [newData, name])
  } catch (error) {
    throw error
  }
}

const deleteService = async ({ name }: ServiceOnlyName) => {
  try {
    await pool.query('DELETE FROM services WHERE (name) = (?)', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllServices,
  getServiceByName,
  createService,
  updateService,
  deleteService
}
