import type { ReactNode } from 'react'
import { AuthNavBar } from '@/components/auth/navbar'


export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .auth-root {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          background: #fefeff;
        }
        .auth-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 40px 20px;
        }
        /* On mobile the card fills width */
        @media (max-width: 700px) {
          .auth-body {
            align-items: flex-start;
            padding: 20px 12px;
           
          }
        }
      `}</style>
       <div className=" auth-root">
        <AuthNavBar />
        <div className="auth-body">{children}</div>
      </div>
    </>
  )
}