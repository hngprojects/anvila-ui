import { NextRequest, NextResponse } from 'next/server'
import { authApi } from '@/lib/api'
import { setAuthCookies } from '@/lib/auth/cookies'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ott } = body

    if (!ott || typeof ott !== 'string') {
      return NextResponse.json({ message: 'Missing OTT' }, { status: 400 })
    }

    const result = await authApi.exchangeOtt(ott)

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status })
    }

    const { user, tokens } = result.data.data

    const res = NextResponse.json({ user }, { status: 200 })
    setAuthCookies(res, tokens)

    return res
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
