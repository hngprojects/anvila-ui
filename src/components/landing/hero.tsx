'use client'

import { useState } from 'react'
import { AuthDialog } from './auth-dialog'

function PlusIconDesktop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M0.75 6.75H6.75M6.75 6.75H12.75M6.75 6.75V0.75M6.75 6.75V12.75"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusIconMobile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M6 12H12M12 12H18M12 12V6M12 12V18"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 20L12 4M6 10L12 4L18 10"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CAREER_CHIPS = [
  'AI Developers & Engineers',
  'Prompt Engineers',
  'No-Code Builders',
  'Founders',
]

export function Hero() {
  const [value, setValue] = useState('')

  return (
    <section
      className="relative w-full overflow-hidden border-t border-zinc-100"
      style={{
        backgroundColor: '#FAFAFA',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, #D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div
        className="relative mx-auto flex w-full flex-col items-center justify-center px-6 py-6 md:min-h-[640px] md:px-20 md:py-10"
        style={{
          maxWidth: '1438px',
          gap: '8px',
        }}
      >
        <div
          className="flex w-full flex-col items-center self-stretch"
          style={{ gap: '12px' }}
        >
          <div className="hidden flex-col items-center md:flex">
            <h1
              className="text-center"
              style={{
                color: '#0C0E0D',
                fontFamily: 'Inter',
                fontSize: '72px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              The Home for Reusable
            </h1>
            <h1
              className="text-center"
              style={{
                color: '#0C0E0D',
                fontFamily: 'Inter',
                fontSize: '72px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              AI Agent Setups
            </h1>
          </div>

          <h1
            className="self-stretch text-center md:hidden"
            style={{
              color: '#0C0E0D',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 500,
              lineHeight: '32px',
              margin: 0,
            }}
          >
            The Home for Reusable AI Agent Setups
          </h1>

          <p
            className="hidden text-center md:block"
            style={{
              color: '#52525B',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
              margin: 0,
              maxWidth: '652px',
            }}
          >
            Describe your agent setup in and get a structured package you can
            publish, share, and reuse.
          </p>

          <p
            className="text-center md:hidden"
            style={{
              color: '#52525B',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              margin: 0,
            }}
          >
            Describe your agent setup in plain English and get a structured
            package you can publish, share, and reuse.
          </p>
        </div>

        <div
          aria-hidden
          className="hidden md:block"
          style={{ height: '24px' }}
        />

        <div
          className="mx-auto hidden w-full md:flex"
          style={{
            maxWidth: '800px',
            height: '77px',
            padding: '16px 24px',
            alignItems: 'center',
            gap: '2px',
            borderRadius: '24px',
            border: '1px solid #E4E4E7',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 6px 18px -2px rgba(0, 0, 0, 0.10)',
          }}
        >
          <PlusIconDesktop />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe your agent setup"
            className="flex-1 bg-transparent outline-hidden focus:outline-hidden"
            style={{
              fontFamily: 'Inter',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              color: '#A1A1AA',
              border: 'none',
              marginLeft: '15px',
            }}
          />
          <AuthDialog
            trigger={
              <button
                type="button"
                aria-label="Submit"
                className="flex items-center justify-center outline-hidden focus:outline-hidden focus-visible:outline-hidden"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <ArrowUpIcon />
              </button>
            }
          />
        </div>

        <div
          className="flex w-full self-stretch md:hidden"
          style={{
            padding: '16px 10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '24px',
            border: '1px solid #E4E4E7',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 6px 18px -2px rgba(0, 0, 0, 0.10)',
          }}
        >
          <div className="flex flex-1 items-center" style={{ gap: '8px' }}>
            <PlusIconMobile />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe your agent setup"
              className="flex-1 bg-transparent outline-hidden focus:outline-hidden"
              style={{
                fontFamily: 'Geist, Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '16px',
                color: '#A1A1AA',
                border: 'none',
              }}
            />
          </div>
          <AuthDialog
            trigger={
              <button
                type="button"
                aria-label="Submit"
                className="flex flex-shrink-0 items-center justify-center outline-hidden focus:outline-hidden focus-visible:outline-hidden"
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <ArrowUpIcon />
              </button>
            }
          />
        </div>

        <div
          aria-hidden
          className="hidden md:block"
          style={{ height: '6px' }}
        />

        <div
          className="hidden flex-wrap items-center justify-center md:flex"
          style={{ gap: '13px' }}
        >
          {CAREER_CHIPS.map((chip) => (
            <button
              key={`desktop-${chip}`}
              type="button"
              style={{
                display: 'inline-flex',
                padding: '10px 20px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '16px',
                backgroundColor: '#F4F4F5',
                color: '#52525B',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                cursor: 'pointer',
                border: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:hidden">
          {CAREER_CHIPS.map((chip, i) => {
            const isActive = i === 0
            return (
              <button
                key={`mobile-${chip}`}
                type="button"
                style={{
                  display: 'flex',
                  padding: '10px 16px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '16px',
                  backgroundColor: isActive ? '#F0FDFA' : '#F4F4F5',
                  color: isActive ? '#0C5D56' : '#52525B',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '16px',
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {chip}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
