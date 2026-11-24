import { serveTrailFile } from '@/lib/trails-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return serveTrailFile(slug, 'index.html')
}
