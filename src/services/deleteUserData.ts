import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'

async function deleteSubcollection(eventId: string, name: string) {
  if (!db) return

  const snap = await getDocs(collection(db, 'events', eventId, name))
  if (snap.empty) return

  const batch = writeBatch(db)
  snap.docs.forEach((item) => batch.delete(item.ref))
  await batch.commit()
}

export async function deleteOrganizerEvents(organizerId: string) {
  if (!db) throw new Error('Firebase is not configured')

  const eventsSnap = await getDocs(query(collection(db, 'events'), where('organizerId', '==', organizerId)))

  for (const eventDoc of eventsSnap.docs) {
    await deleteSubcollection(eventDoc.id, 'participants')
    await deleteSubcollection(eventDoc.id, 'activityLog')
    await deleteDoc(doc(db, 'events', eventDoc.id))
  }
}
