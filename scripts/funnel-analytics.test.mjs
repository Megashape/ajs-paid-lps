import assert from 'node:assert/strict'
import { test, afterEach } from 'node:test'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/funnelAnalytics.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { trackFunnelEvent } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
afterEach(() => { delete globalThis.window })

test('local previews do not send diagnostic events', () => {
  globalThis.window = { location: { hostname: '127.0.0.1' }, gtag: () => assert.fail('local analytics sent') }
  trackFunnelEvent('ajs_form_start', 1)
})

test('production diagnostics target only AJS Analytics and carry no contact data', () => {
  let event
  globalThis.window = { location: { hostname: 'offices.alljanitorialservice.com' }, gtag: (...args) => { event = args } }
  trackFunnelEvent('ajs_submit_accepted', 3)
  assert.deepEqual(event, ['event', 'ajs_submit_accepted', { send_to: 'G-2ZF6RFN9MX', funnel: 'office', form_step: 3 }])
  trackFunnelEvent('ajs_phone_click', undefined, 'footer')
  assert.deepEqual(event[2], { send_to: 'G-2ZF6RFN9MX', funnel: 'office', placement: 'footer' })
})

test('analytics failure never interrupts the customer journey', () => {
  globalThis.window = { location: { hostname: 'offices.alljanitorialservice.com' }, gtag: () => { throw new Error('blocked') } }
  assert.doesNotThrow(() => trackFunnelEvent('ajs_submit_accepted', 3))
})

test('tag bootstrap is restricted to the production hostname and preserves Ads conversion', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1]
  for (const hostname of ['127.0.0.1', 'localhost', 'offices.alljanitorialservice.com']) {
    const appended = []
    const context = { location: { hostname }, document: { createElement: () => ({}), head: { appendChild: x => appended.push(x) } } }
    context.window = context
    vm.runInNewContext(script, context)
    if (hostname !== 'offices.alljanitorialservice.com') {
      assert.equal(appended.length, 0)
      assert.equal(context.gtagFormConversion, undefined)
    } else {
      assert.equal(appended.length, 1)
      context.gtagFormConversion()
      const last = context.dataLayer.at(-1)
      assert.equal(last[1], 'conversion')
      assert.equal(last[2].send_to, 'AW-16700423105/UFUECLuEnJkbEMH3sJs-')
    }
  }
})
