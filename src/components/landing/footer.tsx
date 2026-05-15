'use client'

import Link from 'next/link'
import { Logo } from '@/components/icons'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
    <path d="M11.0086 5.36127C7.88538 5.36127 5.36618 7.88047 5.36618 11.0037C5.36618 14.1269 7.88538 16.6461 11.0086 16.6461C14.1318 16.6461 16.651 14.1269 16.651 11.0037C16.651 7.88047 14.1318 5.361
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M20.4286 0H1.56652C0.702232 0 0 0.712054 0 1.58616V20.4138C0 21.2879 0.702232 22 1.56652 22H20.4286C21.2929 22 22 21.2879 22 20.4138V1.58616C22 0.712054 21.2929 0 20.4286 0ZM6.64911 18.85
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M19.7386 4.45302C19.7525 4.64845 19.7525 4.84391 19.7525 5.03933C19.7525 11 15.2157 17.868 6.92386 17.868C4.36928 17.868 1.9962 17.1281 0 15.8439C0.362957 15.8858 0.711906 15.8997 1.08883
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M22 11C22 4.92422 17.0758 0 11 0C4.92422 0 0 4.92422 0 11C0 16.1562 3.55352 20.4875 8.34453 21.6777V14.3602H6.07578V11H8.34453V9.55195C8.34453 5.80938 10.0375 4.07344 13.7156 4.07344C14.4
  </svg>
)

const footerLinkStyle = {
  color: '#E7E7E7',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'opacity 0.2s',
  fontFamily: 'Geist, sans-serif',
}

const footerHeadingStyle = {
  color: '#E7E7E7',
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '24px',
  fontFamily: 'Geist, sans-serif',
}

export function Footer() {
  return (
    <footer
      className="w-full bg-[#0C5D56]"
      style={{ padding: '80px 20px 40px' }}
    >
      <div
        className="mx-auto flex w-full flex-col"
        style={{ maxWidth: '1440px', gap: '60px' }}
      >
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-4 lg:gap-12">

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Logo />
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#E7E7E7',
                  letterSpacing: '0.1em',
                }}
              >
                ANVILA
              </span>
            </div>
            <p
              style={{
                color: '#E7E7E7',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                maxWidth: '300px'
              }}
            >
              Builders use Anvila to turn plain descriptions into reusable AI
              agent packages that can be cloned, adapted, published, or kept
              private.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:opacity-80 transition-opacity"><FacebookIcon /></Link>
              <Link href="#" className="hover:opacity-80 transition-opacity"><TwitterIcon /></Link>
              <Link href="#" className="hover:opacity-80 transition-opacity"><LinkedInIcon /></Link>
              <Link href="#" className="hover:opacity-80 transition-opacity"><InstagramIcon /></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3 lg:pl-12">
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Our Services</h4>
              <div className="flex flex-col gap-4">
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Create Package</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Browse Registry</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">GitHub Publishing</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Pricing</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Early Access</Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Company</h4>
              <div className="flex flex-col gap-4">
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Home</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">About Us</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">FAQ</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Contacts</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Partners</Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Support & Legal</h4>
              <div className="flex flex-col gap-4">
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">GitHub</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Twitter / X</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">LinkedIn</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Discord</Link>
                <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Product Hunt</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
          <p style={{ color: '#E7E7E7', fontSize: '14px', fontFamily: 'Geist, sans-serif' }}>
            © 2026 Anvila. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Privacy Policy</Link>
            <span style={{ color: '#E7E7E7' }}>•</span>
            <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Terms of service</Link>
            <span style={{ color: '#E7E7E7' }}>•</span>
            <Link href="#" style={footerLinkStyle} className="hover:opacity-80">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
