import { type ZodError } from 'zod'

export interface ParseOptions<Scheme> {
  errors: ZodError<Scheme>
}

export interface ParseReturn {
  type: string
  fields: string
  message: string
}
