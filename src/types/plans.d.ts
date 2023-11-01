import type z from 'zod'
import { type plansScheme } from '@/schemes/plans'

export type PlanObject = z.infer<typeof plansScheme>

export type PlanOnlyName = Pick<PlanObject, 'name'>

export interface PlanReturn extends PlanObject {
  id: number
  createdAt: string
}

export interface PlansUpdateProps {
  name: Pick['name']
  newData: Parital<PlanObject>
}
