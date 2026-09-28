import { useEffect, useState } from 'react'
import { PHONE_DISPLAY, PHONE_TEL } from './constants'

declare global {
  interface Window {
    /** Set by the Google Ads call-tracking callback in index.html for visitors who arrived from an ad. */
    ajsForwardingNumber?: { formatted: string; mobile: string }
  }
}

export const FORWARDING_NUMBER_EVENT = 'ajs-forwarding-number'

function current() {
  const forwarded = typeof window === 'undefined' ? undefined : window.ajsForwardingNumber
  if (forwarded?.formatted && forwarded.mobile) {
    return { display: forwarded.formatted, tel: forwarded.mobile.replace(/[^\d+]/g, '') }
  }
  return { display: PHONE_DISPLAY, tel: PHONE_TEL }
}

/**
 * The number to show and dial. Ad visitors get Google's forwarding number so calls of
 * 60 seconds or more count as Ads conversions; everyone else sees the main line.
 */
export function usePhoneNumber() {
  const [phone, setPhone] = useState(current)
  useEffect(() => {
    const update = () => setPhone(current())
    update()
    window.addEventListener(FORWARDING_NUMBER_EVENT, update)
    return () => window.removeEventListener(FORWARDING_NUMBER_EVENT, update)
  }, [])
  return phone
}
