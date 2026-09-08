import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'
import { CITY_SEALS, PROUD_MEMBER_BADGES } from '../data/trustAssets'
import { SERVICE_CITIES } from '../data/cities'

/**
 * Continuous leftward logo strip with a hidden duplicate for a seamless loop.
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
  const [paused, setPaused] = useState(false)
  return (
    <section
      className="bg-white border-y border-slate-200"
      aria-label="Proud Member badges and Peninsula service cities"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6 lg:py-7">
        <div className="relative mb-4 sm:mb-5 px-10">
          <p className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Proud Member of · Peninsula service cities
          </p>
          <button
            type="button"
            className="ajs-logo-motion-control absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ajs-red"
            aria-label={paused ? 'Play logo animation' : 'Pause logo animation'}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}
          </button>
        </div>
        <div className="ajs-logo-window">
          <div className="ajs-logo-track" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="ajs-logo-group" aria-hidden={copy === 1 ? true : undefined}>
                {LOGOS.map((l) => (
                  <div
                    key={l.src}
                    className="flex shrink-0 items-center justify-center h-16 w-28 sm:w-36"
                  >
                    <img
                      src={assetUrl(l.src)}
                      alt={l.alt}
                      className={`${l.className} ${MONO}`}
                      style={{ maxWidth: '100%' }}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
