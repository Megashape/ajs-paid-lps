import { PHONE_DISPLAY, PHONE_TEL, MAIN_SITE } from '../lib/constants'

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="font-bold tracking-wide text-sm uppercase">
              All Janitorial Service
              <span className="text-white/50 font-normal"> | </span>
              Peninsula Commercial Cleaning
            </p>
            <p className="mt-2 text-sm text-white/70">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-white font-semibold">
                {PHONE_DISPLAY}
              </a>
              <span className="mx-2">•</span>
              Redwood City, CA
            </p>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center rounded-xl bg-ajs-red hover:bg-ajs-red-dark px-5 py-3 font-bold text-sm"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>

        {/* School / multifamily nav intentionally omitted */}
        <nav className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
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
