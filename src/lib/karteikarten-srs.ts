import type {
  Abfrage,
  Bewertung,
  Fortschritt,
  ImportFehler,
  ImportKarte,
  Karte,
  Richtung,
} from './karteikarten-types.ts'
import { BEWERTUNGEN, RICHTUNGEN } from './karteikarten-types.ts'

export const MAX_TEXT_LENGTH = 500
export const MAX_IMPORT_CARDS = 500

const MIN_EASE = 1.3
const START_EASE = 2.5
const RETRY_MINUTES = 10
const DAY_MS = 24 * 60 * 60 * 1000

export function neuerFortschritt(jetzt: Date): Fortschritt {
  return {
    faellig: jetzt.toISOString(),
    intervallTage: 0,
    leichtigkeit: START_EASE,
    wiederholungen: 0,
    neu: true,
  }
}

function round2(value: number) {
  return Math.round(value * 100) / 100
}

/** Simplified SM-2: returns the next progress state for one direction. */
export function bewerte(fortschritt: Fortschritt, bewertung: Bewertung, jetzt: Date): Fortschritt {
  if (bewertung === 'nochmal') {
    return {
      faellig: new Date(jetzt.getTime() + RETRY_MINUTES * 60 * 1000).toISOString(),
      intervallTage: 0,
      leichtigkeit: round2(Math.max(MIN_EASE, fortschritt.leichtigkeit - 0.2)),
      wiederholungen: 0,
      neu: false,
    }
  }

  const alt = fortschritt.intervallTage
  let intervall: number
  let leichtigkeit = fortschritt.leichtigkeit
  if (bewertung === 'gut') {
    intervall = alt < 1 ? 1 : alt < 3 ? 3 : Math.round(alt * leichtigkeit)
  } else {
    intervall = alt < 3 ? 3 : alt < 7 ? 7 : Math.round(alt * leichtigkeit * 1.3)
    leichtigkeit += 0.15
  }
  // A longer interval is never shorter than the previous one.
  intervall = Math.max(intervall, alt + 1)

  return {
    faellig: new Date(jetzt.getTime() + intervall * DAY_MS).toISOString(),
    intervallTage: intervall,
    leichtigkeit: round2(leichtigkeit),
    wiederholungen: fortschritt.wiederholungen + 1,
    neu: false,
  }
}

function abfrage(karte: Karte, richtung: Richtung): Abfrage {
  const hrVorne = richtung === 'hr-de'
  const result: Abfrage = {
    kartenId: karte.id,
    richtung,
    vorne: hrVorne ? karte.hr : karte.de,
    hinten: hrVorne ? karte.de : karte.hr,
    neu: karte.fortschritt[richtung].neu,
  }
  if (karte.hinweis) result.hinweis = karte.hinweis
  return result
}

/** Due reviews first (oldest due first), then new cards in creation order. */
/**
 * Reorders a queue so the two directions of the same card are never adjacent
 * (otherwise the next front is the back just seen). Keeps order where possible.
 */
export function trenneGeschwister<T extends { kartenId: string }>(queue: T[]): T[] {
  const result = [...queue]
  for (let i = 1; i < result.length; i += 1) {
    if (result[i].kartenId !== result[i - 1].kartenId) continue
    const j = result.findIndex((x, idx) => idx > i && x.kartenId !== result[i - 1].kartenId)
    if (j === -1) break
    const [moved] = result.splice(j, 1)
    result.splice(i, 0, moved)
  }
  return result
}

export function baueRunde(karten: Karte[], jetzt: Date) {
  const faellig: { due: number; item: Abfrage }[] = []
  const neu: { erstellt: string; item: Abfrage }[] = []
  for (const karte of karten) {
    for (const richtung of RICHTUNGEN) {
      const f = karte.fortschritt[richtung]
      if (f.neu) {
        neu.push({ erstellt: karte.erstellt, item: abfrage(karte, richtung) })
      } else if (new Date(f.faellig).getTime() <= jetzt.getTime()) {
        faellig.push({ due: new Date(f.faellig).getTime(), item: abfrage(karte, richtung) })
      }
    }
  }
  faellig.sort((a, b) => a.due - b.due)
  // New cards: all hr-de first, then de-hr, so both sides of one card never follow each other.
  neu.sort(
    (a, b) =>
      RICHTUNGEN.indexOf(a.item.richtung) - RICHTUNGEN.indexOf(b.item.richtung) ||
      (a.erstellt < b.erstellt ? -1 : a.erstellt > b.erstellt ? 1 : 0),
  )
  return {
    karten: trenneGeschwister([...faellig.map((x) => x.item), ...neu.map((x) => x.item)]),
    stats: {
      faellig: faellig.length,
      neu: neu.length,
      gesamt: karten.length,
    },
  }
}

