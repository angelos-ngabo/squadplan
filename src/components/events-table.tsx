import { CalendarDays, CalendarX2, Eye, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import type { EventListItem } from '../schemas/event'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const table = tv({ base: 'w-full mt-4 border-separate border-spacing-y-3' })
const headCell = tv({
  base: 'text-left px-4 py-0 text-xs font-semibold uppercase tracking-wider text-[#92929D]',
})
const row = tv({ base: 'bg-[#1b1b1f]' })
const cell = tv({ base: 'px-4 py-3.5 first:rounded-l-xl last:rounded-r-xl' })
const skeleton = tv({ base: 'h-14 animate-pulse rounded-xl bg-[#1b1b1f]' })
const emptyWrap = tv({ base: 'py-16 text-center' })
const mobileCard = tv({ base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-4' })
const mobileMeta = tv({ base: 'mt-3 grid grid-cols-2 gap-3 text-sm' })

const columns = ['Event', 'Date', 'Location', 'Participants', 'Raised', 'Budget', 'Status', ''] as const

function EventMobileCard({ event }: { event: EventListItem }) {
  return (
    <div className={mobileCard()}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-white">{event.title}</p>
          <p className="mt-0.5 text-xs text-[#92929D]">by {event.organizerName}</p>
        </div>
        <Badge color="green" dot>
          Active
        </Badge>
      </div>

      <div className={mobileMeta()}>
        <div className="flex items-center gap-1.5 text-white/80">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#92929D]" />
          <span className="truncate">{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/80">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#92929D]" />
          <span className="truncate">{event.location || 'TBD'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/80">
          <Users className="h-3.5 w-3.5 shrink-0 text-[#92929D]" />
          {event.participantCount ?? '—'} joined
        </div>
        <div>
          <p className="text-xs text-[#92929D]">Raised</p>
          <p className="font-medium text-white">{formatCurrency(event.totalPaid ?? 0)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-[#92929D]">Budget</p>
          <p className="font-medium text-white">{formatCurrency(event.budgetTarget)}</p>
        </div>
      </div>

      <Link to={`/event/${event.slug}/dashboard`} className="mt-4 block">
        <Button variant="outline" className="w-full">
          <Eye className="h-4 w-4" />
          View Dashboard
        </Button>
      </Link>
    </div>
  )
}

export function EventsTable({ events, isLoading }: { events: EventListItem[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={skeleton()} />
        ))}
      </div>
    )
  }

  if (!events.length) {
    return (
      <div className={emptyWrap()}>
        <CalendarX2 className="mx-auto h-10 w-10 text-[#92929D]/40" />
        <p className="mt-3 text-sm text-[#92929D]">No events yet</p>
        <p className="mt-1 text-xs text-[#92929D]/70">Create your first event to get started.</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-4 space-y-3 md:hidden">
        {events.map((event) => (
          <EventMobileCard key={event.slug} event={event} />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className={table()}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col || 'actions'} className={headCell()}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.slug} className={row()}>
                <td className={cell()}>
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="mt-0.5 text-xs text-[#92929D]">by {event.organizerName}</p>
                  </div>
                </td>
                <td className={cell()}>
                  <div className="flex items-center gap-1.5 text-sm text-white/80">
                    <CalendarDays className="h-3.5 w-3.5 text-[#92929D]" />
                    {formatDate(event.date)}
                  </div>
                </td>
                <td className={cell()}>
                  <div className="flex items-center gap-1.5 text-sm text-white/80">
                    <MapPin className="h-3.5 w-3.5 text-[#92929D]" />
                    {event.location || 'TBD'}
                  </div>
                </td>
                <td className={cell()}>
                  <div className="flex items-center gap-1.5 text-sm text-white/80">
                    <Users className="h-3.5 w-3.5 text-[#92929D]" />
                    {event.participantCount ?? '—'}
                  </div>
                </td>
                <td className={cell()}>{formatCurrency(event.totalPaid ?? 0)}</td>
                <td className={cell()}>{formatCurrency(event.budgetTarget)}</td>
                <td className={cell()}>
                  <Badge color="green" dot>
                    Active
                  </Badge>
                </td>
                <td className={cell()}>
                  <Link to={`/event/${event.slug}/dashboard`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
