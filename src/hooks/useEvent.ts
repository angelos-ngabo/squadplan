import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { EventDocument } from '../schemas/event'

export function useEvent(slug: string) {
  const [event, setEvent] = useState<EventDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!db || !slug) {
      setIsLoading(false)
      return
    }

    return onSnapshot(doc(db, 'events', slug), (snapshot) => {
      if (!snapshot.exists()) {
        setEvent(null)
        setIsLoading(false)
        return
      }

      const data = snapshot.data()
      setEvent({
        title: String(data.title ?? ''),
        description: data.description ? String(data.description) : undefined,
        date: data.date ? String(data.date) : undefined,
        location: data.location ? String(data.location) : undefined,
        budgetTarget: Number(data.budgetTarget ?? 0),
        contributionPerPerson: Number(data.contributionPerPerson ?? 0),
        paymentMethods: Array.isArray(data.paymentMethods) ? (data.paymentMethods as string[]) : [],
        organizerName: String(data.organizerName ?? ''),
        organizerPhone: data.organizerPhone ? String(data.organizerPhone) : undefined,
        organizerId: String(data.organizerId ?? ''),
      })
      setIsLoading(false)
    })
  }, [slug])

  return { event, isLoading }
}
