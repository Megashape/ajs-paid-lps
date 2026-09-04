import { Star } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

const STAR = 28
const BADGE_H = 52

/** Logo + stars (no counts) + BBB A+ + certs — wraps so everything is visible at rest (no H-scroll). */
export function ProofNearForm() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 py-3.5 sm:px-4 sm:py-4">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
          <img
            src={assetUrl('logo-color.png')}
            alt="All Janitorial Service"
            className="h-12 sm:h-14 w-auto object-contain shrink-0"
            width={56}
            height={56}
          />

          <div className="flex items-center gap-1.5 shrink-0" title="5-star Google">
            <div className="flex text-amber-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-current shrink-0"
                  style={{ width: STAR, height: STAR }}
                />
              ))}
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800 leading-none">
              Google
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0" title="5-star Yelp">
            <div className="flex text-amber-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-current shrink-0"
                  style={{ width: STAR, height: STAR }}
                />
              ))}
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800 leading-none">
              Yelp
            </span>
          </div>

          <span className="text-sm sm:text-base font-bold text-slate-900 whitespace-nowrap shrink-0 leading-none">
            BBB A+
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
          <img
            src={assetUrl('bbb.png')}
            alt="BBB Accredited"
            className="w-auto object-contain"
            style={{ height: BADGE_H }}
          />
          <img
            src={assetUrl('usgbc.png')}
            alt="USGBC Member"
            className="w-auto object-contain"
            style={{ height: BADGE_H }}
          />
          <img
            src={assetUrl('issa.png')}
            alt="ISSA"
            className="w-auto object-contain"
            style={{ height: BADGE_H }}
          />
          <img
            src={assetUrl('chamber.png')}
            alt="San Mateo Area Chamber"
            className="w-auto object-contain"
            style={{ height: BADGE_H }}
          />
        </div>
      </div>
    </div>
  )
}
