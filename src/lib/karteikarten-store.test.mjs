import assert from 'node:assert/strict'
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  StoreNotConfiguredError,
  bewerteKarte,
  deleteKarte,
  getStoreFile,
  importKarten,
  listKarten,
  patchKarte,
} from './karteikarten-store.ts'

async function withStore(run) {
  const directory = await mkdtemp(path.join(tmpdir(), 'karteikarten-'))
  const saved = {
    file: process.env.KARTEIKARTEN_FILE,
    legacy: process.env.LEARNING_CHAT_BUDGET_FILE,
  }
  process.env.KARTEIKARTEN_FILE = path.join(directory, 'sub', 'karteikarten.json')
  delete process.env.LEARNING_CHAT_BUDGET_FILE
  try {
    await run(directory)
  } finally {
    for (const [key, value] of [['KARTEIKARTEN_FILE', saved.file], ['LEARNING_CHAT_BUDGET_FILE', saved.legacy]]) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    await rm(directory, { recursive: true, force: true })
  }
}

const entry = (hr, de, index = 0) => ({ index, karte: { hr, de } })

test('path: explicit file, legacy fallback, otherwise not configured', () => {
  const saved = { file: process.env.KARTEIKARTEN_FILE, legacy: process.env.LEARNING_CHAT_BUDGET_FILE }
  try {
    delete process.env.KARTEIKARTEN_FILE
    delete process.env.LEARNING_CHAT_BUDGET_FILE
    assert.throws(() => getStoreFile(), StoreNotConfiguredError)
    process.env.LEARNING_CHAT_BUDGET_FILE = '/data/lernchat-budget.json'
    assert.equal(getStoreFile(), '/data/karteikarten.json')
    process.env.KARTEIKARTEN_FILE = '/x/y.json'
    assert.equal(getStoreFile(), '/x/y.json')
  } finally {
    for (const [key, value] of [['KARTEIKARTEN_FILE', saved.file], ['LEARNING_CHAT_BUDGET_FILE', saved.legacy]]) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
})

test('empty store lists no cards; import creates both directions and skips duplicates', async () => {
  await withStore(async () => {
    assert.deepEqual(await listKarten(), [])
    const first = await importKarten([entry('Kuća', 'Haus'), entry('pas', 'Hund', 1), entry('kuća!', 'Haus', 2)])
    assert.deepEqual(first, { neu: 2, doppelt: 1 })
    const second = await importKarten([entry('KUĆA.', 'Haus')])
    assert.deepEqual(second, { neu: 0, doppelt: 1 })
    const karten = await listKarten()
    assert.equal(karten.length, 2)
    assert.equal(karten[0].fortschritt['hr-de'].neu, true)
    assert.equal(karten[0].fortschritt['de-hr'].leichtigkeit, 2.5)
  })
})

test('writes atomically: valid JSON on disk and no tmp files left behind', async () => {
  await withStore(async (directory) => {
    await Promise.all(Array.from({ length: 20 }, (_, i) => importKarten([entry(`wort${i}`, `Wort ${i}`)])))
    const file = process.env.KARTEIKARTEN_FILE
    const parsed = JSON.parse(await readFile(file, 'utf8'))
    assert.equal(parsed.karten.length, 20)
    assert.deepEqual(await readdir(path.dirname(file)), ['karteikarten.json'])
    assert.ok(directory)
  })
})

test('bewerteKarte updates one direction only; unknown id returns null', async () => {
  await withStore(async () => {
    await importKarten([entry('kuća', 'Haus')])
    const [karte] = await listKarten()
    const faellig = await bewerteKarte(karte.id, 'hr-de', 'gut', new Date('2026-11-14T10:00:00Z'))
    assert.equal(faellig, '2026-11-15T10:00:00.000Z')
    const [after] = await listKarten()
    assert.equal(after.fortschritt['hr-de'].neu, false)
    assert.equal(after.fortschritt['de-hr'].neu, true)
    assert.equal(await bewerteKarte('missing', 'hr-de', 'gut'), null)
  })
})

test('patchKarte edits, clears hinweis, blocks duplicate hr; deleteKarte removes', async () => {
  await withStore(async () => {
    await importKarten([{ index: 0, karte: { hr: 'kuća', de: 'Haus', hinweis: 'x' } }, entry('pas', 'Hund', 1)])
    const [a, b] = await listKarten()
    const edited = await patchKarte(a.id, { de: 'Heim', hinweis: null })
    assert.equal(edited.karte.de, 'Heim')
    assert.equal('hinweis' in edited.karte, false)
    assert.deepEqual(await patchKarte(b.id, { hr: 'Kuća' }), { error: 'doppelt' })
    assert.deepEqual(await patchKarte('missing', { de: 'x' }), { error: 'nicht-gefunden' })
    assert.equal(await deleteKarte(a.id), true)
    assert.equal(await deleteKarte(a.id), false)
    assert.equal((await listKarten()).length, 1)
  })
})
