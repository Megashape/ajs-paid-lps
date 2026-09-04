import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, Phone } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'

export function ThankYouPage() {
  const location = useLocation()
  const company =
    location.state && typeof location.state === 'object' && 'company' in location.state
      ? String((location.state as { company?: string }).company ?? '')
      : ''

  useEffect(() => {
    document.title = 'Thank you — All Janitorial Service'
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-navy-900">
        <Header overHero={false} />
      </div>
      <main className="flex-1 mx-auto max-w-lg w-full px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold text-navy-900">Thank you{company ? `, ${company}` : ''}</h1>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            We received your walkthrough request. A member of our Peninsula team will follow up
            shortly. Same-day contact happens when we can — it is not a guarantee.
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-ajs-red hover:bg-ajs-red-dark text-white font-bold px-5 h-12 w-full"
          >
            <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
          </a>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <Link to="/office" className="text-ajs-red font-semibold hover:underline">
              Office landing
            </Link>
            <span className="hidden sm:inline text-slate-300">·</span>
            <Link to="/recurring" className="text-ajs-red font-semibold hover:underline">
              Recurring landing
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
