import { tv } from 'tailwind-variants'

const section = tv({ base: 'bg-[#111114] py-24' })
const inner = tv({ base: 'mx-auto max-w-[800px] px-6 text-center' })
const heading = tv({ base: 'font-serif text-4xl font-bold text-white' })
const body = tv({ base: 'mt-6 space-y-4 text-base leading-relaxed text-[#92929D]' })
const stats = tv({ base: 'mt-10 grid grid-cols-3 gap-4' })
const statCard = tv({ base: 'rounded-xl border border-white/10 bg-[#141416] p-4 text-center' })

export function LandingAbout() {
  return (
    <section id="about" className={section()}>
      <div className={inner()}>
        <p className="text-sm font-medium uppercase tracking-wider text-[#E97F18]">About SquadPlan</p>
        <h2 className={heading()}>Built for real-life group coordination</h2>
        <div className={body()}>
          <p>
            SquadPlan helps friends, families, and communities plan birthdays, trips, weddings, and group dinners without spreadsheets or endless chat threads.
          </p>
          <p>
            Your events stay private — only people with the link can view or join. Organizers sign in to create and manage; guests simply open the URL.
          </p>
        </div>
        <div className={stats()}>
          <div className={statCard()}>
            <p className="text-2xl font-bold text-white">1 link</p>
            <p className="mt-1 text-xs text-[#92929D]">per event</p>
          </div>
          <div className={statCard()}>
            <p className="text-2xl font-bold text-white">Live</p>
            <p className="mt-1 text-xs text-[#92929D]">updates</p>
          </div>
          <div className={statCard()}>
            <p className="text-2xl font-bold text-white">RWF</p>
            <p className="mt-1 text-xs text-[#92929D]">tracking</p>
          </div>
        </div>
      </div>
    </section>
  )
}
