import { json, protectedRoute, readJson } from '@/lib/karteikarten-api'
import { validiereBewertung } from '@/lib/karteikarten-srs'
import { bewerteKarte } from '@/lib/karteikarten-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = protectedRoute(async (request) => {
  const input = validiereBewertung(await readJson(request))
  if (!input) return json({ error: 'kartenId, richtung und bewertung sind erforderlich.' }, 400)
  const faellig = await bewerteKarte(input.kartenId, input.richtung, input.bewertung)
  if (!faellig) return json({ error: 'Karte nicht gefunden.' }, 404)
  return json({ ok: true, faellig })
})
