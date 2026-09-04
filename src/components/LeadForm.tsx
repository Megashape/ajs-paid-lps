import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { CITY_OTHER, SERVICE_CITIES } from '../data/cities'
import {
  FACILITY_TYPES,
  FREQUENCIES,
  PREFERRED_TIMES,
  ROLES,
  type FormState,
} from '../types/form'
import { fireConversion, submitLead } from '../lib/formSubmit'
import { getStoredUtms } from '../lib/utm'
import { ProofNearForm } from './ProofNearForm'
import type { LandingVariant } from '../data/copy'

interface LeadFormProps {
  title: string
  subtitle: string
  variant: LandingVariant
}

const initial: FormState = {
  company: '',
  role: 'Facilities Manager',
  customRole: '',
  city: '',
  facilityType: 'Office / Corporate',
  frequency: '',
  sqFt: '',
  fullName: '',
  phone: '',
  email: '',
  preferredTime: 'Flexible / anytime',
  notes: '',
}

export function LeadForm({ title, subtitle, variant }: LeadFormProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set =
    (key: keyof FormState) =>
    (value: string) => {
      setData((d) => ({ ...d, [key]: value }))
      setErrors((e) => ({ ...e, [key]: undefined }))
    }

  const validateStep1 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!data.company.trim()) e.company = 'Company name is required'
    if (data.role === 'Other' && !data.customRole.trim()) e.customRole = 'Please specify your role'
    if (!data.city) e.city = 'Select a city'
    if (!data.facilityType) e.facilityType = 'Select a facility type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
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
        variant,
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

  const facilityHint = useMemo(() => {
    const ft = FACILITY_TYPES.find((f) => f.value === data.facilityType)
    if (ft && !ft.win) {
      return 'This landing page is optimized for office / corporate. We’ll still review your inquiry and route it.'
    }
    return null
  }, [data.facilityType])

  return (
    <div
      id="lead-form"
      className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
    >
      <div className="bg-white pt-5 px-5 text-slate-900">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold leading-snug">{title}</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="mt-3 mb-1">
          <ProofNearForm />
        </div>
        <div className="sm:hidden text-center text-xs font-bold text-ajs-red mb-1 mt-3">
          Step {step} of 3
        </div>
        <ol className="hidden sm:flex items-center gap-2 mt-4 text-xs font-semibold">
          {[
            'Company',
            'Scope',
            'Walkthrough',
          ].map((label, i) => {
            const n = i + 1
            const active = step === n
            const done = step > n
            return (
              <li key={label} className="flex items-center gap-2 flex-1">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                    active || done
                      ? 'bg-ajs-red text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
                </span>
                <span className={active ? 'text-slate-900' : 'text-slate-500'}>{label}</span>
                {n < 3 && <span className="flex-1 h-px bg-slate-200 ml-2" />}
              </li>
            )
          })}
        </ol>
      </div>

      <form onSubmit={onSubmit} className="px-5 pb-5 pt-4 space-y-4" noValidate>
        {/* Hidden UTM fields preserved for Formspree / CRM */}
        <UtmHiddenFields />

        {step === 1 && (
          <div className="space-y-4 animate-in">
            <Field label="Company name *" error={errors.company}>
              <input
                className={inputClass(errors.company)}
                value={data.company}
                onChange={(e) => set('company')(e.target.value)}
                autoComplete="organization"
                placeholder="Acme Corp"
              />
            </Field>

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

            <fieldset>
              <legend className="text-sm font-semibold text-slate-800 mb-2">Facility type *</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FACILITY_TYPES.map((ft) => {
                  const selected = data.facilityType === ft.value
                  return (
                    <label
                      key={ft.value}
                      className={`relative flex items-start gap-2 rounded-xl border px-3 py-2.5 cursor-pointer text-sm transition ${
                        selected
                          ? ft.win
                            ? 'border-ajs-red bg-red-50 ring-1 ring-ajs-red'
                            : 'border-slate-400 bg-slate-50'
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
                      <span>
                        <span className="font-medium text-slate-900 block">{ft.value}</span>
                        {ft.win ? (
                          <span className="text-[11px] text-ajs-red font-semibold">Best fit</span>
                        ) : (
                          <span className="text-[11px] text-slate-500">We’ll route this inquiry</span>
                        )}
                      </span>
                    </label>
                  )
                })}
              </div>
              {facilityHint && (
                <p className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  {facilityHint}
                </p>
              )}
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
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
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold cursor-pointer text-center transition ${
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

            <Field
              label="Approximate sq ft (optional)"
              error={errors.sqFt}
              hint="No hard minimum — smaller offices OK. Optional, for scoping only."
            >
              <input
                className={inputClass(errors.sqFt)}
                value={data.sqFt}
                onChange={(e) => set('sqFt')(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 4,500"
              />
            </Field>

            <Field label="Anything we should know? (optional)">
              <textarea
                className={`${inputClass()} min-h-[80px]`}
                value={data.notes}
                onChange={(e) => set('notes')(e.target.value)}
                placeholder="Hours, access, current vendor, etc."
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Field label="Your name *" error={errors.fullName}>
              <input
                className={inputClass(errors.fullName)}
                value={data.fullName}
                onChange={(e) => set('fullName')(e.target.value)}
                autoComplete="name"
              />
            </Field>
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
            {submitError && (
              <p className="text-sm text-ajs-red bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center justify-center gap-1 w-1/3 h-12 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div className="w-0" />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className={`${step > 1 ? 'w-2/3' : 'w-full'} bg-ajs-red hover:bg-ajs-red-dark text-white font-bold h-12 rounded-xl text-base shadow-xl shadow-red-900/10 inline-flex items-center justify-center gap-2`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 bg-ajs-red hover:bg-ajs-red-dark disabled:opacity-70 text-white font-bold h-12 rounded-xl text-base shadow-xl shadow-red-900/10 inline-flex items-center justify-center gap-2"
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
      </form>
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
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-800 block">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-ajs-red">{error}</p>}
    </div>
  )
}

function inputClass(error?: string) {
  return `w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ajs-red/30 focus:border-ajs-red ${
    error ? 'border-ajs-red' : 'border-slate-300'
  }`
}
