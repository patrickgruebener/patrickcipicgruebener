import { NextResponse } from 'next/server'
import { TRAIL_FILES, TrailsNotConfiguredError, readTrailFile } from './trails-store.ts'

const PRIVATE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Referrer-Policy': 'no-referrer',
}

function notFound() {
  return new NextResponse('Not found', { status: 404, headers: { ...PRIVATE_HEADERS, 'Cache-Control': 'no-store' } })
}

/** Serves one file of a private page; unknown slugs look exactly like missing pages. */
export async function serveTrailFile(slug: string, name: string) {
  try {
    const data = await readTrailFile(slug, name)
    if (!data) return notFound()
    return new NextResponse(new Uint8Array(data), {
      headers: {
        ...PRIVATE_HEADERS,
        'Content-Type': TRAIL_FILES[name],
        'Cache-Control': name === 'index.html' ? 'private, no-cache' : 'private, max-age=86400',
      },
    })
  } catch (error) {
    if (!(error instanceof TrailsNotConfiguredError)) console.error('trails error', error)
    return notFound()
  }
}
