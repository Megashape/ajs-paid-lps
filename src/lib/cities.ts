import { SERVICE_CITIES, type ServiceCity } from '../data/cities'

/** Display name → URL slug (e.g. "Redwood City" → "redwood-city"). */
export function toSlug(city: string): string {
  return city
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** URL slug → display name, or null if unknown. */
export function fromSlug(slug: string | undefined): ServiceCity | null {
  if (!slug) return null
  const normalized = slug.trim().toLowerCase()
  return SERVICE_CITIES.find((c) => toSlug(c) === normalized) ?? null
}

export const CITY_SLUGS = SERVICE_CITIES.map((c) => toSlug(c))

export type { ServiceCity }
export { SERVICE_CITIES }
