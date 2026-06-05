import { type LucideIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

const card = tv({
  base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-4 sm:p-5',
})

const labelStyle = tv({ base: 'text-[11px] font-semibold uppercase tracking-wider text-[#92929D] sm:text-xs' })
const valueStyle = tv({ base: 'mt-1.5 break-words text-lg font-bold text-white sm:mt-2 sm:text-2xl' })
const subtitleStyle = tv({ base: 'mt-1 text-[11px] text-[#92929D] sm:text-xs' })

export function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconColor,
}: {
  label: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
}) {
  return (
    <div className={card()}>
      <div className="flex items-start justify-between gap-2">
        <p className={labelStyle()}>{label}</p>
        <Icon className={`shrink-0 ${iconColor ?? 'text-[#E97F18]'}`} size={16} />
      </div>
      <p className={valueStyle()}>{value}</p>
      {subtitle ? <p className={subtitleStyle()}>{subtitle}</p> : null}
    </div>
  )
}
