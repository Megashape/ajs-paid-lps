import { copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')
copyFileSync(index, join(dist, '404.html'))
for (const route of ['office', 'recurring', 'thank-you']) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, 'index.html'))
}
console.log('spa-routes: wrote 404.html + office/recurring/thank-you indexes')
