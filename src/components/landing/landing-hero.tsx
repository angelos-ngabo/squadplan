import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import { useAuth } from '../../hooks/useAuth'
import { LandingMobileNav } from './landing-mobile-nav'

const section = tv({ base: 'relative min-h-[85vh] overflow-hidden bg-[#141416] sm:min-h-[90vh] lg:min-h-[960px]' })
const topBar = tv({
  base: 'absolute left-0 right-0 top-0 z-20 flex w-full items-center gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:px-[120px]',
})
const content = tv({
  base: 'relative z-10 mx-auto flex min-h-[85vh] max-w-[1440px] flex-col justify-end px-4 pb-16 sm:min-h-[90vh] sm:px-6 sm:pb-24 lg:min-h-[960px] lg:px-[125px]',
})
const titleWrap = tv({ base: 'max-w-[778px] space-y-4' })
const title = tv({
  base: 'font-display text-[36px] leading-[1.15] text-white sm:text-[56px] lg:text-[70px] lg:leading-[110px]',
})
const subtitle = tv({ base: 'max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg sm:leading-8 lg:text-[22px] lg:leading-10' })
const actions = tv({ base: 'mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4' })
const outlineBtn = tv({
  base: 'rounded-[10px] border border-white bg-[#141416]/80 px-6 py-3 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:px-8',
})
const primaryBtn = tv({
  base: 'rounded-[10px] bg-[#E97F18] px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-[#d56f10] sm:px-8',
})
const authButton = tv({ base: 'rounded-[10px] px-3 py-2 text-sm font-semibold transition sm:px-6 sm:py-2.5 sm:text-base' })
const logo = tv({ base: 'h-10 w-auto sm:h-14' })
const lineGlow = tv({
  base: 'pointer-events-none absolute stroke-[#E97F18] [filter:drop-shadow(0_0_10px_rgba(233,127,24,0.55))]',
})

function HeroOrangeLines() {
  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-75"
        viewBox="0 0 1440 960"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 620C220 660 420 590 680 640C920 685 1180 560 1440 610"
          className={lineGlow()}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M1440 180C1120 280 860 340 520 410C320 455 140 500 0 540"
          className={lineGlow()}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M1180 760C940 680 700 720 460 660C280 615 120 580 0 550"
          className={lineGlow()}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M980 120C760 210 540 250 320 290"
          className={lineGlow()}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <img
        src="/images/hero-vector-611.svg"
        alt=""
        className="pointer-events-none absolute left-[8%] top-[58%] z-[1] hidden w-[42%] max-w-[435px] opacity-90 mix-blend-screen sm:block lg:left-[125px] lg:top-[420px] lg:w-[280px] xl:w-[435px]"
      />
      <img
        src="/images/hero-vector-613.svg"
        alt=""
        className="pointer-events-none absolute right-[12%] top-[22%] z-[1] hidden w-[120px] opacity-80 mix-blend-screen sm:block lg:right-[180px] lg:top-[260px] lg:w-[220px]"
      />
      <img
        src="/images/hero-vector-614.svg"
        alt=""
        className="pointer-events-none absolute bottom-[26%] right-[8%] z-[1] hidden w-[180px] opacity-85 mix-blend-screen sm:block lg:bottom-[280px] lg:right-[120px] lg:w-[260px]"
      />
      <img
        src="/images/hero-vector-612.svg"
        alt=""
        className="pointer-events-none absolute bottom-[30%] left-[28%] z-[1] hidden w-[140px] opacity-70 mix-blend-screen sm:block lg:bottom-[320px] lg:left-[420px] lg:w-[240px]"
      />

      <div className="pointer-events-none absolute bottom-[18%] left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#E97F18]/70 to-transparent sm:bottom-[22%]" />
    </>
  )
}

export function LandingHero() {
  const { user } = useAuth()

  return (
    <section className={section()}>
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[62%_42%] sm:object-[58%_38%] lg:object-[52%_35%]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#141416] via-[#141416]/80 to-[#141416]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#E97F18]/25 via-transparent to-[#F24E1E]/10" />
      <div className="absolute inset-0 bg-[#141416]/20 mix-blend-multiply" />

      <HeroOrangeLines />

      <div className={topBar()}>
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="SquadPlan" className={logo()} />
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LandingMobileNav />
          {user ? (
            <Link to="/app" className={authButton({ className: 'bg-[#E97F18] text-white hover:bg-[#d56f10]' })}>
              <span className="hidden sm:inline">Manage My Events</span>
              <span className="sm:hidden">My Events</span>
            </Link>
          ) : (
            <Link to="/auth" className={authButton({ className: 'bg-[#E97F18] text-white hover:bg-[#d56f10]' })}>
              Get Started
            </Link>
          )}
        </div>
      </div>

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
              <a href="#how-it-works" className={outlineBtn()}>
                See How It Works
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
