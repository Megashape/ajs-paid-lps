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

/** Map legacy UI values → GHL CRM Facility / Frequency enums. */
const FACILITY_CRM: Record<string, string> = {
  'Office / Corporate': 'Office',
  Office: 'Office',
}

const FREQUENCY_CRM: Record<string, string> = {
  weekly: 'Weekly',
  Weekly: 'Weekly',
  '2-3x': '2–3× / week',
  '2–3× / week': '2–3× / week',
  '5-day': '5-day',
  '7-day-weekends': '7-day / weekends',
  '7-day / weekends': '7-day / weekends',
  'not-sure': 'Not sure',
  'Not sure': 'Not sure',
}

function toCrmFacility(value: string): string {
  return FACILITY_CRM[value] ?? value
}

function toCrmFrequency(value: string): string {
  return FREQUENCY_CRM[value] ?? value
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (!endpoint) {
    throw new Error('Online requests are temporarily unavailable. Please call 650-261-0723 to arrange a walkthrough.')
  }

  const { first, last } = splitName(payload.fullName)
  const facilityType = toCrmFacility(payload.facilityType)
  const frequency = toCrmFrequency(payload.frequency)

  // Keep existing camelCase keys; also send GHL-friendly aliases Holly maps today
  const body = {
    ...payload,
    ...payload.utms,
    facilityType,
    frequency,
    Facility: facilityType,
    Frequency: frequency,
    _subject: `AJS Lead — ${payload.variant} — ${payload.company}`,
    Email: payload.email,
    'First Name': first,
    'Last Name': last,
    Phone: payload.phone,
    'Company Name': payload.company,
    companyName: payload.company,
    City: payload.city,
  }

  let res: Response
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('We could not confirm your request. Please call 650-261-0723 before sending it again.')
  }

  if (!res.ok) {
    throw new Error('We could not confirm your request. Please call 650-261-0723 before sending it again.')
  }
}

export function fireConversion(): void {
  if (typeof window.gtagFormConversion === 'function') {
    window.gtagFormConversion()
  }
}
