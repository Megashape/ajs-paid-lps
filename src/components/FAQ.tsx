import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQProps {
  title: string
  items: { q: string; a: string }[]
}

export function FAQ({ title, items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 text-center">{title}</h2>
        <p className="mt-2 text-center text-slate-600 text-sm">
          Straightforward answers for commercial facilities.
        </p>
        <div className="mt-8 space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left font-semibold text-navy-900"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
