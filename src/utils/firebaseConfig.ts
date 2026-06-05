const ENV_KEYS: Array<[string, string]> = [
  ['VITE_FIREBASE_API_KEY', 'apiKey'],
  ['VITE_FIREBASE_AUTH_DOMAIN', 'authDomain'],
  ['VITE_FIREBASE_PROJECT_ID', 'projectId'],
  ['VITE_FIREBASE_STORAGE_BUCKET', 'storageBucket'],
  ['VITE_FIREBASE_MESSAGING_SENDER_ID', 'messagingSenderId'],
  ['VITE_FIREBASE_APP_ID', 'appId'],
]

export function getFirebaseConfig() {
  return Object.fromEntries(
    ENV_KEYS.map(([envKey, configKey]) => [configKey, import.meta.env[envKey]]),
  )
}

const REQUIRED_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
]

export function isFirebaseConfigured() {
  return REQUIRED_ENV.every((key) => {
    const value = import.meta.env[key]
    return typeof value === 'string' && value.trim().length > 0
  })
}
