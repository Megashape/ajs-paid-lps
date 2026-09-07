import { assetUrl } from '../lib/assetUrl'

/**
 * Cert strip only — readable badges (≥40px). No logo, no star rows.
 * Place below the stage / under fold — never inside the form card.
 */
export function ProofNearForm({ compact = false }: { compact?: boolean }) {
  const badgeH = compact ? 40 : 44

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
      <img
        src={assetUrl('bbb.png')}
        alt="BBB Accredited"
        className="w-auto object-contain"
        style={{ height: badgeH }}
      />
      <img
        src={assetUrl('usgbc.png')}
        alt="USGBC Member"
        className="w-auto object-contain"
        style={{ height: badgeH }}
      />
      <img
        src={assetUrl('issa.png')}
        alt="ISSA"
        className="w-auto object-contain"
        style={{ height: badgeH }}
      />
      <img
        src={assetUrl('chamber.png')}
        alt="San Mateo Area Chamber"
        className="w-auto object-contain"
        style={{ height: badgeH }}
      />
    </div>
  )
}
