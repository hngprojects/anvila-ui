import { NextRequest, NextResponse } from 'next/server'
import { authApi } from '@/lib/auth/api'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const result = await authApi.resendVerification(email)

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status })
    }

    return NextResponse.json({ success: true, message: result.data.message }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
