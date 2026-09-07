import { assetUrl } from '../lib/assetUrl'
import {
  CITY_SEALS,
  PROUD_MEMBER_BADGES,
  REVIEW_LOGOS,
} from '../data/trustAssets'
import { SERVICE_CITIES } from '../data/cities'
import { StarRow } from './StarRow'

type Variant = 'reviews' | 'proud' | 'cities'

/**
 * Static trust-mark row used as a section separator.
 * Subsets only — never dump the full marquee set here (avoid same-viewport dupes).
 * CSS/layout only — no observers.
 */
export function TrustSeparator({
  variant,
  tone = 'light',
}: {
  variant: Variant
  tone?: 'light' | 'dark'
}) {
  const wrap =
    tone === 'dark'
      ? 'bg-navy-900 border-y border-white/10'
      : 'bg-white border-y border-slate-200'

  return (
    <section className={wrap} aria-label="Trust marks">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
          {variant === 'reviews' &&
            REVIEW_LOGOS.map((l) => (
              <div
                key={l.src}
                className="flex flex-col items-center justify-center gap-1.5"
              >
                <img
                  src={assetUrl(l.src)}
                  alt={l.alt}
                  className={l.className}
                  loading="lazy"
                  decoding="async"
                />
                {l.withStars ? <StarRow size={12} /> : null}
              </div>
            ))}
          {variant === 'proud' &&
            PROUD_MEMBER_BADGES.map((l) => (
              <div
                key={l.src}
                className="flex items-center justify-center h-12 sm:h-14"
              >
                <img
                  src={assetUrl(l.src)}
                  alt={l.alt}
                  className={l.className}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          {variant === 'cities' &&
            SERVICE_CITIES.map((city) => (
              <div
                key={city}
                className="flex items-center justify-center h-12 sm:h-14"
              >
                <img
                  src={assetUrl(CITY_SEALS[city].src)}
                  alt={CITY_SEALS[city].alt}
                  className="h-10 sm:h-12 w-auto max-w-[3.5rem] sm:max-w-[4rem] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
