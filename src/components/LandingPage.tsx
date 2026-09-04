import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { LandingCopy } from '../data/copy'
import { readUtmsFromLocation } from '../lib/utm'
import { Header } from './Header'
import { MobileCallBar } from './MobileCallBar'
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
    <div className="min-h-screen flex flex-col">
      <div className="bg-navy-900">
        <Header overHero />
      </div>
      <MobileCallBar />

      <section className="relative bg-navy-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(211,47,47,0.25), transparent 50%), radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.08), transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="pt-2 lg:pt-6">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-200">
                {copy.badge}
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight">
                {copy.headline}
              </h1>
              <p className="mt-4 text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
                {copy.subhead}
              </p>
              <ul className="mt-6 space-y-3">
                {copy.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-ajs-red shrink-0 mt-0.5" aria-hidden />
                    <span className="text-white/90">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                className="mt-8 inline-flex lg:hidden items-center justify-center rounded-xl bg-ajs-red hover:bg-ajs-red-dark font-bold px-5 h-12 w-full sm:w-auto"
              >
                Request a walkthrough
              </a>
            </div>

            <div className="lg:pt-2">
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
