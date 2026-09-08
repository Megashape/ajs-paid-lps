# AJS Paid Landing Pages

Production-ready Vite + React SPA for All Janitorial Service paid commercial LPs.

**Phone:** `650-261-0723`  
**Hub:** Redwood City, CA

Structure inspired by the sparse school LP (`schools.alljanitorialservice.com`) — header phone, walkthrough CTA, 3-step in-fold form, trust logos, why cards, cities, FAQ, footer — with **commercial** copy only.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Staging index linking to LPs |
| `/office` | Office / Corporate Facilities |
| `/recurring` | Recurring Commercial Janitorial |
| `/thank-you` | Post-submit confirmation |

## Local development

```bash
npm install
cp .env.example .env   # set VITE_FORM_ENDPOINT
npm run dev
```

```bash
npm run build    # tsc + vite build
npm run preview
```

## Form endpoint

School LP posts through GoHighLevel / LeadConnector external-tracking with **school-specific** custom field IDs — not reusable for these commercial pages.

This app POSTs JSON to **`VITE_FORM_ENDPOINT`** (Formspree or compatible):

```env
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

If unset, submission fails with a call fallback. It never reports success, logs contact details, or fires a conversion. For local delivery testing, use an intercepted local endpoint; never use the production webhook for preview fixtures.

### Form fields (3 steps)

1. **Company** — company, role, city (10 approved + “Other — we may not serve this area”), facility type (Office/Corporate is the win; school/MF marked for routing only)
2. **Scope** — frequency (`weekly` / `2-3x` / `5-day` / `not-sure`), optional sq ft (no 10k hard-gate), notes
3. **Walkthrough** — name, phone, email, preferred time

UTM params (`utm_*`, `gclid`, `fbclid`, `msclkid`) are captured from the URL, kept in `sessionStorage`, included as hidden inputs, and sent with the JSON body.

### Conversion

On successful submit, fires `gtag` conversion:

`AW-16700423105/UFUECLuEnJkbEMH3sJs-`

(configured in `index.html` via `window.gtagFormConversion`).

## Copy exclusions (hard rules)

Do **not** add or restore:

- “100% in-house”, “0 subcontractors”, “zero subcontracting”
- 2-hour or 24-hour walkthrough guarantees
- Live Scan / background checks as default (ok: **available on request**)
- Same-day as a guarantee (ok: when we can)
- Invented claims, counts, or ratings
- Yelp **review counts** (5-star Google & Yelp as stars/claim only; BBB A+ as claim/logo only)
- School / multifamily primary nav
- Cities outside: San Mateo, Foster City, Belmont, Redwood City, East Palo Alto, Palo Alto, Menlo Park, Mountain View, Sunnyvale, Santa Clara

Hero angle: weekly office cleaning; commercial specialist vs house-cleaner city pages; local vs franchise. Not Mon–Fri only. No 10,000 sq ft gate.

## Production publication

The verified production host is `offices.alljanitorialservice.com`, served by
GitHub Pages from `Megashape/ajs-paid-lps`, branch `gh-pages`, root directory.
Source lives on `master`. `static-prod` is a legacy branch, not the current host.
Do not deploy this funnel to the Megawebvision CHIEF Vercel project.

Build with the existing AJS `VITE_FORM_ENDPOINT` in `.env.example`; verify it
against the currently published bundle before each release. Preserve `CNAME`
and city-route indexes. Publish the reviewed source and generated static build
with normal fast-forward pushes, then verify Pages build status, asset hashes,
root/city routes, and mobile/desktop behavior.

## Funnel measurement

Production loads the existing Ads tag and AJS Analytics stream `G-2ZF6RFN9MX`
(property `465155029`). Local and preview hostnames do not load either tag.
No form answers, contact details, or notes are sent in diagnostic event payloads.

- `ajs_form_start`: first change to the form, once per mounted form.
- `ajs_step_2`, `ajs_step_3`: first arrival at that step, once per mounted form.
- `ajs_validation_error`: invalid attempt, with the step number only.
- `ajs_submit_attempt`: valid final submission attempt.
- `ajs_submit_accepted`: webhook returned an HTTP success; NOT independently verified CRM creation or qualification.
- `ajs_submit_error`: delivery missing, rejected, or uncertain.
- `ajs_phone_click`: intent to call; NOT a connected or qualified phone call.
- `ajs_walkthrough_click`, `ajs_main_site_click`: navigation intent, with header/footer/content placement.

Ads conversion remains the existing `AW-16700423105/UFUECLuEnJkbEMH3sJs-`
after successful submission. Diagnostic events are sent only to Analytics and
are not new Ads goals. Report unique users by event and hostname for funnel
progress; event counts can include retries. CRM records and Chris's disposition
remain the source for qualified leads, walkthroughs, proposals, and wins.

## Brand tokens

| Token | Value |
|-------|--------|
| `ajs-red` | `#d32f2f` |
| `navy-900` | `#0a1128` |
| `navy-800` | `#121d3b` |
| Logo | `/logo-white.png` (from alljanitorialservice.com white logo) |

## Notes

- Do not clone MegawebvisionOS for this project.
- Do not email leads from this app; form POST only.
