import { Star } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

/** Logo + stars (no counts) + BBB A+ + certs — one aligned readable row on the form. */
export function ProofNearForm() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <img
          src={assetUrl('logo-color.png')}
          alt="All Janitorial Service"
          className="h-10 w-auto object-contain shrink-0"
          width={40}
          height={40}
        />

        <div className="flex items-center gap-1.5" title="5-star Google">
          <div className="flex text-amber-500" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-800">Google</span>
        </div>

        <div className="flex items-center gap-1.5" title="5-star Yelp">
          <div className="flex text-amber-500" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-800">Yelp</span>
        </div>

        <span className="text-sm font-bold text-slate-900 whitespace-nowrap">BBB A+</span>

        <div className="flex items-center gap-3">
          <img
            src={assetUrl('bbb.png')}
            alt="BBB Accredited"
            className="h-10 w-auto object-contain"
          />
          <img
            src={assetUrl('usgbc.png')}
            alt="USGBC Member"
            className="h-10 w-auto object-contain"
          />
          <img src={assetUrl('issa.png')} alt="ISSA" className="h-10 w-auto object-contain" />
          <img
            src={assetUrl('chamber.png')}
            alt="San Mateo Area Chamber"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
