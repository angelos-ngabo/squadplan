import { z } from 'zod'

export const joinEventSchema = z.object({
  name: z.preprocess(
    (v) => (typeof v === 'string' ? v : ''),
    z.string().min(1, 'Name is required'),
  ),
  phone: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
  attendance: z.preprocess(
    (v) => (v === 'attending' || v === 'maybe' || v === 'not_attending' ? v : 'attending'),
    z.enum(['attending', 'maybe', 'not_attending']),
  ),
  pledgeAmount: z.preprocess(
    (v) => (v === '' || v === undefined || v === null || Number.isNaN(Number(v)) ? 0 : Number(v)),
    z.number().min(0),
  ),
  paymentMethod: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string()),
})

export type JoinEventInput = z.infer<typeof joinEventSchema>

export const updatePaymentSchema = z.object({
  paidAmount: z.preprocess(
    (v) => (v === '' || v === undefined || v === null || Number.isNaN(Number(v)) ? 0 : Number(v)),
    z.number().min(0),
  ),
  paymentStatus: z.preprocess(
    (v) => (v === 'unpaid' || v === 'partial' || v === 'paid' ? v : 'unpaid'),
    z.enum(['unpaid', 'partial', 'paid']),
  ),
  paymentMethod: z.preprocess((v) => (typeof v === 'string' ? v : ''), z.string().optional()),
})

export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>

export function normalizePaymentUpdate(
  data: UpdatePaymentInput,
  pledgeAmount: number,
): UpdatePaymentInput {
  let { paidAmount, paymentStatus, paymentMethod } = data

  if (paymentStatus === 'paid' && paidAmount <= 0) {
    paidAmount = pledgeAmount
  } else if (paymentStatus === 'unpaid') {
    paidAmount = 0
  }

  if (paidAmount <= 0) {
    paymentStatus = 'unpaid'
  } else if (pledgeAmount > 0 && paidAmount >= pledgeAmount) {
    paymentStatus = 'paid'
  } else {
    paymentStatus = 'partial'
  }

  return { paidAmount, paymentStatus, paymentMethod }
}

export interface ParticipantDocument {
  name: string
  phone?: string
  attendance: 'attending' | 'maybe' | 'not_attending'
  pledgeAmount: number
  paidAmount: number
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  paymentMethod?: string
}

export interface Participant extends ParticipantDocument {
  id: string
}

export interface ActivityEntry {
  id: string
  message: string
  createdAt: { seconds: number; toDate?: () => Date } | null
}
