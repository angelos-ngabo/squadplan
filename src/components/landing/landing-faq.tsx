import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#111114] py-24' })
const inner = tv({ base: 'mx-auto max-w-[900px] px-6' })
const heading = tv({ base: 'text-center font-serif text-4xl font-bold text-white' })
const sub = tv({ base: 'mx-auto mt-4 max-w-xl text-center text-[#92929D]' })
const tabs = tv({ base: 'mt-10 flex flex-wrap justify-center gap-3' })
const tab = tv({ base: 'rounded-full border px-5 py-2 text-sm font-medium transition' })
const list = tv({ base: 'mt-10 space-y-4' })
const item = tv({ base: 'overflow-hidden rounded-2xl border border-white/10 bg-[#141416]' })
const question = tv({ base: 'flex w-full items-center justify-between px-6 py-5 text-left text-white' })
const answer = tv({ base: 'border-t border-white/5 px-6 pb-5 text-sm leading-relaxed text-[#92929D]' })

const categories = ['General', 'Organizers', 'Guests', 'Payments'] as const

const faqs = [
  {
    category: 'General' as const,
    q: 'What is SquadPlan?',
    a: 'SquadPlan is a link-based group event manager. Organizers create private events; guests join through a shared URL without signing up.',
  },
  {
    category: 'Organizers' as const,
    q: 'Do I need an account to create an event?',
    a: 'Yes. Creating and managing events requires a free SquadPlan account so your events stay private and tied to you.',
  },
  {
    category: 'Guests' as const,
    q: 'Can guests join without an account?',
    a: 'Absolutely. Anyone with the event link can RSVP and pledge a contribution — no login required.',
  },
  {
    category: 'Payments' as const,
    q: 'Does SquadPlan process payments?',
    a: 'SquadPlan tracks pledges and payment status. You share your own Mobile Money or bank details; we help everyone see who has paid.',
  },
]

export function LandingFaq() {
  const [category, setCategory] = useState<(typeof categories)[number]>('General')
  const [openIndex, setOpenIndex] = useState(0)

  const filtered = faqs.filter((faq) => faq.category === category)

  return (
    <section className={section()}>
      <div className={inner()}>
        <h2 className={heading()}>Frequently Asked Questions</h2>
        <p className={sub()}>
          Everything you need to know about creating events, sharing links, and tracking contributions.
        </p>
        <div className={tabs()}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat)
                setOpenIndex(0)
              }}
              className={tab({
                className:
                  category === cat
                    ? 'border-[#E97F18] bg-[#E97F18] text-white'
                    : 'border-white/10 text-[#92929D] hover:text-white',
              })}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={list()}>
          {filtered.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.q} className={item()}>
                <button type="button" className={question()} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  {faq.q}
                  <ChevronDown className={`h-5 w-5 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen ? <p className={answer()}>{faq.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
