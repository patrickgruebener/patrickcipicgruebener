import { cookies } from 'next/headers'
import { ACCESS_COOKIE, isValidSessionCookie } from '@/lib/karteikarten-security'
import { KarteikartenApp } from './karteikarten-app'
import { Zugang } from './zugang'

export const dynamic = 'force-dynamic'

export default async function KarteikartenPage() {
  const store = await cookies()
  const authorized = isValidSessionCookie(store.get(ACCESS_COOKIE)?.value)
  return authorized ? <KarteikartenApp /> : <Zugang />
}
