// Diagnostic events are distinct from Ads conversions and CRM qualification.
export type FunnelEvent =
  | 'ajs_form_start' | 'ajs_step_2' | 'ajs_step_3'
  | 'ajs_submit_attempt' | 'ajs_submit_accepted' | 'ajs_submit_error'
  | 'ajs_validation_error' | 'ajs_phone_click'
  | 'ajs_walkthrough_click' | 'ajs_main_site_click'

export function trackFunnelEvent(event: FunnelEvent, step?: number, placement?: 'header' | 'footer' | 'content'): void {
  if (window.location.hostname !== 'offices.alljanitorialservice.com') return
  try {
    window.gtag?.('event', event, {
      send_to: 'G-2ZF6RFN9MX',
      funnel: 'office',
      ...(step === undefined ? {} : { form_step: step }),
      ...(placement === undefined ? {} : { placement }),
    })
  } catch {
    // Analytics must never prevent navigation or lead delivery.
  }
}
