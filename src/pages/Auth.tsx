import { forwardRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, type Resolver, type UseFormRegisterReturn } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.preprocess(
    (value) => (typeof value === 'string' ? value : ''),
    z.string().min(1, 'Email is required').email('Enter a valid email'),
  ),
  password: z.preprocess(
    (value) => (typeof value === 'string' ? value : ''),
    z.string().min(6, 'Password must be at least 6 characters'),
  ),
})

const signupSchema = z
  .object({
    name: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(2, 'Name is required'),
    ),
    email: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Email is required').email('Enter a valid email'),
    ),
    password: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(6, 'Password must be at least 6 characters'),
    ),
    confirmPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Please confirm your password'),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type LoginInput = z.infer<typeof loginSchema>
type SignupInput = z.infer<typeof signupSchema>
type AuthMode = 'login' | 'signup'

type AuthFieldProps = {
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  error?: string
  registration: UseFormRegisterReturn
  autoComplete?: string
}

const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  { placeholder, type = 'text', error, registration, autoComplete },
  forwardedRef,
) {
  const { ref: registerRef, onChange, onBlur, name } = registration

  function setRef(element: HTMLInputElement | null) {
    registerRef(element)
    if (typeof forwardedRef === 'function') {
      forwardedRef(element)
    } else if (forwardedRef) {
      forwardedRef.current = element
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    void onChange(event)
  }

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    void onChange(event)
  }

  return (
    <div>
      <div className="h-14 w-full rounded-lg border border-white/10 bg-[#1b1b1f] px-4 sm:h-[72px] sm:px-8">
        <input
          ref={setRef}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-base font-medium text-white outline-none placeholder:text-[#92929D] focus:placeholder:text-[#898889] sm:text-lg"
          onChange={handleChange}
          onInput={handleInput}
          onBlur={onBlur}
        />
      </div>
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </div>
  )
})

const AuthPasswordField = forwardRef<HTMLInputElement, Omit<AuthFieldProps, 'type'>>(function AuthPasswordField(
  { placeholder, error, registration, autoComplete },
  forwardedRef,
) {
  return (
    <AuthField
      ref={forwardedRef}
      placeholder={placeholder}
      type="password"
      error={error}
      registration={registration}
      autoComplete={autoComplete}
    />
  )
})

function AuthLogo() {
  return (
    <Link to="/" className="mb-6 inline-flex">
      <img src="/logo.svg" alt="SquadPlan" className="h-14 w-auto" />
    </Link>
  )
}

