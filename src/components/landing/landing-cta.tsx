import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#141416] py-24' })
const inner = tv({ base: 'mx-auto max-w-[800px] px-6 text-center' })
const heading = tv({ base: 'font-serif text-4xl font-bold text-white md:text-5xl' })
const sub = tv({ base: 'mt-4 text-lg text-[#92929D]' })
const btn = tv({
  base: 'mt-10 inline-block rounded-[10px] bg-[#E97F18] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#d56f10]',
})

export function LandingCta() {
  return (
    <section className={section()}>
      <div className={inner()}>
        <h2 className={heading()}>Plan together. Pay together. Stress less.</h2>
        <p className={sub()}>Join SquadPlan today for free — create your first event in under two minutes.</p>
        <Link to="/auth" className={btn()}>
          Get Started
        </Link>
      </div>
    </section>
  )
}
