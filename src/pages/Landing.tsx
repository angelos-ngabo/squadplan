import { LandingAbout } from '../components/landing/landing-about'
import { LandingAudience } from '../components/landing/landing-audience'
import { LandingContact } from '../components/landing/landing-contact'
import { LandingCta } from '../components/landing/landing-cta'
import { LandingFaq } from '../components/landing/landing-faq'
import { LandingFooter } from '../components/landing/landing-footer'
import { LandingHeader } from '../components/landing/landing-header'
import { LandingHero } from '../components/landing/landing-hero'
import { LandingPartners } from '../components/landing/landing-partners'
import { LandingShowcase } from '../components/landing/landing-showcase'
import { LandingValueProp } from '../components/landing/landing-value-prop'

export function Landing() {
  return (
    <div className="min-h-screen bg-[#141416] font-sans text-white">
      <LandingHeader />
      <LandingHero />
      <LandingPartners />
      <LandingValueProp />
      <LandingShowcase />
      <LandingAbout />
      <LandingAudience />
      <LandingFaq />
      <LandingContact />
      <LandingCta />
      <LandingFooter />
    </div>
  )
}
