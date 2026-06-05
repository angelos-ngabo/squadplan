import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const footer = tv({ base: 'border-t border-white/10 bg-[#141416] py-16' })
const inner = tv({ base: 'mx-auto max-w-[1200px] px-6' })
const grid = tv({ base: 'grid gap-12 md:grid-cols-2 lg:grid-cols-4' })
const columnTitle = tv({ base: 'mb-4 text-sm font-semibold uppercase tracking-wider text-white' })
const link = tv({ base: 'block text-sm text-[#92929D] transition hover:text-white' })
const bottom = tv({ base: 'mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between' })

export function LandingFooter() {
  return (
    <footer className={footer()}>
      <div className={inner()}>
        <div className={grid()}>
          <div>
            <img src="/logo.svg" alt="SquadPlan" className="h-10" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#92929D]">
              Group event planning made easy — private links, live contribution tracking, zero public listings.
            </p>
          </div>
          <div>
            <p className={columnTitle()}>Product</p>
            <a href="#features" className={link()}>Features</a>
            <a href="#about" className={`mt-2 ${link()}`}>About</a>
            <a href="#team" className={`mt-2 ${link()}`}>Team</a>
            <a href="#contact" className={`mt-2 ${link()}`}>Contact</a>
          </div>
          <div>
            <p className={columnTitle()}>Policy</p>
            <span className={link()}>Privacy</span>
            <span className={`mt-2 ${link()}`}>Terms</span>
            <span className={`mt-2 ${link()}`}>Support</span>
          </div>
          <div>
            <p className={columnTitle()}>Get started</p>
            <p className="text-sm text-[#92929D]">Event planning made easy!</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/auth" className="rounded-[10px] bg-[#E97F18] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d56f10]">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className={bottom()}>
          <p className="text-sm text-[#92929D]">© 2026 Ngabo Angelos. All rights reserved.</p>
          <p className="text-sm text-[#92929D]">Kigali, Rwanda · hello@squadplan.app</p>
        </div>
      </div>
    </footer>
  )
}
