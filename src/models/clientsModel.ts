import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { ClientObject, ClientOnlyId, ClientReturn, UpdateClientProps } from '@/types/clients'

const getAllClients = async () => {
  const [rows] = await pool.query('SELECT * FROM users')
  return rows as ClientReturn[]
}

const getClientById = async ({ id }: ClientOnlyId) => {
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = (?)', [id])
  return rows as ClientReturn[]
}

const createClient = async ({ firstName, lastName, document, email, address, coordinates }: ClientObject) => {
  const date = getDate()
  try {
    await pool.query('INSERT INTO clients (firstName, lastName, document, email, address, coordinates, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, document, email, JSON.stringify(address), JSON.stringify(coordinates), date]
    )
  } catch (error) {
    throw error
  }
}

const updateClient = async ({ id, newData }: UpdateClientProps) => {
  try {
    await pool.query('UPDATE clients SET ? WHERE id = ?', [newData, id])
  } catch (error) {
    throw error
  }
}

const deleteClient = async ({ id }: ClientOnlyId) => {
  try {
    await pool.query('DELETE FROM clients WHERE (id) = (?)', [id])
  } catch (error) {
    throw error
  }
}

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
}
