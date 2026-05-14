import { create } from 'zustand'
import { User } from "@/components/schemas/auth"

interface AuthState {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean

  // Actions
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAccessToken: (token) => set({ accessToken: token, isAuthenticated: true }),

  setUser: (user) => set({ user }),

  clear: () => set({ accessToken: null, user: null, isAuthenticated: false }),
}))
