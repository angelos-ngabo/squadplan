import { type LucideIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

const card = tv({
  base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-5',
})

const labelStyle = tv({ base: 'text-xs font-semibold uppercase tracking-wider text-[#92929D]' })
const valueStyle = tv({ base: 'mt-2 text-2xl font-bold text-white' })
const subtitleStyle = tv({ base: 'mt-1 text-xs text-[#92929D]' })

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
      <div className="flex items-start justify-between">
        <p className={labelStyle()}>{label}</p>
        <Icon className={iconColor ?? 'text-[#E97F18]'} size={18} />
      </div>
      <p className={valueStyle()}>{value}</p>
      {subtitle ? <p className={subtitleStyle()}>{subtitle}</p> : null}
    </div>
  )
}
