import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import type { JoinEventInput } from '../schemas/participant'
import { formatCurrency } from '../utils/formatters'

export function useJoinEvent(slug: string) {
  return useMutation({
    mutationFn: async (data: JoinEventInput) => {
      if (!db) throw new Error('Firebase is not configured')

      await addDoc(collection(db, 'events', slug, 'participants'), {
        name: data.name,
        phone: data.phone ?? '',
        attendance: data.attendance,
        pledgeAmount: data.pledgeAmount,
        paidAmount: 0,
        paymentStatus: 'unpaid',
        paymentMethod: data.paymentMethod ?? '',
        joinedAt: serverTimestamp(),
      })

      await addDoc(collection(db, 'events', slug, 'activityLog'), {
        message: `${data.name} joined and pledged ${formatCurrency(data.pledgeAmount)}`,
        createdAt: serverTimestamp(),
      })
    },
  })
}
