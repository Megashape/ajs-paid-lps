import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SERVICE_CITIES = [
  'San Mateo',
  'Foster City',
  'Belmont',
  'Redwood City',
  'East Palo Alto',
  'Palo Alto',
  'Menlo Park',
  'Mountain View',
  'Sunnyvale',
  'Santa Clara',
]

function toSlug(city) {
  return city
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const dist = 'dist'
const index = join(dist, 'index.html')
copyFileSync(index, join(dist, '404.html'))

const staticRoutes = ['thank-you', 'recurring', 'office', 'tour', 'tour/booked']
for (const route of staticRoutes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, 'index.html'))
}

for (const city of SERVICE_CITIES) {
  const slug = toSlug(city)
  mkdirSync(join(dist, slug), { recursive: true })
  copyFileSync(index, join(dist, slug, 'index.html'))
}

// Tour booking pages: own title, description and share cover (Google Business Profile booking link).
const TOUR_URL = 'https://offices.alljanitorialservice.com/tour/'
const TOUR_TITLE = 'Book a free office tour | All Janitorial Service'
const TOUR_DESC =
  'Pick a time for a free 30-minute office tour in the Peninsula. We walk your space and plan recurring office cleaning.'
function tourHead(html, { title, desc, url, robots }) {
  const tags = [
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="All Janitorial Service" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="https://offices.alljanitorialservice.com/og-tour.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="https://offices.alljanitorialservice.com/og-tour.jpg" />`,
  ].join('\n    ')
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${desc}" />\n    ${tags}`)
}
const baseHtml = readFileSync(index, 'utf8')
writeFileSync(
  join(dist, 'tour', 'index.html'),
  tourHead(baseHtml, { title: TOUR_TITLE, desc: TOUR_DESC, url: TOUR_URL, robots: 'index,follow' }),
)
writeFileSync(
  join(dist, 'tour', 'booked', 'index.html'),
  tourHead(baseHtml, {
    title: 'Your office tour is booked | All Janitorial Service',
    desc: TOUR_DESC,
    url: TOUR_URL,
    robots: 'noindex,follow',
  }),
)

// Explicit /office redirect HTML for non-SPA crawlers / first paint
writeFileSync(
  join(dist, 'office', 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0;url=/" />
    <link rel="canonical" href="/" />
    <script>location.replace("/")</script>
    <title>Redirecting…</title>
  </head>
  <body>
    <p><a href="/">Continue to office cleaning</a></p>
  </body>
</html>
`,
)

console.log(
  'spa-routes: wrote 404.html + thank-you/recurring/office +',
  SERVICE_CITIES.length,
  'city indexes',
)
