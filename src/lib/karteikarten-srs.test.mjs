import assert from 'node:assert/strict'
import test from 'node:test'
import {
  baueRunde,
  bewerte,
  neuerFortschritt,
  normalisiere,
  trenneGeschwister,
  validiereBewertung,
  validiereImport,
  validierePatch,
} from './karteikarten-srs.ts'

const NOW = new Date('2026-11-14T10:00:00.000Z')
const DAY = 24 * 60 * 60 * 1000

function fort(overrides = {}) {
  return { ...neuerFortschritt(NOW), neu: false, ...overrides }
}

test('nochmal resets interval, schedules in 10 minutes and lowers ease', () => {
  const next = bewerte(fort({ intervallTage: 7, wiederholungen: 3 }), 'nochmal', NOW)
  assert.equal(next.intervallTage, 0)
  assert.equal(next.wiederholungen, 0)
  assert.equal(next.leichtigkeit, 2.3)
  assert.equal(next.neu, false)
  assert.equal(new Date(next.faellig).getTime(), NOW.getTime() + 10 * 60 * 1000)
})

test('nochmal never drops ease below 1.3', () => {
  let f = fort({ leichtigkeit: 1.4 })
  for (let i = 0; i < 5; i += 1) f = bewerte(f, 'nochmal', NOW)
  assert.equal(f.leichtigkeit, 1.3)
})

test('gut walks 1 -> 3 -> round(interval * ease)', () => {
  const first = bewerte(neuerFortschritt(NOW), 'gut', NOW)
  assert.equal(first.intervallTage, 1)
  assert.equal(new Date(first.faellig).getTime(), NOW.getTime() + DAY)
  const second = bewerte(first, 'gut', NOW)
  assert.equal(second.intervallTage, 3)
  const third = bewerte(second, 'gut', NOW)
  assert.equal(third.intervallTage, Math.round(3 * 2.5))
  assert.equal(third.leichtigkeit, 2.5)
  assert.equal(third.wiederholungen, 3)
})

test('leicht walks 3 -> 7 -> round(interval * ease * 1.3) and raises ease', () => {
  const first = bewerte(neuerFortschritt(NOW), 'leicht', NOW)
  assert.equal(first.intervallTage, 3)
  assert.equal(first.leichtigkeit, 2.65)
  const second = bewerte(first, 'leicht', NOW)
  assert.equal(second.intervallTage, 7)
  const third = bewerte(second, 'leicht', NOW)
  assert.equal(third.intervallTage, Math.round(7 * second.leichtigkeit * 1.3))
})

test('interval after a lapse restarts at 1 with gut', () => {
  const lapsed = bewerte(fort({ intervallTage: 20 }), 'nochmal', NOW)
  assert.equal(bewerte(lapsed, 'gut', NOW).intervallTage, 1)
})

function karte(id, hr, erstellt, hrDe, deHr) {
  return {
    id,
    hr,
    de: `de-${id}`,
    erstellt,
    fortschritt: { 'hr-de': hrDe, 'de-hr': deHr },
  }
}

test('baueRunde: due first (oldest first), then new, future excluded', () => {
  const past = (days) => new Date(NOW.getTime() - days * DAY).toISOString()
  const future = new Date(NOW.getTime() + DAY).toISOString()
  const karten = [
    karte('a', 'a', '2026-11-01T00:00:00Z', fort({ faellig: past(1) }), fort({ faellig: future })),
    karte('b', 'b', '2026-11-02T00:00:00Z', fort({ faellig: past(5) }), neuerFortschritt(NOW)),
    karte('c', 'c', '2026-11-03T00:00:00Z', neuerFortschritt(NOW), neuerFortschritt(NOW)),
  ]
  const { karten: runde, stats } = baueRunde(karten, NOW)
  assert.deepEqual(
    runde.map((x) => `${x.kartenId}:${x.richtung}`),
    ['b:hr-de', 'a:hr-de', 'c:hr-de', 'b:de-hr', 'c:de-hr'],
  )
  assert.deepEqual(stats, { faellig: 2, neu: 3, gesamt: 3 })
})

