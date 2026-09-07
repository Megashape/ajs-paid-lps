import { Star } from 'lucide-react'
import { SERVICE_CITIES } from '../data/cities'

/**
 * BIG all-white auto-rotating trust marquee — CSS animation ONLY.
 * Bug Hunter hard rule: never wrap with IntersectionObserver / MutationObserver / ResizeObserver.
 * No invented review counts. Large white card panels (≥140–160px), not tiny pills/chips.
 */
type Slide =
  | { kind: 'stars'; label: string }
  | { kind: 'bbb' }
  | { kind: 'city'; name: string }

const panelClass =
  'trust-marquee-panel shrink-0 flex flex-col items-center justify-center gap-2.5 mx-3 sm:mx-4 px-8 sm:px-10 min-h-[140px] h-[140px] sm:min-h-[160px] sm:h-[160px] rounded-2xl border border-slate-200 bg-white shadow-md'

function Stars() {
  return (
    <span className="flex text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="fill-current shrink-0" style={{ width: 26, height: 26 }} />
      ))}
    </span>
  )
}

function SlideItem({ item }: { item: Slide }) {
  if (item.kind === 'stars') {
    return (
      <div className={panelClass}>
        <Stars />
        <span className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight whitespace-nowrap">
          {item.label} 5★
        </span>
      </div>
    )
  }
  if (item.kind === 'bbb') {
    return (
      <div className={panelClass}>
        <span className="inline-flex items-center justify-center h-12 min-w-[3rem] px-3 rounded-lg border-2 border-navy-900 text-navy-900 text-lg font-extrabold tracking-tight">
          A+
        </span>
        <span className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight whitespace-nowrap">
          BBB A+ Certified
        </span>
      </div>
    )
  }
  // City name plate — LARGE panel, not a pill chip
  return (
    <div className={panelClass}>
      <span className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight whitespace-nowrap text-center">
        {item.name}
      </span>
    </div>
  )
}

export function TrustMarquee() {
  const slides: Slide[] = [
    { kind: 'stars', label: 'Google' },
    { kind: 'stars', label: 'Yelp' },
    { kind: 'bbb' },
    ...SERVICE_CITIES.map((name) => ({ kind: 'city' as const, name })),
  ]

  // Duplicate for seamless CSS loop — no JS observers
  const track = [...slides, ...slides]

  return (
    <section
      className="bg-white border-y border-slate-200 overflow-hidden"
      aria-label="Trust signals and service cities"
    >
      <div className="py-5 sm:py-6 lg:py-7">
        <div className="trust-marquee relative">
          <div className="trust-marquee-track flex items-center w-max">
            {track.map((item, i) => (
              <SlideItem key={`${item.kind}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
