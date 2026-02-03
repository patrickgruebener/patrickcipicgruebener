import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const indexableHosts = new Set(['patrickcipicgruebener.com', 'www.patrickcipicgruebener.com'])
  const forwardedHost = request.headers.get('x-forwarded-host') || ''
  const host = forwardedHost || request.headers.get('host') || ''
  const domain = host.split(',')[0]?.trim().split(':')[0]?.toLowerCase() || ''
  const isIndexable = indexableHosts.has(domain)

  if (!isIndexable) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
