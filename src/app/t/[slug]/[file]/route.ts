import { serveTrailFile } from '@/lib/trails-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params
  // index.html is only reachable via /t/<slug>
  return serveTrailFile(slug, file === 'index.html' ? '' : file)
}
