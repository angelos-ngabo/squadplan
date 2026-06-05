import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { tv } from 'tailwind-variants'

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

const menuButton = tv({
  base: 'rounded-lg p-2 text-white/90 transition hover:bg-white/10 hover:text-white lg:hidden',
})

const panel = tv({
  base: 'absolute left-0 right-0 top-full border-b border-white/10 bg-[#141416]/98 backdrop-blur-md lg:hidden',
})

const panelLink = tv({
  base: 'block px-6 py-3 text-base font-medium text-white/90 transition hover:bg-white/5 hover:text-white',
})

export function LandingMobileNav() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <div className="relative lg:hidden">
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
        <nav className={panel()}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={panelLink()} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
