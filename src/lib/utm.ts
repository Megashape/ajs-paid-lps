const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
] as const

export type UtmFields = Record<(typeof UTM_KEYS)[number], string>

export function readUtmsFromLocation(search = window.location.search): UtmFields {
  const params = new URLSearchParams(search)
  const out = {} as UtmFields
  for (const key of UTM_KEYS) {
    out[key] = params.get(key) ?? ''
  }
  // Persist across thank-you navigation within session
  try {
    const stored = sessionStorage.getItem('ajs_utms')
    const prev: Partial<UtmFields> = stored ? JSON.parse(stored) : {}
    const merged = { ...prev, ...Object.fromEntries(Object.entries(out).filter(([, v]) => v)) } as UtmFields
    for (const key of UTM_KEYS) {
      if (!merged[key]) merged[key] = prev[key] ?? ''
    }
    sessionStorage.setItem('ajs_utms', JSON.stringify(merged))
    return merged
  } catch {
    return out
  }
}

export function getStoredUtms(): UtmFields {
  try {
    const stored = sessionStorage.getItem('ajs_utms')
    if (stored) return JSON.parse(stored) as UtmFields
  } catch {
    /* ignore */
  }
  return readUtmsFromLocation()
}
