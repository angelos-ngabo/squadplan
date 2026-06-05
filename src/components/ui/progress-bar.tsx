import { tv } from 'tailwind-variants'

const track = tv({ base: 'h-2 w-full overflow-hidden rounded-full bg-[#141416]' })
const fill = tv({ base: 'h-full rounded-full bg-gradient-to-r from-[#E97F18] to-[#F24E1E] transition-all' })
const labelRow = tv({ base: 'mb-2 flex items-center justify-between text-xs text-[#92929D]' })

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div>
      {label ? (
        <div className={labelRow()}>
          <span>{label}</span>
          <span className="font-medium text-white">{clamped}%</span>
        </div>
      ) : null}
      <div className={track()}>
        <div className={fill()} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
