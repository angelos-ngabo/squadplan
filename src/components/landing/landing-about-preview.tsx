import { CalendarDays, MapPin, Settings, Users } from 'lucide-react'
import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const frame = tv({
  base: 'relative mx-auto w-[260px] rounded-[2.75rem] border-[6px] border-[#2c2c30] bg-[#0a0a0b] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(233,127,24,0.12)] sm:w-[280px]',
})
const screen = tv({
  base: 'relative overflow-hidden rounded-[2.25rem] bg-[#141416]',
})
const island = tv({
  base: 'pointer-events-none absolute left-1/2 top-2 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black',
})
const homeBar = tv({
  base: 'pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/30',
})

export function IphoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className={frame()} aria-hidden>
      <div className={screen()}>
        <div className={island()} />
        {children}
        <div className={homeBar()} />
      </div>
    </div>
  )
}

function MiniBadge({ label, color }: { label: string; color: 'green' | 'amber' | 'red' }) {
  const dotColor = color === 'green' ? 'bg-green-500' : color === 'amber' ? 'bg-amber-500' : 'bg-red-500'
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#141416] px-1.5 py-0.5 text-[8px] text-white/80">
      <span className={`h-1 w-1 rounded-full ${dotColor}`} />
      {label}
    </span>
  )
}

export function DashboardSnapshot() {
  return (
    <div className="flex h-[520px] flex-col bg-[#141416] pt-8 text-left">
      <div className="flex items-center justify-between px-3 pb-2">
        <img src="/logo.svg" alt="" className="h-5 w-auto" />
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 text-[#92929D]">
          <Settings className="h-3 w-3" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 pb-6">
        <p className="text-[9px] text-[#92929D]">← My events</p>
        <h3 className="mt-0.5 text-sm font-bold leading-tight text-white">Weekend Lake Trip</h3>
        <div className="mt-1 space-y-0.5 text-[8px] text-white/65">
          <p className="flex items-center gap-1">
            <CalendarDays className="h-2.5 w-2.5 text-[#92929D]" />
            Sat, 14 Jun · 8:00 AM
          </p>
          <p className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-[#92929D]" />
            Rubavu · Lake Kivu
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[
            { label: 'Budget', value: 'RWF 500K' },
            { label: 'Paid', value: 'RWF 320K' },
            { label: 'Pledged', value: 'RWF 410K' },
            { label: 'Guests', value: '8 joined' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-[#1b1b1f] p-2">
              <p className="text-[7px] font-semibold uppercase tracking-wide text-[#92929D]">{stat.label}</p>
              <p className="mt-0.5 text-[10px] font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-lg border border-white/10 bg-[#1b1b1f] p-2">
          <div className="mb-1 flex items-center justify-between text-[8px] text-[#92929D]">
            <span>Funding progress</span>
            <span className="font-medium text-white">64%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#141416]">
            <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#E97F18] to-[#F24E1E]" />
          </div>
        </div>

        <div className="mt-2 rounded-lg border border-white/10 bg-[#1b1b1f] p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[9px] font-semibold text-white">Participants</p>
            <Users className="h-3 w-3 text-[#92929D]" />
          </div>
          <div className="space-y-1.5">
            {[
              { name: 'Angelos N.', paid: 'RWF 50K', status: 'Paid' as const },
              { name: 'Marie K.', paid: 'RWF 40K', status: 'Partial' as const },
              { name: 'Jean P.', paid: 'RWF 0', status: 'Unpaid' as const },
            ].map((person) => (
              <div key={person.name} className="rounded-md bg-[#141416]/80 px-2 py-1.5">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[9px] font-medium text-white">{person.name}</p>
                  <MiniBadge
                    label={person.status}
                    color={person.status === 'Paid' ? 'green' : person.status === 'Partial' ? 'amber' : 'red'}
                  />
                </div>
                <p className="mt-0.5 text-[8px] text-[#92929D]">{person.paid} contributed</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AboutPhonePreview() {
  return (
    <div className="relative flex justify-center lg:justify-end">
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-[#E97F18]/10 blur-3xl" />
      <IphoneMockup>
        <DashboardSnapshot />
      </IphoneMockup>
    </div>
  )
}