function SocialButtons({ prefix }: { prefix: 'Sign in' | 'Sign up' }) {
  const items = [
    { icon: '/images/auth-google.svg', label: 'Google' },
    { icon: '/images/auth-facebook.svg', label: 'Facebook' },
    { icon: '/images/auth-apple.svg', label: 'Apple Account' },
  ]

  return (
    <div className="flex w-full max-w-[440px] flex-col gap-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`rounded-lg p-px ${
            index === 1
              ? 'bg-gradient-to-r from-[#F24E1E] to-[#E97F18]'
              : 'bg-gradient-to-r from-[#E97F18] to-[#F24E1E]'
          }`}
        >
          <button
            type="button"
            className="flex h-14 w-full items-center gap-3 rounded-[7px] bg-[#141416] px-4 text-base font-medium text-white transition hover:bg-[#1b1b1f] sm:h-[72px] sm:gap-4 sm:px-8 sm:text-lg"
          >
            <img src={item.icon} alt="" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
            <span className="flex-1 text-center text-sm sm:text-base">
              <span className="hidden sm:inline">{prefix} with {item.label}</span>
              <span className="sm:hidden">{item.label}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

function PrimarySubmitButton({
  label,
  loadingLabel,
  isSubmitting,
}: {
  label: string
  loadingLabel: string
  isSubmitting: boolean
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex h-14 w-full items-center justify-between rounded-lg bg-gradient-to-r from-[#E97F18] to-[#F24E1E] px-4 disabled:opacity-60 sm:h-[72px] sm:px-8"
    >
      <span className="text-base font-bold text-white sm:text-lg">{isSubmitting ? loadingLabel : label}</span>
      {isSubmitting ? (
        <Loader2 className="h-5 w-5 animate-spin text-white" />
      ) : (
        <ArrowRight className="h-5 w-5 text-white" />
      )}
    </button>
  )
}

export function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<AuthMode>(searchParams.get('mode') === 'signup' ? 'signup' : 'login')
  const [error, setError] = useState('')

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema) as Resolver<LoginInput>,
    defaultValues: { email: '', password: '' },
  })

  const signupForm = useForm<SignupInput>({
    resolver: zodResolver(signupSchema) as Resolver<SignupInput>,
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const redirect = (location.state as { from?: string } | null)?.from ?? '/app'

  async function onLogin(data: LoginInput) {
    setError('')
    try {
      await login(data.email, data.password)
      navigate(redirect)
    } catch (err) {
      setError((err as Error).message || 'Could not sign in')
    }
  }

  async function onSignup(data: SignupInput) {
    setError('')
    try {
      await signup(data.name, data.email, data.password)
      navigate('/app')
    } catch (err) {
      setError((err as Error).message || 'Could not create account')
    }
  }

  function switchMode(next: AuthMode) {
    setMode(next)
    setError('')
    loginForm.reset()
    signupForm.reset()
  }

  const isLogin = mode === 'login'
  const socialPrefix = isLogin ? 'Sign in' : 'Sign up'

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#141416] font-[Inter] text-white">
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#E97F18]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F24E1E]/10 blur-[120px]" />

      <Link
        to="/"
        className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 text-sm font-medium text-[#92929D] transition hover:text-[#E97F18] lg:left-10 lg:top-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-20 sm:px-6 sm:pt-24 lg:px-0 lg:pb-0 lg:pt-[204px]">
        <div className="mx-auto flex max-w-[666px] flex-col items-center gap-5 text-center">
          <h1 className="font-[Space_Grotesk] text-4xl font-medium tracking-[-0.08em] sm:text-[54px]">
            {isLogin ? 'Login to Your Account' : 'Create Your Account'}
          </h1>
          <p className="max-w-[666px] text-lg font-medium tracking-[-0.08em] text-[#92929D] sm:text-[22px] sm:leading-snug">
            SquadPlan — manage your events with us.
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex w-full max-w-[1080px] flex-col items-center gap-8 lg:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {isLogin ? (
            <form
              className="flex w-full max-w-[440px] flex-col lg:ml-[178px] lg:mt-16"
              onSubmit={loginForm.handleSubmit(onLogin)}
            >
              <AuthLogo />
              <div className="flex flex-col gap-4">
                <AuthField
                  placeholder="Email / Phone number"
                  type="email"
                  autoComplete="email"
                  error={loginForm.formState.errors.email?.message}
                  registration={loginForm.register('email')}
                />
                <AuthPasswordField
                  placeholder="Password"
                  autoComplete="current-password"
                  error={loginForm.formState.errors.password?.message}
                  registration={loginForm.register('password')}
                />

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <div className="flex flex-col items-center gap-1">
                  <PrimarySubmitButton
                    label="Login to Your Account"
                    loadingLabel="Signing in..."
                    isSubmitting={loginForm.formState.isSubmitting}
                  />
                  <p className="w-full max-w-[432px] px-2 pt-1 text-left text-xs leading-4 tracking-[0.033em]">
                    <span className="font-light text-[#92929D]">Don&apos;t have an account yet? </span>
                    <button type="button" onClick={() => switchMode('signup')} className="font-semibold text-[#E97F18]">
                      Register now!
                    </button>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <form
              className="flex w-full max-w-[440px] flex-col lg:ml-[178px] lg:-mt-14"
              onSubmit={signupForm.handleSubmit(onSignup)}
            >
              <AuthLogo />
              <div className="flex flex-col gap-4">
                <AuthField
                  placeholder="Full name"
                  autoComplete="name"
                  error={signupForm.formState.errors.name?.message}
                  registration={signupForm.register('name')}
                />
                <AuthField
                  placeholder="Email / Phone number"
                  type="email"
                  autoComplete="email"
                  error={signupForm.formState.errors.email?.message}
                  registration={signupForm.register('email')}
                />
                <AuthPasswordField
                  placeholder="Password"
                  autoComplete="new-password"
                  error={signupForm.formState.errors.password?.message}
                  registration={signupForm.register('password')}
                />
                <AuthPasswordField
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  error={signupForm.formState.errors.confirmPassword?.message}
                  registration={signupForm.register('confirmPassword')}
                />

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <div className="flex flex-col items-center gap-1">
                  <PrimarySubmitButton
                    label="Create Your Account"
                    loadingLabel="Creating account..."
                    isSubmitting={signupForm.formState.isSubmitting}
                  />
                  <p className="w-full max-w-[432px] px-2 pt-1 text-left text-xs leading-4 tracking-[0.033em]">
                    <span className="font-light text-[#92929D]">Already have an account? </span>
                    <button type="button" onClick={() => switchMode('login')} className="font-semibold text-[#E97F18]">
                      Log in
                    </button>
                  </p>
                </div>
              </div>
            </form>
          )}

          <img
            src="/images/auth-arrow-highlight.svg"
            alt=""
            className={`hidden shrink-0 opacity-90 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(79%)_saturate(1000%)_hue-rotate(360deg)_brightness(98%)_contrast(95%)] lg:block lg:translate-x-[-20px] ${
              isLogin ? 'lg:self-center' : 'lg:self-start lg:mt-28'
            }`}
          />

          <div
            className={`w-full max-w-[440px] lg:mr-[183px] ${isLogin ? 'lg:mt-0' : 'lg:mt-72'}`}
          >
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium uppercase tracking-wider text-[#92929D]">Or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <SocialButtons prefix={socialPrefix} />
          </div>
        </div>

        {isLogin ? (
          <button
            type="button"
            className="mx-auto mt-10 text-xl tracking-[-0.08em] text-[#92929D] underline transition hover:text-[#E97F18] lg:mt-16"
          >
            Forgot Password?
          </button>
        ) : null}

        <div className="mx-auto mt-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 px-0 pt-16 text-base tracking-[-0.08em] text-[#92929D] sm:flex-row sm:px-[70px] sm:text-lg lg:pt-24">
          <span className="transition hover:text-[#E97F18]">Privacy Policy</span>
          <span>© 2026 SquadPlan</span>
        </div>
      </div>
    </div>
  )
}
