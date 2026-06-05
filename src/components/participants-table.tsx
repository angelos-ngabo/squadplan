import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { tv } from 'tailwind-variants'
import type { Participant } from '../schemas/participant'
import { formatCurrency } from '../utils/formatters'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { UpdatePaymentDialog } from './update-payment-dialog'

const card = tv({ base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-4 sm:p-5' })
const table = tv({ base: 'w-full border-separate border-spacing-y-2' })
const headCell = tv({
  base: 'text-left px-4 py-0 text-xs font-semibold uppercase tracking-wider text-[#92929D]',
})
const row = tv({ base: 'bg-[#141416]/80' })
const cell = tv({ base: 'px-4 py-3 first:rounded-l-xl last:rounded-r-xl' })
const emptyWrap = tv({ base: 'py-16 text-center' })
const mobileCard = tv({ base: 'rounded-lg border border-white/10 bg-[#141416]/80 p-4' })
const mobileGrid = tv({ base: 'mt-3 grid grid-cols-2 gap-3 text-sm' })

const columns = ['#', 'Name', 'Attendance', 'Pledge', 'Paid', 'Method', 'Status', ''] as const

function attendanceLabel(attendance: Participant['attendance']) {
  if (attendance === 'attending') return 'Attending'
  if (attendance === 'maybe') return 'Maybe'
  return 'Not Going'
}

function attendanceColor(attendance: Participant['attendance']) {
  if (attendance === 'attending') return 'green' as const
  if (attendance === 'maybe') return 'amber' as const
  return 'red' as const
}

function paymentColor(status: Participant['paymentStatus']) {
  if (status === 'paid') return 'green' as const
  if (status === 'partial') return 'amber' as const
  return 'red' as const
}

function paymentLabel(status: Participant['paymentStatus']) {
  if (status === 'paid') return 'Paid'
  if (status === 'partial') return 'Partial'
  return 'Unpaid'
}

function ParticipantMobileCard({
  participant,
  index,
  slug,
  paymentMethods,
}: {
  participant: Participant
  index: number
  slug: string
  paymentMethods: string[]
}) {
  return (
    <div className={mobileCard()}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">
          <span className="mr-2 text-[#92929D]">#{index + 1}</span>
          {participant.name}
        </p>
        {participant.phone ? <p className="mt-0.5 text-xs text-[#92929D]">{participant.phone}</p> : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge color={attendanceColor(participant.attendance)} dot>
          {attendanceLabel(participant.attendance)}
        </Badge>
        <Badge color={paymentColor(participant.paymentStatus)} dot>
          {paymentLabel(participant.paymentStatus)}
        </Badge>
      </div>

      <div className={mobileGrid()}>
        <div>
          <p className="text-xs text-[#92929D]">Pledge</p>
          <p className="break-words font-medium text-white">{formatCurrency(participant.pledgeAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-[#92929D]">Paid</p>
          <p className="break-words font-medium text-white">{formatCurrency(participant.paidAmount)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-[#92929D]">Method</p>
          <p className="break-words text-white/80">{participant.paymentMethod || '—'}</p>
        </div>
      </div>

      <div className="mt-4">
        <UpdatePaymentDialog participant={participant} slug={slug} paymentMethods={paymentMethods} />
      </div>
    </div>
  )
}

export function ParticipantsTable({
  participants,
  slug,
  paymentMethods,
}: {
  participants: Participant[]
  slug: string
  paymentMethods: string[]
}) {
  const [search, setSearch] = useState('')

  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return participants
    return participants.filter((participant) => participant.name.toLowerCase().includes(query))
  }, [participants, search])

  return (
    <div className={card()}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Participants</h3>
          <p className="mt-0.5 text-xs text-[#92929D]">{participants.length} people joined</p>
        </div>
        <Input
          placeholder="Search participants..."
          className="w-full sm:max-w-[220px]"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {participants.length === 0 ? (
        <div className={emptyWrap()}>
          <Users className="mx-auto mb-3 h-10 w-10 text-[#92929D]/40" />
          <p className="text-sm text-[#92929D]">No participants yet.</p>
          <p className="mt-1 text-xs text-[#92929D]/70">Share the link to invite people.</p>
        </div>
      ) : filteredParticipants.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#92929D]">No participants match your search.</div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filteredParticipants.map((participant, index) => (
              <ParticipantMobileCard
                key={participant.id}
                participant={participant}
                index={index}
                slug={slug}
                paymentMethods={paymentMethods}
              />
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
                {filteredParticipants.map((participant, index) => (
                  <tr key={participant.id} className={row()}>
                    <td className={cell()}>{index + 1}</td>
                    <td className={cell()}>
                      <p className="text-sm font-medium text-white">{participant.name}</p>
                      {participant.phone ? <p className="text-xs text-[#92929D]">{participant.phone}</p> : null}
                    </td>
                    <td className={cell()}>
                      <Badge color={attendanceColor(participant.attendance)} dot>
                        {attendanceLabel(participant.attendance)}
                      </Badge>
                    </td>
                    <td className={cell()}>{formatCurrency(participant.pledgeAmount)}</td>
                    <td className={cell()}>{formatCurrency(participant.paidAmount)}</td>
                    <td className={cell()}>{participant.paymentMethod || '—'}</td>
                    <td className={cell()}>
                      <Badge color={paymentColor(participant.paymentStatus)} dot>
                        {paymentLabel(participant.paymentStatus)}
                      </Badge>
                    </td>
                    <td className={cell()}>
                      <UpdatePaymentDialog participant={participant} slug={slug} paymentMethods={paymentMethods} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
