'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { api } from './api-client'

function readKeyFromHash() {
  const match = /(?:^|[#&])key=([^&]+)/.exec(window.location.hash)
  return match ? decodeURIComponent(match[1]) : null
}

export function Zugang() {
  const router = useRouter()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const login = useCallback(
    (candidate: string) =>
      api('zugang', { method: 'POST', body: JSON.stringify({ key: candidate }) })
        .then(() => router.refresh())
        .catch((e) => {
          setError(e instanceof Error ? e.message : 'Das hat nicht geklappt.')
          setBusy(false)
        }),
    [router],
  )

  useEffect(() => {
    function consumeHash() {
      const fromHash = readKeyFromHash()
      if (!fromHash) return
      // Remove the key from the address bar and history before anything else.
      router.replace(window.location.pathname)
      void login(fromHash)
    }
    consumeHash()
    window.addEventListener('hashchange', consumeHash)
    return () => window.removeEventListener('hashchange', consumeHash)
  }, [login, router])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!key.trim()) return
    setBusy(true)
    setError('')
    void login(key.trim())
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-[420px] flex-col justify-center px-4 py-10">
      <h1 className="font-display text-[48px] leading-[0.9] font-[820] text-ink">Karteikarten</h1>
      <p className="mt-3 mb-8 text-ink-2">Privat. Mit Schlüssel geht es weiter.</p>
      <form onSubmit={onSubmit} className="grid gap-4">
        <Input
          label="Schlüssel"
          name="key"
          type="password"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          error={error || undefined}
        />
        <Button type="submit" disabled={busy || !key.trim()} className="w-full min-h-12 disabled:opacity-60">
          {busy ? 'Einen Moment …' : 'Öffnen'}
        </Button>
      </form>
    </main>
  )
}
