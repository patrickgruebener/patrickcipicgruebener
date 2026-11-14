import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from './karteikarten-security.ts'
import { StoreNotConfiguredError } from './karteikarten-store.ts'

const NO_STORE = { 'Cache-Control': 'no-store' }

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE })
}

type Handler<C> = (request: NextRequest, context: C) => Promise<NextResponse>

/** Wraps a route handler: auth check (401), store errors (503), unexpected errors (500). */
export function protectedRoute<C = unknown>(handler: Handler<C>) {
  return async (request: NextRequest, context: C) => {
    if (!isAuthorized(request)) return json({ error: 'Kein Zugang.' }, 401)
    try {
      return await handler(request, context)
    } catch (error) {
      if (error instanceof StoreNotConfiguredError) {
        return json({ error: 'Der Speicher ist nicht konfiguriert.' }, 503)
      }
      console.error('karteikarten api error', error)
      return json({ error: 'Interner Fehler.' }, 500)
    }
  }
}

export async function readJson(request: NextRequest): Promise<unknown | undefined> {
  try {
    return await request.json()
  } catch {
    return undefined
  }
}
