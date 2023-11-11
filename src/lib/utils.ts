// import pool from '@/config/database'
import { RESPONSE_MESSAGES, RESPONSE_STATUS } from '@/lib/constants'
import { ResponseError, ValidationError } from '@/lib/errors'
import type { ResponseObject } from '@/types/response'
import type { ParseOptions, ParseReturn } from '@/types/error'
import type { Response } from 'express'

export const handleError = ({ error, res }: { error: unknown, res: Response }) => {
  if (error instanceof ResponseError) {
    const response = createResponse({ code: error.status, message: error.message })
    res.status(error.status).json(response).end()
    return
  }

  if (error instanceof ValidationError) {
    const response = createResponse({ code: error.status, error: error.error })
    res.status(error.status).json(response).end()
    return
  }

  const response = createResponse({ code: 500, error })
  res.status(500).json(response).end()
}

export const createResponse = ({ code, message, data, error }: ResponseObject) => {
  if (data !== undefined) {
    return {
      code,
      status: RESPONSE_STATUS[code],
      message: message ?? RESPONSE_MESSAGES[code],
      data: data ?? []
    }
  }
  return {
    code,
    status: RESPONSE_STATUS[code],
    message: message ?? RESPONSE_MESSAGES[code],
    error: error ?? []
  }
}

export const zodParseError = <Scheme>({ errors }: ParseOptions<Scheme>): ParseReturn[] => {
  const { issues } = errors
  return issues.map((current) => {
    const type = current.code.toUpperCase()
    const fields = current.path.join(' > ')

    if (current.code === 'invalid_type') {
      return {
        type,
        fields,
        message: `Expected ${current.expected} and received ${current.received}.`
      }
    }

    return {
      type,
      fields,
      message: current.message
    }
  })
}

export const paramsJsonParse = (params: object) => {
  return Object.assign({}, ...Object.entries(params).map(([key, value]) => ({
    [key]: typeof value === 'object' ? JSON.stringify(value) : value
  })))
}

// interface Conditions {
//   row: string
//   value: string
// }

// const executeQuery = async (query: string, values: string[]) => {
//   try {
//     const [result] = await database.execute(query, values)
//     return result
//   } catch (error) {
//     console.error(`Error executing query: ${query}`, error)
//     throw error
//   }
// }

// export const databaseQuery = {
//   select: async ({ table, rows, conditions }: { table: string, rows: string[], conditions?: Conditions }) => {
//     const query = `SELECT ${rows.join(', ')} FROM \`${table}\`${conditions ? ' WHERE ? = (?)' : ''}`
//     const values = conditions ? [conditions.row, conditions.value] : []
//     return await executeQuery(query, values)
//   },

//   insert: async ({ table, values }: { table: string, values: object }) => {
//     const query = `INSERT INTO \`${table}\` (${Object.keys(values).join(', ')}) VALUES (${Object.values(values).map(() => '?').join(', ')})`
//     return await executeQuery(query, Object.values(values))
//   },

//   update: async ({ table, values, conditions }: { table: string, values: object, conditions: Conditions }) => {
//     const setClause = Object.entries(values).map(([row]) => `${row} = ?`).join(', ')
//     const query = `UPDATE \`${table}\` SET ${setClause} WHERE ? = ?`
//     const valuesArray = [...Object.values(values), conditions.row, conditions.value]
//     return await executeQuery(query, valuesArray)
//   },

//   delete: async ({ table, conditions }: { table: string, conditions: Conditions }) => {
//     const query = `DELETE FROM \`${table}\` WHERE ?? = ?`
//     const value = [conditions.row, conditions.value]
//     return await executeQuery(query, value)
//   }
// }
