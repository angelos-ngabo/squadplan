import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#111114] py-24' })
const inner = tv({ base: 'mx-auto max-w-[1200px] px-6' })
const header = tv({ base: 'flex flex-wrap items-end justify-between gap-4' })
const heading = tv({ base: 'font-serif text-4xl font-bold text-white' })
const badge = tv({ base: 'rounded-full bg-[#E97F18] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white' })
const grid = tv({ base: 'mt-12 grid gap-6 md:grid-cols-3' })
const card = tv({ base: 'overflow-hidden rounded-2xl border border-white/10 bg-[#141416]' })
const image = tv({ base: 'h-48 w-full object-cover' })
const body = tv({ base: 'p-6' })
const liveTag = tv({ base: 'mb-3 inline-block rounded-md bg-[#E97F18] px-2 py-1 text-xs font-bold uppercase text-white' })

const examples = [
  {
    title: 'Birthday Squad Dinner',
    location: 'Kigali · Remera',
    date: 'Sat, 14 Jun · 7:00 PM',
    image: '/images/hero-bg-373ac8.png',
    position: 'object-[center_20%]',
  },
  {
    title: 'Weekend Lake Trip',
    location: 'Rubavu · Lake Kivu',
    date: 'Sun, 22 Jun · 8:00 AM',
    image: '/images/hero-bg-373ac8.png',
    position: 'object-[center_40%]',
  },
  {
    title: 'Graduation Celebration',
    location: 'Kigali · Nyarutarama',
    date: 'Fri, 4 Jul · 6:30 PM',
    image: '/images/hero-bg-373ac8.png',
    position: 'object-[center_60%]',
  },
]

export function LandingShowcase() {
  return (
    <section className={section()}>
      <div className={inner()}>
        <div className={header()}>
          <div>
            <h2 className={heading()}>How SquadPlan works</h2>
            <p className="mt-2 text-[#92929D]">Private links only — events are never listed publicly.</p>
          </div>
          <span className={badge()}>By SquadPlan</span>
        </div>
        <div className={grid()}>
          {examples.map((item, index) => (
            <article key={item.title} className={card()}>
              <img src={item.image} alt="" className={image({ className: item.position })} />
              <div className={body()}>
                <span className={liveTag()}>Step {index + 1}</span>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-[#92929D]">{item.location}</p>
                <p className="text-sm text-[#92929D]">{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
