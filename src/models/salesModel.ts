import pool from '@/config/database'
import type { SalesObject, SalesOnlyDocument, SalesOnlyId, SalesReturn, UpdateSalesProps } from '@/types/sales'
import paramsJsonParse from '@/utils/paramsJsonParse'

const getAllSales = async () => {
  const [rows] = await pool.query('SELECT * FROM sales')
  return rows as SalesReturn[]
}

const getSaleById = async ({ id }: SalesOnlyId) => {
  const [rows] = await pool.query('SELECT * FROM sales WHERE id = ?', [Number(id)])
  return rows as SalesReturn[]
}

const getSaleByDocument = async ({ document }: SalesOnlyDocument) => {
  const [rows] = await pool.query('SELECT * FROM sales WHERE document = ?', [document])
  return rows as SalesReturn[]
}

const createSale = async ({ firstName, lastName, document, email, phone, alternativePhone, service, plan, address, coordinates, notes, status, createdBy }: SalesObject) => {
  const date = new Date()

  try {
    await pool.query('INSERT INTO sales (firstName, lastName, document, email, phone, alternativePhone, service, plan, address, coordinates, notes, status, createdBy, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, document, email, phone, alternativePhone, service, plan, JSON.stringify(address), JSON.stringify(coordinates), notes, status, createdBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updateSale = async ({ newData, id }: UpdateSalesProps) => {
  const params = paramsJsonParse(newData)

  try {
    await pool.query('UPDATE sales SET ? WHERE id = ?', [params, Number(id)])
  } catch (error) {
    throw error
  }
}

const deleteSales = async ({ id }: SalesOnlyId) => {
  try {
    await pool.query('DELETE FROM sales WHERE (id) = ?', [Number(id)])
  } catch (error) {
    throw error
  }
}

export default {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  getSaleByDocument,
  deleteSales
}
