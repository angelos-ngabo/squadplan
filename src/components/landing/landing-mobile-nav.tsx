import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { useAuth } from '../../hooks/useAuth'
import { landingNavItems } from './landing-nav-config'

const menuButton = tv({
  base: 'rounded-lg p-2 text-white/90 transition hover:bg-white/10 hover:text-white lg:hidden',
})

const panel = tv({
  base: 'fixed left-0 right-0 top-16 z-[100] border-b border-white/10 bg-[#141416]/80 py-2 shadow-2xl backdrop-blur-sm sm:top-20 md:bg-[#141416]/55 md:backdrop-blur-xl md:backdrop-saturate-150 lg:hidden',
})

const panelLink = tv({
  base: 'block px-6 py-3.5 text-base font-medium text-white transition hover:bg-white/10',
})

const ctaWrap = tv({ base: 'border-t border-white/10 px-6 py-4' })

const ctaButton = tv({
  base: 'block w-full rounded-[10px] bg-[#E97F18] px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-[#d56f10]',
})

const backdrop = tv({ base: 'fixed inset-0 z-[90] bg-black/50 max-md:bg-black/60 lg:hidden' })

export function LandingMobileNav() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <>
      <button
        type="button"
        className={menuButton()}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open ? (
        <>
          <button type="button" className={backdrop()} aria-label="Close menu" onClick={close} />
          <nav className={panel()} aria-label="Mobile navigation">
            {landingNavItems.map((item) => (
              <a key={item.href} href={item.href} className={panelLink()} onClick={close}>
                {item.label}
              </a>
            ))}
            <div className={ctaWrap()}>
              {user ? (
                <Link to="/app" className={ctaButton()} onClick={close}>
                  Manage My Events
                </Link>
              ) : (
                <Link to="/auth" className={ctaButton()} onClick={close}>
                  Get Started
                </Link>
              )}
            </div>
          </nav>
        </>
      ) : null}
    </>
  )
}
