import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getFirebaseConfig, isFirebaseConfigured } from './utils/firebaseConfig'

const firebaseConfig = getFirebaseConfig()

let auth: Auth | null = null
let db: Firestore | null = null

if (isFirebaseConfigured()) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db, isFirebaseConfigured }
