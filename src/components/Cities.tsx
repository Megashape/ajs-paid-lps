import { MapPin } from 'lucide-react'
import { HUB_CITY, SERVICE_CITIES } from '../data/cities'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'

interface CitiesProps {
  title: string
  intro: string
}

export function Cities({ title, intro }: CitiesProps) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-ajs-red text-xs font-bold uppercase tracking-wider mb-2">
          Bay Area coverage
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">{title}</h2>
        <p className="mt-3 text-slate-600 max-w-2xl text-sm sm:text-base">{intro}</p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 text-white px-4 py-2 text-sm font-semibold">
          <MapPin className="w-4 h-4 text-ajs-red" aria-hidden />
          Hub: {HUB_CITY}, CA
        </div>

        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {SERVICE_CITIES.map((city) => (
            <li
              key={city}
              className={`rounded-xl border px-3 py-3 text-center text-sm font-semibold ${
                city === HUB_CITY
                  ? 'border-ajs-red bg-red-50 text-ajs-red'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              {city}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-slate-600">
          Don&apos;t see your city? Call{' '}
          <a href={`tel:${PHONE_TEL}`} className="font-bold text-ajs-red hover:underline">
            {PHONE_DISPLAY}
          </a>{' '}
          or choose &quot;Other&quot; on the form — we may not serve every area.
        </p>
      </div>
    </section>
  )
}
