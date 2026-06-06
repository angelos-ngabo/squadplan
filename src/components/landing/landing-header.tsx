import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import { useAuth } from '../../hooks/useAuth'
import { LandingDesktopNav } from './landing-desktop-nav'
import { LandingMobileNav } from './landing-mobile-nav'

const headerShell = tv({
  base: 'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
  variants: {
    visible: {
      true: 'translate-y-0 border-b border-white/10 bg-[#141416]/55 backdrop-blur-md max-md:bg-[#141416]/80 max-md:backdrop-blur-sm md:backdrop-blur-xl md:backdrop-saturate-150',
      false: '-translate-y-full pointer-events-none',
    },
  },
})
const headerInner = tv({
  base: 'relative flex h-16 items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-[120px]',
})
const authButton = tv({
  base: 'hidden rounded-[10px] px-6 py-2.5 text-base font-semibold transition sm:inline-flex sm:px-6 sm:py-2.5',
})
const logo = tv({ base: 'h-10 w-auto sm:h-14' })

const SCROLL_THRESHOLD = 80
const SCROLL_DELTA = 8

export function LandingHeader() {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const current = window.scrollY

      if (current < SCROLL_THRESHOLD) {
        setVisible(false)
      } else if (current < lastScrollY.current - SCROLL_DELTA) {
        setVisible(true)
      } else if (current > lastScrollY.current + SCROLL_DELTA) {
        setVisible(false)
      }

      lastScrollY.current = current
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={headerShell({ visible })}>
      <div className={headerInner()}>
        <Link to="/" className="relative z-10 shrink-0">
          <img src="/logo.svg" alt="SquadPlan" className={logo()} />
        </Link>

        <LandingDesktopNav />

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <LandingMobileNav />
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
    </header>
  )
}
