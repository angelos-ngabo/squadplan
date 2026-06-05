import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  async function login(email: string, password: string) {
    if (!auth) throw new Error('Firebase is not configured')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(getFirebaseAuthErrorMessage(error))
    }
  }

  async function signup(name: string, email: string, password: string) {
    if (!auth) throw new Error('Firebase is not configured')
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name })
    } catch (error) {
      throw new Error(getFirebaseAuthErrorMessage(error))
    }
  }

  async function logout() {
    if (!auth) throw new Error('Firebase is not configured')
    await signOut(auth)
  }

  return { user, loading, login, signup, logout }
}
