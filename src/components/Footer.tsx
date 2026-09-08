import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL, MAIN_SITE } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface FooterProps {
  hideCallCta?: boolean
}

const companyLinks = [
  { label: 'Main website', path: '' },
  { label: 'About AJS', path: '/about-us/' },
  { label: 'Contact our team', path: '/contact-us/' },
]

export function Footer({ hideCallCta = false }: FooterProps) {
  const linkClass = 'inline-flex items-center gap-1.5 py-1 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

  return (
    <footer className="border-t border-white/10 bg-navy-900 text-white">
      <div className="ajs-container">
        <div className="flex flex-col gap-5 border-b border-white/15 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-10">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Let’s plan a cleaner workplace.</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Start with a facility walkthrough and a cleaning plan built around your office.</p>
          </div>
          <a href="#lead-form" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-ajs-red px-5 py-3 text-sm font-bold transition-colors hover:bg-ajs-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Request a walkthrough <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="grid gap-x-8 gap-y-9 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-x-14 lg:py-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="All Janitorial Service main website (opens in a new tab)">
              <img src={assetUrl('logo-white.png')} alt="All Janitorial Service" className="h-11 w-auto" width={220} height={68} />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">Recurring commercial cleaning for Peninsula offices and corporate facilities.</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden /> Coordinated from Redwood City, CA</p>
          </div>

          <nav aria-label="AJS company">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map(({ label, path }) => (
                <li key={label}><a href={`${MAIN_SITE}${path}`} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}<ArrowUpRight className="h-3.5 w-3.5 text-slate-400" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></li>
              ))}
              <li><a href={`${MAIN_SITE}/recurring-janitorial-services/`} target="_blank" rel="noopener noreferrer" className={linkClass}>Recurring services<ArrowUpRight className="h-3.5 w-3.5 text-slate-400" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Talk to our team</h3>
            <a href={`tel:${PHONE_TEL}`} className={`${linkClass} font-semibold tabular-nums ${hideCallCta ? '' : 'rounded-lg border border-white/25 px-3 py-2'}`}><Phone className="h-4 w-4 text-slate-400" aria-hidden />{PHONE_DISPLAY}</a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">Weekly, multi-day, and weekend cleaning plans. Smaller offices welcome.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} All Janitorial Service Inc. All rights reserved.</p>
          <a href={`${MAIN_SITE}/privacy-policy/`} target="_blank" rel="noopener noreferrer" className="w-fit py-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Privacy policy<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </div>
    </footer>
  )
}
