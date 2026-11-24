import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl
  // Private pages: flashcards and unlisted pages under /t/<secret>
  if (pathname === '/karteikarten' || pathname.startsWith('/karteikarten/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
    response.headers.set('Cache-Control', 'private, no-store, max-age=0')
  }
  // /t/ route handlers set their own cache headers (the large texture may be cached)
  if (pathname.startsWith('/t/')) response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
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
