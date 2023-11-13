import type z from 'zod'
import { type apiKeysScheme } from '@/schemes/apiKeys'

export type ApiKeyObject = z.infer<typeof apiKeysScheme>

export interface ApiKeyObjectWithIdAndCreateAt extends ApiKeyObject {
  id: number
  createAd: string
}

export interface ApiKeysObjectWithIdAndCreateAtAndValue extends ApiKeyObjectWithIdAndCreateAt {
  value: string
}

export type ApiKeyOnlyName = Pick<ApiKeyObject, 'name'>
