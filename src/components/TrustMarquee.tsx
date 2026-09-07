import { Star } from 'lucide-react'
import { SERVICE_CITIES } from '../data/cities'
import { assetUrl } from '../lib/assetUrl'

/**
 * White trust marquee — CSS animation ONLY.
 * Bug Hunter hard rule: never wrap with IntersectionObserver / MutationObserver / ResizeObserver.
 * No invented review counts.
 */
type Slide =
  | { kind: 'stars'; label: string }
  | { kind: 'bbb' }
  | { kind: 'badge'; src: string; alt: string }
  | { kind: 'city'; name: string }

function Stars() {
  return (
    <span className="flex text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="fill-current shrink-0" style={{ width: 18, height: 18 }} />
      ))}
    </span>
  )
}

function SlideItem({ item }: { item: Slide }) {
  if (item.kind === 'stars') {
    return (
      <div className="flex items-center gap-2.5 shrink-0 px-5 sm:px-7">
        <Stars />
        <span className="text-base sm:text-lg font-bold text-navy-900 tracking-tight whitespace-nowrap">
          {item.label} 5★
        </span>
      </div>
    )
  }
  if (item.kind === 'bbb') {
    return (
      <div className="flex items-center gap-3 shrink-0 px-5 sm:px-7">
        <img
          src={assetUrl('bbb.png')}
          alt="BBB Accredited Business A+"
          className="h-11 sm:h-14 w-auto object-contain"
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
        />
        <span className="text-base sm:text-lg font-bold text-navy-900 tracking-tight whitespace-nowrap">
          BBB A+ Certified
        </span>
      </div>
    )
  }
  if (item.kind === 'badge') {
    return (
      <div className="flex items-center shrink-0 px-5 sm:px-7">
        <img
          src={item.src}
          alt={item.alt}
          className="h-10 sm:h-12 w-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }
  // City name plate — clean text, no invented badge art
  return (
    <div className="shrink-0 px-3 sm:px-4">
      <span className="inline-flex items-center h-11 sm:h-12 px-4 sm:px-5 rounded-full border border-slate-200 bg-white text-sm sm:text-[15px] font-semibold text-navy-900 whitespace-nowrap shadow-sm">
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
    {
      kind: 'badge',
      src: assetUrl('chamber.png'),
      alt: 'San Mateo Area Chamber of Commerce',
    },
    ...SERVICE_CITIES.map((name) => ({ kind: 'city' as const, name })),
  ]

  // Duplicate for seamless CSS loop — no JS observers
  const track = [...slides, ...slides]

  return (
    <section
      className="bg-white border-y border-slate-100 overflow-hidden"
      aria-label="Trust signals and service cities"
    >
      <div className="py-5 sm:py-6">
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
