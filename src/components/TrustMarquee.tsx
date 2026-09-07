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
 * Dark trust strip — Google/Yelp (5★ under logos) + Proud Member badges + city seals.
 * Bigger marks, black/navy band, CSS side-fade masks. One of each mark per set.
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
        className="shrink-0 flex flex-col items-center justify-center gap-1.5 mx-6 sm:mx-8 lg:mx-10"
      >
        <img
          src={assetUrl(item.src)}
          alt={item.alt}
          className={item.className}
          loading="lazy"
          decoding="async"
        />
        {item.withStars ? <StarRow size={13} /> : null}
      </div>
    )
  }
  if (item.kind === 'proud') {
    return (
      <div
        key={keyId}
        className="shrink-0 flex items-center justify-center mx-6 sm:mx-8 lg:mx-10 h-16 sm:h-[4.5rem]"
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
      className="shrink-0 flex items-center justify-center mx-5 sm:mx-7 lg:mx-9 h-16 sm:h-[4.5rem]"
    >
      <img
        src={assetUrl(item.src)}
        alt={item.alt}
        className="h-12 sm:h-14 w-auto max-w-[3.75rem] sm:max-w-[4.25rem] object-contain"
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
      className="bg-[#050a16] border-y border-white/10 overflow-hidden"
      aria-label="Trusted brands, Proud Member badges, and Peninsula cities"
    >
      <div className="pt-3.5 sm:pt-4 pb-1 text-center">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
          Proud Member of · Peninsula service cities
        </p>
      </div>
      <div className="py-4 sm:py-5 lg:py-6">
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
