// 'use client'

// import { type ReactNode } from 'react'
// import { AuthContext} from '@/components/stores/auth-store'

// /**
//  * Wrap your root layout with this so all children can call useAuthStore().
//  *
//  * app/layout.tsx:
//  *   import { AuthProvider } from '@/components/stores/AuthProvider'
//  *   <AuthProvider><AuthStoreBridge />{children}</AuthProvider>
//  */
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { state, setAccessToken, setUser, clear } = useAuthReducer()

//   return (
//     <AuthContext.Provider value={{ ...state, setAccessToken, setUser, clear }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
export { AuthProvider } from '@/components/stores/auth-store'
