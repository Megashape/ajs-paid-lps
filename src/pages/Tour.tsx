import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck2, CheckCircle2, ClipboardList, PhoneCall } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { StarRow } from '../components/StarRow'
import { assetUrl } from '../lib/assetUrl'
import { readUtmsFromLocation } from '../lib/utm'
import { trackFunnelEvent } from '../lib/funnelAnalytics'
import { MAIN_SITE } from '../lib/constants'
import { PROUD_MEMBER_BADGES, REVIEW_LOGOS } from '../data/trustAssets'

/** HighLevel calendar "Free Office Tour" (location coGxsx2Rqlhr7EDaU5Ui), owner Chris Ramirez. */
const TOUR_CALENDAR_ID = 'miYRhYG4lIVbs5n8INkW'
const WIDGET_BASE = `https://api.leadconnectorhq.com/widget/booking/${TOUR_CALENDAR_ID}`
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js'

const STEPS = [
  { icon: CalendarCheck2, title: 'Pick a time', body: 'Weekdays, 9 AM to 4 PM Pacific.' },
  { icon: PhoneCall, title: 'Chris confirms', body: 'A quick call to confirm your address.' },
  { icon: ClipboardList, title: 'Get your plan', body: 'A cleaning plan and quote for your office.' },
] as const

function useEmbedScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.async = true
    document.body.appendChild(s)
  }, [])
}

export function TourPage() {
  useEmbedScript()

  const src = useMemo(() => {
    const utms = readUtmsFromLocation()
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(utms)) if (v) params.set(k, v)
    const q = params.toString()
    return q ? `${WIDGET_BASE}?${q}` : WIDGET_BASE
  }, [])

  useEffect(() => {
    document.title = 'Book a free office tour | All Janitorial Service'
    trackFunnelEvent('ajs_tour_view')
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-navy-900">
        <Header overHero={false} compact />
      </div>

      <main className="flex-1">
        <section className="ajs-container py-8 sm:py-12 lg:py-16" aria-labelledby="tour-title">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <p className="text-[0.6875rem] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red">
                Free · 30 minutes · At your office
              </p>
              <h1
                id="tour-title"
                className="mt-3 text-[2rem] leading-[1.1] sm:text-5xl font-extrabold tracking-tight text-navy-900 text-balance"
              >
                Book your free office tour
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-md">
                We walk your space and plan recurring cleaning that fits how your office runs.
              </p>

              <ol className="mt-8 hidden lg:grid gap-5" aria-label="How the tour works">
                {STEPS.map(({ icon: Icon, title, body }, i) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ajs-red ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                    </span>
                    <span className="pt-0.5">
                      <span className="block font-bold text-navy-900">
                        {i + 1}. {title}
                      </span>
                      <span className="block text-sm text-slate-600">{body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <figure className="mt-8 hidden lg:block border-t border-slate-200 pt-6">
                <img
                  src={assetUrl('chris-truck-crop.jpg')}
                  alt="All Janitorial Service team next to a company van"
                  className="w-full max-w-sm aspect-[1022/860] rounded-2xl object-cover"
                  width={1022}
                  height={860}
                />
                <figcaption className="mt-3 text-sm leading-snug">
                  <span className="block font-bold text-navy-900">Your tour is with Chris Ramirez, Owner</span>
                  <span className="block text-slate-600">Local team, based in Redwood City.</span>
                </figcaption>
              </figure>
            </div>

            <div id="book" className="lg:col-span-7 scroll-mt-6">
              <iframe
                src={src}
                id={`${TOUR_CALENDAR_ID}_tour`}
                title="Pick a time for your free office tour"
                scrolling="no"
                className="block w-full min-h-[46rem] sm:min-h-[40rem] border-0 overflow-hidden bg-transparent"
              />
              <p className="mt-3 text-center text-xs text-slate-500">
                Times show in your time zone. Our team works in Pacific time.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile and tablet: how it works + who you meet, after the calendar */}
        <section className="ajs-container pb-10 lg:hidden" aria-label="How the tour works">
          <ol className="grid gap-5 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex items-start gap-4 sm:flex-col sm:gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ajs-red ring-1 ring-slate-200">
                  <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block font-bold text-navy-900">
                    {i + 1}. {title}
                  </span>
                  <span className="block text-sm text-slate-600">{body}</span>
                </span>
              </li>
            ))}
          </ol>
          <figure className="mt-8 border-t border-slate-200 pt-6">
            <img
              src={assetUrl('chris-truck-crop.jpg')}
              alt="All Janitorial Service team next to a company van"
              className="w-full max-w-sm aspect-[1022/860] rounded-2xl object-cover"
              width={1022}
              height={860}
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm leading-snug">
              <span className="block font-bold text-navy-900">Your tour is with Chris Ramirez, Owner</span>
              <span className="block text-slate-600">Local team, based in Redwood City.</span>
            </figcaption>
          </figure>
        </section>

        <section className="bg-white border-t border-slate-200 py-10 sm:py-12" aria-label="Reviews and memberships">
          <div className="ajs-container flex flex-col items-center gap-8">
            <div className="flex flex-wrap items-end justify-center gap-x-12 gap-y-6">
              {REVIEW_LOGOS.map((l) => (
                <div key={l.alt} className="flex flex-col items-center gap-2">
                  <img src={assetUrl(l.src)} alt={l.alt} className={l.className} loading="lazy" />
                  <StarRow />
                </div>
              ))}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6" aria-label="Memberships">
              {PROUD_MEMBER_BADGES.map((b) => (
                <li key={b.alt}>
                  <img src={assetUrl(b.src)} alt={b.alt} className={b.className} loading="lazy" />
                </li>
              ))}
            </ul>
            <a
              href={MAIN_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-[0.14em] text-ajs-red hover:text-ajs-red-dark"
            >
              About All Janitorial Service
            </a>
          </div>
        </section>
      </main>

      <Footer ctaHref="#book" ctaLabel="Pick a tour time" />
    </div>
  )
}

export function TourBookedPage() {
  useEffect(() => {
    document.title = 'Your office tour is booked | All Janitorial Service'
    trackFunnelEvent('ajs_tour_booked')
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-navy-900">
        <Header overHero={false} compact />
      </div>
      <main className="flex-1 mx-auto max-w-lg w-full px-4 py-16 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto" aria-hidden />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900">Your office tour is booked</h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Check your email for the time. Chris will call before the tour to confirm your address.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center text-sm">
          <Link to="/" className="text-ajs-red font-semibold hover:underline">
            See our office cleaning
          </Link>
        </div>
      </main>
      <Footer ctaHref="/tour" ctaLabel="Book another tour" />
    </div>
  )
}
