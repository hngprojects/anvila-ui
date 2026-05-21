import { NextResponse } from 'next/server'
import { clearAuthCookies } from '@/lib/auth/cookies'

export async function POST() {
  const res = NextResponse.json({ success: true }, { status: 200 })
  clearAuthCookies(res)
  return res
}
