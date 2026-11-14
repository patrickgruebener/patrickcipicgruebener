import { json, protectedRoute, readJson } from '@/lib/karteikarten-api'
import { validierePatch } from '@/lib/karteikarten-srs'
import { deleteKarte, patchKarte } from '@/lib/karteikarten-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Context = { params: Promise<{ id: string }> }

export const PATCH = protectedRoute<Context>(async (request, { params }) => {
  const { id } = await params
  const patch = validierePatch(await readJson(request))
  if (!patch) return json({ error: 'Ungültige Eingabe (hr, de, hinweis: 1 bis 500 Zeichen).' }, 400)
  const result = await patchKarte(id, patch)
  if ('error' in result) {
    return result.error === 'doppelt'
      ? json({ error: 'Diese kroatische Vokabel gibt es schon.' }, 409)
      : json({ error: 'Karte nicht gefunden.' }, 404)
  }
  return json({ karte: result.karte })
})

export const DELETE = protectedRoute<Context>(async (_request, { params }) => {
  const { id } = await params
  if (!(await deleteKarte(id))) return json({ error: 'Karte nicht gefunden.' }, 404)
  return json({ ok: true })
})
