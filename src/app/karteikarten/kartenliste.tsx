'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Karte } from '@/lib/karteikarten-types'
import { Input } from '@/components/ui/Input'
import { api } from './api-client'

type Props = { onError: (error: unknown) => void }
type Draft = { hr: string; de: string; hinweis: string }

const ACTION = 'min-h-11 touch-manipulation pr-1 text-[16px] font-semibold'

function KarteBearbeiten({
  karte,
  onSaved,
  onCancel,
  onError,
}: {
  karte: Karte
  onSaved: (karte: Karte) => void
  onCancel: () => void
  onError: Props['onError']
}) {
  const [draft, setDraft] = useState<Draft>({ hr: karte.hr, de: karte.de, hinweis: karte.hinweis ?? '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function save() {
    setBusy(true)
    setError('')
    try {
      const { karte: saved } = await api<{ karte: Karte }>(`karten/${karte.id}`, {
        method: 'PATCH',
        body: JSON.stringify(draft),
      })
      onSaved(saved)
    } catch (e) {
      onError(e)
      setError(e instanceof Error ? e.message : 'Das hat nicht geklappt.')
      setBusy(false)
    }
  }

  const set = (field: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((d) => ({ ...d, [field]: e.target.value }))

  return (
    <div className="grid gap-3">
      <Input label="Kroatisch" value={draft.hr} onChange={set('hr')} maxLength={500} />
      <Input label="Deutsch" value={draft.de} onChange={set('de')} maxLength={500} />
      <Input label="Hinweis (optional)" value={draft.hinweis} onChange={set('hinweis')} maxLength={500} />
      {error && (
        <p role="alert" className="text-sm text-warn">
          {error}
        </p>
      )}
      <div className="flex gap-5">
        <button
          type="button"
          disabled={busy || !draft.hr.trim() || !draft.de.trim()}
          onClick={() => void save()}
          className={`${ACTION} text-brand-blue disabled:opacity-50`}
        >
          Speichern
        </button>
        <button type="button" onClick={onCancel} className={`${ACTION} text-ink-2`}>
          Abbrechen
        </button>
      </div>
    </div>
  )
}

function KarteZeile({
  karte,
  onChange,
  onDeleted,
  onError,
}: {
  karte: Karte
  onChange: (karte: Karte) => void
  onDeleted: (id: string) => void
  onError: Props['onError']
}) {
  const [mode, setMode] = useState<'ansicht' | 'bearbeiten' | 'loeschen'>('ansicht')
  const [error, setError] = useState('')

  async function remove() {
    try {
      await api(`karten/${karte.id}`, { method: 'DELETE' })
      onDeleted(karte.id)
    } catch (e) {
      onError(e)
      setError(e instanceof Error ? e.message : 'Löschen fehlgeschlagen.')
    }
  }

  if (mode === 'bearbeiten') {
    return (
      <KarteBearbeiten
        karte={karte}
        onError={onError}
        onCancel={() => setMode('ansicht')}
        onSaved={(saved) => {
          onChange(saved)
          setMode('ansicht')
        }}
      />
    )
  }

  return (
    <div className="grid gap-1">
      <p className="font-display text-[26px] leading-[1] font-[820] break-words text-ink">{karte.hr}</p>
      <p className="text-ink">{karte.de}</p>
      {karte.hinweis && <p className="text-[15px] text-ink-2">({karte.hinweis})</p>}
      {error && (
        <p role="alert" className="text-sm text-warn">
          {error}
        </p>
      )}
      {mode === 'loeschen' ? (
        <div className="flex items-center gap-5">
          <span className="text-[16px] text-ink">Wirklich löschen?</span>
          <button type="button" onClick={() => void remove()} className={`${ACTION} text-warn`}>
            Ja, löschen
          </button>
          <button type="button" onClick={() => setMode('ansicht')} className={`${ACTION} text-ink-2`}>
            Nein
          </button>
        </div>
      ) : (
        <div className="flex gap-5">
          <button type="button" onClick={() => setMode('bearbeiten')} className={`${ACTION} text-brand-blue`}>
            Bearbeiten
          </button>
          <button type="button" onClick={() => setMode('loeschen')} className={`${ACTION} text-ink-2`}>
            Löschen
          </button>
        </div>
      )}
    </div>
  )
}

export function Kartenliste({ onError }: Props) {
  const [karten, setKarten] = useState<Karte[] | null>(null)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    api<{ karten: Karte[] }>('karten')
      .then(({ karten: list }) => setKarten(list))
      .catch((e) => {
        onError(e)
        setMessage(e instanceof Error ? e.message : 'Das hat nicht geklappt.')
      })
  }, [onError])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sorted = [...(karten ?? [])].sort((a, b) => b.erstellt.localeCompare(a.erstellt))
    if (!q) return sorted
    return sorted.filter((k) => [k.hr, k.de, k.hinweis ?? ''].some((text) => text.toLowerCase().includes(q)))
  }, [karten, query])

  if (!karten) return <p className="px-4 py-10 text-center text-ink-2">{message || 'Lade Karten …'}</p>

  return (
    <div className="px-4 pt-4 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <Input
        label={`Suche in ${karten.length} Karten`}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
      />
      {visible.length === 0 ? (
        <p className="py-10 text-center text-ink-2">{karten.length === 0 ? 'Noch keine Karten.' : 'Nichts gefunden.'}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {visible.map((karte) => (
            <li key={karte.id} className="py-4">
              <KarteZeile
                karte={karte}
                onError={onError}
                onChange={(saved) => setKarten((l) => (l ?? []).map((k) => (k.id === saved.id ? saved : k)))}
                onDeleted={(id) => setKarten((l) => (l ?? []).filter((k) => k.id !== id))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
