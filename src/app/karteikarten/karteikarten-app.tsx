'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnauthorizedError } from './api-client'
import { Kartenliste } from './kartenliste'
import { Lernen } from './lernen'

type Tab = 'lernen' | 'karten'

const TABS: { id: Tab; label: string }[] = [
  { id: 'lernen', label: 'Lernen' },
  { id: 'karten', label: 'Karten' },
]

export function KarteikartenApp() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('lernen')

  /** Any 401 means the cookie is gone: re-render the server page, which shows the access view. */
  const onError = useCallback(
    (error: unknown) => {
      if (error instanceof UnauthorizedError) router.refresh()
    },
    [router],
  )

  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-sheet pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-display text-[28px] leading-none font-[820] text-ink">Karteikarten</h1>
          <nav aria-label="Ansicht" className="flex gap-5">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={`min-h-11 touch-manipulation text-[17px] font-semibold underline-offset-[8px] decoration-2 ${
                  tab === id ? 'text-ink underline decoration-brand-green' : 'text-ink-2'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      {tab === 'lernen' ? <Lernen onError={onError} /> : <Kartenliste onError={onError} />}
    </div>
  )
}
