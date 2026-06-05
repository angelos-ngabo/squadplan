import { useState } from 'react'
import { Search } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#141416] py-24' })
const inner = tv({ base: 'mx-auto max-w-[1200px] px-6' })
const heading = tv({ base: 'font-serif text-4xl font-bold text-white' })
const tabs = tv({ base: 'mt-8 flex flex-wrap gap-3' })
const tab = tv({ base: 'rounded-full border px-5 py-2 text-sm font-medium transition' })
const search = tv({
  base: 'mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1b1f] px-4 py-3 text-[#92929D]',
})
const grid = tv({ base: 'mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5' })
const member = tv({ base: 'text-center' })
const avatar = tv({
  base: 'mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-white',
})

const filters = ['All', 'Organizers', 'Guests'] as const

const people = [
  { name: 'Angelos N.', role: 'Founder', gradient: 'from-[#15998f] to-[#f16533]' },
  { name: 'Ops Team', role: 'Support', gradient: 'from-[#E97F18] to-[#F24E1E]' },
  { name: 'Engineering', role: 'Platform', gradient: 'from-[#6366f1] to-[#8b5cf6]' },
  { name: 'Organizers', role: 'Event leads', gradient: 'from-[#10b981] to-[#059669]' },
  { name: 'Community', role: 'Ambassadors', gradient: 'from-[#f59e0b] to-[#ef4444]' },
]

export function LandingAudience() {
  const [active, setActive] = useState<(typeof filters)[number]>('All')

  return (
    <section id="team" className={section()}>
      <div className={inner()}>
        <h2 className={heading()}>Meet the SquadPlan team</h2>
        <div className={tabs()}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={tab({
                className:
                  active === filter
                    ? 'border-[#E97F18] bg-[#E97F18] text-white'
                    : 'border-white/10 text-[#92929D] hover:border-white/30 hover:text-white',
              })}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className={search()}>
          <Search className="h-5 w-5" />
          <span>Search team members, roles, or support topics</span>
        </div>
        <div className={grid()}>
          {people.map((person) => (
            <div key={person.name} className={member()}>
              <div className={avatar({ className: `bg-gradient-to-br ${person.gradient}` })}>
                {person.name.charAt(0)}
              </div>
              <p className="mt-4 font-semibold text-white">{person.name}</p>
              <p className="text-sm text-[#92929D]">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
