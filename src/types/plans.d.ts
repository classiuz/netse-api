import type z from 'zod'
import { type plansScheme } from '@/schemes/plans'

export type PlanObject = z.infer<typeof plansScheme>

export interface PlanReturn extends PlanObject {
  id: number
}
