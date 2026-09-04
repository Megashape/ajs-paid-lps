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

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { first: '', last: '' }
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
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

  const { first, last } = splitName(payload.fullName)

  // Keep existing camelCase keys; also send GHL-friendly aliases Holly maps today
  const body = {
    ...payload,
    ...payload.utms,
    _subject: `AJS Lead — ${payload.variant} — ${payload.company}`,
    Email: payload.email,
    'First Name': first,
    'Last Name': last,
    Phone: payload.phone,
    'Company Name': payload.company,
    companyName: payload.company,
    City: payload.city,
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
