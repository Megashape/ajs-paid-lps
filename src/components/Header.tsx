import { Link } from 'react-router-dom'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface HeaderProps {
  overHero?: boolean
}

export function Header({ overHero = true }: HeaderProps) {
  return (
    <header
      className={`relative z-40 ${
        overHero ? 'bg-transparent' : 'bg-navy-900 border-b border-white/10'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 sm:gap-6 py-3 lg:py-4">
          <Link to="/" className="flex items-center gap-3 pt-0.5 min-w-0 shrink">
            <img
              src={assetUrl('logo-white.png')}
              alt="All Janitorial Service"
              className="h-12 sm:h-16 lg:h-[4.25rem] w-auto max-w-[min(42vw,11rem)] sm:max-w-none object-contain object-left"
              width={220}
              height={68}
            />
          </Link>

          {/* Secondary only — primary CTA is form Continue. Full number, never truncated. */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="shrink-0 whitespace-nowrap text-[13px] sm:text-base font-medium text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors tabular-nums"
          >
            <span className="sm:hidden">{PHONE_DISPLAY}</span>
            <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
