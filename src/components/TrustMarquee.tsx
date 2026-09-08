import { assetUrl } from '../lib/assetUrl'
import { CITY_SEALS, PROUD_MEMBER_BADGES } from '../data/trustAssets'
import { SERVICE_CITIES } from '../data/cities'

/**
 * AFHC-style Proud Member carrier — white ground, mono charcoal logos,
 * small ALL-CAPS gray eyebrow. Static CSS/layout only (no observers / no marquee).
 * One of each Proud Member badge + Peninsula city seal.
 */
const LOGOS = [
  ...PROUD_MEMBER_BADGES.map((l) => ({
    src: l.src,
    alt: l.alt,
    className: l.className,
  })),
  ...SERVICE_CITIES.map((city) => ({
    src: CITY_SEALS[city].src,
    alt: CITY_SEALS[city].alt,
    className:
      'h-10 sm:h-12 w-auto max-w-[3.5rem] sm:max-w-[4rem] object-contain',
  })),
]

/** Preserve light backgrounds inside raster badges so their details stay readable. */
const MONO =
  'grayscale opacity-[0.85] hover:opacity-100 transition-opacity'

export function TrustMarquee() {
  return (
    <section
      className="bg-white border-y border-slate-200"
      aria-label="Proud Member badges and Peninsula service cities"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6 lg:py-7">
        <p className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4 sm:mb-5">
          Proud Member of · Peninsula service cities
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-9 sm:gap-y-5 lg:gap-x-10">
          {LOGOS.map((l) => (
            <div
              key={l.src}
              className="flex items-center justify-center h-11 sm:h-12"
            >
              <img
                src={assetUrl(l.src)}
                alt={l.alt}
                className={`${l.className} ${MONO}`}
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
