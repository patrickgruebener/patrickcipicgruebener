import { json, protectedRoute, readJson } from '@/lib/karteikarten-api'
import { validiereImport } from '@/lib/karteikarten-srs'
import { importKarten } from '@/lib/karteikarten-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = protectedRoute(async (request) => {
  const { karten, fehler, fatal } = validiereImport(await readJson(request))
  if (fatal) return json({ error: fatal }, 400)
  const { neu, doppelt } = await importKarten(karten)
  return json({ neu, doppelt, fehler })
})
