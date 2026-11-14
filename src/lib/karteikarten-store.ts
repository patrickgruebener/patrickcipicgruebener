import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { neuerFortschritt, normalisiere } from './karteikarten-srs.ts'
import type { Bewertung, ImportKarte, Karte, Richtung } from './karteikarten-types.ts'
import { bewerte } from './karteikarten-srs.ts'

export class StoreNotConfiguredError extends Error {
  constructor() {
    super('Karteikarten-Speicher nicht konfiguriert.')
  }
}

type Datei = { version: 1; karten: Karte[] }

export function getStoreFile() {
  const explicit = process.env.KARTEIKARTEN_FILE?.trim()
  if (explicit) return explicit
  const legacy = process.env.LEARNING_CHAT_BUDGET_FILE?.trim()
  if (legacy) return path.join(path.dirname(legacy), 'karteikarten.json')
  throw new StoreNotConfiguredError()
}

// Serializes all read-modify-write cycles within this process.
let queue: Promise<unknown> = Promise.resolve()

function locked<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task)
  queue = run.catch(() => undefined)
  return run
}

async function readDatei(file: string): Promise<Datei> {
  try {
    const parsed = JSON.parse(await readFile(file, 'utf8')) as Datei
    return { version: 1, karten: Array.isArray(parsed.karten) ? parsed.karten : [] }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { version: 1, karten: [] }
    throw error
  }
}

async function writeDatei(file: string, datei: Datei) {
  await mkdir(path.dirname(file), { recursive: true })
  const tmp = `${file}.${process.pid}.${randomUUID()}.tmp`
  await writeFile(tmp, JSON.stringify(datei, null, 2), 'utf8')
  await rename(tmp, file)
}

export function listKarten(): Promise<Karte[]> {
  const file = getStoreFile()
  return locked(async () => (await readDatei(file)).karten)
}

export function importKarten(eintraege: { index: number; karte: ImportKarte }[], jetzt = new Date()) {
  const file = getStoreFile()
  return locked(async () => {
    const datei = await readDatei(file)
    const bekannt = new Set(datei.karten.map((k) => normalisiere(k.hr)))
    let neu = 0
    let doppelt = 0
    for (const { karte } of eintraege) {
      const key = normalisiere(karte.hr)
      if (!key || bekannt.has(key)) {
        doppelt += 1
        continue
      }
      bekannt.add(key)
      datei.karten.push({
        id: randomUUID(),
        ...karte,
        erstellt: jetzt.toISOString(),
        fortschritt: { 'hr-de': neuerFortschritt(jetzt), 'de-hr': neuerFortschritt(jetzt) },
      })
      neu += 1
    }
    if (neu > 0) await writeDatei(file, datei)
    return { neu, doppelt }
  })
}

export function bewerteKarte(kartenId: string, richtung: Richtung, bewertung: Bewertung, jetzt = new Date()) {
  const file = getStoreFile()
  return locked(async () => {
    const datei = await readDatei(file)
    const karte = datei.karten.find((k) => k.id === kartenId)
    if (!karte) return null
    karte.fortschritt[richtung] = bewerte(karte.fortschritt[richtung], bewertung, jetzt)
    await writeDatei(file, datei)
    return karte.fortschritt[richtung].faellig
  })
}

export type PatchResult = { karte: Karte } | { error: 'nicht-gefunden' | 'doppelt' }

export function patchKarte(id: string, patch: { hr?: string; de?: string; hinweis?: string | null }) {
  const file = getStoreFile()
  return locked(async (): Promise<PatchResult> => {
    const datei = await readDatei(file)
    const karte = datei.karten.find((k) => k.id === id)
    if (!karte) return { error: 'nicht-gefunden' }
    if (patch.hr !== undefined) {
      const key = normalisiere(patch.hr)
      if (datei.karten.some((k) => k.id !== id && normalisiere(k.hr) === key)) return { error: 'doppelt' }
      karte.hr = patch.hr
    }
    if (patch.de !== undefined) karte.de = patch.de
    if (patch.hinweis === null) delete karte.hinweis
    else if (patch.hinweis !== undefined) karte.hinweis = patch.hinweis
    await writeDatei(file, datei)
    return { karte }
  })
}

export function deleteKarte(id: string) {
  const file = getStoreFile()
  return locked(async () => {
    const datei = await readDatei(file)
    const rest = datei.karten.filter((k) => k.id !== id)
    if (rest.length === datei.karten.length) return false
    await writeDatei(file, { ...datei, karten: rest })
    return true
  })
}
