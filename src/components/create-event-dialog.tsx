import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Copy, Loader2 } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { Button } from './ui/button'
import { Dialog, DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { createEventSchema, PAYMENT_METHODS, type CreateEventInput } from '../schemas/event'
import { useCreateEvent } from '../hooks/useCreateEvent'
const fieldLabel = tv({ base: 'text-sm font-medium text-[#92929D]' })
const fieldError = tv({ base: 'mt-1 text-xs text-red-400' })
const suffixWrap = tv({ base: 'relative' })
const suffixLabel = tv({ base: 'pointer-events-none absolute right-3 top-2 text-sm text-[#92929D]' })
const successBanner = tv({
  base: 'rounded-lg border border-[#E97F18]/30 bg-[#E97F18]/10 p-3 text-sm text-[#E97F18]',
})

const methodToggle = tv({
  base: 'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
  variants: {
    selected: {
      true: 'border-[#E97F18] bg-[#E97F18]/10 text-white',
      false: 'border-white/10 text-[#92929D] hover:bg-white/5',
    },
  },
})

export function CreateEventDialog() {
  const [open, setOpen] = useState(false)
  const [successLinks, setSuccessLinks] = useState<{ joinUrl: string; dashboardUrl: string } | null>(null)
  const createEvent = useCreateEvent()

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema) as Resolver<CreateEventInput>,
    defaultValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      budgetTarget: 0,
      contributionPerPerson: 0,
      organizerName: '',
      organizerPhone: '',
      paymentMethods: [],
    },
  })

  const selectedMethods = form.watch('paymentMethods') ?? []

  useEffect(() => {
    if (!successLinks) return
    const timer = window.setTimeout(() => {
      setOpen(false)
      setSuccessLinks(null)
      form.reset()
    }, 8000)
    return () => window.clearTimeout(timer)
  }, [successLinks, form])

  async function onSubmit(data: CreateEventInput) {
    const result = await createEvent.mutateAsync(data)
    setSuccessLinks({ joinUrl: result.joinUrl, dashboardUrl: result.dashboardUrl })
  }

  function toggleMethod(method: string) {
    const current = form.getValues('paymentMethods') ?? []
    const next = current.includes(method)
      ? current.filter((item) => item !== method)
      : [...current, method]
    form.setValue('paymentMethods', next, { shouldDirty: true })
  }

  async function copyJoinLink() {
    if (!successLinks) return
    await navigator.clipboard.writeText(successLinks.joinUrl)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="sm" className="sm:px-4 sm:py-2">
          <span className="hidden sm:inline">Create Event</span>
          <span className="sm:hidden">Create</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
      title="Create a New Event"
      description="Fill in the details below. You'll get a shareable link instantly."
    >
      {successLinks ? (
        <div className={successBanner()}>
          <p className="font-medium text-white">Event created successfully.</p>
          <p className="mt-2 text-sm text-white/80">Share this link with guests so they can join:</p>
          <p className="mt-1 break-all text-white/90">{successLinks.joinUrl}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={copyJoinLink}>
              <Copy className="h-4 w-4" />
              Copy guest link
            </Button>
            <a href={successLinks.dashboardUrl}>
              <Button size="sm">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Field label="Event Title" error={form.formState.errors.title?.message}>
            <Input {...form.register('title')} />
          </Field>

          <Field label="Description">
            <Textarea rows={3} {...form.register('description')} />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Date">
              <Input type="date" {...form.register('date')} />
            </Field>
            <Field label="Location">
              <Input {...form.register('location')} />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Budget Target">
              <div className={suffixWrap()}>
                <Input type="number" min={0} variant="suffix" {...form.register('budgetTarget')} />
                <span className={suffixLabel()}>RWF</span>
              </div>
            </Field>
            <Field label="Contribution per person">
              <div className={suffixWrap()}>
                <Input type="number" min={0} variant="suffix" {...form.register('contributionPerPerson')} />
                <span className={suffixLabel()}>RWF</span>
              </div>
            </Field>
          </div>

          <div>
            <p className={fieldLabel()}>Payment Methods</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => (
                <label key={method} className={methodToggle({ selected: selectedMethods.includes(method) })}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedMethods.includes(method)}
                    onChange={() => toggleMethod(method)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Organizer Name" error={form.formState.errors.organizerName?.message}>
              <Input {...form.register('organizerName')} />
            </Field>
            <Field label="Organizer Phone">
              <Input {...form.register('organizerPhone')} />
            </Field>
          </div>

          {createEvent.error ? <p className={fieldError()}>{createEvent.error.message}</p> : null}

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={createEvent.isPending}>
              {createEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Event'}
              {!createEvent.isPending ? <ArrowRight className="h-4 w-4" /> : null}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className={fieldLabel()}>{label}</span>
      <div className="mt-1">{children}</div>
      {error ? <span className={fieldError()}>{error}</span> : null}
    </label>
  )
}
