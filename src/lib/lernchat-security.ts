import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

export const ACCESS_COOKIE = 'lernchat_session'

function sessionSignature(secret: string) {
  return createHmac('sha256', secret).update('patrick-lernchat-session-v1').digest('hex')
}

export function isValidAccessKey(candidate: unknown) {
  const configured = process.env.LEARNING_CHAT_ACCESS_KEY
  if (typeof candidate !== 'string' || candidate.length > 1024 || !configured || configured.length < 32) return false
  const suppliedHash = createHmac('sha256', 'lernchat-key-check').update(candidate).digest()
  const configuredHash = createHmac('sha256', 'lernchat-key-check').update(configured).digest()
  return timingSafeEqual(suppliedHash, configuredHash)
}

export function hasChatSession(request: NextRequest) {
  const secret = process.env.LEARNING_CHAT_ACCESS_KEY
  if (!secret || secret.length < 32) return false
  const value = request.cookies.get(ACCESS_COOKIE)?.value ?? ''
  const expected = sessionSignature(secret)
  if (value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export function getSessionSignature() {
  const secret = process.env.LEARNING_CHAT_ACCESS_KEY
  if (!secret || secret.length < 32) return null
  return sessionSignature(secret)
}
