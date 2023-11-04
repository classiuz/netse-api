import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { AdditionalObject, AdditionalOnlyName, AdditionalReturn, AdditionalUpdateProps } from '@/types/additional'
import paramsJsonParse from '@/utils/paramsJsonParse'

const getAllAdditionals = async () => {
  const [rows] = await pool.query('SELECT * FROM additionals')
  return rows as AdditionalReturn[]
}

const getAdditionalByName = async ({ name }: AdditionalOnlyName) => {
  const [rows] = await pool.query('SELECT * FROM additionals WHERE name = ?', [name])
  return rows as AdditionalReturn[]
}

const createAdditional = async ({ name, price, installmentsPrice, service, createdBy }: AdditionalObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO additionals (name, price, installmentsPrice, service, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, JSON.stringify(installmentsPrice), service, createdBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updateAdditional = async ({ newData, name }: AdditionalUpdateProps) => {
  const params = paramsJsonParse(newData)

  try {
    await pool.query('UPDATE additionals SET ? WHERE name = ?', [params, name])
  } catch (error) {
    throw error
  }
}

const deleteAdditional = async ({ name }: AdditionalOnlyName) => {
  try {
    await pool.query('DELETE FROM additionals WHERE (name) = (?)', [name])
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
