'use client'

import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Message = { role: 'user' | 'assistant'; text: string; image?: string }
type Mode = 'learn' | 'translate' | 'create'

const modes: Array<{ value: Mode; label: string }> = [
  { value: 'learn', label: 'Lernen & Entdecken' },
  { value: 'translate', label: 'Text übersetzen' },
  { value: 'create', label: 'Geschichten & Ideen' },
]

async function prepareImage(file: File) {
  if (file.size > 10 * 1024 * 1024) throw new Error('Das Foto darf höchstens 10 MB groß sein.')
  if (!file.type.startsWith('image/')) throw new Error('Bitte wähle eine Bilddatei aus.')
  const image = await createImageBitmap(file)
  const scale = Math.min(1, 1400 / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Das Foto kann auf diesem Gerät nicht verarbeitet werden.')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  image.close()
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82))
  if (!blob || blob.size > 1_400_000) throw new Error('Das Foto ist noch zu groß. Bitte wähle einen kleineren Ausschnitt.')
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Das Foto konnte nicht gelesen werden.'))
    reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Das Foto konnte nicht gelesen werden.'))
    reader.readAsDataURL(blob)
  })
}

export default function Lernchat() {
  const [authorized, setAuthorized] = useState(false)
  const [ready, setReady] = useState(false)
  const [accessError, setAccessError] = useState('')
  const [language, setLanguage] = useState<'de' | 'hr'>('de')
  const [mode, setMode] = useState<Mode>('learn')
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [accessRevoked, setAccessRevoked] = useState(false)
  const messagesEnd = useRef<HTMLDivElement>(null)
  const upload = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    const key = fragment.get('key')
    if (key) window.history.replaceState(null, '', window.location.pathname)
    const initialize = async () => {
      try {
        const result = key
          ? await fetch('/api/lernraum/access', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key }), cache: 'no-store',
          })
          : await fetch('/api/lernraum/access', { cache: 'no-store' })
        const data = await result.json()
        if (result.ok && data.authorized) setAuthorized(true)
        else setAccessError(data.error ?? 'Öffne den privaten Zugangslink erneut.')
      } catch {
        setAccessError('Der Lernraum ist gerade nicht erreichbar.')
      } finally {
        setReady(true)
      }
    }
    void initialize()
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, sending])

  async function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    try {
      setImage(await prepareImage(file))
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Das Foto konnte nicht vorbereitet werden.')
      setImage('')
    } finally {
      event.target.value = ''
    }
  }

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault()
    if (sending || (!draft.trim() && !image)) return
    const userMessage: Message = {
      role: 'user',
      text: draft.trim() || (language === 'hr' ? 'Prevedi i objasni tekst na slici.' : 'Bitte übersetze und erkläre den Text auf dem Foto.'),
      image: image || undefined,
    }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setDraft('')
    setImage('')
    setError('')
    setSending(true)
    try {
      const response = await fetch('/api/lernraum/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          mode,
          messages: nextMessages.slice(-12).map(({ role, text }) => ({ role, text })),
          image: userMessage.image,
        }),
        cache: 'no-store',
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'Die Nachricht konnte nicht gesendet werden.')
      setMessages((current) => [...current, { role: 'assistant', text: result.text }])
    } catch (caught) {
      setMessages((current) => current.filter((message) => message !== userMessage))
      setDraft(userMessage.text)
      setImage(userMessage.image ?? '')
      setError(caught instanceof Error ? caught.message : 'Die Nachricht konnte nicht gesendet werden.')
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  function resetConversation() {
    setMessages([])
    setDraft('')
    setImage('')
    setError('')
  }

  async function closeLernraum() {
    await fetch('/api/lernraum/access', { method: 'DELETE', cache: 'no-store' })
    resetConversation()
    setAuthorized(false)
    setAccessRevoked(true)
  }

  if (!ready) return <main className="grid min-h-screen place-items-center bg-amber-50 p-6 text-center">Lernraum wird geöffnet …</main>
  if (!authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-amber-50 p-6">
        <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-4xl" aria-hidden="true">🔐</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">Privater Lernraum</h1>
          <p className="mt-3 text-slate-600">Dieser Lernraum lässt sich nur mit dem privaten Zugangslink öffnen.</p>
          {(accessRevoked ? 'Du bist abgemeldet. Öffne den privaten Zugangslink erneut.' : accessError) && <p role="alert" className="mt-4 text-sm text-rose-700">{accessRevoked ? 'Du bist abgemeldet. Öffne den privaten Zugangslink erneut.' : accessError}</p>}
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-sky-50 px-3 py-5 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-sky-900/5">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
          <div>
            <p className="text-sm font-medium text-teal-700">Euer gemeinsamer Lernraum</p>
            <h1 className="text-2xl font-bold text-slate-800">Lernen, fragen, träumen ✨</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={resetConversation} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">Neues Gespräch</button>
            <button onClick={() => void closeLernraum()} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">Schließen</button>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3 sm:px-7">
          <div className="flex flex-wrap gap-2" aria-label="Chatart">
            {modes.map((item) => (
              <button key={item.value} onClick={() => setMode(item.value)} aria-pressed={mode === item.value}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${mode === item.value ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-900 hover:bg-teal-100'}`}>
                {item.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            Sprache
            <select value={language} onChange={(event) => setLanguage(event.target.value as 'de' | 'hr')} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
              <option value="de">Deutsch</option><option value="hr">Hrvatski</option>
            </select>
          </label>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7" aria-live="polite">
          {messages.length === 0 && (
            <div className="rounded-2xl bg-amber-50 p-5 text-slate-700">
              <p className="font-semibold">Womit legen wir los?</p>
              <p className="mt-2">Stell eine Frage, erfinde mit mir eine Geschichte oder zeig mir einen kroatischen Text. Ich übersetze ihn ins Deutsche und erkläre schwierige Wörter.</p>
              <p className="mt-2 text-sm">Bei Schulaufgaben gebe ich erst Hinweise. Die Lösung zeige ich nur, wenn du ausdrücklich darum bittest.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <article key={`${index}-${message.role}`} className={`max-w-[92%] whitespace-pre-wrap rounded-2xl px-4 py-3 leading-relaxed ${message.role === 'user' ? 'ml-auto bg-sky-100 text-slate-800' : 'mr-auto bg-slate-100 text-slate-800'}`}>
              {message.image && <Image src={message.image} alt="Vorschau des gesendeten Schultexts" width={560} height={360} unoptimized className="mb-3 max-h-56 w-auto rounded-xl object-contain" />}
              {message.text}
            </article>
          ))}
          {sending && <p className="text-sm text-slate-500" role="status">Ich denke nach …</p>}
          <div ref={messagesEnd} />
        </div>

        <form onSubmit={(event) => void sendMessage(event)} className="border-t border-slate-100 px-5 py-4 sm:px-7">
          {image && (
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <Image src={image} alt="Vorschau vor dem Senden" width={128} height={80} unoptimized className="h-20 max-w-32 rounded-lg object-cover" />
              <div className="flex-1 text-sm text-slate-600">Bitte prüfe vor dem Senden, dass keine Namen, Gesichter oder anderen persönlichen Angaben im Foto sind.</div>
              <button type="button" onClick={() => setImage('')} aria-label="Foto entfernen" className="rounded-full px-3 py-2 text-slate-600 hover:bg-slate-200">Entfernen</button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <input ref={upload} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void handleImage(event)} className="hidden" />
            <button type="button" onClick={() => upload.current?.click()} aria-label="Schultext-Foto hinzufügen" className="rounded-2xl bg-amber-100 px-4 py-3 text-xl text-amber-900 hover:bg-amber-200">＋</button>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} rows={2} maxLength={3000}
              placeholder={language === 'hr' ? 'Napiši pitanje ili dodaj fotografiju…' : 'Schreib deine Frage oder füge ein Foto hinzu …'}
              aria-label="Deine Nachricht" className="min-h-12 flex-1 resize-y rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none" />
            <button type="submit" disabled={sending || (!draft.trim() && !image)} className="rounded-2xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50">Senden</button>
          </div>
          {error && <p role="alert" className="mt-2 text-sm text-rose-700">{error}</p>}
          <p className="mt-3 text-xs leading-relaxed text-slate-500">Patrick bedient den Chat mit dir. Bitte keine persönlichen Daten oder Gesichter in Fotos senden. Nachrichten und Fotos gehen an OpenAI, um Antworten zu erstellen. Die Website speichert keinen Chatverlauf; OpenAI verarbeitet Inhalte nach den geltenden API-Aufbewahrungsregeln. Antworten können Fehler enthalten.</p>
        </form>
      </section>
    </main>
  )
}
