import { useEffect, useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth, ensureFirebaseInit } from '../firebase'
import { forgotPasswordSchema, type ForgotPasswordInput } from '../schemas/account'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors'
import { Button } from './ui/button'

export function ResetPasswordFromLink({ oobCode }: { oobCode: string }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema) as Resolver<ForgotPasswordInput>,
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  useEffect(() => {
    let cancelled = false

    async function verifyCode() {
      const ready = await ensureFirebaseInit()
      if (!ready || !auth) {
        if (!cancelled) {
          setError('Firebase is not configured.')
          setLoading(false)
        }
        return
      }

      try {
        const accountEmail = await verifyPasswordResetCode(auth, oobCode)
        if (!cancelled) {
          setEmail(accountEmail)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(getFirebaseAuthErrorMessage(err))
          setLoading(false)
        }
      }
    }

    void verifyCode()
    return () => {
      cancelled = true
    }
  }, [oobCode])

  async function onSubmit(data: ForgotPasswordInput) {
    if (!auth) return
    setError('')
    try {
      await confirmPasswordReset(auth, oobCode, data.newPassword)
      setDone(true)
    } catch (err) {
      setError(getFirebaseAuthErrorMessage(err))
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-[#92929D]">
        <Loader2 className="h-8 w-8 animate-spin text-[#E97F18]" />
        <p>Verifying your reset link...</p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex w-full max-w-[440px] flex-col items-center text-center">
        <p className="text-lg font-semibold text-white">Password updated</p>
        <p className="mt-2 text-sm text-[#92929D]">You can now sign in with your new password.</p>
        <Button className="mt-6 w-full" onClick={() => navigate('/auth')}>
          Go to login
        </Button>
      </div>
    )
  }

  if (error && !email) {
    return (
      <div className="flex w-full max-w-[440px] flex-col items-center text-center">
        <p className="text-sm text-red-400">{error}</p>
        <p className="mt-2 text-sm text-[#92929D]">Request a new link from the forgot password page.</p>
        <Link to="/forgot-password" className="mt-6 text-sm font-semibold text-[#E97F18] hover:underline">
          Request new reset link
        </Link>
      </div>
    )
  }

  return (
    <form className="flex w-full max-w-[440px] flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="text-center">
        <p className="text-lg font-semibold text-white">Choose a new password</p>
        {email ? <p className="mt-1 text-sm text-[#92929D]">For {email}</p> : null}
      </div>

      <label className="block">
        <span className="text-sm text-[#92929D]">New password</span>
        <input
          type="password"
          autoComplete="new-password"
          className="mt-1 h-14 w-full rounded-lg border border-white/10 bg-[#141416] px-4 text-white outline-none focus:border-[#E97F18]"
          {...form.register('newPassword')}
        />
        {form.formState.errors.newPassword ? (
          <span className="mt-1 block text-xs text-red-400">{form.formState.errors.newPassword.message}</span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-sm text-[#92929D]">Confirm new password</span>
        <input
          type="password"
          autoComplete="new-password"
          className="mt-1 h-14 w-full rounded-lg border border-white/10 bg-[#141416] px-4 text-white outline-none focus:border-[#E97F18]"
          {...form.register('confirmPassword')}
        />
        {form.formState.errors.confirmPassword ? (
          <span className="mt-1 block text-xs text-red-400">{form.formState.errors.confirmPassword.message}</span>
        ) : null}
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Save new password
      </Button>

      <Link
        to="/auth"
        className="inline-flex items-center justify-center gap-2 text-sm text-[#92929D] hover:text-[#E97F18]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </form>
  )
}
