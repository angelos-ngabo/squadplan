import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import {
  getFirebaseConfigFromEnv,
  isFirebaseConfigured,
  isValidFirebaseConfig,
  loadFirebaseConfigFromFile,
  type FirebaseClientConfig,
} from './utils/firebaseConfig'

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let initPromise: Promise<boolean> | null = null

function initializeFromConfig(config: FirebaseClientConfig) {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
}

export async function initFirebase(): Promise<boolean> {
  if (auth && db) return true

  if (isFirebaseConfigured()) {
    initializeFromConfig(getFirebaseConfigFromEnv())
    return true
  }

  const fileConfig = await loadFirebaseConfigFromFile()
  if (fileConfig) {
    initializeFromConfig(fileConfig)
    return true
  }

  return false
}

export function ensureFirebaseInit(): Promise<boolean> {
  if (!initPromise) {
    initPromise = initFirebase()
  }
  return initPromise
}

export { auth, db, isFirebaseConfigured, isValidFirebaseConfig }
