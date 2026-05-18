'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const RESEND_COOLDOWN = 60

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  const visible = local.slice(0, 2)
  const masked = '*'.repeat(Math.max(local.length - 2, 3))
  return `${visible}${masked}@${domain}`
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get('email') ?? ''
  const masked = email ? maskEmail(decodeURIComponent(email)) : 'your email'

  const [countdown, setCountdown] = useState(RESEND_COOLDOWN)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleResend = useCallback(async () => {
    if (countdown > 0 || isResending || !email) return

    setIsResending(true)
    setResendMessage(null)

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: decodeURIComponent(email) }),
      })

      const data = await res.json()

      if (res.ok) {
        setResendMessage({ type: 'success', text: data.message ?? 'Verification link resent!' })
        setCountdown(RESEND_COOLDOWN)
      } else {
        setResendMessage({ type: 'error', text: data.message ?? 'Failed to resend. Try again.' })
      }
    } catch {
      setResendMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsResending(false)
    }
  }, [countdown, isResending, email])

  const canResend = countdown === 0 && !isResending

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-background)] px-4">
      <div
        className="flex w-full max-w-[652px] flex-col items-center rounded-2xl bg-[color:var(--color-background)] px-10 py-12"
        style={{ boxShadow: '0 2px 24px 0 rgba(0,0,0,0.06)' }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="mb-8 flex cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent p-0 text-sm font-medium text-[color:var(--color-copy-muted)] transition-colors hover:text-[color:var(--color-copy-heading)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 11.5L4.25 7L8.75 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        {/* Heading */}
        <h1
          className="mb-4 text-center text-[34px] font-bold text-[#0C0E0D]"
        >
          Verification
        </h1>

        {/* Subtext */}
        <p
          className="mb-10 max-w-[460px] text-center text-[16px] font-medium text-copy-muted"
        >
          Click the link sent to your email{' '}
          <span className="font-medium text-[color:var(--color-copy-heading)]">{masked}</span>
          {' '}to verify your account
        </p>

        {/* Feedback */}
        {resendMessage && (
          <div
            className={`mb-6 w-full rounded-lg border px-4 py-3 text-sm ${
              resendMessage.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-600'
            }`}
          >
            {resendMessage.text}
          </div>
        )}

        {/* Countdown */}
        {countdown > 0 && (
          <p className="mb-4 text-sm text-[color:var(--color-copy-muted)]">
            Resend available in{' '}
            <span className="tabular-nums font-semibold text-[color:var(--color-copy-heading)]">
              {String(Math.floor(countdown / 60)).padStart(2, '0')}:
              {String(countdown % 60).padStart(2, '0')}
            </span>
          </p>
        )}

        {/* Resend button */}
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={[
            'w-full rounded-[8px] py-3 text-sm font-medium text-white transition-all',
            canResend
              ? 'cursor-pointer bg-[color:var(--color-primary)] hover:opacity-90'
              : 'cursor-not-allowed bg-[color:var(--color-primary)] opacity-50',
          ].join(' ')}
        >
          {isResending ? 'Sending…' : 'Resend link'}
        </button>
      </div>
    </div>
  )
}
