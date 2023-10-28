import type z from 'zod'
import { type servicesScheme } from '@/schemes/services'

export type ServiceObject = z.infer<typeof servicesScheme>

export type ServiceOnlyName = Pick<ServiceObject, 'name'>

export interface UpdateServiceProps {
  name: ServiceObject['name']
  newData: Partial<ServiceObject>
}

export interface ServiceReturn extends ServiceObject {
  id: number
  createdAt: string
}
