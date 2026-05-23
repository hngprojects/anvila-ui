'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

type Status = 'verifying' | 'success' | 'error'

export default function EmailVerificationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const attempted = useRef(false)

  const [status, setStatus] = useState<Status>('verifying')
  const [errorMessage, setErrorMessage] = useState<string>('Verification failed. The link may have expired.')

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

    const token = searchParams.get('token')

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrorMessage('No verification token found. Please check your link.')
      setStatus('error')
      return
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await res.json()

        if (!res.ok) {
          setErrorMessage(data.detail ?? data.message ?? 'Verification failed. The link may have expired.')
          setStatus('error')
          return
        }

        setStatus('success')

        // Redirect to login after a short delay so user sees the success state
        setTimeout(() => {
          router.replace('/login')
        }, 2500)
      } catch {
        setErrorMessage('Network error. Please check your connection and try again.')
        setStatus('error')
      }
    }

    verify()
  }, [searchParams, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-background)] px-4">
      <div
        className="flex w-full max-w-[652px] flex-col items-center rounded-2xl bg-[color:var(--color-background)] px-10 py-16 text-center"
        style={{ boxShadow: '0 2px 24px 0 rgba(0,0,0,0.06)' }}
      >
        {/* Verifying */}
        {status === 'verifying' && (
          <>
            <Loader2
              size={56}
              className="mb-6 animate-spin text-[color:var(--color-primary)]"
            />
            <h1
              className="mb-3 text-[color:var(--color-copy-heading)]"
              style={{ fontWeight: 700, fontSize: '48px', lineHeight: 1.1 }}
            >
              Verifying
            </h1>
            <p
              className="text-[color:var(--color-copy-muted)]"
              style={{ fontSize: '16px', lineHeight: 1.6 }}
            >
              Please wait while we verify your email address…
            </p>
          </>
        )}

        {/* Success */}
        {status === 'success' && (
          <>
            <CheckCircle
              size={56}
              className="mb-6 text-[color:var(--color-teal-accent)]"
            />
            <h1
              className="mb-3 text-[color:var(--color-copy-heading)]"
              style={{ fontWeight: 700, fontSize: '48px', lineHeight: 1.1 }}
            >
              Verified!
            </h1>
            <p
              className="mb-8 text-[color:var(--color-copy-muted)]"
              style={{ fontSize: '16px', lineHeight: 1.6 }}
            >
              Your email has been verified successfully. Redirecting you to login…
            </p>
            <button
              type="button"
              onClick={() => router.replace('/login')}
              className="w-full cursor-pointer rounded-[8px] bg-[color:var(--color-primary)] py-3 text-sm font-medium text-white transition-all hover:opacity-90"
            >
              Go to login
            </button>
          </>
        )}

        {/* Error */}
        {status === 'error' && (
          <>
            <XCircle
              size={56}
              className="mb-6 text-red-500"
            />
            <h1
              className="mb-3 text-[color:var(--color-copy-heading)]"
              style={{ fontWeight: 700, fontSize: '48px', lineHeight: 1.1 }}
            >
              Failed
            </h1>
            <p
              className="mb-8 text-[color:var(--color-copy-muted)]"
              style={{ fontSize: '16px', lineHeight: 1.6 }}
            >
              {errorMessage}
            </p>
            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={() => router.replace('/verify-email')}
                className="w-full cursor-pointer rounded-[8px] bg-[color:var(--color-primary)] py-3 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                Resend verification email
              </button>
              <button
                type="button"
                onClick={() => router.replace('/login')}
                className="w-full cursor-pointer rounded-[8px] border border-[color:var(--color-border-subtle)] bg-transparent py-3 text-sm font-medium text-[color:var(--color-copy-heading)] transition-all hover:bg-[color:var(--color-muted-bg)]"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
