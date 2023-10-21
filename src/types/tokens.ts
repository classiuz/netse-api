import type z from 'zod'
import { type tokenScheme } from '@/schemes/tokens'

export type TokenObject = z.infer<typeof tokenScheme>

export interface TokenObjectWithId extends TokenObject {
  id: number
}

export interface TokenObjectWithIdAndValue extends TokenObjectWithId {
  value: string
}

export type TokenOnlyName = Pick<TokenObject, 'name'>
