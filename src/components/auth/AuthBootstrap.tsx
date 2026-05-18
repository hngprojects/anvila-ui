'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/components/stores/auth-store'
import { getMe, refresh } from '@/components/lib/api/auth'
import { AxiosError } from 'axios'

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/reset-password',
  '/forgot-password',
  '/verify-email',
  '/confirm-email',
]

export function AuthBootstrap() {
  const router = useRouter()
  const pathname = usePathname()
  const { setAccessToken, setUser, clear } = useAuthStore()
  const attempted = useRef(false)

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.some((path) =>
      path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
    )

    if (isPublicPath) {
      attempted.current = false
      return
    }

    if (attempted.current) return
    attempted.current = true

    refresh()
      .then(({ access_token }) => {
        setAccessToken(access_token)
        return getMe()
      })
      .then((me) => {
        setUser(me)
      })
      .catch((err: unknown) => {
        clear()

        if (err instanceof AxiosError && err.response?.status === 403) {
          router.push('/confirm-email')
          return
        }

        router.replace('/login')
      })
  }, [pathname, clear, router, setAccessToken, setUser])

  return null
}
