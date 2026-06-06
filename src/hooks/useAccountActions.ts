import { useState } from 'react'
import {
  deleteUser,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth'
import { auth, ensureFirebaseInit } from '../firebase'
import { deleteOrganizerEvents } from '../services/deleteUserData'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors'
import { getPasswordResetContinueUrl } from '../utils/passwordReset'
import { useAuth } from './useAuth'

export type SendPasswordResetResult = {
  /** True when Firebase confirmed this email uses email/password sign-in. */
  confirmedAccount: boolean
}

export function useAccountActions() {
  const { user } = useAuth()
  const [isSendingResetLink, setIsSendingResetLink] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  async function sendPasswordResetLink(email: string): Promise<SendPasswordResetResult> {
    const ready = await ensureFirebaseInit()
    if (!ready || !auth) throw new Error('Firebase is not configured')

    const normalized = email.trim()
    setIsSendingResetLink(true)

    try {
      const methods = await fetchSignInMethodsForEmail(auth, normalized)

      if (methods.length > 0 && !methods.includes('password')) {
        throw new Error(
          'This email is not registered with email and password. Use the sign-in method you used when you signed up.',
        )
      }

      await sendPasswordResetEmail(auth, normalized, {
        url: getPasswordResetContinueUrl(),
        handleCodeInApp: true,
      })

      return { confirmedAccount: methods.includes('password') }
    } catch (error) {
      throw new Error(getFirebaseAuthErrorMessage(error))
    } finally {
      setIsSendingResetLink(false)
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    if (!auth || !user?.email) throw new Error('You must be signed in with email and password.')

    setIsChangingPassword(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
    } catch (error) {
      throw new Error(getFirebaseAuthErrorMessage(error))
    } finally {
      setIsChangingPassword(false)
    }
  }

  async function deleteAccount(currentPassword: string) {
    if (!auth || !user?.email) throw new Error('You must be signed in with email and password.')

    setIsDeletingAccount(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await deleteOrganizerEvents(user.uid)
      await deleteUser(user)
    } catch (error) {
      throw new Error(getFirebaseAuthErrorMessage(error))
    } finally {
      setIsDeletingAccount(false)
    }
  }

  return {
    sendPasswordResetLink,
    changePassword,
    deleteAccount,
    isSendingResetLink,
    isChangingPassword,
    isDeletingAccount,
  }
}
