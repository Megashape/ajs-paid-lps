import { Star } from 'lucide-react'

/** Stars/claim only — no Yelp review counts. BBB as claim/logo only. */
export function ProofNearForm() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
      <div className="flex items-center gap-1.5">
        <div className="flex text-amber-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-slate-800">5-star Google</span>
      </div>
      <span className="text-slate-300 hidden sm:inline">|</span>
      <div className="flex items-center gap-1.5">
        <div className="flex text-amber-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-slate-800">5-star Yelp</span>
      </div>
      <span className="text-slate-300 hidden sm:inline">|</span>
      <span className="font-semibold text-slate-800">BBB A+</span>
    </div>
  )
}
