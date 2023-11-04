import type z from 'zod'
import { type servicesAreasScheme } from '@/schemes/servicesAreas'

export type ServiceAreaObject = z.infer<typeof servicesAreasScheme>

export type ServiceAreaOnlyName = Pick<ServiceAreaObject, 'name'>

export interface UpdateServiceAreaProps {
  name: ServiceAreaObject['name']
  newData: Partial<ServiceAreaObject>
}

export interface ServiceAreaReturn extends ServiceAreaObject {
  id: number
  createdAt: string
}
