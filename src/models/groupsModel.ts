import pool from '@/config/database'
import type { GroupObject, GroupOnlyName, GroupReturn, UpdateGroupProps } from '@/types/groups'

const getAllGroups = async () => {
  const [rows] = await pool.query('SELECT id, name, towers FROM `groups`')
  return rows as GroupReturn[]
}

const getGroupByName = async ({ name }: GroupOnlyName) => {
  const [rows] = await pool.query('SELECT id, name, towers FROM `groups` WHERE name = ?', [name])
  return rows as GroupReturn[]
}

const createGroup = async ({ name, towers }: GroupObject) => {
  try {
    await pool.query('INSERT INTO `groups` (name, towers) VALUES (?, ?)',
      [name, towers]
    )
  } catch (error) {
    throw error
  }
}

const updateGroup = async ({ newData, name }: UpdateGroupProps) => {
  try {
    await pool.query('UPDATE `groups` SET ? WHERE gronameupName = ?', [newData, name])
  } catch (error) {
    throw error
  }
}

const deleteGroup = async ({ name }: GroupOnlyName) => {
  try {
    await pool.query('DELETE FROM `groups` WHERE name = (?)', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllGroups,
  getGroupByName,
  createGroup,
  updateGroup,
  deleteGroup
}
