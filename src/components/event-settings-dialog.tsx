import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import type { EventDocument } from '../schemas/event'
import { formatCurrency, formatDate } from '../utils/formatters'

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  async function copyValue() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#141416] p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[#92929D]">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="break-all text-sm text-white">{value}</p>
        <Button variant="outline" size="sm" onClick={copyValue}>
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  )
}

export function EventSettingsDialog({
  event,
  slug,
  open,
  onOpenChange,
}: {
  event: EventDocument
  slug: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const joinUrl = `${window.location.origin}/event/${slug}`
  const dashboardUrl = `${window.location.origin}/event/${slug}/dashboard`

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Event settings"
      description="Manage links and review event details."
    >
      <div className="space-y-4">
        <CopyField label="Guest join link" value={joinUrl} />
        <CopyField label="Organizer manage link" value={dashboardUrl} />

        <div className="rounded-lg border border-white/10 bg-[#141416] p-4">
          <h4 className="text-sm font-semibold text-white">Event details</h4>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Title</dt>
              <dd className="text-right text-white">{event.title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Date</dt>
              <dd className="text-right text-white">{formatDate(event.date)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Location</dt>
              <dd className="text-right text-white">{event.location || 'TBD'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Budget target</dt>
              <dd className="text-right text-white">{formatCurrency(event.budgetTarget)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Per person</dt>
              <dd className="text-right text-white">{formatCurrency(event.contributionPerPerson)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#92929D]">Organizer</dt>
              <dd className="text-right text-white">{event.organizerName}</dd>
            </div>
            {event.organizerPhone ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#92929D]">Phone</dt>
                <dd className="text-right text-white">{event.organizerPhone}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        {event.paymentMethods?.length ? (
          <div className="rounded-lg border border-white/10 bg-[#141416] p-4">
            <h4 className="text-sm font-semibold text-white">Payment methods</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {event.paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-[#E97F18]/30 bg-[#E97F18]/10 px-3 py-1 text-xs text-[#E97F18]"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {event.description ? (
          <div className="rounded-lg border border-white/10 bg-[#141416] p-4">
            <h4 className="text-sm font-semibold text-white">Description</h4>
            <p className="mt-2 text-sm text-white/70">{event.description}</p>
          </div>
        ) : null}
      </div>
    </Dialog>
  )
}
