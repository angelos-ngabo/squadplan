import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CalendarDays,
  CheckCircle2,
  Home,
  LayoutDashboard,
  Link2,
  LogOut,
  MapPin,
  Settings,
  Share2,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react'
import { tv } from 'tailwind-variants'
import { ActivityLog } from '../components/activity-log'
import { DashboardToolbar } from '../components/dashboard-toolbar'
import { EventSettingsDialog } from '../components/event-settings-dialog'
import { PageWrapper } from '../components/page-wrapper'
import { ParticipantsTable } from '../components/participants-table'
import { ShareButton } from '../components/share-button'
import { ProgressBar } from '../components/ui/progress-bar'
import { StatCard } from '../components/ui/stat-card'
import { useActivityLog } from '../hooks/useActivityLog'
import { useAuth } from '../hooks/useAuth'
import { useEvent } from '../hooks/useEvent'
import { useParticipants } from '../hooks/useParticipants'
import { calcProgress } from '../lib/utils'
import { formatCurrency, formatDate } from '../utils/formatters'
import type { DashboardMenuItem } from '../components/dashboard-menu'

const card = tv({ base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-4 sm:p-5' })
const attendanceDot = tv({
  base: 'h-2 w-2 rounded-full',
  variants: {
    color: {
      green: 'bg-green-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
    },
  },
})

function DashboardShell({
  actions,
  menuItems,
  settingsDialog,
  children,
}: {
  actions?: React.ReactNode
  menuItems: DashboardMenuItem[]
  settingsDialog?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#141416]">
      <DashboardToolbar actions={actions} menuItems={menuItems} />
      {settingsDialog}
      <PageWrapper>{children}</PageWrapper>
    </div>
  )
}

export function Dashboard() {
  const { slug = '' } = useParams()
  const { user, logout } = useAuth()
  const { event, isLoading: eventLoading } = useEvent(slug)
  const { participants, isLoading: participantsLoading } = useParticipants(slug)
  const { activityLog, isLoading: activityLoading } = useActivityLog(slug)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const totals = useMemo(() => {
    return participants.reduce(
      (acc, participant) => {
        acc.totalPledged += participant.pledgeAmount
        acc.totalPaid += participant.paidAmount
        if (participant.attendance === 'attending') acc.attending += 1
        if (participant.attendance === 'maybe') acc.maybe += 1
        if (participant.attendance === 'not_attending') acc.notGoing += 1
        return acc
      },
      { totalPledged: 0, totalPaid: 0, attending: 0, maybe: 0, notGoing: 0 },
    )
  }, [participants])

  async function copyLink(path: string) {
    await navigator.clipboard.writeText(`${window.location.origin}${path}`)
  }

  const menuItems: DashboardMenuItem[] = [
    { label: 'Event settings', icon: Settings, onSelect: () => setSettingsOpen(true) },
    { label: 'Copy guest join link', icon: Link2, onSelect: () => void copyLink(`/event/${slug}`) },
    { label: 'Copy manage link', icon: Share2, onSelect: () => void copyLink(`/event/${slug}/dashboard`) },
    { type: 'divider' },
    { type: 'link', label: 'Account settings', icon: User, to: '/app/settings' },
    { type: 'link', label: 'My events', icon: LayoutDashboard, to: '/app' },
    { type: 'link', label: 'Home', icon: Home, to: '/' },
  ]

  if (user) {
    menuItems.push({
      label: 'Log out',
      icon: LogOut,
      destructive: true,
      onSelect: () => void logout(),
    })
  }

  const toolbarActions = <ShareButton slug={slug} />

  if (eventLoading || participantsLoading || activityLoading) {
    return (
      <DashboardShell menuItems={menuItems} actions={toolbarActions}>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-xl bg-[#1b1b1f]" />
          ))}
        </div>
      </DashboardShell>
    )
  }

  if (!event) {
    return (
      <DashboardShell menuItems={menuItems}>
        <p className="text-sm text-[#92929D]">Event not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-[#E97F18]">
          Back to home
        </Link>
      </DashboardShell>
    )
  }

  const remaining = Math.max(0, event.budgetTarget - totals.totalPaid)

  return (
    <DashboardShell
      actions={toolbarActions}
      menuItems={menuItems}
      settingsDialog={
        <EventSettingsDialog event={event} slug={slug} open={settingsOpen} onOpenChange={setSettingsOpen} />
      }
    >
      <Link to="/app" className="inline-flex items-center gap-1 text-sm text-[#92929D] hover:text-[#E97F18]">
        ← My events
      </Link>

      <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">{event.title}</h1>
      <div className="mt-2 flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:gap-4">
        <span className="flex min-w-0 items-center gap-1.5">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#92929D]" />
          {formatDate(event.date)}
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin className="h-4 w-4 shrink-0 text-[#92929D]" />
          <span className="break-words">{event.location || 'TBD'}</span>
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <User className="h-4 w-4 shrink-0 text-[#92929D]" />
          by {event.organizerName}
        </span>
      </div>

      <div className="mt-4">
        <ShareButton slug={slug} placement="page" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Budget Target" value={formatCurrency(event.budgetTarget)} subtitle="Total goal" icon={Target} />
        <StatCard
          label="Total Pledged"
          value={formatCurrency(totals.totalPledged)}
          subtitle={`${participants.length} commitments`}
          icon={TrendingUp}
          iconColor="text-amber-400"
        />
        <StatCard
          label="Total Paid"
          value={formatCurrency(totals.totalPaid)}
          subtitle="Collected so far"
          icon={CheckCircle2}
          iconColor="text-green-400"
        />
        <StatCard
          label="Participants"
          value={String(participants.length)}
          subtitle={`${totals.attending} attending`}
          icon={Users}
          iconColor="text-blue-400"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={`lg:col-span-2 ${card()}`}>
          <h3 className="text-sm font-semibold text-white">Funding Progress</h3>
          <p className="mt-0.5 text-xs text-[#92929D]">Paid vs. budget target</p>
          <div className="mt-5">
            <ProgressBar value={calcProgress(totals.totalPaid, event.budgetTarget)} label="Progress" />
            <p className="mt-3 text-sm text-white/70">
              <span className="block sm:inline">
                <span className="font-medium text-white/90">{formatCurrency(totals.totalPaid)}</span> raised of{' '}
                <span className="font-medium text-white/90">{formatCurrency(event.budgetTarget)}</span> target
              </span>
            </p>
            <p className="mt-1 text-xs text-[#92929D]">{formatCurrency(remaining)} remaining</p>
          </div>
        </div>

        <div className={card()}>
          <h3 className="text-sm font-semibold text-white">Attendance</h3>
          <p className="mt-0.5 text-xs text-[#92929D]">Guest responses</p>
          <div className="mt-5 space-y-3">
            {[
              { label: 'Attending', count: totals.attending, color: 'green' as const },
              { label: 'Maybe', count: totals.maybe, color: 'amber' as const },
              { label: 'Not Going', count: totals.notGoing, color: 'red' as const },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={attendanceDot({ color: item.color })} />
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-white/80">{item.count}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-xs text-[#92929D]">Total invited</span>
              <span className="text-sm font-medium text-white/80">{participants.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ParticipantsTable participants={participants} slug={slug} paymentMethods={event.paymentMethods ?? []} />
      </div>

      <div className="mt-6">
        <ActivityLog activityLog={activityLog} />
      </div>
    </DashboardShell>
  )
}
