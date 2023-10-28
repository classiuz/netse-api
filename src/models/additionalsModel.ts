import pool from '@/config/database'
import type { AdditionalReturn } from '@/types/additional'

const getAllAdditionals = async () => {
  const [rows] = await pool.query('SELECT id, name, price, group FROM additionals')
  return rows as AdditionalReturn[]
}

const getAdditionalByName = async () => {

}

const createAdditional = async () => {

}

const updateAdditional = async () => {

}

const deleteAdditional = async () => {

}

export default {
  getAllAdditionals,
  getAdditionalByName,
  createAdditional,
  updateAdditional,
  deleteAdditional
}
