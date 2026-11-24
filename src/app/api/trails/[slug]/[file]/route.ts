import type { NextRequest } from 'next/server'
import { json } from '@/lib/karteikarten-api'
import { hasBearerKey } from '@/lib/karteikarten-security'
import {
  MAX_TRAIL_FILE_BYTES,
  TrailsNotConfiguredError,
  isAllowedFile,
  isValidSlug,
  writeTrailFile,
} from '@/lib/trails-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Upload one file of a private page. Auth: `Authorization: Bearer <LEARNING_CHAT_ACCESS_KEY>`. */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string; file: string }> }) {
  if (!hasBearerKey(request)) return json({ error: 'Unauthorized.' }, 401)
  const { slug, file } = await params
  if (!isValidSlug(slug) || !isAllowedFile(file)) return json({ error: 'Invalid slug or file.' }, 400)
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_TRAIL_FILE_BYTES) return json({ error: 'File too large.' }, 413)
  try {
    const data = new Uint8Array(await request.arrayBuffer())
    await writeTrailFile(slug, file, data)
    return json({ ok: true, bytes: data.byteLength })
  } catch (error) {
    if (error instanceof RangeError) return json({ error: 'Empty or too large.' }, 413)
    if (error instanceof TrailsNotConfiguredError) return json({ error: 'Storage not configured.' }, 503)
    console.error('trails upload error', error)
    return json({ error: 'Internal error.' }, 500)
  }
}
