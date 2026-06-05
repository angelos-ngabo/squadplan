import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { Participant } from '../schemas/participant'

export function useParticipants(slug: string) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!db || !slug) {
      setIsLoading(false)
      return
    }

    return onSnapshot(collection(db, 'events', slug, 'participants'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          name: String(data.name ?? ''),
          phone: data.phone ? String(data.phone) : undefined,
          attendance: (data.attendance ?? 'attending') as Participant['attendance'],
          pledgeAmount: Number(data.pledgeAmount ?? 0),
          paidAmount: Number(data.paidAmount ?? 0),
          paymentStatus: (data.paymentStatus ?? 'unpaid') as Participant['paymentStatus'],
          paymentMethod: data.paymentMethod ? String(data.paymentMethod) : undefined,
        }
      })
      setParticipants(list)
      setIsLoading(false)
    })
  }, [slug])

  return { participants, isLoading }
}
