import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'
import { PROUD_MEMBER_BADGES } from '../data/trustAssets'

/**
 * Continuous leftward logo strip with a hidden duplicate for a seamless loop.
 */
const LOGOS = [
  ...PROUD_MEMBER_BADGES.map((l) => ({
    src: l.src,
    alt: l.alt,
  })),
]

export function TrustMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <section
      className="bg-white border-y border-slate-200"
      aria-label="Professional memberships and accreditations"
    >
      <div className="py-[20px] sm:py-[24px] lg:py-[28px]">
        <div className="ajs-container">
        <div className="relative mb-4 sm:mb-5 px-10">
          <p className="wrap-anywhere text-center text-[0.625rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-slate-400">
            Professional memberships &amp; accreditations
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
        </div>
        <div className="ajs-logo-window">
          <div className="ajs-logo-track" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="ajs-logo-group" aria-hidden={copy === 1 ? true : undefined}>
                {LOGOS.map((l) => (
                  <div
                    key={l.src}
                    className="flex shrink-0 items-center justify-center h-22"
                  >
                    <img
                      src={assetUrl(l.src)}
                      alt={l.alt}
                      className="ajs-trust-logo h-22 w-auto max-w-60 object-contain"
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
