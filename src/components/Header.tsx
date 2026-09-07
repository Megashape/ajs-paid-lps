import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface HeaderProps {
  overHero?: boolean
  /** Tighter bar for above-the-fold funnels (smaller logo / padding). */
  compact?: boolean
  /** Quiet chrome proof (AFHC-style) — one star row, no counts. */
  quietProof?: boolean
}

export function Header({
  overHero = true,
  compact = false,
  quietProof = false,
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

          {quietProof && (
            <div className="hidden md:flex flex-col items-center text-center min-w-0 px-2">
              <div className="flex items-center gap-1.5 text-white">
                <div className="flex text-amber-400" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="fill-current shrink-0"
                      style={{ width: 14, height: 14 }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-0.5 text-[10px] lg:text-[11px] text-white/50 leading-none">
                Peninsula commercial cleaning
              </p>
            </div>
          )}

          <a
            href={`tel:${PHONE_TEL}`}
            className={`shrink-0 whitespace-nowrap font-semibold text-white hover:text-white/90 transition-colors tabular-nums ${
              compact ? 'text-xs sm:text-sm' : 'text-[13px] sm:text-base'
            }`}
          >
            <span className="sm:hidden">{PHONE_DISPLAY}</span>
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Mobile quiet proof — one line under bar, never a grey billboard */}
        {quietProof && (
          <div className="md:hidden flex items-center justify-center gap-1.5 pb-2.5 -mt-0.5">
            <div className="flex text-amber-400" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-current shrink-0"
                  style={{ width: 12, height: 12 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
