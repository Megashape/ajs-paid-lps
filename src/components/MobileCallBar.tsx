import { Phone } from 'lucide-react'
import { PHONE_PRETTY, PHONE_TEL } from '../lib/constants'

export function MobileCallBar() {
  return (
    <div className="lg:hidden sticky top-0 z-50 bg-navy-800/95 backdrop-blur-md border-b border-slate-700 shadow-lg">
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex items-center justify-center gap-2 py-2.5 text-white font-bold text-base"
      >
        <Phone className="w-4 h-4 text-red-400" aria-hidden />
        <span>Call {PHONE_PRETTY}</span>
      </a>
    </div>
  )
}
