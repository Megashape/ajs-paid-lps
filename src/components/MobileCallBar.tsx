import { useEffect, useState } from 'react'
import { CalendarCheck, Phone } from 'lucide-react'
import { usePhoneNumber } from '../lib/usePhoneNumber'

/**
 * Phone and tablet only: one shared bottom baseline for the two actions that create a lead.
 * It stays out of the way while the form itself is on screen, so each viewport keeps one primary action.
 * The call link uses the tracked forwarding number for ad visitors.
 */
export function MobileCallBar() {
  const phone = usePhoneNumber()
  const [formInView, setFormInView] = useState(true)

  useEffect(() => {
    const form = document.getElementById('lead-form')
    if (!form || typeof IntersectionObserver === 'undefined') {
      setFormInView(false)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-900/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(7,13,28,0.35)] transition-transform duration-200 motion-reduce:transition-none ${
        formInView ? 'translate-y-full invisible' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      data-placement="sticky"
      aria-hidden={formInView}
    >
      <div className="ajs-container grid grid-cols-2 gap-2.5 py-2.5">
        <a
          href={`tel:${phone.tel}`}
          tabIndex={formInView ? -1 : undefined}
          className="min-h-12 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white text-white font-bold text-sm tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone className="w-4 h-4" aria-hidden />
          Call now
        </a>
        <a
          href="#lead-form"
          tabIndex={formInView ? -1 : undefined}
          className="min-h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-ajs-red hover:bg-ajs-red-dark text-white font-bold text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CalendarCheck className="w-4 h-4" aria-hidden />
          Walkthrough
        </a>
      </div>
    </div>
  )
}
