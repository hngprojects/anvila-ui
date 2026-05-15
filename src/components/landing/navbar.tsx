'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const linkStyle: React.CSSProperties = {
  color: '#0C0E0D',
  fontFamily: 'Inter',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: 'normal',
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const getLinkStyle = (href: string) => ({
    ...linkStyle,
    color: pathname === href ? '#0C5D56' : '#0C0E0D',
  })

  return (
    <header className="relative w-full bg-white">
      <nav className="mx-auto flex w-full items-center justify-between self-stretch px-6 py-4 md:px-20 md:py-5">
        <Link
          href="/"
          className="flex items-center outline-hidden"
          style={{ gap: '8px' }}
        >
          <div
            style={{
              display: 'flex',
              padding: '10px',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '24px',
              background: '#005F5A',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="14"
              viewBox="0 0 6 14"
              fill="none"
            >
              <path
                d="M0.640053 2.5C0.640053 3.36825 0.418743 4.18482 0.0294569 4.89636C0.187604 4.92583 0.350936 4.94126 0.518004 4.94126C1.93242 4.94126 3.07903 3.83512 3.07903 2.47063C3.07903 1.10614"
                fill="#F6F7F7"
              />
              <path
                d="M2.19272 13.986C4.12275 13.8538 5.64005 12.8044 5.64005 11.5294C5.64005 10.2662 4.14896 9.22447 2.24427 9.07673C2.78348 9.74399 3.14005 10.5558 3.14005 11.5C3.14005 12.474 2.76063 1
                fill="#F6F7F7"
              />
            </svg>
          </div>

          <span
            className="text-[14.196px] leading-none font-bold min-[973px]:text-[24px]"
            style={{
              color: '#0C0E0D',
              fontFamily: 'Inter',
              fontWeight: 700,
            }}
          >
            ANVILA
          </span>
        </Link>

        <ul
          className="hidden items-center min-[973px]:flex"
          style={{ gap: '32px' }}
        >
          <li>
            <Link
              href="/"
              className="transition-colors hover:opacity-70"
              style={getLinkStyle('/')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="transition-colors hover:opacity-70"
              style={getLinkStyle('/explore')}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="transition-colors hover:opacity-70"
              style={getLinkStyle('/pricing')}
            >
              Pricing
            </Link>
          </li>
        </ul>

        <div className="flex items-center" style={{ gap: '12px' }}>
          <Button
            variant="ghost"
            className="hidden items-center justify-center min-[973px]:flex"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '0.5px solid #A0A5A3',
              background: '#F6F7F7',
              color: '#0C0E0D',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Log in
          </Button>

          <Button
            className="hidden items-center justify-center min-[973px]:flex"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '0.5px solid #005F5A',
              background: '#005F5A',
              color: '#F6F7F7',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Get Started
          </Button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 min-[973px]:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#0C0E0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="#0C0E0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 z-50 flex w-full flex-col border-b border-zinc-200 bg-white px-6 py-4 shadow-lg min-[973px]:hidden">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className="block w-full py-2"
                style={getLinkStyle('/')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="block w-full py-2"
                style={getLinkStyle('/explore')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block w-full py-2"
                style={getLinkStyle('/pricing')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="flex w-full flex-col items-stretch gap-3 pt-6">
              <Button
                variant="outline"
                className="w-full"
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '0.5px solid #A0A5A3',
                  background: '#F6F7F7',
                  color: '#0C0E0D',
                }}
              >
                Log in
              </Button>
              <Button
                className="w-full"
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  background: '#005F5A',
                  color: '#F6F7F7',
                }}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
