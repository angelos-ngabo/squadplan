import { z } from 'zod'

export const PAYMENT_METHODS = ['MOMO', 'Airtel Money', 'Cash', 'Bank Transfer'] as const

export const createEventSchema = z.object({
  title: z.preprocess(
    (v) => (typeof v === 'string' ? v : ''),
    z.string().min(1, 'Event title is required'),
  ),
  description: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
  date: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
  location: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
  budgetTarget: z.preprocess(
    (v) => (v === '' || v === undefined || v === null || Number.isNaN(Number(v)) ? 0 : Number(v)),
    z.number().min(0),
  ),
  contributionPerPerson: z.preprocess(
    (v) => (v === '' || v === undefined || v === null || Number.isNaN(Number(v)) ? 0 : Number(v)),
    z.number().min(0),
  ),
  organizerName: z.preprocess(
    (v) => (typeof v === 'string' ? v : ''),
    z.string().min(1, 'Organizer name is required'),
  ),
  organizerPhone: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
  paymentMethods: z.preprocess(
    (v) => (Array.isArray(v) ? v : []),
    z.array(z.string()),
  ),
})

export type CreateEventInput = z.infer<typeof createEventSchema>

export interface EventDocument {
  title: string
  description?: string
  date?: string
  location?: string
  budgetTarget: number
  contributionPerPerson: number
  paymentMethods: string[]
  organizerName: string
  organizerPhone?: string
  organizerId: string
}

export interface EventListItem extends EventDocument {
  slug: string
  participantCount: number
  totalPaid: number
  totalPledged: number
}
