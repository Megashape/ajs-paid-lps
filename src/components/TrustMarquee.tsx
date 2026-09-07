import { Star } from 'lucide-react'
import { SERVICE_CITIES } from '../data/cities'

/**
 * BIG all-white auto-rotating trust marquee — CSS animation ONLY.
 * Bug Hunter hard rule: never wrap with IntersectionObserver / MutationObserver / ResizeObserver.
 * No invented review counts. Large panels (~h-16–20), not tiny pills/chips.
 */
type Slide =
  | { kind: 'stars'; label: string }
  | { kind: 'bbb' }
  | { kind: 'city'; name: string }

function Stars() {
  return (
    <span className="flex text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="fill-current shrink-0" style={{ width: 22, height: 22 }} />
      ))}
    </span>
  )
}

function SlideItem({ item }: { item: Slide }) {
  if (item.kind === 'stars') {
    return (
      <div className="trust-marquee-panel shrink-0 flex items-center gap-3 px-6 sm:px-8 h-16 sm:h-20">
        <Stars />
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
          {item.label} 5★
        </span>
      </div>
    )
  }
  if (item.kind === 'bbb') {
    return (
      <div className="trust-marquee-panel shrink-0 flex items-center gap-3 px-6 sm:px-8 h-16 sm:h-20">
        <span className="inline-flex items-center justify-center h-10 sm:h-12 min-w-[2.75rem] px-2.5 rounded-md border-2 border-white/90 text-white text-sm sm:text-base font-extrabold tracking-tight">
          A+
        </span>
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
          BBB A+ Certified
        </span>
      </div>
    )
  }
  // City name plate — LARGE panel, not a pill chip
  return (
    <div className="trust-marquee-panel shrink-0 flex items-center px-5 sm:px-7 h-16 sm:h-20">
      <span className="inline-flex items-center h-12 sm:h-14 px-5 sm:px-7 rounded-xl border border-white/35 bg-white/10 text-base sm:text-lg lg:text-xl font-semibold text-white whitespace-nowrap backdrop-blur-[1px]">
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
      className="bg-navy-900 border-y border-white/10 overflow-hidden"
      aria-label="Trust signals and service cities"
    >
      <div className="py-4 sm:py-5 lg:py-6">
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
