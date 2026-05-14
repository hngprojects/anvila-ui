'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/components/stores/auth-store'
import {login, logout, register, getMe, refresh} from "@/components/lib/api/auth"
import type { LoginInput, RegisterInput } from '../schemas/auth'
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

export function useAuth() {
  const router = useRouter()
  const { accessToken, user, isAuthenticated, setAccessToken, setUser, clear } =
    useAuthStore()
  const pathname = usePathname()
  const hydrated = useRef(false)

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path))
    if (hydrated.current || isPublicPath) return
    hydrated.current = true

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

        if (!isPublicPath) {
          router.replace('/login')
        }
      })
  }, [isAuthenticated, setAccessToken, setUser, clear, router, pathname])

  const handleRegister = useCallback(async (data: RegisterInput) => {
    return register(data)
  }, [])

  const handleLogin = useCallback(
    async (data: LoginInput) => {
      const { access_token } = await login(data)
      setAccessToken(access_token)
      const me = await getMe()
      setUser(me)
      return me
    },
    [setAccessToken, setUser]
  )

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } finally {
      clear()
      router.replace('/login')
    }
  }, [clear, router])

  return {
    user,
    accessToken,
    isAuthenticated,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  }
}
