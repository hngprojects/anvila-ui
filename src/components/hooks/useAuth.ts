'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/components/stores/auth-store'
import { login, logout, register, getMe } from '@/components/lib/api/auth'
import type { LoginInput, RegisterInput } from '../schemas/auth'

export function useAuth() {
  const router = useRouter()
  const { accessToken, user, isAuthenticated, setAccessToken, setUser, clear } =
    useAuthStore()

  const handleRegister = useCallback(async (data: RegisterInput) => {
    return register(data)
  }, [])

  const handleLogin = useCallback(
    async (data: LoginInput) => {
      const { access_token } = await login(data)
      setAccessToken(access_token)
       try {const me = await getMe()
       setUser(me)
        return me
     } catch (error) {
       clear()
        throw error
      }
    },
    [setAccessToken, setUser, clear ]
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
