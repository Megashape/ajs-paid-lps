import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface HeaderProps {
  overHero?: boolean
  /** Tighter bar for above-the-fold funnels (smaller logo / padding). */
  compact?: boolean
  /** @deprecated Stars removed from header — kept for call-site compat; no-op. */
  quietProof?: boolean
}

export function Header({
  overHero = true,
  compact = false,
}: HeaderProps) {
  return (
    <header
      className={`relative z-40 ${
        overHero ? 'bg-transparent' : 'bg-navy-900 border-b border-white/10'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between gap-3 sm:gap-6 ${
            compact ? 'py-2.5 lg:py-3' : 'py-3 lg:py-4'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 pt-0.5 min-w-0 shrink">
            <img
              src={assetUrl('logo-white.png')}
              alt="All Janitorial Service"
              className={
                compact
                  ? 'h-9 sm:h-11 lg:h-12 w-auto max-w-[min(40vw,9.5rem)] sm:max-w-none object-contain object-left'
                  : 'h-12 sm:h-16 lg:h-[4.25rem] w-auto max-w-[min(42vw,11rem)] sm:max-w-none object-contain object-left'
              }
              width={220}
              height={68}
            />
          </Link>

          <a
            href={`tel:${PHONE_TEL}`}
            className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent hover:bg-white/10 text-white font-bold transition-colors tabular-nums ${
              compact
                ? 'text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5'
                : 'text-[13px] sm:text-base px-3.5 sm:px-5 py-2.5 sm:py-3'
            }`}
          >
            <Phone
              className={compact ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4'}
              aria-hidden
            />
            <span className="sm:hidden">{PHONE_DISPLAY}</span>
            <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
