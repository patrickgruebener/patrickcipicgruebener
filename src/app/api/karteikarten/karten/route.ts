import { json, protectedRoute } from '@/lib/karteikarten-api'
import { listKarten } from '@/lib/karteikarten-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const GET = protectedRoute(async () => json({ karten: await listKarten() }))
