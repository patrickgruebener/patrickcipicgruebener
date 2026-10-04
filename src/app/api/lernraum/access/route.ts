import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_COOKIE, getSessionSignature, hasChatSession, isValidAccessKey } from '@/lib/lernchat-security'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  return NextResponse.json({ authorized: hasChatSession(request) }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEARNING_CHAT_ACCESS_KEY
  const signature = getSessionSignature()
  if (!secret || secret.length < 32 || !signature) {
    return NextResponse.json({ error: 'Der Lernraum ist noch nicht eingerichtet.' }, { status: 503 })
  }
  try {
    const body = await request.json()
    if (!isValidAccessKey(body?.key)) {
      return NextResponse.json({ error: 'Der Zugangslink ist ungültig oder abgelaufen.' }, { status: 401 })
    }
    const response = NextResponse.json({ authorized: true }, {
      headers: { 'Cache-Control': 'no-store' },
    })
    response.cookies.set(ACCESS_COOKIE, signature, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Die Anfrage konnte nicht gelesen werden.' }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authorized: false }, {
    headers: { 'Cache-Control': 'no-store' },
  })
  response.cookies.set(ACCESS_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
