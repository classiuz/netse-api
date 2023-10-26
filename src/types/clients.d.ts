import type z from 'zod'
import { type clientScheme } from '@/schemes/clients'

export type ClientObject = z.infer<typeof clientScheme>

export type ClientOnlyClientId = Pick<ClientObject, 'clientId'>

export interface UpdateClientProps {
  clientId: ClientObject['clientId']
  newData: Partial<ClientObject>
}
