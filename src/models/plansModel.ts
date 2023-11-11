import { database } from '@/lib/config'
import type { PlanObject, PlanOnlyName, PlanReturn, PlansUpdateProps } from '@/types/plans'

const getAllPlans = async () => {
  const [rows] = await database.query('SELECT * FROM plans')
  return rows as PlanReturn[]
}

const getPlanByName = async ({ name }: PlanOnlyName) => {
  const [rows] = await database.query('SELECT * FROM plans WHERE name = ?', [name])
  return rows as PlanReturn[]
}

const createPlan = async ({ name, price, download, upload, service, createdBy }: PlanObject) => {
  try {
    await database.query('INSERT INTO plans (name, download, upload, price, service, createdBy) VALUES (?, ?, ?, ?, ?, ?)',
      [name, download, upload, price, service, createdBy]
    )
  } catch (error) {
    throw error
  }
}

const updatePlan = async ({ newData, name }: PlansUpdateProps) => {
  try {
    await database.query('UPDATE plans SET ? WHERE name = ?', [newData, name])
  } catch (error) {
    throw error
  }
}

const deletePlan = async ({ name }: PlanOnlyName) => {
  try {
    await database.query('DELETE FROM plans WHERE (name) = ?', [name])
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
