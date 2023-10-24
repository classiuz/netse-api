import type z from 'zod'
import { type blacklistScheme } from '@/schemes/blacklist'

export type blacklistObject = z.infer<typeof blacklistScheme>

export type blacklistOnlyClientName = Pick<blacklistObject, 'clientName'>

export interface UpdateUserProps {
  clientName: blacklistObject['clientName']
  newData: Partial<blacklistObject>
}
