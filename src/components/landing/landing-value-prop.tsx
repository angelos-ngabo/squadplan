import { CalendarDays, ShieldCheck } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#141416] py-24' })
const inner = tv({ base: 'mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-2 lg:items-start' })
const heading = tv({ base: 'font-serif text-4xl font-bold leading-tight text-white md:text-5xl' })
const cards = tv({ base: 'space-y-6' })
const card = tv({ base: 'rounded-2xl border border-white/10 bg-[#1b1b1f] p-8' })
const iconWrap = tv({ base: 'mb-5 inline-flex rounded-xl p-3' })

export function LandingValueProp() {
  return (
    <section id="features" className={section()}>
      <div className={inner()}>
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-[#E97F18]">Features</p>
          <h2 className={heading()}>
            Thousands of events planned and counting! We help organizers coordinate and guests contribute with zero friction.
          </h2>
        </div>
        <div className={cards()}>
          <article className={card()}>
            <div className={iconWrap({ className: 'bg-emerald-500/15 text-emerald-400' })}>
              <CalendarDays className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Organizers</h3>
            <p className="mt-3 text-base leading-relaxed text-[#92929D]">
              Sign up, create an event in minutes, and share one private link. Track who joined, who paid, and what is still owed on a live dashboard.
            </p>
          </article>
          <article className={card()}>
            <div className={iconWrap({ className: 'bg-[#E97F18]/15 text-[#E97F18]' })}>
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Guests</h3>
            <p className="mt-3 text-base leading-relaxed text-[#92929D]">
              Open the shared link — no account needed. RSVP, pledge your contribution, and see payment instructions instantly.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
