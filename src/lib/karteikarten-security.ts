import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

// Cookie name and env key stay from the former Lernchat so the existing
// Dokploy configuration keeps working.
export const ACCESS_COOKIE = 'lernchat_session'

function sessionSignature(secret: string) {
  return createHmac('sha256', secret).update('patrick-lernchat-session-v1').digest('hex')
}

function configuredKey() {
  const secret = process.env.LEARNING_CHAT_ACCESS_KEY
  return secret && secret.length >= 32 ? secret : null
}

export function isValidAccessKey(candidate: unknown) {
  const configured = configuredKey()
  if (typeof candidate !== 'string' || candidate.length > 1024 || !configured) return false
  const suppliedHash = createHmac('sha256', 'lernchat-key-check').update(candidate).digest()
  const configuredHash = createHmac('sha256', 'lernchat-key-check').update(configured).digest()
  return timingSafeEqual(suppliedHash, configuredHash)
}

export function hasSession(request: NextRequest) {
  const secret = configuredKey()
  if (!secret) return false
  const value = request.cookies.get(ACCESS_COOKIE)?.value ?? ''
  const expected = sessionSignature(secret)
  if (value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export function hasBearerKey(request: NextRequest) {
  const header = request.headers.get('authorization') ?? ''
  const match = /^Bearer\s+(.+)$/i.exec(header)
  return match ? isValidAccessKey(match[1].trim()) : false
}

/** Valid session cookie OR `Authorization: Bearer <key>` (used by the import skill). */
export function isAuthorized(request: NextRequest) {
  return hasSession(request) || hasBearerKey(request)
}

export function getSessionSignature() {
  const secret = configuredKey()
  return secret ? sessionSignature(secret) : null
}
