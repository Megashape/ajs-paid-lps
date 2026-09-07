import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
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

const staticRoutes = ['thank-you', 'recurring', 'office']
for (const route of staticRoutes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, 'index.html'))
}

for (const city of SERVICE_CITIES) {
  const slug = toSlug(city)
  mkdirSync(join(dist, slug), { recursive: true })
  copyFileSync(index, join(dist, slug, 'index.html'))
}

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
