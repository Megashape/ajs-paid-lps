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
 */
export const OFFICE_COPY: LandingCopy = {
  variant: 'office',
  metaTitle: 'Office Cleaning — Peninsula Commercial Janitorial | AJS',
  metaDescription:
    'Weekly office and corporate facilities cleaning across the Peninsula. Local Redwood City team. Call 650-261-0723.',
  badge: 'Office & Corporate Facilities',
  headline: 'Weekly office cleaning built for Peninsula workplaces',
  subhead:
    'All Janitorial Service focuses on commercial facilities—not residential house-cleaner city pages, and not a national franchise script. Local crews based in Redwood City, scheduled for the way your office actually runs.',
  bullets: [
    'Weekly (and multi-day) office programs—not Mon–Fri only',
    'Commercial specialist for suites, floors, and shared facilities',
    'Local Peninsula team vs. franchise call centers',
  ],
  formTitle: 'Request a facility walkthrough',
  formSubtitle: 'Tell us about your office. We’ll follow up to schedule a walkthrough when it works for you.',
  whyTitle: 'Why Peninsula offices choose AJS',
  whyIntro:
    'City pages for house cleaners and big-box franchises rarely fit corporate facilities. We plan recurring commercial service around your tenants, hours, and finish standards.',
  whyCards: [
    {
      title: 'Commercial-first, not residential',
      body: 'Scope, checklists, and staffing are built for offices and corporate facilities—not one-off house cleans.',
    },
    {
      title: 'Local hub in Redwood City',
      body: 'Peninsula coverage with on-the-ground coordination—not a distant franchise dispatcher.',
    },
    {
      title: 'Recurring programs that fit your week',
      body: 'Weekly, a few times a week, or five-day schedules. We match frequency to your traffic and budget.',
    },
    {
      title: 'Screening available on request',
      body: 'Live Scan and background checks can be arranged when your building or client requires them.',
    },
  ],
  citiesTitle: 'Serving offices across the Peninsula & South Bay edge',
  citiesIntro:
    'Our hub is Redwood City. We actively support commercial accounts in these cities—ask us if yours is nearby.',
  faqTitle: 'Office cleaning FAQs',
  faqs: [
    {
      q: 'Do you only clean Monday through Friday?',
      a: 'No. Many clients run a weekly program; others need 2–3× or five-day coverage. We set frequency around your facility—not a fixed Mon–Fri-only model.',
    },
    {
      q: 'Is there a minimum square footage?',
      a: 'There is no hard 10,000 sq ft gate. Share an approximate size (optional) and we’ll advise whether we are a fit.',
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
  ctaTitle: 'Ready for a cleaner, more consistent office?',
  ctaBody: 'Request a walkthrough or call our Peninsula team at 650-261-0723.',
}

export const RECURRING_COPY: LandingCopy = {
  variant: 'recurring',
  metaTitle: 'Recurring Commercial Janitorial — Bay Area | AJS',
  metaDescription:
    'Recurring commercial janitorial for Peninsula businesses. Weekly and multi-day programs. Local Redwood City hub. 650-261-0723.',
  badge: 'Recurring Commercial Janitorial',
  headline: 'Recurring commercial janitorial—consistent, local, accountable',
  subhead:
    'Standing schedules for offices and commercial facilities on the Peninsula. A commercial specialist approach—not a house-cleaner marketplace page, and not a franchise playbook.',
  bullets: [
    'Standing weekly and multi-visit programs',
    'Clear scope and supervisory follow-through',
    'Local Redwood City hub serving the approved city list',
  ],
  formTitle: 'Start a recurring service conversation',
  formSubtitle: 'Share frequency and location. We’ll confirm fit and schedule a walkthrough.',
  whyTitle: 'Built for recurring commercial work',
  whyIntro:
    'One-off cleans and residential providers leave gaps. Recurring commercial janitorial needs the same crew rhythm, supply planning, and local oversight every visit.',
  whyCards: [
    {
      title: 'Predictable schedules',
      body: 'Weekly, 2–3×, or five-day options so your facility looks the same every open day—not only after a scramble.',
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
      a: 'Weekly, 2–3 times per week, and five-day programs are common. Not sure yet? Say so on the form and we’ll recommend after the walkthrough.',
    },
    {
      q: 'How fast can service begin?',
      a: 'After we walk the facility and agree on scope, we start when capacity allows. Same-day is possible sometimes—not promised.',
    },
    {
      q: 'How is my account staffed?',
      a: 'Ask during the walkthrough how your route would be staffed and supervised. We plan crews and oversight for commercial consistency—details depend on the facility.',
    },
    {
      q: 'Is square footage required?',
      a: 'Optional. There is no 10,000 sq ft hard gate—approximate size helps us plan, that’s all.',
    },
  ],
  ctaTitle: 'Put recurring janitorial on a reliable schedule',
  ctaBody: 'Request a walkthrough or call 650-261-0723.',
}
