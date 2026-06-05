import { Mail, MapPin, Phone } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#141416] py-24' })
const inner = tv({ base: 'mx-auto max-w-[1200px] px-6' })
const heading = tv({ base: 'font-serif text-4xl font-bold text-white' })
const grid = tv({ base: 'mt-12 grid gap-8 md:grid-cols-2' })
const card = tv({ base: 'rounded-2xl border border-white/10 bg-[#1b1b1f] p-8' })
const row = tv({ base: 'flex items-start gap-4 text-[#92929D]' })

export function LandingContact() {
  return (
    <section id="contact" className={section()}>
      <div className={inner()}>
        <p className="text-sm font-medium uppercase tracking-wider text-[#E97F18]">Contact</p>
        <h2 className={heading()}>Let&apos;s talk about your next event</h2>
        <div className={grid()}>
          <div className={card()}>
            <div className={row()}>
              <Mail className="mt-1 h-5 w-5 shrink-0 text-[#E97F18]" />
              <div>
                <p className="font-medium text-white">Email</p>
                <a href="mailto:hello@squadplan.app" className="mt-1 block text-sm hover:text-white">
                  hello@squadplan.app
                </a>
              </div>
            </div>
            <div className={`mt-6 ${row()}`}>
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#E97F18]" />
              <div>
                <p className="font-medium text-white">Phone</p>
                <p className="mt-1 text-sm">+250 788 000 000</p>
              </div>
            </div>
            <div className={`mt-6 ${row()}`}>
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#E97F18]" />
              <div>
                <p className="font-medium text-white">Location</p>
                <p className="mt-1 text-sm">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
          <form className={card()} onSubmit={(event) => event.preventDefault()}>
            <label className="block text-sm text-[#92929D]">
              Name
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#141416] px-4 py-3 text-white outline-none focus:border-[#E97F18]"
                placeholder="Your name"
              />
            </label>
            <label className="mt-4 block text-sm text-[#92929D]">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#141416] px-4 py-3 text-white outline-none focus:border-[#E97F18]"
                placeholder="you@example.com"
              />
            </label>
            <label className="mt-4 block text-sm text-[#92929D]">
              Message
              <textarea
                rows={4}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#141416] px-4 py-3 text-white outline-none focus:border-[#E97F18]"
                placeholder="Tell us about your squad..."
              />
            </label>
            <button
              type="submit"
              className="mt-6 rounded-[10px] bg-[#E97F18] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d56f10]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
