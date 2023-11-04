import type z from 'zod'
import { type salesScheme } from '@/schemes/sales'

export type SalesObject = z.infer<typeof salesScheme>

export type SalesOnlyId = Pick<SalesReturn, 'id'>
export type SalesOnlyDocument = Pick<SalesReturn, 'document'>

export interface UpdateSalesProps {
  id: SalesReturn['id']
  newData: Partial<SalesObject>
}

export interface SalesReturn extends SalesObject {
  id: number
  createdAt: string
}
