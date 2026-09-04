export function TrustBar() {
  const logos = [
    { src: '/bbb.png', alt: 'BBB Accredited — A+ claim' },
    { src: '/usgbc.png', alt: 'USGBC Member' },
    { src: '/issa.avif', alt: 'ISSA Member' },
    { src: '/chamber.png', alt: 'San Mateo Area Chamber of Commerce' },
  ]

  return (
    <section className="bg-white border-y border-slate-100 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-5">
          Certified &amp; accredited cleaning partner
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {logos.map((l) => (
            <img
              key={l.src}
              src={l.src}
              alt={l.alt}
              className="h-12 sm:h-14 w-auto object-contain opacity-90"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
