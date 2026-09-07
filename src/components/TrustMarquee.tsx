import { assetUrl } from '../lib/assetUrl'
import {
  CITY_SEALS,
  PROUD_MEMBER_BADGES,
  REVIEW_LOGOS,
} from '../data/trustAssets'
import { SERVICE_CITIES } from '../data/cities'
import { StarRow } from './StarRow'

type TrackItem =
  | { kind: 'review'; src: string; alt: string; className: string; withStars: boolean }
  | { kind: 'proud'; src: string; alt: string; className: string }
  | { kind: 'city'; src: string; alt: string }

/**
 * Trust strip — Google/Yelp (5★ under logos) + Proud Member badges + city seals.
 * One of each mark per set. No AJS logo (header/footer only). No invented marks.
 * CSS animation ONLY — never IntersectionObserver / MutationObserver / ResizeObserver.
 */
const TRACK: TrackItem[] = [
  ...REVIEW_LOGOS.map((l) => ({
    kind: 'review' as const,
    src: l.src,
    alt: l.alt,
    className: l.className,
    withStars: l.withStars,
  })),
  ...PROUD_MEMBER_BADGES.map((l) => ({
    kind: 'proud' as const,
    src: l.src,
    alt: l.alt,
    className: l.className,
  })),
  ...SERVICE_CITIES.map((city) => ({
    kind: 'city' as const,
    src: CITY_SEALS[city].src,
    alt: CITY_SEALS[city].alt,
  })),
]

function TrackMark({ item, keyId }: { item: TrackItem; keyId: string }) {
  if (item.kind === 'review') {
    return (
      <div
        key={keyId}
        className="shrink-0 flex flex-col items-center justify-center gap-1 mx-5 sm:mx-7 lg:mx-9"
      >
        <img
          src={assetUrl(item.src)}
          alt={item.alt}
          className={item.className}
          loading="lazy"
          decoding="async"
        />
        {item.withStars ? <StarRow size={11} /> : null}
      </div>
    )
  }
  if (item.kind === 'proud') {
    return (
      <div
        key={keyId}
        className="shrink-0 flex items-center justify-center mx-5 sm:mx-7 lg:mx-9 h-14 sm:h-16"
      >
        <img
          src={assetUrl(item.src)}
          alt={item.alt}
          className={item.className}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }
  return (
    <div
      key={keyId}
      className="shrink-0 flex items-center justify-center mx-4 sm:mx-6 lg:mx-8 h-14 sm:h-16"
    >
      <img
        src={assetUrl(item.src)}
        alt={item.alt}
        className="h-11 sm:h-12 w-auto max-w-[3.25rem] sm:max-w-[3.75rem] object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export function TrustMarquee() {
  // Duplicate set for seamless CSS loop — no JS observers
  const loop = [...TRACK, ...TRACK]

  return (
    <section
      className="bg-white border-y border-slate-200 overflow-hidden"
      aria-label="Trusted brands, Proud Member badges, and Peninsula cities"
    >
      <div className="pt-3 sm:pt-4 pb-1 text-center">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Proud Member of · Peninsula service cities
        </p>
      </div>
      <div className="py-3 sm:py-4 lg:py-5">
        <div className="trust-marquee relative">
          <div className="trust-marquee-track flex items-center w-max">
            {loop.map((item, i) => (
              <TrackMark key={`${item.src}-${i}`} item={item} keyId={`${item.src}-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
