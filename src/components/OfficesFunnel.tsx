import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
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
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import { Header } from './Header'
import { Footer } from './Footer'
import { assetUrl } from '../lib/assetUrl'
import { TrustMarquee } from './TrustMarquee'

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

  useEffect(() => {
    readUtmsFromLocation()
    const titleCity = city ? ` in ${city}` : ' — Peninsula'
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
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /** Step 2 = role, city, facility, frequency */
  const validateStep2 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (data.role === 'Other' && !data.customRole.trim()) e.customRole = 'Please specify your role'
    if (!data.city) e.city = 'Select a city'
    if (!data.facilityType) e.facilityType = 'Select a facility type'
    if (!data.frequency) e.frequency = 'Select a frequency'
    setErrors(e)
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
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const back = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validateStep3()) return
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
      setSubmitting(false)
    }
  }

  const headline = city
    ? `Office cleaning in ${city}`
    : 'Office cleaning for Peninsula businesses'
  const subhead = city
    ? `Recurring commercial cleaning for offices in ${city}. Businesses only — not homes or events.`
    : 'Recurring commercial cleaning for Peninsula offices. Businesses only — not homes or events.'

  const bullets = [
    'Weekly qualifies — add multi-day or weekends when needed',
    'Commercial offices & corporate suites — not residential or events',
    'Local Peninsula team coordinated from Redwood City',
  ]

  const benefits = [
    'Recurring plans that fit how offices actually run (weekly+; multi-day/weekends when needed)',
    'Facility walkthrough before you commit',
    'Written scope of work — not a vague verbal quote',
    'Local Peninsula team coordinated from Redwood City',
    'Licensed & insured commercial cleaning',
    'Background checks available on request when your building requires them',
    'Eco-friendly / EPA-conscious products',
    "Dedicated point of contact (issues don't disappear into a call center)",
    'Built for mid-size offices & corporate suites — not homes or events',
    "Responsive when something's off — we fix it, we don't argue",
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
        <Header overHero compact quietProof />

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
                <p className="mt-5 hidden lg:block text-sm text-white/55">
                  Prefer to talk?{' '}
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-white font-semibold underline underline-offset-4"
                  >
                    {PHONE_DISPLAY}
                  </a>
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
              <div id="lead-form" className="order-2 relative z-10">
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
                          <h2 className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight">
                            What&apos;s your company name?
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            We&apos;ll use this to prepare your facility walkthrough request.
                          </p>
                        </div>
                        <Field label="Company name *" error={errors.company}>
                          <input
                            className={inputClass(errors.company)}
                            value={data.company}
                            onChange={(e) => set('company')(e.target.value)}
                            autoComplete="organization"
                            placeholder="Acme Corp"
                            autoFocus
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight">
                            Tell us about the facility
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            Role, city, facility type, and how often you need cleaning.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <Field label="Your role *" error={errors.role || errors.customRole}>
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
                            {data.role === 'Other' && (
                              <input
                                className={`mt-2 ${inputClass(errors.customRole)}`}
                                value={data.customRole}
                                onChange={(e) => set('customRole')(e.target.value)}
                                placeholder="Your title"
                              />
                            )}
                          </Field>

                          <Field label="City *" error={errors.city}>
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
                              <option value={CITY_OTHER}>{CITY_OTHER}</option>
                            </select>
                          </Field>
                        </div>

                        <fieldset>
                          <legend className="text-sm font-semibold text-slate-800 mb-2">
                            Facility type *
                          </legend>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {FACILITY_TYPES.map((ft) => {
                              const selected = data.facilityType === ft.value
                              return (
                                <label
                                  key={ft.value}
                                  className={`relative flex items-start gap-2 rounded-xl border px-3 py-2.5 cursor-pointer text-sm transition ${
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
                            <p className="text-xs text-ajs-red mt-1">{errors.facilityType}</p>
                          )}
                        </fieldset>

                        <fieldset>
                          <legend className="text-sm font-semibold text-slate-800 mb-2">
                            Cleaning frequency *
                          </legend>
                          <div className="grid grid-cols-2 gap-2">
                            {FREQUENCIES.map((f) => {
                              const selected = data.frequency === f.value
                              return (
                                <label
                                  key={f.value}
                                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold cursor-pointer text-center transition ${
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
                            <p className="text-xs text-ajs-red mt-1">{errors.frequency}</p>
                          )}
                        </fieldset>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-navy-900 leading-snug tracking-tight">
                            Schedule the walkthrough
                          </h2>
                          <p className="mt-1.5 text-sm text-slate-500 leading-snug">
                            How we reach you and when to visit.
                          </p>
                        </div>
                        <Field label="Full name *" error={errors.fullName}>
                          <input
                            className={inputClass(errors.fullName)}
                            value={data.fullName}
                            onChange={(e) => set('fullName')(e.target.value)}
                            autoComplete="name"
                          />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <Field label="Phone *" error={errors.phone}>
                            <input
                              className={inputClass(errors.phone)}
                              value={data.phone}
                              onChange={(e) => set('phone')(e.target.value)}
                              autoComplete="tel"
                              inputMode="tel"
                              placeholder="650-…"
                            />
                          </Field>
                          <Field label="Work email *" error={errors.email}>
                            <input
                              className={inputClass(errors.email)}
                              type="email"
                              value={data.email}
                              onChange={(e) => set('email')(e.target.value)}
                              autoComplete="email"
                            />
                          </Field>
                        </div>
                        <Field label="Preferred walkthrough time *" error={errors.preferredTime}>
                          <select
                            className={inputClass(errors.preferredTime)}
                            value={data.preferredTime}
                            onChange={(e) => set('preferredTime')(e.target.value)}
                          >
                            {PREFERRED_TIMES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Notes (optional)">
                          <textarea
                            className={`${inputClass()} min-h-[72px]`}
                            value={data.notes}
                            onChange={(e) => set('notes')(e.target.value)}
                            placeholder="Hours, access, current vendor…"
                          />
                        </Field>
                        {submitError && (
                          <p className="text-sm text-ajs-red bg-red-50 border border-red-100 rounded-xl px-3 py-2">
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
                          className="inline-flex items-center justify-center gap-1.5 w-[30%] h-12 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      ) : null}

                      {step < TOTAL_STEPS ? (
                        <button
                          type="button"
                          onClick={next}
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
                          className="w-[70%] bg-ajs-red hover:bg-ajs-red-dark disabled:opacity-70 text-white font-bold h-12 rounded-xl text-[15px] sm:text-base tracking-wide uppercase shadow-lg shadow-red-900/15 inline-flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                            </>
                          ) : (
                            'Submit request'
                          )}
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 text-center leading-snug">
                      Background checks available on request when your building requires them.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* WHITE trust marquee — CSS only, no observers */}
      <TrustMarquee />

      <main className="flex-1 bg-white">
        {/* CHRIS + TRUCK — HIGH under trust logos, early below fold */}
        <section className="pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              <figure className="order-1">
                <img
                  src={assetUrl('chris-truck-crop.jpg')}
                  alt="Chris Ramirez and a teammate with the branded All Janitorial Service van"
                  className="w-full rounded-2xl object-cover shadow-xl border border-slate-200"
                  loading="eager"
                  width={1022}
                  height={860}
                />
                <figcaption className="mt-3 text-sm text-slate-500 text-center sm:text-left">
                  Chris + team, Peninsula commercial.
                </figcaption>
              </figure>
              <div className="order-2">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red mb-3">
                  Local ownership
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  Chris Ramirez and the Peninsula team
                </h2>
                <p className="mt-4 text-base sm:text-[17px] text-slate-600 leading-relaxed">
                  Not a distant franchise script. Chris and the crew run Peninsula commercial
                  accounts from Redwood City — walk the floor, write the scope, and stay reachable
                  when something&apos;s off. That&apos;s the truck you&apos;ll see on your block.
                </p>
                <p className="mt-5 text-sm text-slate-500">
                  Prefer to talk first?{' '}
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-semibold text-navy-900 underline underline-offset-4"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile hero bullets (desktop already shows them on stage) */}
        <div className="lg:hidden mx-auto max-w-6xl px-4 sm:px-6 pb-2">
          <ul className="space-y-2.5 text-sm text-slate-700">
            {bullets.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-ajs-red shrink-0 mt-0.5" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHY-US (~40%) + BENEFITS (~60%) — one desktop row; mobile: benefits then why */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-10 gap-10 lg:gap-12 lg:items-start">
              {/* Why-us — ~40% desktop; second on mobile */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ajs-red mb-3">
                  Why us
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] font-extrabold text-navy-900 leading-tight tracking-tight">
                  The mid-size Peninsula office specialist
                </h2>
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                  National franchises run a script. Solo cleaners disappear when you need coverage.
                  We&apos;re the middle that facility managers actually want — big enough to staff your
                  suite reliably, small enough that Chris&apos;s team still walks the floor before you
                  sign. Walkthrough → written scope → recurring cadence you can defend to ownership.
                </p>
              </div>

              {/* Benefits — ~60% desktop; first on mobile */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                  What you get with AJS
                </h2>
                <ul className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
                  {benefits.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-[15px] sm:text-base text-slate-800 leading-snug"
                    >
                      <CheckCircle2
                        className="w-5 h-5 sm:w-6 sm:h-6 text-ajs-red shrink-0 mt-0.5"
                        aria-hidden
                      />
                      <span className="font-medium">{line}</span>
                    </li>
                  ))}
                </ul>
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
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-800 block">{label}</label>
      {children}
      {error && <p className="text-xs text-ajs-red">{error}</p>}
    </div>
  )
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-[15px] outline-none focus:ring-2 focus:ring-ajs-red/30 focus:border-ajs-red focus:bg-white transition ${
    error ? 'border-ajs-red' : 'border-slate-200'
  }`
}
