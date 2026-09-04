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
        <div className="flex items-center justify-between gap-6 py-3 lg:py-4">
          <Link to="/" className="flex items-center gap-3 pt-1 shrink-0">
            <img
              src={assetUrl('logo-white.png')}
              alt="All Janitorial Service"
              className="h-11 sm:h-12 w-auto object-contain"
              width={180}
              height={48}
            />
          </Link>

          {/* Secondary only — primary CTA is form Continue */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-sm sm:text-base font-medium text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  )
}
