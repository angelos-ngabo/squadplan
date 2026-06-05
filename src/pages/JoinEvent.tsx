import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, CheckCircle2, Loader2, MapPin, User } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { PageWrapper } from '../components/page-wrapper'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { useAuth } from '../hooks/useAuth'
import { useEvent } from '../hooks/useEvent'
import { useJoinEvent } from '../hooks/useJoinEvent'
import { joinEventSchema, type JoinEventInput } from '../schemas/participant'
import { formatCurrency, formatDate } from '../utils/formatters'

const card = tv({ base: 'mt-8 max-w-xl rounded-xl border border-white/10 bg-[#1b1b1f] p-6' })
const fieldLabel = tv({ base: 'text-sm font-medium text-[#92929D]' })
const fieldError = tv({ base: 'mt-1 text-xs text-red-400' })
const attendanceToggle = tv({
  base: 'rounded-lg border px-3 py-2.5 text-sm transition-colors sm:px-2 sm:py-2 sm:text-xs',
  variants: {
    active: {
      true: 'border-[#E97F18] bg-[#E97F18]/10 text-white',
      false: 'border-white/10 text-[#92929D] hover:bg-white/5',
    },
  },
})
const suffixWrap = tv({ base: 'relative' })
const suffixLabel = tv({ base: 'pointer-events-none absolute right-3 top-2 text-sm text-[#92929D]' })
const successCard = tv({
  base: 'mt-8 max-w-xl rounded-xl border border-[#E97F18]/30 bg-[#E97F18]/10 p-8 text-center',
})

function GuestShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#141416]">
      <div className="flex w-full items-center px-4 py-4 sm:px-6 sm:py-6 lg:px-[120px]">
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="SquadPlan" className="h-10 w-auto sm:h-14" />
        </Link>
      </div>
      <PageWrapper>{children}</PageWrapper>
    </div>
  )
}

function attendanceLabel(attendance: JoinEventInput['attendance']) {
  if (attendance === 'attending') return 'Attending'
  if (attendance === 'maybe') return 'Maybe'
  return 'Not going'
}

