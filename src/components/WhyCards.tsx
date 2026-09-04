interface WhyCardsProps {
  title: string
  intro: string
  cards: { title: string; body: string }[]
}

export function WhyCards({ title, intro, cards }: WhyCardsProps) {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-ajs-red text-xs font-bold uppercase tracking-wider mb-2">
          Purpose-built for commercial facilities
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 max-w-2xl">{title}</h2>
        <p className="mt-3 text-slate-600 max-w-2xl text-sm sm:text-base">{intro}</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-bold text-navy-900 text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
