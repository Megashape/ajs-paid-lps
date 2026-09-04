import { Star } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

/** Logo + stars (no counts) + BBB A+ + certs — one tight readable row near the form. */
export function ProofNearForm() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <img
          src={assetUrl('logo-color.png')}
          alt="All Janitorial Service"
          className="h-8 w-auto object-contain"
          width={32}
          height={32}
        />
        <div className="flex items-center gap-1" title="5-star Google">
          <div className="flex text-amber-500" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-700 ml-0.5">Google</span>
        </div>
        <div className="flex items-center gap-1" title="5-star Yelp">
          <div className="flex text-amber-500" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-700 ml-0.5">Yelp</span>
        </div>
        <span className="text-[11px] font-bold text-slate-800 whitespace-nowrap">BBB A+</span>
        <div className="flex items-center gap-2 ml-auto">
          <img src={assetUrl('bbb.png')} alt="BBB Accredited" className="h-7 w-auto object-contain" />
          <img src={assetUrl('usgbc.png')} alt="USGBC Member" className="h-7 w-auto object-contain" />
          <img src={assetUrl('issa.png')} alt="ISSA" className="h-7 w-auto object-contain" />
          <img
            src={assetUrl('chamber.png')}
            alt="San Mateo Area Chamber"
            className="h-7 w-auto object-contain hidden xs:block sm:block"
          />
        </div>
      </div>
    </div>
  )
}
