import pool from '@/config/database'
import type { PlanObject, PlanOnlyName, PlanReturn, PlansUpdateProps } from '@/types/plans'
import getDate from '@/utils/getDate'

const getAllPlans = async () => {
  const [rows] = await pool.query('SELECT * FROM plans')
  return rows as PlanReturn[]
}

const getPlanByName = async ({ name }: PlanOnlyName) => {
  const [rows] = await pool.query('SELECT * FROM plans WHERE name = ?', [name])
  return rows as PlanReturn[]
}

const createPlan = async ({ name, price, download, upload, service, createdBy }: PlanObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO plans (name, download, upload, price, service, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, download, upload, price, service, createdBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updatePlan = async ({ newData, name }: PlansUpdateProps) => {
  try {
    await pool.query('UPDATE plans SET ? WHERE name = ?', [newData, name])
  } catch (error) {
    throw error
  }
}

const deletePlan = async ({ name }: PlanOnlyName) => {
  try {
    await pool.query('DELETE FROM plans WHERE (name) = ?', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllPlans,
  getPlanByName,
  createPlan,
  updatePlan,
  deletePlan
}
