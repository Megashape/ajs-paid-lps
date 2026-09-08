import { cloneElement, useEffect, useRef, useState, type FormEvent, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Headset,
  Loader2,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { CITY_OTHER, SERVICE_CITIES } from '../data/cities'
import {
  FACILITY_TYPES,
  FREQUENCIES,
  PREFERRED_TIMES,
  ROLES,
  type FormState,
} from '../types/form'
import { fireConversion, submitLead } from '../lib/formSubmit'
import { getStoredUtms, readUtmsFromLocation } from '../lib/utm'
import { MAIN_SITE, PHONE_DISPLAY } from '../lib/constants'
import { Header } from './Header'
import { Footer } from './Footer'
import { assetUrl } from '../lib/assetUrl'
import { officePhotoForCity } from '../data/trustAssets'
import { TrustMarquee } from './TrustMarquee'
import { StarRow } from './StarRow'

interface OfficesFunnelProps {
  /** Display city name; prefills city select and localizes hero. */
  city?: string
}

const TOTAL_STEPS = 3

const initial = (city?: string): FormState => ({
  company: '',
  role: 'Facilities Manager',
  customRole: '',
  city: city ?? '',
  facilityType: 'Office',
  frequency: '',
  sqFt: '',
  fullName: '',
  phone: '',
  email: '',
  preferredTime: 'Flexible / anytime',
  notes: '',
})

export function OfficesFunnel({ city }: OfficesFunnelProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormState>(() => initial(city))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const formContainer = useRef<HTMLDivElement>(null)
  const stepHeading = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)
  const submissionPending = useRef(false)

  useEffect(() => {
    if (previousStep.current === step) return
    previousStep.current = step
    stepHeading.current?.focus({ preventScroll: true })
    formContainer.current?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }, [step])

  const showErrors = (nextErrors: Partial<Record<keyof FormState, string>>) => {
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) return
    requestAnimationFrame(() => {
      const invalid = formContainer.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      const control = invalid?.matches('fieldset') ? invalid.querySelector<HTMLInputElement>('input') : invalid
      control?.focus()
    })
  }

  useEffect(() => {
    readUtmsFromLocation()
    const titleCity = city ? ` in ${city}` : ', Peninsula'
    document.title = `Office Cleaning${titleCity} | All Janitorial Service`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        city
          ? `Recurring office & corporate cleaning for businesses in ${city}. Weekly qualifies. Call ${PHONE_DISPLAY}.`
          : `Recurring office & corporate cleaning for Peninsula businesses. Weekly qualifies. Call ${PHONE_DISPLAY}.`,
      )
    }
  }, [city])

  useEffect(() => {
    if (city) {
      setData((d) => (d.city === city ? d : { ...d, city }))
    }
  }, [city])

  const set =
    (key: keyof FormState) =>
    (value: string) => {
      setData((d) => ({ ...d, [key]: value }))
      setErrors((e) => ({ ...e, [key]: undefined }))
    }

  /** Step 1 = company only */
  const validateStep1 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!data.company.trim()) e.company = 'Company name is required'
    showErrors(e)
    return Object.keys(e).length === 0
  }

  /** Step 2 = role, city, facility, frequency */
  const validateStep2 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (data.role === 'Other' && !data.customRole.trim()) e.customRole = 'Please specify your role'
    if (!data.city) e.city = 'Select a city'
    if (!data.facilityType) e.facilityType = 'Select a facility type'
    if (!data.frequency) e.frequency = 'Select a frequency'
    showErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep3 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!data.fullName.trim()) e.fullName = 'Name is required'
    if (!data.phone.trim()) e.phone = 'Phone is required'
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Valid work email is required'
    }
    if (!data.preferredTime) e.preferredTime = 'Select a preferred time'
    showErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const back = () => {
    if (submissionPending.current) return
    setErrors({})
    setSubmitError('')
    if (step > 1) setStep((s) => s - 1)
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (submissionPending.current) return
    if (step < TOTAL_STEPS) {
      next()
      return
    }
    if (!validateStep3()) return
    submissionPending.current = true
    setSubmitting(true)
    setSubmitError('')
    try {
      const utms = getStoredUtms()
      await submitLead({
        company: data.company.trim(),
        role: data.role === 'Other' ? data.customRole.trim() : data.role,
        customRole: data.customRole,
        city: data.city,
        facilityType: data.facilityType,
        frequency: data.frequency,
        sqFt: data.sqFt.trim() || undefined,
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        preferredTime: data.preferredTime,
        notes: data.notes.trim() || undefined,
        page: window.location.pathname,
        variant: 'office',
        utms,
      })
      fireConversion()
      navigate('/thank-you', { replace: true, state: { company: data.company } })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please call us.')
    } finally {
      submissionPending.current = false
      setSubmitting(false)
    }
  }

  const headline = city
    ? `Office cleaning in ${city}`
    : 'Office cleaning for Peninsula businesses'
  const subhead = city
    ? `Recurring commercial cleaning for offices in ${city}. Businesses only. No homes or events.`
    : 'Recurring commercial cleaning for Peninsula offices. Businesses only. No homes or events.'

  const bullets = [
    'Weekly qualifies. Add multi-day or weekends when needed',
    'Commercial offices & corporate suites, not residential or events',
    'Local Peninsula team coordinated from Redwood City',
  ]

  const benefits: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: ClipboardCheck,
      title: 'Consistent cleaning, clearly defined',
      text: 'A walkthrough and written scope set expectations for your restrooms, kitchens, workstations, and common areas.',
    },
    {
      icon: Calendar,
      title: 'A schedule that fits your office',
      text: 'Start with weekly service. Add multi-day or weekend cleaning around your facility’s needs.',
    },
    {
      icon: Headset,
      title: 'One contact who owns the follow-through',
      text: 'A dedicated point of contact makes it clear who to reach when priorities change or something needs attention.',
    },
    {
      icon: ShieldCheck,
      title: 'Confidence in who enters your building',
      text: 'Licensed and insured commercial cleaning, with background checks available on request when your building requires them.',
    },
  ]

  const progressPct = Math.round((step / TOTAL_STEPS) * 100)

  return (
    <div className="min-h-screen flex flex-col font-sans bg-navy-900">
      {/* Stage: navy slab with subtle radial depth (AFHC craft) */}
      <div
        className="relative isolate"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 70% 0%, #1a2744 0%, #0a1128 55%, #070d1c 100%)',
        }}
      >
        <Header overHero compact />

        {/* HERO + FORM first — priority above Chris / trust strip */}
        <section className="text-white pb-10 sm:pb-12 lg:pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6 lg:pt-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
              {/* LEFT — display-weight hero */}
              <div className="text-center sm:text-left lg:pt-4 order-1">
                <p className="inline-flex flex-col items-center sm:items-start gap-1.5">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#f3e6d8]">
                    Businesses only · Recurring office &amp; corporate
                  </span>
                  <span className="block h-px w-14 bg-ajs-red/90" aria-hidden />
                </p>
                <h1 className="mt-3 sm:mt-4 text-[2rem] sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem] font-extrabold leading-[1.08] tracking-tight text-white">
                  {headline}
                </h1>
                <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-lg mx-auto sm:mx-0">
                  {subhead}
                </p>
                <ul className="mt-6 hidden lg:block space-y-3 text-[15px] text-white/85">
                  {bullets.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-ajs-red shrink-0 mt-0.5" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT — white form card (proof OUTSIDE card) */}
              <div id="lead-form" ref={formContainer} className="order-2 relative z-10 scroll-mt-4">
                <div className="w-full bg-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden text-slate-800">
                  <div className="pt-5 sm:pt-6 px-5 sm:px-6 lg:px-7">
                    {/* AFHC progress: STEP X OF 3 + % + thin bar */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Step {step} of {TOTAL_STEPS}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold tabular-nums text-slate-400">
                        {progressPct}%
                      </span>
                    </div>
                    <div
                      className="h-1 w-full rounded-full bg-slate-100 overflow-hidden"
                      role="progressbar"
                      aria-label="Walkthrough request progress"
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-ajs-red transition-[width] duration-300 ease-out"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 pt-5 space-y-5"
                    noValidate
                  >
                    <UtmHiddenFields />

                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <h2 ref={stepHeading} tabIndex={-1} className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ajs-red">
                            What&apos;s your company name?
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            We&apos;ll use this to prepare your facility walkthrough request.
                          </p>
                        </div>
                        <Field name="company" label="Company name *" error={errors.company}>
                          <input
                            className={inputClass(errors.company)}
                            value={data.company}
                            onChange={(e) => set('company')(e.target.value)}
                            autoComplete="organization"
                            placeholder="Acme Corp"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <h2 ref={stepHeading} tabIndex={-1} className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ajs-red">
                            Tell us about the facility
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            Role, city, facility type, and how often you need cleaning.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-3.5">
                            <Field name="role" label="Your role *" error={errors.role}>
                              <select
                                className={inputClass(errors.role)}
                                value={data.role}
                                onChange={(e) => set('role')(e.target.value)}
                              >
                                {ROLES.map((r) => (
                                  <option key={r} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </select>
                            </Field>
                            {data.role === 'Other' && (
                              <Field name="customRole" label="Your title *" error={errors.customRole}>
                                <input
                                  className={inputClass(errors.customRole)}
                                  value={data.customRole}
                                  onChange={(e) => set('customRole')(e.target.value)}
                                  placeholder="Your title"
                                />
                              </Field>
                            )}
                          </div>

                          <Field name="city" label="City *" error={errors.city}>
                            <select
                              className={inputClass(errors.city)}
                              value={data.city}
                              onChange={(e) => set('city')(e.target.value)}
                            >
                              <option value="">Select city</option>
                              {SERVICE_CITIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                  {c === 'Redwood City' ? ' (hub)' : ''}
                                </option>
                              ))}
                              <option value={CITY_OTHER}>Other (we may not serve this area)</option>
                            </select>
                          </Field>
                        </div>

                        <fieldset aria-invalid={Boolean(errors.facilityType)} aria-describedby={errors.facilityType ? "office-facility-error" : undefined}>
                          <legend className="text-sm font-semibold text-slate-800 mb-2">
                            Facility type *
                          </legend>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {FACILITY_TYPES.map((ft) => {
                              const selected = data.facilityType === ft.value
                              return (
                                <label
                                  key={ft.value}
                                  className={`has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ajs-red relative flex items-start gap-2 rounded-xl border px-3 py-2.5 cursor-pointer text-sm transition ${
                                    selected
                                      ? 'border-ajs-red bg-red-50 ring-1 ring-ajs-red'
                                      : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="facilityType"
                                    className="mt-0.5 accent-[#d32f2f]"
                                    checked={selected}
                                    onChange={() => set('facilityType')(ft.value)}
                                  />
                                  <span className="font-medium text-slate-900">{ft.label}</span>
                                </label>
                              )
                            })}
                          </div>
                          {errors.facilityType && (
                            <p id="office-facility-error" role="alert" className="text-xs text-ajs-red mt-1">{errors.facilityType}</p>
                          )}
                        </fieldset>

                        <fieldset aria-invalid={Boolean(errors.frequency)} aria-describedby={errors.frequency ? "office-frequency-error" : undefined}>
                          <legend className="text-sm font-semibold text-slate-800 mb-2">
                            Cleaning frequency *
                          </legend>
                          <div className="grid grid-cols-2 gap-2">
                            {FREQUENCIES.map((f) => {
                              const selected = data.frequency === f.value
                              return (
                                <label
                                  key={f.value}
                                  className={`has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ajs-red rounded-xl border px-3 py-2.5 text-sm font-semibold cursor-pointer text-center transition ${
                                    selected
                                      ? 'border-ajs-red bg-red-50 text-ajs-red ring-1 ring-ajs-red'
                                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="frequency"
                                    className="sr-only"
                                    checked={selected}
                                    onChange={() => set('frequency')(f.value)}
                                  />
                                  {f.label}
                                </label>
                              )
                            })}
                          </div>
                          {errors.frequency && (
                            <p id="office-frequency-error" role="alert" className="text-xs text-ajs-red mt-1">{errors.frequency}</p>
                          )}
                        </fieldset>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <h2 ref={stepHeading} tabIndex={-1} className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ajs-red">
                            Request your office walkthrough
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            Our team will contact you to confirm the details and arrange a visit.
                          </p>
                        </div>
                        <Field name="fullName" label="Full name *" error={errors.fullName}>
                          <input
                            className={inputClass(errors.fullName)}
                            value={data.fullName}
                            onChange={(e) => set('fullName')(e.target.value)}
                            autoComplete="name"
                          />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <Field name="phone" label="Phone *" error={errors.phone}>
                            <input
                              className={inputClass(errors.phone)}
                              value={data.phone}
                              onChange={(e) => set('phone')(e.target.value)}
                              autoComplete="tel"
                              inputMode="tel"
                              type="tel"
                              placeholder="650-…"
                            />
                          </Field>
                          <Field name="email" label="Work email *" error={errors.email}>
                            <input
                              className={inputClass(errors.email)}
                              type="email"
                              value={data.email}
                              onChange={(e) => set('email')(e.target.value)}
                              autoComplete="email"
                            />
                          </Field>
                        </div>
                        <Field name="preferredTime" label="Preferred walkthrough time *" error={errors.preferredTime}>
                          <select
                            className={inputClass(errors.preferredTime)}
                            value={data.preferredTime}
                            onChange={(e) => set('preferredTime')(e.target.value)}
                          >
                            {PREFERRED_TIMES.map((t) => (
                              <option key={t} value={t}>
                                {t.replaceAll('\u2013', ' to ')}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field name="notes" label="Notes (optional)">
                          <textarea
                            className={`${inputClass()} min-h-[72px]`}
                            value={data.notes}
                            onChange={(e) => set('notes')(e.target.value)}
                            placeholder="Hours, access, current vendor…"
                          />
                        </Field>
                        {submitError && (
                          <p role="alert" className="text-sm text-ajs-red bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                            {submitError}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={back}
                          disabled={submitting}
                          className="inline-flex items-center justify-center gap-1.5 w-[30%] h-12 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      ) : null}

                      {step < TOTAL_STEPS ? (
                        <button
                          type="submit"
                          className={`${
                            step > 1 ? 'w-[70%]' : 'w-full'
                          } bg-ajs-red hover:bg-ajs-red-dark text-white font-bold h-12 rounded-xl text-[15px] sm:text-base tracking-wide uppercase shadow-lg shadow-red-900/15 inline-flex items-center justify-center`}
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-[70%] bg-ajs-red hover:bg-ajs-red-dark disabled:opacity-70 text-white font-bold h-12 rounded-xl px-2 text-sm sm:text-base shadow-lg shadow-red-900/15 inline-flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                            </>
                          ) : (
                            'Request walkthrough'
                          )}
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 text-center leading-snug">
                      Background checks available on request when your building requires them.
                    </p>
                  </form>
                </div>
                {/* Compact proof beneath the form */}
                <div className="mt-4 flex flex-col items-center gap-2.5 text-center">
                  <StarRow size={14} className="text-amber-400" />
                  <p className="text-[11px] sm:text-xs text-white/55 leading-none">
                    Peninsula commercial cleaning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="flex-1 bg-white">
        {/* Local team and four office-focused benefits */}
        <section className="py-10 sm:py-12 lg:py-14 bg-white" aria-label="Chris Ramirez and team">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-start">
              <figure className="lg:col-span-4 flex flex-col items-center lg:items-start gap-3">
                <div className="relative w-[16.5rem] h-[16.5rem] sm:w-[19.5rem] sm:h-[19.5rem] lg:w-[21rem] lg:h-[21rem] max-w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-slate-100">
                  <img
                    src={assetUrl('chris-truck-crop.jpg')}
                    alt="Chris Ramirez, Owner, All Janitorial Service Inc."
                    className="absolute inset-0 w-full h-full object-cover object-[center_12%]"
                    loading="lazy"
                    width={1022}
                    height={860}
                  />
                </div>
                <figcaption className="text-sm text-slate-600 text-center lg:text-left leading-snug max-w-xs sm:max-w-sm">
                  <span className="block font-semibold text-navy-900">
                    Chris Ramirez, Owner, All Janitorial Service Inc.
                  </span>
                  <span className="block mt-1 text-slate-500">
                    Peninsula commercial cleaning for offices &amp; corporate suites.
                  </span>
                </figcaption>
                <a
                  href={MAIN_SITE}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red hover:text-ajs-red-dark transition-colors"
                >
                  Read more about AJS
                </a>
              </figure>

              <div className="lg:col-span-8">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red mb-2">
                  Local Peninsula team
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  A cleaner office, with less to manage
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Chris&apos;s team walks your facility before you commit, then builds a recurring
                  cleaning plan around your space, schedule, and priorities. Smaller offices welcome.
                </p>
                <ul className="mt-6 sm:mt-7 space-y-3 sm:space-y-3.5">
                  {benefits.map(({ icon: Icon, title, text: line }) => (
                    <li
                      key={title}
                      className="flex items-start gap-3 text-[15px] sm:text-base text-slate-800 leading-snug"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-ajs-red shrink-0 mt-0.5">
                        <Icon className="w-[18px] h-[18px]" aria-hidden />
                      </span>
                      <div className="pt-1">
                        <h3 className="font-bold text-navy-900">{title}</h3>
                        <p className="mt-1 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{line}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        <TrustMarquee />

        {/* Why-us — commercial office photo + prose (no schools/homes) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
              <figure className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-slate-100 aspect-[4/3]">
                  <img
                    src={assetUrl(officePhotoForCity(city).src)}
                    alt={
                      city
                        ? `Commercial office building, ${city}`
                        : officePhotoForCity(city).alt
                    }
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-slate-500 text-center lg:text-left">
                  {city
                    ? `Commercial offices in ${city} and across the Peninsula.`
                    : 'Commercial office buildings, Peninsula businesses.'}
                </figcaption>
              </figure>
              <div className="lg:col-span-7 max-w-2xl">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red mb-3">
                  Why us
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] font-extrabold text-navy-900 leading-tight tracking-tight">
                  {city
                    ? `The mid-size ${city} office specialist`
                    : 'The mid-size Peninsula office specialist'}
                </h2>
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                  National franchises run a script. Solo cleaners disappear when you need coverage.
                  We&apos;re the middle that facility managers actually want, big enough to staff your
                  suite reliably, small enough that Chris&apos;s team still walks the floor before you
                  sign. Walkthrough → written scope → recurring cadence you can defend to ownership.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>


      <Footer hideCallCta />
    </div>
  )
}


function UtmHiddenFields() {
  const utms = getStoredUtms()
  return (
    <>
      {Object.entries(utms).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} readOnly />
      ))}
    </>
  )
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: keyof FormState
  label: string
  error?: string
  children: ReactElement<{ id?: string; name?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }>
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={`office-${name}`} className="text-sm font-semibold text-slate-800 block">{label}</label>
      {cloneElement(children, {
        id: `office-${name}`,
        name,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `office-${name}-error` : undefined,
      })}
      {error && <p id={`office-${name}-error`} role="alert" className="text-xs text-ajs-red">{error}</p>}
    </div>
  )
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-[15px] outline-none focus:ring-2 focus:ring-ajs-red/30 focus:border-ajs-red focus:bg-white transition ${
    error ? 'border-ajs-red' : 'border-slate-200'
  }`
}
