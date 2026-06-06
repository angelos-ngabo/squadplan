/** Continue URL for password reset emails — must match Firebase authorized domains. */
export function getPasswordResetContinueUrl() {
  if (import.meta.env.PROD) {
    return 'https://squadplan-32b7e.web.app/auth'
  }
  return `${window.location.origin}/auth`
}

export const PASSWORD_RESET_EMAIL_SENDER = 'noreply@squadplan-32b7e.firebaseapp.com'
