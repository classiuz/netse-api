import { database } from '@/lib/config'
import type { ServiceObject, ServiceOnlyName, ServiceReturn, UpdateServiceProps } from '@/types/services'

const getAllServices = async () => {
  const [rows] = await database.query('SELECT id, name, alternativeName, createdBy, createdAt FROM services')
  return rows as ServiceReturn[]
}

const getServiceByName = async ({ name }: ServiceOnlyName) => {
  const [rows] = await database.query('SELECT id, name, alternativeName, createdBy, createdAt FROM services WHERE name = ?', [name])
  return rows as ServiceReturn[]
}

const createService = async ({ name, createdBy, alternativeName }: ServiceObject) => {
  try {
    await database.query('INSERT INTO services (name, alternativeName, createdBy) VALUES (?, ?, ?)',
      [name, alternativeName, createdBy]
    )
  } catch (error) {
    throw error
  }
}

const updateService = async ({ newData, name }: UpdateServiceProps) => {
  try {
    await database.query('UPDATE services SET ? WHERE name = ?', [newData, name])
  } catch (error) {
    throw error
  }
}

const deleteService = async ({ name }: ServiceOnlyName) => {
  try {
    await database.query('DELETE FROM services WHERE (name) = (?)', [name])
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
