'use client'

import { useEffect } from 'react'
import { useAuthStore, _registerStoreRef } from '@/components/stores/auth-store'


export function AuthStoreBridge() {
  const store = useAuthStore()

  useEffect(() => {
    _registerStoreRef(() => ({
      accessToken: store.accessToken,
      setAccessToken: store.setAccessToken,
      clear: store.clear,
    }))
  }, [store.accessToken, store.setAccessToken, store.clear])

  return null
}
