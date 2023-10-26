import type z from 'zod'
import { type blacklistScheme } from '@/schemes/blacklist'

export type blacklistObject = z.infer<typeof blacklistScheme>

export type blacklistOnlyClientId = Pick<blacklistObject, 'clientId'>

export interface UpdateBlacklistProps {
  clientId: blacklistObject['clientId']
  newData: Partial<blacklistObject>
}
