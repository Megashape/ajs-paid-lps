import { assetUrl } from '../lib/assetUrl'

/**
 * Logo-only trust strip — official brand marks only.
 * No city names. No "Google" / "Yelp" / "BBB" text labels. No invented review counts.
 * CSS animation ONLY — never wrap with IntersectionObserver / MutationObserver / ResizeObserver.
 */
const LOGOS = [
  {
    src: 'google-logo.svg',
    alt: 'Google',
    className: 'h-7 sm:h-8 w-auto max-w-[7.5rem] sm:max-w-[9rem] object-contain',
  },
  {
    src: 'yelp-logo.svg',
    alt: 'Yelp',
    className: 'h-8 sm:h-9 w-auto max-w-[5.5rem] sm:max-w-[6.5rem] object-contain',
  },
  {
    src: 'bbb.png',
    alt: 'BBB Accredited Business',
    className: 'h-12 sm:h-14 w-auto max-w-[3.5rem] sm:max-w-[4rem] object-contain',
  },
] as const

export function TrustMarquee() {
  // Duplicate set for seamless CSS loop — no JS observers
  const track = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

  return (
    <section
      className="bg-white border-y border-slate-200 overflow-hidden"
      aria-label="Trusted brands"
    >
      <div className="py-4 sm:py-5 lg:py-6">
        <div className="trust-marquee relative">
          <div className="trust-marquee-track flex items-center w-max">
            {track.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="shrink-0 flex items-center justify-center mx-5 sm:mx-8 lg:mx-10 h-14 sm:h-16"
              >
                <img
                  src={assetUrl(logo.src)}
                  alt={logo.alt}
                  className={logo.className}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
