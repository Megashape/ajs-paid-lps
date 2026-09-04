import { Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'

interface BottomCtaProps {
  title: string
  body: string
}

export function BottomCta({ title, body }: BottomCtaProps) {
  return (
    <section className="bg-navy-800 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base max-w-xl mx-auto">{body}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#lead-form"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-ajs-red hover:bg-ajs-red-dark text-white font-bold px-6 h-12"
          >
            Fill out walkthrough form
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 text-white font-bold px-6 h-12 hover:bg-white/10"
          >
            <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}
