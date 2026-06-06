export function getFirebaseAuthErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code: string }).code)
    : ''

  switch (code) {
    case 'auth/configuration-not-found':
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Open Firebase Console → Authentication → Sign-in method → enable Email/Password (or the provider you are using) → Save.'
    case 'auth/invalid-email':
      return 'That email address is not valid.'
    case 'auth/user-disabled':
      return 'This account has been disabled.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/requires-recent-login':
      return 'Please sign out, sign in again, and retry this action.'
    case 'auth/unauthorized-continue-uri':
    case 'auth/invalid-continue-uri':
      return 'This site is not authorized for password reset links. Add it under Firebase Console → Authentication → Settings → Authorized domains.'
    case 'auth/invalid-action-code':
    case 'auth/expired-action-code':
      return 'This reset link is invalid or has expired. Request a new one from the forgot password page.'
    default:
      if (error instanceof Error && error.message) return error.message
      return 'Authentication failed. Please try again.'
  }
}
