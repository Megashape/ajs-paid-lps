import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Compile the shipping module while supplying Vite's build-time endpoint in Node.
const source = readFileSync(new URL('../src/lib/formSubmit.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(
  source.replace('import.meta.env.VITE_FORM_ENDPOINT', 'globalThis.ajsTestEndpoint'),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } },
)
const { submitLead } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const originalFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = originalFetch
  delete globalThis.ajsTestEndpoint
})

const lead = {
  company: 'Test office', role: 'Office Manager', city: 'Palo Alto',
  facilityType: 'Office', frequency: 'Weekly', fullName: 'Example Person',
  phone: '202-555-0100', email: 'qa@example.invalid',
  preferredTime: 'Flexible / anytime', page: '/palo-alto/', variant: 'office',
  utms: { utm_source: 'google', utm_campaign: 'office', gclid: 'fixture-only' },
}

test('missing endpoint rejects without sending or pretending to receive a lead', async () => {
  let requests = 0
  globalThis.fetch = async () => { requests++; return new Response('{}') }
  await assert.rejects(submitLead(lead), /temporarily unavailable.*650-261-0723/)
  assert.equal(requests, 0)
})

test('accepted submissions preserve qualification, contact aliases, city, and attribution', async () => {
  globalThis.ajsTestEndpoint = 'https://example.invalid/lead'
  for (const frequency of ['Weekly', '2–3× / week', '5-day', '7-day / weekends', 'Not sure']) {
    let sent
    globalThis.fetch = async (url, init) => {
      assert.equal(url, globalThis.ajsTestEndpoint)
      assert.equal(init.method, 'POST')
      sent = JSON.parse(init.body)
      return new Response('{}', { status: 200 })
    }
    await submitLead({ ...lead, frequency })
    assert.equal(sent.Facility, 'Office')
    assert.equal(sent.Frequency, frequency)
    assert.equal(sent.facilityType, 'Office')
    assert.equal(sent.frequency, frequency)
    assert.equal(sent.Email, lead.email)
    assert.equal(sent['First Name'], 'Example')
    assert.equal(sent['Last Name'], 'Person')
    assert.equal(sent['Company Name'], lead.company)
    assert.equal(sent.City, 'Palo Alto')
    assert.equal(sent.page, '/palo-alto/')
    assert.equal(sent.gclid, 'fixture-only')
    assert.deepEqual(sent.utms, lead.utms)
  }
})

test('provider rejection gives a useful fallback without exposing its response body', async () => {
  globalThis.ajsTestEndpoint = 'https://example.invalid/lead'
  globalThis.fetch = async () => new Response('PRIVATE_PROVIDER_DIAGNOSTIC', { status: 500 })
  await assert.rejects(submitLead(lead), error => {
    assert.match(error.message, /could not confirm.*650-261-0723/)
    assert.doesNotMatch(error.message, /PRIVATE_PROVIDER_DIAGNOSTIC/)
    return true
  })
})

test('network ambiguity does not report success or encourage duplicate submissions', async () => {
  globalThis.ajsTestEndpoint = 'https://example.invalid/lead'
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
  await assert.rejects(submitLead(lead), /could not confirm.*before sending it again/)
})
