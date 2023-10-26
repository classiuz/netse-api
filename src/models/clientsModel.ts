import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { ClientObject, ClientOnlyClientId, UpdateClientProps } from '@/types/clients'

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      clientId INT PRIMARY KEY AUTO_INCREMENT,
      clientFirstName VARCHAR(300) NOT NULL,
      clientLastName VARCHAR(300) NOT NULL,
      clientDocument INT NOT NULL,
      clientEmail VARCHAR(255) NOT NULL,
      clientAddress JSON NOT NULL,
      clientCoordinates JSON NOT NULL,
      createdAt VARCHAR(25) NOT NULL
    )
  `)
}

void createTable()

const getAllClients = async () => {
  const [rows] = await pool.query('SELECT * FROM users')
  return rows as ClientObject[]
}

const getClientById = async ({ clientId }: ClientOnlyClientId) => {
  const [rows] = await pool.query('SELECT * FROM clients WHERE clientId = (?)', [clientId])
  return rows as ClientObject[]
}

const createClient = async ({ clientFirstName, clientLastName, clientDocument, clientEmail, clientAddress, clientCoordinates }: ClientObject) => {
  const date = getDate()
  try {
    await pool.query('INSERT INTO clients (clientFirstName, clientLastName, clientDocument, clientEmail, clientAddress, clientCoordinates, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [clientFirstName, clientLastName, clientDocument, clientEmail, JSON.stringify(clientAddress), JSON.stringify(clientCoordinates), date]
    )
  } catch (error) {
    throw error
  }
}

const updateClient = async ({ clientId, newData }: UpdateClientProps) => {
  try {
    await pool.query('UPDATE clients SET ? WHERE clientId = ?', [newData, clientId])
  } catch (error) {
    throw error
  }
}

const deleteClient = async ({ clientId }: ClientOnlyClientId) => {
  try {
    await pool.query('DELETE FROM clients WHERE (clientId) = (?)', [clientId])
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
