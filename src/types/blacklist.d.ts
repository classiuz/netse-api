import type z from 'zod'
import { type blacklistScheme } from '@/schemes/blacklist'

export type BlacklistObject = z.infer<typeof blacklistScheme>

export type BlacklistOnlyClientId = Pick<BlacklistObject, 'clientId'>

export interface UpdateBlacklistProps {
  clientId: BlacklistObject['clientId']
  newData: Partial<BlacklistObject>
}

export interface BlacklistReturn extends BlacklistObject {
  id: number
  createdAt: string
}