test('baueRunde: new cards never show both sides back to back', () => {
  const neuK = (id, tag) => karte(id, id, `2026-11-0${tag}T00:00:00Z`, neuerFortschritt(NOW), neuerFortschritt(NOW))
  const runde = baueRunde([neuK('a', 1), neuK('b', 2), neuK('c', 3)], NOW).karten
  assert.deepEqual(
    runde.map((x) => `${x.kartenId}:${x.richtung}`),
    ['a:hr-de', 'b:hr-de', 'c:hr-de', 'a:de-hr', 'b:de-hr', 'c:de-hr'],
  )
})

test('trenneGeschwister: separates adjacent siblings, keeps order otherwise', () => {
  const q = (ids) => ids.map((kartenId) => ({ kartenId }))
  const ids = (list) => list.map((x) => x.kartenId).join('')
  assert.equal(ids(trenneGeschwister(q(['a', 'a', 'b', 'c']))), 'abac')
  assert.equal(ids(trenneGeschwister(q(['a', 'b', 'c']))), 'abc')
  assert.equal(ids(trenneGeschwister(q(['b', 'a', 'a']))), 'baa')
})

test('baueRunde: sides depend on direction, hinweis only when present', () => {
  const k = karte('a', 'kuća', '2026-11-01T00:00:00Z', neuerFortschritt(NOW), neuerFortschritt(NOW))
  k.hinweis = 'dalmatinisch'
  const [hrDe, deHr] = baueRunde([k], NOW).karten
  assert.equal(hrDe.vorne, 'kuća')
  assert.equal(hrDe.hinten, 'de-a')
  assert.equal(deHr.vorne, 'de-a')
  assert.equal(deHr.hinten, 'kuća')
  assert.equal(hrDe.hinweis, 'dalmatinisch')
  assert.equal(hrDe.neu, true)
  delete k.hinweis
  assert.equal('hinweis' in baueRunde([k], NOW).karten[0], false)
})

test('normalisiere: lowercase, trim, trailing punctuation', () => {
  assert.equal(normalisiere('  Dobar Dan!  '), 'dobar dan')
  assert.equal(normalisiere('Kako si?'), 'kako si')
  assert.equal(normalisiere('dobar   dan.'), 'dobar dan')
  assert.equal(normalisiere('DOBAR DAN'), normalisiere('dobar dan...'))
  assert.equal(normalisiere('Čaša'), 'čaša')
})

test('validiereImport: accepts valid, trims, reports invalid entries', () => {
  const result = validiereImport({
    karten: [
      { hr: '  kuća ', de: 'Haus', hinweis: ' (dalm.) ', quelle: 'Session 1' },
      { hr: '', de: 'x' },
      { hr: 'a'.repeat(501), de: 'x' },
      'text',
      { hr: 'pas', de: 'Hund', hinweis: 5 },
    ],
  })
  assert.equal(result.karten.length, 1)
  assert.deepEqual(result.karten[0], {
    index: 0,
    karte: { hr: 'kuća', de: 'Haus', hinweis: '(dalm.)', quelle: 'Session 1' },
  })
  assert.deepEqual(result.fehler.map((f) => f.index), [1, 2, 3, 4])
})

test('validiereImport: fatal on bad shape and more than 500 cards', () => {
  assert.ok(validiereImport({}).fatal)
  assert.ok(validiereImport(null).fatal)
  const many = Array.from({ length: 501 }, () => ({ hr: 'a', de: 'b' }))
  assert.ok(validiereImport({ karten: many }).fatal)
  const max = Array.from({ length: 500 }, () => ({ hr: 'a', de: 'b' }))
  assert.equal(validiereImport({ karten: max }).fatal, undefined)
})

test('validiereBewertung and validierePatch', () => {
  assert.deepEqual(validiereBewertung({ kartenId: 'x', richtung: 'hr-de', bewertung: 'gut' }), {
    kartenId: 'x',
    richtung: 'hr-de',
    bewertung: 'gut',
  })
  assert.equal(validiereBewertung({ kartenId: 'x', richtung: 'xx', bewertung: 'gut' }), null)
  assert.equal(validiereBewertung({ kartenId: 'x', richtung: 'hr-de', bewertung: 'super' }), null)
  assert.deepEqual(validierePatch({ hr: ' neu ' }), { hr: 'neu' })
  assert.deepEqual(validierePatch({ hinweis: '' }), { hinweis: null })
  assert.equal(validierePatch({}), null)
  assert.equal(validierePatch({ de: '   ' }), null)
})
