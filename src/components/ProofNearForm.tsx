import { assetUrl } from '../lib/assetUrl'

/**
 * Cert strip — ONE BBB + USGBC + ISSA + Chamber.
 * Dark variant: knockout/light marks on navy (no grey wash boxes).
 * Marks ≥40px, optically aligned, single row when possible.
 */
export function ProofNearForm({
  compact = false,
  dark = false,
}: {
  compact?: boolean
  dark?: boolean
}) {
  const badgeH = compact ? 40 : 48

  const logos = [
    {
      src: assetUrl('bbb.png'),
      alt: 'BBB Accredited Business',
      // BBB seal keeps white badge field — intentional on navy
      h: badgeH,
    },
    {
      src: assetUrl(dark ? 'usgbc-light.png' : 'usgbc.png'),
      alt: 'USGBC Member',
      h: badgeH,
    },
    {
      src: assetUrl('issa.png'),
      alt: 'ISSA — Worldwide Cleaning Industry Association',
      // ISSA wordmark is wider/shorter; optical match slightly shorter
      h: Math.round(badgeH * 0.85),
    },
    {
      src: assetUrl(dark ? 'chamber-light.png' : 'chamber.png'),
      alt: 'San Mateo Area Chamber of Commerce',
      h: badgeH,
    },
  ]

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 ${
        dark ? '' : ''
      }`}
      role="list"
      aria-label="Certifications and memberships"
    >
      {logos.map((l) => (
        <img
          key={l.alt}
          src={l.src}
          alt={l.alt}
          className="w-auto object-contain"
          style={{ height: l.h, minHeight: 40 }}
          loading="lazy"
          role="listitem"
        />
      ))}
    </div>
  )
}
