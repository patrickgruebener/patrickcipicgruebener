'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Abfrage, Bewertung, Karte } from '@/lib/karteikarten-types'
import { trenneGeschwister } from '@/lib/karteikarten-srs'
import { api } from './api-client'

type Runde = { karten: Abfrage[]; stats: { faellig: number; neu: number; gesamt: number } }

const RICHTUNG_LABEL = { 'hr-de': 'Kroatisch → Deutsch', 'de-hr': 'Deutsch → Kroatisch' } as const

// Unlayered button reset in globals.css beats utilities: backgrounds need `!`.
const RATING_BASE =
  'min-h-14 flex-1 touch-manipulation rounded-[3px] px-2 text-[18px] font-[650] transition-opacity active:opacity-80 disabled:opacity-60'
const RATINGS: { bewertung: Bewertung; label: string; className: string }[] = [
  { bewertung: 'nochmal', label: 'Nochmal', className: 'bg-paper! text-warn ring-2 ring-inset ring-warn' },
  { bewertung: 'gut', label: 'Gut', className: 'bg-brand-blue! text-white' },
  { bewertung: 'leicht', label: 'Leicht', className: 'bg-brand-green-ink! text-white' },
]

function naechsteFaelligkeit(karten: Karte[], jetzt: Date) {
  const times = karten.flatMap((k) => Object.values(k.fortschritt).map((f) => new Date(f.faellig)))
  const spaeter = times.filter((t) => t > jetzt).sort((a, b) => a.getTime() - b.getTime())
  return spaeter[0] ?? null
}

function formatFaelligkeit(date: Date) {
  const time = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const sameDay = date.toDateString() === new Date().toDateString()
  if (sameDay) return `heute um ${time} Uhr`
  const day = date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })
  return `${day}, ${time} Uhr`
}

function Hinweis({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-10 text-center text-ink-2">{children}</p>
}

function Fertig({ gesamt }: { gesamt: number }) {
  const [next, setNext] = useState<Date | null | undefined>(undefined)

  useEffect(() => {
    api<{ karten: Karte[] }>('karten')
      .then(({ karten }) => setNext(naechsteFaelligkeit(karten, new Date())))
      .catch(() => setNext(null))
  }, [])

  return (
    <div className="grid flex-1 content-center justify-items-center gap-3 px-6 pb-24 text-center">
      <p className="font-display text-[56px] leading-[0.9] font-[820] text-ink">Geschafft.</p>
      <p className="text-ink-2">
        {gesamt === 0 ? 'Noch keine Karten. Importiere zuerst eine Liste.' : 'Für jetzt ist alles gelernt.'}
      </p>
      {next && <p className="text-ink">Nächste Karte: {formatFaelligkeit(next)}</p>}
    </div>
  )
}

export function Lernen({ onError }: { onError: (error: unknown) => void }) {
  const [queue, setQueue] = useState<Abfrage[] | null>(null)
  const [gesamt, setGesamt] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api<Runde>('runde')
      .then((runde) => {
        setQueue(runde.karten)
        setGesamt(runde.stats.gesamt)
      })
      .catch((e) => {
        onError(e)
        setMessage(e instanceof Error ? e.message : 'Das hat nicht geklappt.')
      })
  }, [onError])

  const rate = useCallback(
    async (bewertung: Bewertung) => {
      const current = queue?.[0]
      if (!current || busy) return
      setBusy(true)
      setMessage('')
      try {
        await api('bewertung', {
          method: 'POST',
          body: JSON.stringify({ kartenId: current.kartenId, richtung: current.richtung, bewertung }),
        })
        // `nochmal` goes to the end of the current round and is no longer new.
        setQueue((q) => {
          const rest = (q ?? []).slice(1)
          return bewertung === 'nochmal' ? trenneGeschwister([...rest, { ...current, neu: false }]) : rest
        })
        setFlipped(false)
      } catch (e) {
        onError(e)
        setMessage(e instanceof Error ? e.message : 'Speichern fehlgeschlagen. Nochmal versuchen.')
      } finally {
        setBusy(false)
      }
    },
    [queue, busy, onError],
  )

  if (!queue) return <Hinweis>{message || 'Lade Karten …'}</Hinweis>
  const current = queue[0]
  if (!current) return <Fertig gesamt={gesamt} />

  const neu = queue.filter((k) => k.neu).length
  const faellig = queue.length - neu

  return (
    <div className="flex flex-1 flex-col px-4 pt-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
      <p className="mb-3 font-mono-brand text-[14px] text-ink-2" aria-live="polite">
        {faellig} fällig · {neu} neu
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? 'Karte zurückdrehen' : 'Karte umdrehen'}
        className="flex min-h-[320px] flex-1 touch-manipulation flex-col items-center justify-center gap-4 rounded-[3px] bg-paper! px-6 py-8 text-center ring-1 ring-line"
      >
        <span className="font-mono-brand text-[13px] text-ink-2">{RICHTUNG_LABEL[current.richtung]}</span>
        <span className="font-display text-[clamp(40px,12vw,64px)] leading-[0.95] font-[820] text-balance break-words text-ink">
          {flipped ? current.hinten : current.vorne}
        </span>
        {flipped && current.hinweis && <span className="text-[17px] text-ink-2">({current.hinweis})</span>}
        {!flipped && <span className="text-[15px] text-ink-2">Tippen zum Umdrehen</span>}
      </button>
      {message && (
        <p role="alert" className="mt-3 text-center text-warn">
          {message}
        </p>
      )}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-sheet pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-[640px] gap-3 px-4 py-3">
          {flipped ? (
            RATINGS.map(({ bewertung, label, className }) => (
              <button
                key={bewertung}
                type="button"
                disabled={busy}
                onClick={() => void rate(bewertung)}
                className={`${RATING_BASE} ${className}`}
              >
                {label}
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className={`${RATING_BASE} bg-brand-blue! text-white`}
            >
              Antwort zeigen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
