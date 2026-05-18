import { NextRequest, NextResponse } from 'next/server'
import { authApi } from '@/lib/auth/api'
import { RegisterSchema } from '@/schemas/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = RegisterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 }
      )
    }

    const { display_name, email, password } = parsed.data

    const result = await authApi.register({ display_name, email, password })

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status })
    }

    return NextResponse.json(
      { success: true, message: result.data.message, email },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
