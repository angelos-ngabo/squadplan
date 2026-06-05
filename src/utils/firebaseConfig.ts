const ENV_KEYS: Array<[string, string]> = [
  ['VITE_FIREBASE_API_KEY', 'apiKey'],
  ['VITE_FIREBASE_AUTH_DOMAIN', 'authDomain'],
  ['VITE_FIREBASE_PROJECT_ID', 'projectId'],
  ['VITE_FIREBASE_STORAGE_BUCKET', 'storageBucket'],
  ['VITE_FIREBASE_MESSAGING_SENDER_ID', 'messagingSenderId'],
  ['VITE_FIREBASE_APP_ID', 'appId'],
]

const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'] as const

export type FirebaseClientConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId: string
}

export function getFirebaseConfigFromEnv(): FirebaseClientConfig {
  return Object.fromEntries(
    ENV_KEYS.map(([envKey, configKey]) => [configKey, import.meta.env[envKey]]),
  ) as FirebaseClientConfig
}

export function isValidFirebaseConfig(
  config: Partial<FirebaseClientConfig> | null | undefined,
): config is FirebaseClientConfig {
  if (!config) return false
  return REQUIRED_KEYS.every((key) => {
    const value = config[key]
    return typeof value === 'string' && value.trim().length > 0
  })
}

export function isFirebaseConfigured() {
  return isValidFirebaseConfig(getFirebaseConfigFromEnv())
}

export async function loadFirebaseConfigFromFile(): Promise<FirebaseClientConfig | null> {
  try {
    const response = await fetch('/firebase-config.json')
    if (!response.ok) return null
    const config = (await response.json()) as Partial<FirebaseClientConfig>
    return isValidFirebaseConfig(config) ? config : null
  } catch {
    return null
  }
}
