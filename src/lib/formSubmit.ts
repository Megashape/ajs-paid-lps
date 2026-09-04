import type { UtmFields } from './utm'

export interface LeadPayload {
  company: string
  role: string
  customRole?: string
  city: string
  facilityType: string
  frequency: string
  sqFt?: string
  fullName: string
  phone: string
  email: string
  preferredTime: string
  notes?: string
  page: string
  variant: string
  utms: UtmFields
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (!endpoint) {
    // Dev / preview without endpoint: succeed locally so UX and conversion wiring can be tested
    console.warn(
      '[AJS] VITE_FORM_ENDPOINT is not set. Lead logged to console only.',
      payload,
    )
    await new Promise((r) => setTimeout(r, 600))
    return
  }

  const body = {
    ...payload,
    ...payload.utms,
    _subject: `AJS Lead — ${payload.variant} — ${payload.company}`,
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Form submit failed (${res.status}): ${text || res.statusText}`)
  }
}

export function fireConversion(): void {
  if (typeof window.gtagFormConversion === 'function') {
    window.gtagFormConversion()
  }
}
