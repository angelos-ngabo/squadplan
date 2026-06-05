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
    <div className="flex w-full items-center justify-between px-6 py-6 lg:px-[120px]">
      <Link to="/" className="shrink-0">
        <img src="/logo.svg" alt="SquadPlan" className="h-14 w-auto" />
      </Link>

      <div className="flex shrink-0 items-center gap-3">
        {actions}
        <DashboardMenu items={menuItems} />
      </div>
    </div>
  )
}
