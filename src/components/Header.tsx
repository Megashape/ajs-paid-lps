import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface HeaderProps {
  /** When true, header sits over dark hero and stays transparent-ish */
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
        <div className="flex items-center justify-between gap-6 py-3 lg:py-4">
          <Link to="/" className="flex items-center gap-3 pt-1 shrink-0">
            <img
              src={assetUrl('logo-white.png')}
              alt="All Janitorial Service"
              className="h-12 sm:h-14 w-auto object-contain"
              width={180}
              height={56}
            />
          </Link>

          {/* Sparse header: phone only — school/multifamily nav intentionally hidden */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-3 font-bold text-white hover:text-red-200 transition-colors"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/15">
              <Phone className="w-5 h-5" aria-hidden />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                Direct commercial line
              </div>
              <div className="text-lg sm:text-xl tracking-tight">{PHONE_DISPLAY}</div>
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}
