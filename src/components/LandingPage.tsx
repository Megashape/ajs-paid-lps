import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { LandingCopy } from '../data/copy'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { readUtmsFromLocation } from '../lib/utm'
import { assetUrl } from '../lib/assetUrl'
import { Header } from './Header'
import { LeadForm } from './LeadForm'
import { TrustBar } from './TrustBar'
import { WhyCards } from './WhyCards'
import { Cities } from './Cities'
import { FAQ } from './FAQ'
import { BottomCta } from './BottomCta'
import { Footer } from './Footer'

interface LandingPageProps {
  copy: LandingCopy
}

export function LandingPage({ copy }: LandingPageProps) {
  useEffect(() => {
    readUtmsFromLocation()
    document.title = copy.metaTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', copy.metaDescription)
  }, [copy])

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="bg-navy-900">
        <Header overHero />
      </div>

      <section className="relative bg-navy-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={assetUrl('hero-office.webp')}
            alt=""
            className="h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/70" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 20% 20%, rgba(211,47,47,0.25), transparent 50%), radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.08), transparent 45%)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="pt-2 lg:pt-6 order-2 lg:order-1">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-200">
                {copy.badge}
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-tight text-white">
                {copy.headline}
              </h1>
              <p className="mt-4 text-white/75 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                {copy.subhead}
              </p>
              <ul className="mt-6 space-y-3">
                {copy.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-ajs-red shrink-0 mt-0.5" aria-hidden />
                    <span className="text-white/90 font-normal">{b}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-white/70">
                Prefer to talk?{' '}
                <a href={`tel:${PHONE_TEL}`} className="text-white font-medium underline underline-offset-4">
                  {PHONE_DISPLAY}
                </a>
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
                <img
                  src={assetUrl('office-interior.jpg')}
                  alt="Clean commercial office interior"
                  className="h-28 sm:h-32 w-full rounded-xl object-cover border border-white/15 shadow-lg"
                  loading="lazy"
                />
                <img
                  src={assetUrl('office-cleaning.webp')}
                  alt="Bay Area commercial office cleaning"
                  className="h-28 sm:h-32 w-full rounded-xl object-cover border border-white/15 shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:pt-2 order-1 lg:order-2">
              <LeadForm
                title={copy.formTitle}
                subtitle={copy.formSubtitle}
                variant={copy.variant}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
      <WhyCards title={copy.whyTitle} intro={copy.whyIntro} cards={copy.whyCards} />
      <Cities title={copy.citiesTitle} intro={copy.citiesIntro} />
      <FAQ title={copy.faqTitle} items={copy.faqs} />
      <BottomCta title={copy.ctaTitle} body={copy.ctaBody} />
      <Footer />
    </div>
  )
}
