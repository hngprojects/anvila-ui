'use client'

import { Button } from '@/components/ui/button'
import { AuthDialog } from '@/components/auth-dialog'

export function FinalCTA() {
  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto flex w-full flex-col items-center text-center"
        style={{
          maxWidth: '1439px',
          padding: '80px 20px',
          gap: '24px',
        }}
        id="final-cta-desktop"
      >
        <h2
          style={{
            color: '#0C0E0D',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '48px',
            letterSpacing: '-1.2px',
            width: '725px',
            margin: 0,
          }}
        >
          Your agent setup, built once and reused forever.
        </h2>

        <p
          style={{
            fontFamily: 'Geist',
            color: '#52525B',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            width: '545px',
            margin: 0,
          }}
        >
          Use Anvila to create, package, and reuse AI agent setups. No technical <br /> expertise needed.
        </p>

        <AuthDialog
          trigger={
            <Button
              className="hover:opacity-90"
              style={{
                display: 'inline-flex',
                width: 'auto',
                padding: '16px 32px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                border: '0.5px solid #0C5D56',
                background: '#0C5D56',
                color: '#F6F7F7',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                height: 'auto',
              }}
            >
              Start Building
            </Button>
          }
        />
      </div>
    </section>
  )
}