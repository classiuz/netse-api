import type z from 'zod'
import { type tokenScheme } from '@/schemes/tokens'

export type TokenObject = z.infer<typeof tokenScheme>

export interface TokenObjectWithIdAndCreateAt extends TokenObject {
  id: number
  createAd: string
}

export interface TokenObjectWithIdAndCreateAtAndValue extends TokenObjectWithIdAndCreateAt {
  value: string
}

export type TokenOnlyName = Pick<TokenObject, 'name'>
