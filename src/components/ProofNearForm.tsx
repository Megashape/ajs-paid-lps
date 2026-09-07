import { Star } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

/** Logo + stars (no counts) + BBB A+ + certs — wraps so everything is visible at rest (no H-scroll). */
export function ProofNearForm({ compact = false }: { compact?: boolean }) {
  const star = compact ? 16 : 28
  const badgeH = compact ? 32 : 52
  const logoH = compact ? 'h-8 sm:h-9' : 'h-12 sm:h-14'
  const logoW = compact ? 36 : 56
  const pad = compact
    ? 'rounded-lg border border-slate-200 bg-slate-50/90 px-2.5 py-2 sm:px-3 sm:py-2.5'
    : 'rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 py-3.5 sm:px-4 sm:py-4'
  const gapCol = compact ? 'gap-2' : 'gap-3.5'
  const gapRow = compact ? 'gap-x-2.5 gap-y-1.5' : 'gap-x-3.5 gap-y-2.5'
  const label = compact
    ? 'text-xs font-semibold text-slate-800 leading-none'
    : 'text-sm sm:text-base font-semibold text-slate-800 leading-none'
  const bbb = compact
    ? 'text-xs font-bold text-slate-900 whitespace-nowrap shrink-0 leading-none'
    : 'text-sm sm:text-base font-bold text-slate-900 whitespace-nowrap shrink-0 leading-none'

  return (
    <div className={pad}>
      <div className={`flex flex-col ${gapCol}`}>
        <div className={`flex flex-wrap items-center ${gapRow}`}>
          <img
            src={assetUrl('logo-color.png')}
            alt="All Janitorial Service"
            className={`${logoH} w-auto object-contain shrink-0`}
            width={logoW}
            height={logoW}
          />

          <div className="flex items-center gap-1 shrink-0" title="5-star Google">
            <div className="flex text-amber-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-current shrink-0"
                  style={{ width: star, height: star }}
                />
              ))}
            </div>
            <span className={label}>Google</span>
          </div>

          <div className="flex items-center gap-1 shrink-0" title="5-star Yelp">
            <div className="flex text-amber-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-current shrink-0"
                  style={{ width: star, height: star }}
                />
              ))}
            </div>
            <span className={label}>Yelp</span>
          </div>

          <span className={bbb}>BBB A+</span>
        </div>

        <div className={`flex flex-wrap items-center ${gapRow}`}>
          <img
            src={assetUrl('bbb.png')}
            alt="BBB Accredited"
            className="w-auto object-contain"
            style={{ height: badgeH }}
          />
          <img
            src={assetUrl('usgbc.png')}
            alt="USGBC Member"
            className="w-auto object-contain"
            style={{ height: badgeH }}
          />
          <img
            src={assetUrl('issa.png')}
            alt="ISSA"
            className="w-auto object-contain"
            style={{ height: badgeH }}
          />
          <img
            src={assetUrl('chamber.png')}
            alt="San Mateo Area Chamber"
            className="w-auto object-contain"
            style={{ height: badgeH }}
          />
        </div>
      </div>
    </div>
  )
}
