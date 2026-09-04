export type LandingVariant = 'office' | 'recurring'

export interface LandingCopy {
  variant: LandingVariant
  metaTitle: string
  metaDescription: string
  badge: string
  headline: string
  subhead: string
  bullets: string[]
  formTitle: string
  formSubtitle: string
  whyTitle: string
  whyIntro: string
  whyCards: { title: string; body: string }[]
  citiesTitle: string
  citiesIntro: string
  faqTitle: string
  faqs: { q: string; a: string }[]
  ctaTitle: string
  ctaBody: string
}

/**
 * Commercial copy only. Forbidden claims intentionally omitted:
 * - "100% in-house" / "0 subcontractors" / "zero subcontracting"
 * - 2-hour or 24-hour walkthrough guarantees
 * - same-day as a guarantee
 * - Live Scan as default (available on request only)
 * - invented counts, ratings, review volumes
 * - 10k / mid-size-only gates (Chris: smaller offices OK; weekly qualifies)
 */
export const OFFICE_COPY: LandingCopy = {
  variant: 'office',
  metaTitle: 'Office Cleaning — Peninsula Commercial Janitorial | AJS',
  metaDescription:
    'Weekly office cleaning for Peninsula workplaces. Smaller offices welcome. Local Redwood City team. Call 650-261-0723.',
  badge: 'Peninsula office & corporate facilities',
  headline: 'Offices that look ready before your team walks in',
  subhead:
    'Recurring commercial cleaning for Peninsula workplaces—so suites, floors, and shared spaces stay presentation-ready week after week. Weekly service qualifies. Smaller offices welcome.',
  bullets: [
    'Show up to a workspace that already looks cared for—not a scramble after the fact',
    'Weekly programs qualify; step up to multi-day or weekend / 7-day when the building needs it',
    'Local Redwood City crew planning for offices—not house-cleaner city pages',
  ],
  formTitle: 'Get a facility walkthrough on the calendar',
  formSubtitle: 'Takes a minute. We’ll follow up to schedule when it works for you.',
  whyTitle: 'Why Peninsula offices switch to AJS',
  whyIntro:
    'Generic house-cleaner pages and franchise scripts rarely fit corporate facilities. We scope recurring commercial service around your hours, tenants, and finish standards—including weekends when the building needs it.',
  whyCards: [
    {
      title: 'Built for offices, not homes',
      body: 'Restrooms, kitchens, workstations, and common areas scoped like a business facility—not a one-off house clean.',
    },
    {
      title: 'Weekly is enough to start',
      body: 'Weekly qualifies. Add 2–3×, five-day, or weekend / 7-day coverage when your facility needs it—not as a higher bar to talk to us.',
    },
    {
      title: 'Local hub, real oversight',
      body: 'Peninsula coverage coordinated from Redwood City—not a distant dispatcher reading a script.',
    },
    {
      title: 'Screening when you need it',
      body: 'Background checks and Live Scan available on request when your building or client requires them.',
    },
  ],
  citiesTitle: 'Serving offices across the Peninsula & South Bay edge',
  citiesIntro:
    'Our hub is Redwood City. We actively support commercial accounts in these cities—ask us if yours is nearby.',
  faqTitle: 'Office cleaning FAQs',
  faqs: [
    {
      q: 'Do you only clean Monday through Friday?',
      a: 'No. Weekly programs are common; others need 2–3×, five-day, or weekend / 7-day coverage. We set frequency around your facility—not a Mon–Fri-only model.',
    },
    {
      q: 'Is there a minimum square footage?',
      a: 'No hard minimum. Smaller offices are fine. Approximate size on the form is optional and only helps us scope.',
    },
    {
      q: 'Do weekends or 7-day programs qualify me?',
      a: 'No. Qualification is office + at least weekly. Weekends and 7-day are availability options when your facility needs them—not the entry requirement.',
    },
    {
      q: 'Are Live Scan / background checks included by default?',
      a: 'They are available on request when your property or compliance policy requires them—not assumed for every account.',
    },
    {
      q: 'Can you start same-day?',
      a: 'We start as soon as we can after a walkthrough and agreement. Same-day starts happen when capacity allows—they are not a guarantee.',
    },
    {
      q: 'What if my facility is not a typical office suite?',
      a: 'This page is for office and corporate facilities. Use Other on the form if you need to describe a different commercial space—we will review and route the inquiry.',
    },
  ],
  ctaTitle: 'Put a cleaner office on a reliable schedule',
  ctaBody: 'Request a walkthrough or call our Peninsula team at 650-261-0723.',
}

export const RECURRING_COPY: LandingCopy = {
  variant: 'recurring',
  metaTitle: 'Recurring Commercial Janitorial — Bay Area | AJS',
  metaDescription:
    'Recurring commercial janitorial for Peninsula businesses. Weekly and multi-day programs, weekends when needed. Local Redwood City hub. 650-261-0723.',
  badge: 'Recurring commercial janitorial',
  headline: 'Recurring janitorial that stays consistent—visit after visit',
  subhead:
    'Standing commercial schedules for Peninsula offices and facilities. Weekly qualifies; multi-day and weekend programs when the building needs more.',
  bullets: [
    'Same-standard results every visit—not a different crew reinventing the checklist',
    'Weekly qualifies; scale to 2–3×, five-day, or weekend / 7-day as needed',
    'Redwood City hub serving our approved Peninsula & South Bay cities',
  ],
  formTitle: 'Start a recurring service conversation',
  formSubtitle: 'Share frequency and location. We’ll confirm fit and schedule a walkthrough.',
  whyTitle: 'Built for recurring commercial work',
  whyIntro:
    'One-off cleans leave gaps. Recurring commercial janitorial needs crew rhythm, supply planning, and local oversight every visit—so the facility looks the same when you open.',
  whyCards: [
    {
      title: 'Predictable schedules',
      body: 'Weekly, 2–3×, five-day, or weekend / 7-day options so your facility looks ready—not only after a scramble.',
    },
    {
      title: 'Commercial standards',
      body: 'Restrooms, common areas, kitchens, and workstations scoped like a business facility—not a home clean checklist.',
    },
    {
      title: 'Local vs. franchise',
      body: 'You work with a Peninsula team based in Redwood City, not a national call tree reading a script.',
    },
    {
      title: 'Compliance support on request',
      body: 'Background checks and Live Scan available when your landlord or client asks—not marketed as a blanket claim.',
    },
  ],
  citiesTitle: 'Recurring coverage in our service cities',
  citiesIntro:
    'Hub in Redwood City. Recurring routes across the cities listed below. Outside that list, select “Other” on the form so we can set expectations.',
  faqTitle: 'Recurring service FAQs',
  faqs: [
    {
      q: 'What frequencies do you offer?',
      a: 'Weekly, 2–3 times per week, five-day, and weekend / 7-day programs. Not sure yet? Say so on the form—we’ll recommend after the walkthrough. Weekly is enough to qualify.',
    },
    {
      q: 'Is square footage required?',
      a: 'Optional. There is no hard minimum—approximate size helps us plan, that’s all. Smaller offices are welcome.',
    },
    {
      q: 'How fast can service begin?',
      a: 'After we walk the facility and agree on scope, we start when capacity allows. Same-day is possible sometimes—not promised.',
    },
    {
      q: 'How is my account staffed?',
      a: 'Ask during the walkthrough how your route would be staffed and supervised. We plan crews and oversight for commercial consistency—details depend on the facility.',
    },
  ],
  ctaTitle: 'Lock in recurring janitorial you can count on',
  ctaBody: 'Request a walkthrough or call 650-261-0723.',
}
