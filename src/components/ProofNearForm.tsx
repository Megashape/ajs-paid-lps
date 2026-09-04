import { Star } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

const STAR = 22
const BADGE_H = 40

/** Logo + stars (no counts) + BBB A+ + certs — wraps so everything is visible at rest (no H-scroll). */
export function ProofNearForm() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-4">
      <div className="flex flex-col gap-3">
        {/* Row 1: logo + ratings + BBB claim */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <img
            src={assetUrl('logo-color.png')}
            alt="All Janitorial Service"
            className="h-10 w-auto object-contain shrink-0"
            width={40}
            height={40}
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
            <span className="text-sm font-semibold text-slate-800 leading-none">Google</span>
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
            <span className="text-sm font-semibold text-slate-800 leading-none">Yelp</span>
          </div>

          <span className="text-sm font-bold text-slate-900 whitespace-nowrap shrink-0 leading-none">
            BBB A+
          </span>
        </div>

        {/* Row 2: cert badges — wrap, all visible at rest including Chamber */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
