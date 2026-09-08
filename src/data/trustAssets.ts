import type { ServiceCity } from './cities'
import { toSlug } from '../lib/cities'

/** Proud Member / main-site trust badges — one of each mark. No AJS logo here. */
export const PROUD_MEMBER_BADGES = [
  {
    src: 'badges/proud-bbb.png',
    alt: 'BBB Accredited Business',
    className: 'h-12 sm:h-14 w-auto max-w-[6.5rem] object-contain',
  },
  {
    src: 'badges/proud-usgbc.jpg',
    alt: 'USGBC Member',
    className: 'h-12 sm:h-14 w-auto max-w-[5.25rem] object-contain',
  },
  {
    src: 'badges/proud-smacc.jpg',
    alt: 'San Mateo Area Chamber of Commerce',
    className: 'h-10 sm:h-12 w-auto max-w-[9.5rem] object-contain',
  },
  {
    // Official artwork verified 2026-09-08: https://www.issa.com/wp-content/uploads/2025/11/New-ISSA-Logo-Centered-Tagline-RGB-Full-Color.png
    src: 'badges/issa-official.png',
    alt: 'ISSA, The Association for Cleaning and Facility Solutions',
    className: 'h-9 sm:h-11 w-auto max-w-[8rem] object-contain',
  },
] as const

/** Review platform logos — stars bake under Google + Yelp only. No brand text labels. */
export const REVIEW_LOGOS = [
  {
    src: 'google-logo.svg',
    alt: 'Google',
    withStars: true,
    className: 'h-12 sm:h-14 w-auto max-w-[10.5rem] sm:max-w-[13rem] object-contain',
  },
  {
    src: 'yelp-logo.svg',
    alt: 'Yelp',
    withStars: true,
    className: 'h-12 sm:h-14 w-auto max-w-[7.5rem] sm:max-w-[9rem] object-contain',
  },
] as const

/**
 * Rights-clear municipal seals/logos (Wikimedia Commons — Public domain).
 * All 10 Peninsula service cities have PD official marks.
 */
export const CITY_SEALS: Record<
  ServiceCity,
  { src: string; alt: string }
> = {
  'San Mateo': {
    src: 'cities/san-mateo-seal.png',
    alt: 'City of San Mateo seal',
  },
  'Foster City': {
    src: 'cities/foster-city-seal.svg',
    alt: 'City of Foster City seal',
  },
  Belmont: {
    src: 'cities/belmont-seal.png',
    alt: 'City of Belmont seal',
  },
  'Redwood City': {
    src: 'cities/redwood-city-seal.png',
    alt: 'City of Redwood City seal',
  },
  'East Palo Alto': {
    src: 'cities/east-palo-alto-seal.png',
    alt: 'City of East Palo Alto seal',
  },
  'Palo Alto': {
    src: 'cities/palo-alto-seal.svg',
    alt: 'City of Palo Alto seal',
  },
  'Menlo Park': {
    src: 'cities/menlo-park-logo.svg',
    alt: 'City of Menlo Park logo',
  },
  'Mountain View': {
    src: 'cities/mountain-view-seal.png',
    alt: 'City of Mountain View seal',
  },
  Sunnyvale: {
    src: 'cities/sunnyvale-seal.svg',
    alt: 'City of Sunnyvale seal',
  },
  'Santa Clara': {
    src: 'cities/santa-clara-seal.png',
    alt: 'City of Santa Clara seal',
  },
}

/** Commercial office BUILDING exteriors in public/ — no interiors/schools/homes. */
const OFFICE_PHOTOS = [
  {
    src: 'office-exterior-a.jpg',
    alt: 'Modern commercial office building exterior',
  },
  {
    src: 'office-exterior-b.jpg',
    alt: 'Glass commercial office towers',
  },
  {
    src: 'office-exterior-c.jpg',
    alt: 'Contemporary commercial office building facade',
  },
  {
    src: 'office-exterior-d.jpg',
    alt: 'Downtown commercial office skyline',
  },
] as const

/** Pick a commercial office asset; city pages rotate for visual differentiation. */
export function officePhotoForCity(city?: string): (typeof OFFICE_PHOTOS)[number] {
  if (!city) return OFFICE_PHOTOS[0]
  const slug = toSlug(city)
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash + slug.charCodeAt(i) * (i + 1)) % 997
  return OFFICE_PHOTOS[hash % OFFICE_PHOTOS.length]
}
