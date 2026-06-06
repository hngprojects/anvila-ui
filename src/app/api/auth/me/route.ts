import { NextRequest, NextResponse } from 'next/server'
import { getTokensFromRequest, setAuthCookies, clearAuthCookies } from '@/lib/auth/cookies'
import { authApi, extractAuthTokens, extractAuthUser } from '@/lib/auth/api'
import { BACKEND_URL } from "@/lib/consts";

async function fetchUser(accessToken: string) {
  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.data ?? data.user ?? null
}

export async function GET(req: NextRequest) {
  const { accessToken, refreshToken } = getTokensFromRequest(req)

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  if (accessToken) {
    try {
      const user = await fetchUser(accessToken)
      if (user) {
        return NextResponse.json({ user }, { status: 200 })
      }
    } catch {
    }
  }

  if (!refreshToken) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const refreshResult = await authApi.refresh(refreshToken)

  if (!refreshResult.ok) {
    const res = NextResponse.json({ user: null }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  const tokens = extractAuthTokens(refreshResult.data)

  if (!tokens) {
    const res = NextResponse.json({ user: null }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  const user = extractAuthUser(refreshResult.data) ?? await fetchUser(tokens.access_token)

  if (!user) {
    const res = NextResponse.json({ user: null }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  const res = NextResponse.json({ user }, { status: 200 })
  setAuthCookies(res, tokens)
  return res
}
