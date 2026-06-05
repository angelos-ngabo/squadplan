import { Code2, MapPin } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#141416] py-16 sm:py-24' })
const inner = tv({ base: 'mx-auto grid max-w-[1100px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14' })
const photoWrap = tv({
  base: 'relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1f] shadow-[0_20px_60px_rgba(0,0,0,0.4)]',
})
const photo = tv({ base: 'aspect-[4/5] w-full object-cover object-top' })
const glow = tv({ base: 'pointer-events-none absolute -inset-4 rounded-3xl bg-[#E97F18]/10 blur-2xl' })
const copy = tv({ base: 'text-center lg:text-left' })
const eyebrow = tv({ base: 'text-sm font-medium uppercase tracking-wider text-[#E97F18]' })
const heading = tv({ base: 'mt-2 font-serif text-3xl font-bold text-white sm:text-4xl' })
const role = tv({ base: 'mt-2 text-lg font-medium text-white/90' })
const body = tv({ base: 'mt-6 space-y-4 text-base leading-relaxed text-[#92929D]' })
const meta = tv({ base: 'mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start' })
const metaItem = tv({ base: 'inline-flex items-center gap-2 text-sm text-[#92929D]' })
const tags = tv({ base: 'mt-8 flex flex-wrap justify-center gap-2 lg:justify-start' })
const tag = tv({
  base: 'rounded-full border border-[#E97F18]/25 bg-[#E97F18]/10 px-3 py-1 text-xs font-medium text-[#E97F18]',
})

export function LandingAudience() {
  return (
    <section id="team" className={section()}>
      <div className={inner()}>
        <div className="relative">
          <div className={glow()} />
          <div className={photoWrap()}>
            <img src="/images/founder.jpg" alt="Ngabo Angelos, founder of SquadPlan" className={photo()} />
          </div>
        </div>

        <div className={copy()}>
          <p className={eyebrow()}>The team</p>
          <h2 className={heading()}>It&apos;s just me — for now</h2>
          <p className={role()}>Ngabo Angelos · Founder &amp; Developer</p>

          <div className={body()}>
            <p>
              SquadPlan started from a simple frustration: planning group birthdays, trips, and dinners in Rwanda
              always turned into messy chats, lost pledges, and &ldquo;who paid what?&rdquo; threads that never ended.
            </p>
            <p>
              I built SquadPlan as a solo developer — design, code, and product — so organizers get one private link,
              guests can join without an account, and every contribution is tracked in one place. No spreadsheets, no
              public listings, no chaos.
            </p>
            <p>
              When you use SquadPlan, you&apos;re using something I made end-to-end because I wanted group events to
              feel organized, not stressful. Questions, feedback, or ideas? I&apos;d love to hear from you.
            </p>
          </div>

          <div className={meta()}>
            <span className={metaItem()}>
              <MapPin className="h-4 w-4 text-[#E97F18]" />
              Kigali, Rwanda
            </span>
            <span className={metaItem()}>
              <Code2 className="h-4 w-4 text-[#E97F18]" />
              Full stack developer
            </span>
          </div>

          <div className={tags()}>
            {['Event planning', 'Product design', 'Solo founder'].map((label) => (
              <span key={label} className={tag()}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
