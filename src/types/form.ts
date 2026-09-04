export const ROLES = [
  'Facilities Manager',
  'Office Manager',
  'Property Manager',
  'Operations',
  'Owner / Partner',
  'Other',
] as const

export const FACILITY_TYPES = [
  { value: 'Office / Corporate', win: true },
  { value: 'Medical / Professional suite', win: true },
  { value: 'Other commercial', win: true },
  { value: 'School / Educational', win: false },
  { value: 'Multifamily / Residential', win: false },
  { value: 'Other (describe later)', win: false },
] as const

export const FREQUENCIES = [
  { value: 'weekly', label: 'Weekly' },
  { value: '2-3x', label: '2–3× per week' },
  { value: '5-day', label: '5-day' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

export const PREFERRED_TIMES = [
  'Morning (8am–11am)',
  'Midday (11am–2pm)',
  'Afternoon (2pm–5pm)',
  'Flexible / anytime',
] as const

export interface FormState {
  company: string
  role: string
  customRole: string
  city: string
  facilityType: string
  frequency: string
  sqFt: string
  fullName: string
  phone: string
  email: string
  preferredTime: string
  notes: string
}
