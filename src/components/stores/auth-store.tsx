'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react'
import { User } from '@/components/schemas/auth'

// ---------- State ----------
interface AuthState {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
}

const initial: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
}

// ---------- Actions ----------
type Action =
  | { type: 'SET_TOKEN'; token: string }
  | { type: 'SET_USER'; user: User }
  | { type: 'CLEAR' }

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, accessToken: action.token, isAuthenticated: true }
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'CLEAR':
      return { accessToken: null, user: null, isAuthenticated: false }
    default:
      return state
  }
}

// ---------- Context ----------
interface AuthContextValue extends AuthState {
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  clear: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// ---------- Provider ----------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial)

  const setAccessToken = useCallback(
    (token: string) => dispatch({ type: 'SET_TOKEN', token }),
    []
  )
  const setUser = useCallback(
    (user: User) => dispatch({ type: 'SET_USER', user }),
    []
  )
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  return (
    <AuthContext.Provider
      value={{ ...state, setAccessToken, setUser, clear }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ---------- Hook ----------
export function useAuthStore() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthStore must be used inside <AuthProvider>')
  return ctx
}

interface StoreRef {
  getState: () => { accessToken: string | null; setAccessToken: (t: string) => void; clear: () => void }
}

let _storeRef: StoreRef['getState'] | null = null

export function _registerStoreRef(ref: StoreRef['getState']) {
  _storeRef = ref
}


export const authStoreSingleton = {
   tryGetState: () => (_storeRef ? _storeRef() : null),
}
