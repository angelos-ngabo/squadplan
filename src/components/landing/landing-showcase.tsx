import { ArrowRight, LayoutDashboard, Link2, PartyPopper, Users, type LucideIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#111114] py-16 sm:py-24' })
const inner = tv({ base: 'mx-auto max-w-[1200px] px-4 sm:px-6' })
const header = tv({ base: 'flex flex-wrap items-end justify-between gap-4' })
const heading = tv({ base: 'font-serif text-3xl font-bold text-white sm:text-4xl' })
const badge = tv({ base: 'rounded-full bg-[#E97F18] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white' })
const stepsGrid = tv({ base: 'relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4' })
const card = tv({
  base: 'relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#141416] p-6 transition hover:border-[#E97F18]/30',
})
const stepNumber = tv({
  base: 'mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#E97F18] text-sm font-bold text-white',
})
const iconWrap = tv({
  base: 'mb-4 inline-flex rounded-xl border border-[#E97F18]/20 bg-[#E97F18]/10 p-3 text-[#E97F18]',
})
const stepTitle = tv({ base: 'text-lg font-semibold text-white' })
const stepText = tv({ base: 'mt-2 flex-1 text-sm leading-relaxed text-[#92929D]' })
const connector = tv({
  base: 'pointer-events-none absolute top-[4.5rem] hidden h-px bg-gradient-to-r from-[#E97F18]/10 via-[#E97F18]/50 to-[#E97F18]/10 lg:block',
})

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: PartyPopper,
    title: 'Create your event',
    description:
      'Sign up and add the basics — title, date, location, budget target, and payment methods. SquadPlan instantly gives you a private guest link and an organizer dashboard.',
  },
  {
    icon: Link2,
    title: 'Share one private link',
    description:
      'Send the guest URL to your group on WhatsApp, iMessage, or email. Only people with the link can view or join. Your event is never listed publicly.',
  },
  {
    icon: Users,
    title: 'Guests RSVP & pledge',
    description:
      'Friends open the link with no account needed. They confirm attendance, pledge how much they will contribute, and choose a payment method.',
  },
  {
    icon: LayoutDashboard,
    title: 'Track payments live',
    description:
      'Watch pledges and payments update on your dashboard in real time. Mark contributions as paid, see who is still outstanding, and share progress with your squad.',
  },
]

export function LandingShowcase() {
  return (
    <section id="how-it-works" className={section()}>
      <div className={inner()}>
        <div className={header()}>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-[#E97F18]">How it works</p>
            <h2 className={heading()}>How SquadPlan works</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#92929D] sm:text-base">
              From creating an event to collecting every contribution — four simple steps, one private link, zero
              spreadsheets.
            </p>
          </div>
          <span className={badge()}>4 steps</span>
        </div>

        <div className={stepsGrid()}>
          <div className={connector({ className: 'left-[12.5%] right-[12.5%]' })} aria-hidden />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className={card()}>
                <span className={stepNumber()}>{index + 1}</span>
                <div className={iconWrap()}>
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className={stepTitle()}>{step.title}</h3>
                <p className={stepText()}>{step.description}</p>
                {index < steps.length - 1 ? (
                  <ArrowRight
                    className="mt-4 h-4 w-4 text-[#E97F18]/50 lg:hidden"
                    aria-hidden
                  />
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
