import { database } from '@/lib/config'
import type { AdditionalObject, AdditionalOnlyName, AdditionalReturn, AdditionalUpdateProps } from '@/types/additional'
import { paramsJsonParse } from '@/lib/utils'

const getAllAdditionals = async () => {
  const [rows] = await database.execute('SELECT * FROM additionals')
  return rows as AdditionalReturn[]
}

const getAdditionalByName = async ({ name }: AdditionalOnlyName) => {
  const [rows] = await database.query('SELECT * FROM additionals WHERE name = ?', [name])
  return rows as AdditionalReturn[]
}

const createAdditional = async ({ name, price, installmentsPrice, service, createdBy }: AdditionalObject) => {
  try {
    await database.query('INSERT INTO additionals (name, price, installmentsPrice, service, createdBy) VALUES (?, ?, ?, ?, ?)',
      [name, price, JSON.stringify(installmentsPrice), service, createdBy]
    )
  } catch (error) {
    throw error
  }
}

const updateAdditional = async ({ newData, name }: AdditionalUpdateProps) => {
  const params = paramsJsonParse(newData)

  try {
    await database.query('UPDATE additionals SET ? WHERE name = ?', [params, name])
  } catch (error) {
    throw error
  }
}

const deleteAdditional = async ({ name }: AdditionalOnlyName) => {
  try {
    await database.query('DELETE FROM additionals WHERE (name) = (?)', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllAdditionals,
  getAdditionalByName,
  createAdditional,
  updateAdditional,
  deleteAdditional
}
