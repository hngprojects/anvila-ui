import { NextRequest, NextResponse } from 'next/server'
import { getTokensFromRequest } from '@/lib/auth/cookies'

/**
 * Public paths — no auth required.
 * Everything else is protected by default.
 */
const PUBLIC_PATHS = new Set([
  '/',
  '/login',
  '/waitlist',
  '/register',
  '/verify-email',
  '/confirm-email',
  '/forgot-password',
  '/reset-password',
  '/forgot-password/check-mail',
  '/reset-password/success',
  '/auth/oauth/callback',
])

/** Prefixes that are always public (static assets, Next internals, our own API routes) */
const PUBLIC_PREFIXES = ['/_next', '/favicon', '/api/auth', '/static', '/images']

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true
  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true
  return false
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const { accessToken } = getTokensFromRequest(req)

  if (accessToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/generator', req.url))
  }

  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  if (!accessToken) {
    const loginUrl = new URL('/login', req.url)
    // Preserve the intended destination so we can redirect after login
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)'],
}


