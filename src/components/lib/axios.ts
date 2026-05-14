import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const publicClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const authClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

function getAccessToken(): string | null {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/components/stores/auth-store')
  return useAuthStore.getState().accessToken
}

function setAccessToken(token: string): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/components/stores/auth-store')
  useAuthStore.getState().setAccessToken(token)
}

function clearAuth(): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/components/stores/auth-store')
  useAuthStore.getState().clear()
}

authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let queue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  queue = []
}

authClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return authClient(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await publicClient.post<{ access_token: string }>(
        '/auth/refresh'
      )
      const newToken = data.access_token

      setAccessToken(newToken)
      processQueue(null, newToken)

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return authClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearAuth()
      if (typeof window !== 'undefined') {
        window.location.replace('/login')
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)
