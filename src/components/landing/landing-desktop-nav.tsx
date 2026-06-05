import { landingNavItems } from './landing-nav-config'
import { tv } from 'tailwind-variants'

const nav = tv({
  base: 'absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 lg:flex xl:gap-8',
})
const navLink = tv({
  base: 'text-base font-medium text-white/90 transition hover:text-white xl:text-lg',
})

export function LandingDesktopNav() {
  return (
    <nav className={nav()} aria-label="Main navigation">
      {landingNavItems.map((item) => (
        <a key={item.href} href={item.href} className={navLink()}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}
