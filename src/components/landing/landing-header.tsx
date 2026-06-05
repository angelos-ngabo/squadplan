import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import { useAuth } from '../../hooks/useAuth'

const headerShell = tv({
  base: 'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
  variants: {
    visible: {
      true: 'translate-y-0 border-b border-white/5 bg-[#141416]/95 backdrop-blur-md',
      false: '-translate-y-full pointer-events-none',
    },
  },
})
const headerInner = tv({
  base: 'relative flex h-20 w-full items-center px-6 lg:px-[120px]',
})
const nav = tv({ base: 'absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex' })
const navLink = tv({ base: 'text-xl font-medium text-white/90 transition hover:text-white' })
const navLinkActive = tv({ base: 'relative text-xl font-medium text-white' })
const authButton = tv({ base: 'rounded-[10px] px-6 py-2.5 text-base font-semibold transition' })
const logo = tv({ base: 'h-14 w-auto' })

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About', active: true },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function LandingHeader() {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80)
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

        <nav className={nav()}>
          {navItems.map((item) =>
            item.active ? (
              <a key={item.href} href={item.href} className={navLinkActive()}>
                <span className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#F24E1E]" />
                {item.label}
              </a>
            ) : (
              <a key={item.href} href={item.href} className={navLink()}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3">
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
