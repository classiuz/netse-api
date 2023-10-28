import type z from 'zod'
import { type clientScheme } from '@/schemes/clients'

export type ClientObject = z.infer<typeof clientScheme>

export type ClientOnlyId = Pick<ClientObject, 'id'>

export interface UpdateClientProps {
  id: ClientObject['id']
  newData: Partial<ClientObject>
}

export interface ClientReturn extends ClientObject {
  id: number
  createdAt: string
}
