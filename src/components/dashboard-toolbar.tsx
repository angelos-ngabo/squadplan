import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'
import { DashboardMenu, type DashboardMenuItem } from './dashboard-menu'

export function DashboardToolbar({
  actions,
  menuItems,
}: {
  actions?: ReactNode
  menuItems: DashboardMenuItem[]
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#141416]/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4 lg:px-[120px]">
        <Link to="/" className="min-w-0 shrink-0">
          <img src="/logo.svg" alt="SquadPlan" className="h-9 w-auto sm:h-14" />
        </Link>

        <div className="flex min-w-0 shrink items-center gap-1.5 sm:gap-3">
          {actions}
          <DashboardMenu items={menuItems} />
        </div>
      </div>
    </header>
  )
}
