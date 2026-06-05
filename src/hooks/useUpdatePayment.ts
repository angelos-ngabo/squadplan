import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { UpdatePaymentInput } from '../schemas/participant'
import { formatCurrency } from '../utils/formatters'

export function useUpdatePayment(slug: string) {
  return useMutation({
    mutationFn: async ({
      participantId,
      participantName,
      data,
    }: {
      participantId: string
      participantName: string
      data: UpdatePaymentInput
    }) => {
      if (!db) throw new Error('Firebase is not configured')

      await updateDoc(doc(db, 'events', slug, 'participants', participantId), {
        paidAmount: data.paidAmount,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod ?? '',
      })

      await addDoc(collection(db, 'events', slug, 'activityLog'), {
        message: `${participantName} payment updated — ${data.paymentStatus} (${formatCurrency(data.paidAmount)})`,
        createdAt: serverTimestamp(),
      })
    },
  })
}
