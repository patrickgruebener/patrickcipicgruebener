import assert from 'node:assert/strict'
import test from 'node:test'
import {
  analyticsCookieNames,
  isAnalyticsHost,
  parseConsent,
  serializeConsent,
} from './consent.ts'

test('no decision when the cookie is missing', () => {
  assert.equal(parseConsent(''), null)
  assert.equal(parseConsent('language=de'), null)
})

test('reads granted and denied among other cookies', () => {
  assert.equal(parseConsent('language=de; cookie_consent=granted'), 'granted')
  assert.equal(parseConsent('cookie_consent=denied;language=en'), 'denied')
})

test('ignores unknown values', () => {
  assert.equal(parseConsent('cookie_consent=maybe'), null)
})

test('serialized cookie round-trips and expires', () => {
  const cookie = serializeConsent('granted')
  assert.equal(parseConsent(cookie.split(';')[0]), 'granted')
  assert.match(cookie, /max-age=\d+/)
  assert.match(cookie, /path=\//)
})

test('analytics only on production hosts', () => {
  assert.equal(isAnalyticsHost('patrickcipicgruebener.com'), true)
  assert.equal(isAnalyticsHost('WWW.patrickcipicgruebener.com'), true)
  assert.equal(isAnalyticsHost('test.patrickcipicgruebener.com'), false)
  assert.equal(isAnalyticsHost('localhost'), false)
})

test('finds Google Analytics cookies only', () => {
  const names = analyticsCookieNames('_ga=GA1.1.1; language=de; _ga_5S1L0QWK5P=GS1; _gat=1')
  assert.deepEqual(names, ['_ga', '_ga_5S1L0QWK5P'])
})
