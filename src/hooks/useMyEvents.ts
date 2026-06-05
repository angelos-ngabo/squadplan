import { useEffect, useRef } from 'react'
import { collection, onSnapshot, query, where, type QuerySnapshot } from 'firebase/firestore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { db } from '../firebase'
import { useAuth } from './useAuth'
import type { EventListItem } from '../schemas/event'

function mapEventDoc(id: string, data: Record<string, unknown>): EventListItem {
  return {
    slug: id,
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
    participantCount: 0,
    totalPaid: 0,
    totalPledged: 0,
  }
}

function applyParticipantStats(
  queryClient: ReturnType<typeof useQueryClient>,
  slug: string,
  snapshot: QuerySnapshot,
) {
  const participants = snapshot.docs.map((docSnap) => docSnap.data())
  const participantCount = participants.length
  const totalPaid = participants.reduce((sum, participant) => sum + Number(participant.paidAmount ?? 0), 0)
  const totalPledged = participants.reduce((sum, participant) => sum + Number(participant.pledgeAmount ?? 0), 0)

  queryClient.setQueryData<EventListItem[]>(['my-events'], (previous = []) =>
    previous.map((event) =>
      event.slug === slug ? { ...event, participantCount, totalPaid, totalPledged } : event,
    ),
  )
}

export function useMyEvents() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const participantUnsubs = useRef<Record<string, () => void>>({})

  useEffect(() => {
    if (!db || !user) {
      queryClient.setQueryData(['my-events'], [])
      return
    }

    const eventsQuery = query(collection(db, 'events'), where('organizerId', '==', user.uid))

    const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
      const slugs = new Set(snapshot.docs.map((docSnap) => docSnap.id))

      Object.keys(participantUnsubs.current).forEach((slug) => {
        if (!slugs.has(slug)) {
          participantUnsubs.current[slug]()
          delete participantUnsubs.current[slug]
        }
      })

      const events = snapshot.docs.map((docSnap) =>
        mapEventDoc(docSnap.id, docSnap.data() as Record<string, unknown>),
      )

      queryClient.setQueryData(['my-events'], events)

      events.forEach((event) => {
        if (participantUnsubs.current[event.slug]) return

        participantUnsubs.current[event.slug] = onSnapshot(
          collection(db!, 'events', event.slug, 'participants'),
          (participantSnapshot) => applyParticipantStats(queryClient, event.slug, participantSnapshot),
        )
      })
    })

    return () => {
      unsubEvents()
      Object.values(participantUnsubs.current).forEach((unsub) => unsub())
      participantUnsubs.current = {}
    }
  }, [queryClient, user?.uid])

  return useQuery<EventListItem[]>({
    queryKey: ['my-events'],
    queryFn: async () => [],
    staleTime: Infinity,
    enabled: Boolean(db && user),
  })
}