export function JoinEvent() {
  const { slug = '' } = useParams()
  const { user } = useAuth()
  const { event, isLoading } = useEvent(slug)
  const joinEvent = useJoinEvent(slug)
  const [joined, setJoined] = useState<JoinEventInput | null>(null)

  const form = useForm<JoinEventInput>({
    resolver: zodResolver(joinEventSchema) as Resolver<JoinEventInput>,
    defaultValues: {
      name: '',
      phone: '',
      attendance: 'attending',
      pledgeAmount: 0,
      paymentMethod: '',
    },
  })

  useEffect(() => {
    if (event?.paymentMethods?.[0]) {
      form.setValue('paymentMethod', event.paymentMethods[0])
    }
  }, [event, form])

  async function onSubmit(data: JoinEventInput) {
    await joinEvent.mutateAsync(data)
    setJoined(data)
  }

  if (isLoading) {
    return (
      <GuestShell>
        <p className="text-sm text-[#92929D]">Loading event...</p>
      </GuestShell>
    )
  }

  if (!event) {
    return (
      <GuestShell>
        <p className="text-sm text-[#92929D]">Event not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-[#E97F18]">
          Back to home
        </Link>
      </GuestShell>
    )
  }

  if (joined) {
    return (
      <GuestShell>
        <div className={successCard()}>
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#E97F18]" />
          <h2 className="mt-4 text-2xl font-bold text-white">You&apos;re in!</h2>
          <p className="mt-2 text-sm text-white/80">
            Thanks, {joined.name}. Your response for <span className="font-medium text-white">{event.title}</span> was
            recorded.
          </p>
          <div className="mt-6 rounded-lg border border-white/10 bg-[#141416]/80 p-4 text-left text-sm text-white/70">
            <p>
              <span className="text-[#92929D]">Attendance:</span> {attendanceLabel(joined.attendance)}
            </p>
            <p className="mt-2">
              <span className="text-[#92929D]">Pledge:</span> {formatCurrency(joined.pledgeAmount)}
            </p>
            {joined.paymentMethod ? (
              <p className="mt-2">
                <span className="text-[#92929D]">Payment method:</span> {joined.paymentMethod}
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-sm text-[#92929D]">
            The organizer will follow up with payment details. You don&apos;t need an account to join events.
          </p>
        </div>

        {!user ? (
          <div className="mt-6 max-w-xl rounded-xl border border-white/10 bg-[#1b1b1f] p-6">
            <h3 className="text-lg font-semibold text-white">Want to organize your own events?</h3>
            <p className="mt-2 text-sm text-[#92929D]">
              Create a free SquadPlan account to build events, share private links, and track contributions from your
              dashboard.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/auth?mode=signup">
                <Button>Create an account</Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline">Log in</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 max-w-xl rounded-xl border border-white/10 bg-[#1b1b1f] p-6">
            <p className="text-sm text-[#92929D]">Manage your own events from your organizer dashboard.</p>
            <Link to="/app" className="mt-4 inline-block">
              <Button variant="outline">Go to My Events</Button>
            </Link>
          </div>
        )}

        <Link to="/" className="mt-6 inline-block text-sm text-[#92929D] hover:text-[#E97F18]">
          ← Back to home
        </Link>
      </GuestShell>
    )
  }

  const paymentOptions = (event.paymentMethods ?? []).map((method) => ({ label: method, value: method }))

  return (
    <GuestShell>
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#92929D] hover:text-[#E97F18]">
        ← Back to home
      </Link>

      <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">{event.title}</h1>
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/70">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-[#92929D]" />
          {formatDate(event.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#92929D]" />
          {event.location || 'TBD'}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4 text-[#92929D]" />
          by {event.organizerName}
        </span>
      </div>

      <div className={card()}>
        <h2 className="text-lg font-semibold text-white">Join this event</h2>
        <p className="mt-1 text-sm text-[#92929D]">
          Tell the organizer if you are coming and how much you can contribute. No account required.
        </p>

        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="block">
            <span className={fieldLabel()}>Name</span>
            <div className="mt-1">
              <Input {...form.register('name')} />
            </div>
            {form.formState.errors.name ? (
              <span className={fieldError()}>{form.formState.errors.name.message}</span>
            ) : null}
          </label>

          <label className="block">
            <span className={fieldLabel()}>Phone</span>
            <div className="mt-1">
              <Input {...form.register('phone')} />
            </div>
          </label>

          <div>
            <p className={fieldLabel()}>Attendance</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(['attending', 'maybe', 'not_attending'] as const).map((state) => (
                <button
                  key={state}
                  type="button"
                  className={attendanceToggle({ active: form.watch('attendance') === state })}
                  onClick={() => form.setValue('attendance', state)}
                >
                  {state === 'attending' ? 'Attending' : state === 'maybe' ? 'Maybe' : 'Not Going'}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className={fieldLabel()}>Pledge Amount</span>
            <div className={`mt-1 ${suffixWrap()}`}>
              <Input type="number" min={0} variant="suffix" {...form.register('pledgeAmount')} />
              <span className={suffixLabel()}>RWF</span>
            </div>
          </label>

          {paymentOptions.length > 0 ? (
            <label className="block">
              <span className={fieldLabel()}>Payment Method</span>
              <div className="mt-1">
                <Select
                  value={form.watch('paymentMethod') ?? ''}
                  onValueChange={(value) => form.setValue('paymentMethod', value)}
                  options={paymentOptions}
                />
              </div>
            </label>
          ) : null}

          {joinEvent.error ? <p className={fieldError()}>{joinEvent.error.message}</p> : null}

          <Button type="submit" className="w-full" disabled={joinEvent.isPending}>
            {joinEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join Event'}
          </Button>
        </form>
      </div>
    </GuestShell>
  )
}
