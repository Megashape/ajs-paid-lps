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

If unset, submit succeeds in UI for local/preview testing and logs the payload to the console (no network send).

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

## Deploy (Vercel preview)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import in Vercel → Framework Preset **Vite**.
3. Set env `VITE_FORM_ENDPOINT` for the preview/production project.
4. `vercel.json` rewrites all routes to `/index.html` for SPA routing.

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Ad destinations should use `/office` or `/recurring` directly (not `/`).

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
