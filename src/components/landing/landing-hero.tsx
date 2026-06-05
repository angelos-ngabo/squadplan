import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import { useAuth } from '../../hooks/useAuth'

const section = tv({ base: 'relative min-h-[960px] overflow-hidden bg-[#141416]' })
const overlay = tv({ base: 'absolute inset-0 bg-gradient-to-b from-black/30 via-[#141416]/40 to-[#141416]' })
const topBar = tv({
  base: 'absolute left-0 right-0 top-0 z-10 flex w-full items-center px-6 py-6 lg:px-[120px]',
})
const content = tv({
  base: 'relative mx-auto flex min-h-[960px] max-w-[1440px] flex-col justify-end px-6 pb-24 lg:px-[125px]',
})
const titleWrap = tv({ base: 'max-w-[778px] space-y-4' })
const title = tv({ base: 'font-display text-[42px] leading-[1.15] text-white sm:text-[56px] lg:text-[70px] lg:leading-[110px]' })
const subtitle = tv({ base: 'max-w-2xl text-[22px] leading-10 text-white/90' })
const actions = tv({ base: 'mt-12 flex flex-wrap gap-4' })
const outlineBtn = tv({
  base: 'rounded-[10px] border border-white bg-[#141416] px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10',
})
const primaryBtn = tv({
  base: 'rounded-[10px] bg-[#E97F18] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#d56f10]',
})
const authButton = tv({ base: 'rounded-[10px] px-6 py-2.5 text-base font-semibold transition' })

export function LandingHero() {
  const { user } = useAuth()

  return (
    <section className={section()}>
      <img src="/images/hero-bg-373ac8.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={overlay()} />

      <div className={topBar()}>
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="SquadPlan" className="h-14 w-auto" />
        </Link>
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <Link to="/app" className={authButton({ className: 'bg-[#E97F18] text-white hover:bg-[#d56f10]' })}>
              Manage My Events
            </Link>
          ) : (
            <Link to="/auth" className={authButton({ className: 'bg-[#E97F18] text-white hover:bg-[#d56f10]' })}>
              Get Started
            </Link>
          )}
        </div>
      </div>

      <img src="/images/hero-vector-611.svg" alt="" className="pointer-events-none absolute left-[125px] top-[420px] hidden w-[280px] lg:block xl:w-[435px]" />
      <img src="/images/hero-vector-613.svg" alt="" className="pointer-events-none absolute right-[180px] top-[260px] hidden w-[220px] lg:block" />
      <img src="/images/hero-vector-614.svg" alt="" className="pointer-events-none absolute bottom-[280px] right-[120px] hidden w-[260px] lg:block" />
      <img src="/images/hero-vector-612.svg" alt="" className="pointer-events-none absolute bottom-[320px] left-[420px] hidden w-[240px] lg:block" />

      <div className={content()}>
        <div className={titleWrap()}>
          <h1 className={title()}>Group events, without the chaos!</h1>
          <p className={subtitle()}>
            Plan birthdays, trips, and squad dinners with one private link — track pledges and payments in real time.
          </p>
        </div>
        <div className={actions()}>
          {user ? (
            <Link to="/app" className={primaryBtn()}>
              Manage My Events
            </Link>
          ) : (
            <>
              <Link to="/auth" className={primaryBtn()}>
                Get Started
              </Link>
              <a href="#features" className={outlineBtn()}>
                See How It Works
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
