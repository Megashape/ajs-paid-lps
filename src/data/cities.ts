/** Approved service-area cities only. Hub: Redwood City. */
export const SERVICE_CITIES = [
  'San Mateo',
  'Foster City',
  'Belmont',
  'Redwood City',
  'East Palo Alto',
  'Palo Alto',
  'Menlo Park',
  'Mountain View',
  'Sunnyvale',
  'Santa Clara',
] as const

export type ServiceCity = (typeof SERVICE_CITIES)[number]

export const CITY_OTHER = 'Other — we may not serve this area'

export const HUB_CITY = 'Redwood City'
