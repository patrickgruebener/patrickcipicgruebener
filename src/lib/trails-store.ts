import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Private "unlisted" pages (e.g. the hiking map) live only on the server volume,
 * never in this public repository. The secret slug is the folder name.
 */

export class TrailsNotConfiguredError extends Error {
  constructor() {
    super('Trails storage not configured.')
  }
}

/** Files a private page may consist of, with their content types. */
export const TRAIL_FILES: Record<string, string> = {
  'index.html': 'text/html; charset=utf-8',
  'sat.jpg': 'image/jpeg',
}

export const MAX_TRAIL_FILE_BYTES = 12 * 1024 * 1024

const SLUG = /^[a-z0-9]{24,64}$/

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && SLUG.test(slug)
}

export function isAllowedFile(name: unknown): name is string {
  return typeof name === 'string' && Object.hasOwn(TRAIL_FILES, name)
}

export function getTrailsDir() {
  const explicit = process.env.TRAILS_DIR?.trim()
  if (explicit) return explicit
  // Same volume as the flashcards: next to LEARNING_CHAT_BUDGET_FILE
  const legacy = process.env.LEARNING_CHAT_BUDGET_FILE?.trim()
  if (legacy) return path.join(path.dirname(legacy), 'trails')
  throw new TrailsNotConfiguredError()
}

function filePath(slug: string, name: string) {
  if (!isValidSlug(slug) || !isAllowedFile(name)) throw new Error('invalid trail path')
  return path.join(getTrailsDir(), slug, name)
}

/** Returns the file contents, or null if slug, file name or file is unknown. */
export async function readTrailFile(slug: unknown, name: unknown): Promise<Buffer | null> {
  if (!isValidSlug(slug) || !isAllowedFile(name)) return null
  try {
    return await readFile(filePath(slug, name))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

export async function writeTrailFile(slug: string, name: string, data: Uint8Array) {
  if (data.byteLength === 0 || data.byteLength > MAX_TRAIL_FILE_BYTES) throw new RangeError('invalid size')
  const target = filePath(slug, name)
  await mkdir(path.dirname(target), { recursive: true })
  const tmp = `${target}.${process.pid}.${randomUUID()}.tmp`
  await writeFile(tmp, data)
  await rename(tmp, target)
}
