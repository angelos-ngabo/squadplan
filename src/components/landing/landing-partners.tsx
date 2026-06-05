import { tv } from 'tailwind-variants'

const section = tv({ base: 'border-y border-white/5 bg-[#141416] py-10' })
const inner = tv({ base: 'mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between' })
const label = tv({ base: 'text-sm font-medium uppercase tracking-wider text-[#92929D]' })
const logos = tv({ base: 'flex flex-wrap items-center justify-center gap-8 md:gap-12' })

const partners = ['Kigali Squads', 'Campus Events', 'Family Circles', 'Weekend Crew', 'Trip Planners', 'Community Groups']

export function LandingPartners() {
  return (
    <section className={section()}>
      <div className={inner()}>
        <p className={label()}>Trusted by squads</p>
        <div className={logos()}>
          {partners.map((name) => (
            <span key={name} className="text-lg font-semibold uppercase tracking-[0.2em] text-white/40">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
