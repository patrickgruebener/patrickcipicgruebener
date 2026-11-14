import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_COOKIE, getSessionSignature, hasSession, isValidAccessKey } from '@/lib/karteikarten-security'

export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store' }

export async function GET(request: NextRequest) {
  return NextResponse.json({ authorized: hasSession(request) }, { headers: NO_STORE })
}

export async function POST(request: NextRequest) {
  const signature = getSessionSignature()
  if (!signature) {
    return NextResponse.json({ error: 'Die Karteikarten sind noch nicht eingerichtet.' }, { status: 503, headers: NO_STORE })
  }
  try {
    const body = await request.json()
    if (!isValidAccessKey(body?.key)) {
      return NextResponse.json({ error: 'Der Schlüssel ist ungültig.' }, { status: 401, headers: NO_STORE })
    }
    const response = NextResponse.json({ ok: true }, { headers: NO_STORE })
    response.cookies.set(ACCESS_COOKIE, signature, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Die Anfrage konnte nicht gelesen werden.' }, { status: 400, headers: NO_STORE })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true }, { headers: NO_STORE })
  response.cookies.set(ACCESS_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