/** Duplicate key: lowercase, trimmed, whitespace collapsed, trailing punctuation removed. */
export function normalisiere(hr: string) {
  return hr
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\s.,;:!?…"'„“”‚‘’)\]]+$/u, '')
    .trim()
}

function cleanText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= MAX_TEXT_LENGTH ? trimmed : null
}

function cleanOptional(value: unknown): { ok: true; value?: string } | { ok: false } {
  if (value === undefined || value === null || value === '') return { ok: true }
  const text = cleanText(value)
  return text === null ? { ok: false } : { ok: true, value: text }
}

export function validiereImport(payload: unknown): {
  karten: { index: number; karte: ImportKarte }[]
  fehler: ImportFehler[]
  fatal?: string
} {
  const list = (payload as { karten?: unknown } | null)?.karten
  if (!Array.isArray(list)) return { karten: [], fehler: [], fatal: 'karten muss eine Liste sein.' }
  if (list.length > MAX_IMPORT_CARDS) {
    return { karten: [], fehler: [], fatal: `Maximal ${MAX_IMPORT_CARDS} Karten pro Import.` }
  }
  const karten: { index: number; karte: ImportKarte }[] = []
  const fehler: ImportFehler[] = []
  list.forEach((entry, index) => {
    const item = entry as Record<string, unknown> | null
    if (!item || typeof item !== 'object') {
      fehler.push({ index, grund: 'Kein Objekt.' })
      return
    }
    const hr = cleanText(item.hr)
    const de = cleanText(item.de)
    if (!hr || !de) {
      fehler.push({ index, grund: 'hr und de müssen Text mit 1 bis 500 Zeichen sein.' })
      return
    }
    const hinweis = cleanOptional(item.hinweis)
    const quelle = cleanOptional(item.quelle)
    if (!hinweis.ok || !quelle.ok) {
      fehler.push({ index, grund: 'hinweis und quelle dürfen höchstens 500 Zeichen haben.' })
      return
    }
    const karte: ImportKarte = { hr, de }
    if (hinweis.value) karte.hinweis = hinweis.value
    if (quelle.value) karte.quelle = quelle.value
    karten.push({ index, karte })
  })
  return { karten, fehler }
}

export function validiereBewertung(body: unknown) {
  const b = body as { kartenId?: unknown; richtung?: unknown; bewertung?: unknown } | null
  if (
    !b ||
    typeof b.kartenId !== 'string' ||
    !RICHTUNGEN.includes(b.richtung as Richtung) ||
    !BEWERTUNGEN.includes(b.bewertung as Bewertung)
  ) {
    return null
  }
  return { kartenId: b.kartenId, richtung: b.richtung as Richtung, bewertung: b.bewertung as Bewertung }
}

/** Validates a PATCH body; undefined fields are untouched, empty hinweis clears it. */
export function validierePatch(body: unknown): { hr?: string; de?: string; hinweis?: string | null } | null {
  const b = body as Record<string, unknown> | null
  if (!b || typeof b !== 'object') return null
  const patch: { hr?: string; de?: string; hinweis?: string | null } = {}
  if (b.hr !== undefined) {
    const hr = cleanText(b.hr)
    if (!hr) return null
    patch.hr = hr
  }
  if (b.de !== undefined) {
    const de = cleanText(b.de)
    if (!de) return null
    patch.de = de
  }
  if (b.hinweis !== undefined) {
    if (b.hinweis === null || b.hinweis === '') patch.hinweis = null
    else {
      const hinweis = cleanText(b.hinweis)
      if (!hinweis) return null
      patch.hinweis = hinweis
    }
  }
  return Object.keys(patch).length > 0 ? patch : null
}
