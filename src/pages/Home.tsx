import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'

/** Staging-only index linking to paid LPs. */
export function HomePage() {
  useEffect(() => {
    document.title = 'AJS Paid LPs (staging)'
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-navy-900">
        <Header overHero={false} />
      </div>
      <main className="flex-1 mx-auto max-w-2xl w-full px-4 py-14">
        <p className="text-xs font-bold uppercase tracking-wider text-ajs-red">Staging index</p>
        <h1 className="mt-2 text-3xl font-bold text-navy-900">All Janitorial Service — paid LPs</h1>
        <p className="mt-3 text-slate-600 text-sm">
          Internal index for preview. Production ads should deep-link to a specific route.
        </p>
        <div className="mt-8 grid gap-4">
          <Link
            to="/office"
            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-ajs-red transition"
          >
            <span className="text-xs font-bold text-ajs-red uppercase">/office</span>
            <h2 className="mt-1 font-bold text-navy-900 text-lg">Office / Corporate Facilities</h2>
            <p className="mt-1 text-sm text-slate-600">Weekly office cleaning — commercial specialist angle.</p>
          </Link>
          <Link
            to="/recurring"
            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-ajs-red transition"
          >
            <span className="text-xs font-bold text-ajs-red uppercase">/recurring</span>
            <h2 className="mt-1 font-bold text-navy-900 text-lg">Recurring Commercial Janitorial</h2>
            <p className="mt-1 text-sm text-slate-600">Standing schedules for Peninsula commercial accounts.</p>
          </Link>
          <Link
            to="/thank-you"
            className="block rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600 hover:border-ajs-red"
          >
            /thank-you — post-submit confirmation
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Phone:{' '}
          <a href={`tel:${PHONE_TEL}`} className="font-semibold text-ajs-red">
            {PHONE_DISPLAY}
          </a>
        </p>
      </main>
      <Footer />
    </div>
  )
}
