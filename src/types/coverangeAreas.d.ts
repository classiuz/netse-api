import type z from 'zod'
import { type coverageAreaScheme } from '@/schemes/coverangeAreas'

export type CoverangeAreaObject = z.infer<typeof coverageAreaScheme>

export type CoverangeAreaOnlyName = Pick<CoverangeAreaObject, 'name'>

export interface UpdateCoverangeAreaProps {
  name: CoverangeAreaObject['name']
  newData: Partial<CoverangeAreaObject>
}

export interface CoverangeAreaReturn extends CoverangeAreaObject {
  id: number
  createdAt: string
}
