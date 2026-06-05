import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { ActivityEntry } from '../schemas/participant'

export function useActivityLog(slug: string) {
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!db || !slug) {
      setIsLoading(false)
      return
    }

    return onSnapshot(collection(db, 'events', slug, 'activityLog'), (snapshot) => {
      const entries = snapshot.docs
        .map((docSnap) => {
          const data = docSnap.data()
          return {
            id: docSnap.id,
            message: String(data.message ?? ''),
            createdAt: (data.createdAt as ActivityEntry['createdAt']) ?? null,
          }
        })
        .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))

      setActivityLog(entries)
      setIsLoading(false)
    })
  }, [slug])

  return { activityLog, isLoading }
}
