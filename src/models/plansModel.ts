import pool from '@/config/database'
import type { PlanReturn } from '@/types/plans'

const getAllPlans = async () => {
  const [rows] = await pool.query('SELECT id, name, price, group FROM plans')
  return rows as PlanReturn[]
}

const getPlanByName = async () => {

}

const createPlan = async () => {

}

const updatePlan = async () => {

}

const deletePlan = async () => {

}

export default {
  getAllPlans,
  getPlanByName,
  createPlan,
  updatePlan,
  deletePlan
}
