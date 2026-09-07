import { PHONE_DISPLAY, PHONE_TEL, MAIN_SITE } from '../lib/constants'
import { assetUrl } from '../lib/assetUrl'

interface FooterProps {
  /** Hide the red Call slab so it never competes with Continue on funnel first screens. */
  hideCallCta?: boolean
}

export function Footer({ hideCallCta = false }: FooterProps) {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="min-w-0">
            <img
              src={assetUrl('logo-white.png')}
              alt="All Janitorial Service"
              className="h-10 sm:h-12 w-auto object-contain object-left"
              width={220}
              height={68}
            />
            <p className="mt-3 text-sm text-white/70 max-w-sm leading-relaxed">
              Peninsula commercial cleaning — offices &amp; corporate suites.
              Coordinated from Redwood City, CA.
            </p>
            <p className="mt-3 text-sm text-white/70">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-white font-semibold">
                {PHONE_DISPLAY}
              </a>
              <span className="mx-2 text-white/40">•</span>
              Redwood City, CA
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-xl bg-ajs-red hover:bg-ajs-red-dark px-5 py-3 font-bold text-sm text-white shadow-lg shadow-red-900/20"
            >
              Request a walkthrough
            </a>
            {!hideCallCta && (
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 hover:bg-white/10 px-5 py-3 font-bold text-sm"
              >
                Call {PHONE_DISPLAY}
              </a>
            )}
            {hideCallCta && (
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-sm text-white/60 hover:text-white font-semibold tabular-nums"
              >
                Or call {PHONE_DISPLAY}
              </a>
            )}
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
          <a
            href={`${MAIN_SITE}/about-us/`}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            About Us
          </a>
          <a
            href={`${MAIN_SITE}/recurring-janitorial-services/`}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Recurring Services
          </a>
          <a
            href={`${MAIN_SITE}/contact-us/`}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
          <a
            href={`${MAIN_SITE}/privacy-policy/`}
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </nav>

        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} All Janitorial Service Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
