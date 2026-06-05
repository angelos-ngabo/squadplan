import { useState } from 'react'
import { Home, LogOut, User } from 'lucide-react'
import { CreateEventDialog } from '../components/create-event-dialog'
import { AccountSettingsDialog } from '../components/account-settings-dialog'
import { DashboardToolbar } from '../components/dashboard-toolbar'
import { EventsTable } from '../components/events-table'
import { PageWrapper } from '../components/page-wrapper'
import type { DashboardMenuItem } from '../components/dashboard-menu'
import { useAuth } from '../hooks/useAuth'
import { useMyEvents } from '../hooks/useMyEvents'

export function Manage() {
  const { user, logout } = useAuth()
  const { data: events = [], isLoading } = useMyEvents()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const menuItems: DashboardMenuItem[] = [
    { label: 'Account settings', icon: User, onSelect: () => setSettingsOpen(true) },
    { type: 'link', label: 'Home', icon: Home, to: '/' },
    { type: 'divider' },
    {
      label: 'Log out',
      icon: LogOut,
      destructive: true,
      onSelect: () => void logout(),
    },
  ]

  return (
    <div className="min-h-screen bg-[#141416]">
      <DashboardToolbar
        actions={<CreateEventDialog />}
        menuItems={menuItems}
      />

      <AccountSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />

      <PageWrapper>
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">My Events</h1>
          <p className="mt-2 text-sm text-[#92929D]">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}. Only your events are shown here.
          </p>
        </div>
        <EventsTable events={events} isLoading={isLoading} />
      </PageWrapper>
    </div>
  )
}
