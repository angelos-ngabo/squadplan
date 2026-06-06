import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Loader2, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useAccountActions } from '../hooks/useAccountActions'
import { forgotEmailSchema, type ForgotEmailInput } from '../schemas/account'
import { PASSWORD_RESET_EMAIL_SENDER } from '../utils/passwordReset'

const card = 'rounded-2xl border border-white/10 bg-[#1b1b1f] p-6 sm:p-8'
const label = 'text-sm font-medium text-[#92929D]'
const errorText = 'mt-1 text-xs text-red-400'

export function ForgotPassword() {
  const navigate = useNavigate()
  const { sendPasswordResetLink, isSendingResetLink } = useAccountActions()
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const [error, setError] = useState('')

  const emailForm = useForm<ForgotEmailInput>({
    resolver: zodResolver(forgotEmailSchema) as Resolver<ForgotEmailInput>,
    defaultValues: { email: '' },
  })

  async function onSendResetLink(data: ForgotEmailInput) {
    setError('')
    try {
      const email = data.email.trim()
      const result = await sendPasswordResetLink(email)
      setSentEmail(email)
      setConfirmedAccount(result.confirmedAccount)
      setSent(true)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function resendLink() {
    if (!sentEmail) return
    setError('')
    try {
      const result = await sendPasswordResetLink(sentEmail)
      setConfirmedAccount(result.confirmedAccount)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-[#141416] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-lg">
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 text-sm text-[#92929D] transition hover:text-[#E97F18]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-wider text-[#E97F18]">Reset password</p>
          <h1 className="mt-2 font-serif text-3xl font-bold">Forgot your password?</h1>
          <p className="mt-2 text-sm text-[#92929D]">
            Enter the email you used to sign up. The reset link is sent to your inbox — it will not appear on this
            page.
          </p>
        </div>

        <div className={`mt-8 ${card}`}>
          {error ? <p className={`mb-4 ${errorText}`}>{error}</p> : null}

          {!sent ? (
            <form className="space-y-4" onSubmit={emailForm.handleSubmit(onSendResetLink)}>
              <label className="block">
                <span className={label}>Email address</span>
                <div className="mt-1">
                  <Input type="email" autoComplete="email" placeholder="you@example.com" {...emailForm.register('email')} />
                </div>
                {emailForm.formState.errors.email ? (
                  <span className={errorText}>{emailForm.formState.errors.email.message}</span>
                ) : null}
              </label>
              <Button type="submit" className="w-full" disabled={isSendingResetLink}>
                {isSendingResetLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Send reset link to my email
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#E97F18]" />
              <p className="mt-4 text-lg font-semibold">Check your email inbox</p>
              <p className="mt-2 text-sm text-[#92929D]">
                {confirmedAccount ? (
                  <>
                    We sent a password reset link to{' '}
                    <span className="font-medium text-white">{sentEmail}</span>.
                  </>
                ) : (
                  <>
                    If an account exists for{' '}
                    <span className="font-medium text-white">{sentEmail}</span>, a reset link was sent.
                  </>
                )}{' '}
                Open the link in that email to set a new password on SquadPlan.
              </p>

              <ul className="mt-4 space-y-2 text-left text-sm text-[#92929D]">
                <li>• Check spam, junk, and Promotions folders</li>
                <li>
                  • Look for an email from{' '}
                  <span className="break-all text-white/80">{PASSWORD_RESET_EMAIL_SENDER}</span>
                </li>
                <li>• Use the exact email address you registered with</li>
                <li>• The link can take a few minutes to arrive</li>
              </ul>

              <Button className="mt-6 w-full" onClick={() => navigate('/auth')}>
                Back to login
              </Button>
              <button
                type="button"
                className="mt-4 w-full text-sm text-[#92929D] transition hover:text-[#E97F18]"
                onClick={() => void resendLink()}
                disabled={isSendingResetLink}
              >
                {isSendingResetLink ? 'Sending...' : 'Resend reset link'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
