import assert from 'node:assert/strict'
import { mkdtemp, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  MAX_TRAIL_FILE_BYTES,
  TrailsNotConfiguredError,
  getTrailsDir,
  isAllowedFile,
  isValidSlug,
  readTrailFile,
  writeTrailFile,
} from './trails-store.ts'

const SLUG = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4'

async function withDir(run) {
  const directory = await mkdtemp(path.join(tmpdir(), 'trails-'))
  const saved = { dir: process.env.TRAILS_DIR, legacy: process.env.LEARNING_CHAT_BUDGET_FILE }
  process.env.TRAILS_DIR = directory
  delete process.env.LEARNING_CHAT_BUDGET_FILE
  try {
    await run(directory)
  } finally {
    for (const [key, value] of [['TRAILS_DIR', saved.dir], ['LEARNING_CHAT_BUDGET_FILE', saved.legacy]]) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    await rm(directory, { recursive: true, force: true })
  }
}

test('slug must be long lowercase alphanumerics', () => {
  assert.equal(isValidSlug(SLUG), true)
  assert.equal(isValidSlug('short'), false)
  assert.equal(isValidSlug('../../etc/passwd/aaaaaaaaaaaaaaaaaaaa'), false)
  assert.equal(isValidSlug(SLUG.toUpperCase()), false)
  assert.equal(isValidSlug(undefined), false)
})

test('only whitelisted file names are allowed', () => {
  assert.equal(isAllowedFile('index.html'), true)
  assert.equal(isAllowedFile('sat.jpg'), true)
  assert.equal(isAllowedFile('../index.html'), false)
  assert.equal(isAllowedFile('toString'), false)
  assert.equal(isAllowedFile(''), false)
})

test('storage dir falls back next to LEARNING_CHAT_BUDGET_FILE', () => {
  const saved = { dir: process.env.TRAILS_DIR, legacy: process.env.LEARNING_CHAT_BUDGET_FILE }
  delete process.env.TRAILS_DIR
  process.env.LEARNING_CHAT_BUDGET_FILE = '/data/budget.json'
  assert.equal(getTrailsDir(), '/data/trails')
  delete process.env.LEARNING_CHAT_BUDGET_FILE
  assert.throws(() => getTrailsDir(), TrailsNotConfiguredError)
  if (saved.dir !== undefined) process.env.TRAILS_DIR = saved.dir
  if (saved.legacy !== undefined) process.env.LEARNING_CHAT_BUDGET_FILE = saved.legacy
})

test('write then read round-trips and leaves no temp files', async () => {
  await withDir(async (dir) => {
    await writeTrailFile(SLUG, 'index.html', new TextEncoder().encode('<h1>hi</h1>'))
    assert.equal((await readTrailFile(SLUG, 'index.html')).toString(), '<h1>hi</h1>')
    assert.deepEqual(await readdir(path.join(dir, SLUG)), ['index.html'])
  })
})

test('unknown slug, missing file or bad name read as null', async () => {
  await withDir(async () => {
    assert.equal(await readTrailFile(SLUG, 'index.html'), null)
    assert.equal(await readTrailFile('nope', 'index.html'), null)
    assert.equal(await readTrailFile(SLUG, '../secret'), null)
  })
})

test('rejects empty, oversized and invalid writes', async () => {
  await withDir(async () => {
    await assert.rejects(writeTrailFile(SLUG, 'sat.jpg', new Uint8Array(0)), RangeError)
    await assert.rejects(writeTrailFile(SLUG, 'sat.jpg', new Uint8Array(MAX_TRAIL_FILE_BYTES + 1)), RangeError)
    await assert.rejects(writeTrailFile('bad', 'sat.jpg', new Uint8Array(1)))
    await assert.rejects(writeTrailFile(SLUG, 'evil.sh', new Uint8Array(1)))
  })
})
