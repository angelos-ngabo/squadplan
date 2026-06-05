import { useMutation, useQueryClient } from '@tanstack/react-query'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db } from '../firebase'
import type { CreateEventInput } from '../schemas/event'
import { slugify } from '../utils/slugify'

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEventInput) => {
      if (!db || !auth?.currentUser) throw new Error('You must be logged in to create an event')

      const slug = slugify(data.title)
      const batch = writeBatch(db)

      batch.set(doc(db, 'events', slug), {
        title: data.title,
        description: data.description ?? '',
        date: data.date ?? '',
        location: data.location ?? '',
        budgetTarget: data.budgetTarget ?? 0,
        contributionPerPerson: data.contributionPerPerson ?? 0,
        paymentMethods: data.paymentMethods ?? [],
        organizerName: data.organizerName,
        organizerPhone: data.organizerPhone ?? '',
        organizerId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      })

      batch.set(doc(collection(db, 'events', slug, 'activityLog')), {
        message: `${data.organizerName} created the event`,
        createdAt: serverTimestamp(),
      })

      await batch.commit()

      return {
        slug,
        joinUrl: `${window.location.origin}/event/${slug}`,
        dashboardUrl: `${window.location.origin}/event/${slug}/dashboard`,
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-events'] })
    },
  })
}
