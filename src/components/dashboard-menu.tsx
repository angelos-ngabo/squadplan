import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { type LucideIcon, Settings } from 'lucide-react'
import { Button } from './ui/button'

export type DashboardMenuItem =
  | {
      type?: 'action'
      label: string
      icon?: LucideIcon
      onSelect: () => void
      destructive?: boolean
    }
  | {
      type: 'link'
      label: string
      icon?: LucideIcon
      to: string
      destructive?: boolean
    }
  | { type: 'divider' }

function MenuRow({
  item,
  onClose,
}: {
  item: Extract<DashboardMenuItem, { label: string }>
  onClose: () => void
}) {
  const Icon = item.icon
  const className = `flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/5 ${
    item.destructive ? 'text-red-400' : 'text-white/90'
  }`

  if ('to' in item) {
    return (
      <Link to={item.to} className={className} onClick={onClose}>
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-[#92929D]" /> : null}
        {item.label}
      </Link>
    )
  }

  return (
    <button type="button" className={className} onClick={() => { item.onSelect(); onClose() }}>
      {Icon ? <Icon className="h-4 w-4 shrink-0 text-[#92929D]" /> : null}
      {item.label}
    </button>
  )
}

export function DashboardMenu({ items, trigger }: { items: DashboardMenuItem[]; trigger?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      {trigger ? (
        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex">
          {trigger}
        </button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      )}

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#1b1b1f] py-2 shadow-2xl">
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={`divider-${index}`} className="my-2 border-t border-white/10" />
            }

            return <MenuRow key={item.label} item={item} onClose={() => setOpen(false)} />
          })}
        </div>
      ) : null}
    </div>
  )
}
