'use client'

import Link from 'next/link'

const FooterLogo = () => (
  <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
      fill="#E7E7E7"
    />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
    <path d="M11.0086 5.36127C7.88538 5.36127 5.36618 7.88047 5.36618 11.0037C5.36618 14.1269 7.88538 16.6461 11.0086 16.6461C14.1318 16.6461 16.651 14.1269 16.651 11.0037C16.651 7.88047 14.1318 5.36127 11.0086 5.36127ZM11.0086 14.672C8.99029 14.672 7.34029 13.0269 7.34029 11.0037C7.34029 8.98047 8.98538 7.33538 11.0086 7.33538C13.0318 7.33538 14.6769 8.98047 14.6769 11.0037C14.6769 13.0269 13.0269 14.672 11.0086 14.672ZM18.1979 5.13047C18.1979 5.86217 17.6086 6.44654 16.8818 6.44654C16.1501 6.44654 15.5657 5.85725 15.5657 5.13047C15.5657 4.40368 16.155 3.8144 16.8818 3.8144C17.6086 3.8144 18.1979 4.40368 18.1979 5.13047ZM21.9349 6.46618C21.8515 4.70324 21.4488 3.14163 20.1573 1.85502C18.8706 0.568415 17.309 0.165737 15.5461 0.0773437C13.7291 -0.0257812 8.28315 -0.0257812 6.46618 0.0773437C4.70815 0.160826 3.14654 0.563504 1.85502 1.85011C0.563505 3.13672 0.165737 4.69833 0.0773437 6.46127C-0.0257812 8.27824 -0.0257812 13.7242 0.0773437 15.5412C0.160826 17.3041 0.563505 18.8657 1.85502 20.1523C3.14654 21.439 4.70324 21.8416 6.46618 21.93C8.28315 22.0331 13.7291 22.0331 15.5461 21.93C17.309 21.8465 18.8706 21.4439 20.1573 20.1523C21.4439 18.8657 21.8465 17.3041 21.9349 15.5412C22.0381 13.7242 22.0381 8.28315 21.9349 6.46618ZM19.5876 17.4907C19.2046 18.4532 18.4631 19.1948 17.4956 19.5827C16.047 20.1573 12.6095 20.0247 11.0086 20.0247C9.4077 20.0247 5.96529 20.1523 4.52154 19.5827C3.55904 19.1997 2.81752 18.4581 2.42958 17.4907C1.85502 16.0421 1.98761 12.6046 1.98761 11.0037C1.98761 9.40279 1.85993 5.96038 2.42958 4.51663C2.81261 3.55413 3.55413 2.81261 4.52154 2.42467C5.9702 1.85011 9.4077 1.9827 11.0086 1.9827C12.6095 1.9827 16.0519 1.85502 17.4956 2.42467C18.4581 2.8077 19.1997 3.54922 19.5876 4.51663C20.1622 5.96529 20.0296 9.40279 20.0296 11.0037C20.0296 12.6046 20.1622 16.047 19.5876 17.4907Z" fill="#E7E7E7"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M20.4286 0H1.56652C0.702232 0 0 0.712054 0 1.58616V20.4138C0 21.2879 0.702232 22 1.56652 22H20.4286C21.2929 22 22 21.2879 22 20.4138V1.58616C22 0.712054 21.2929 0 20.4286 0ZM6.64911 18.8571H3.38839V8.35804H6.65402V18.8571H6.64911ZM5.01875 6.92411C3.97277 6.92411 3.12812 6.07455 3.12812 5.03348C3.12812 3.99241 3.97277 3.14286 5.01875 3.14286C6.05982 3.14286 6.90937 3.99241 6.90937 5.03348C6.90937 6.07946 6.06473 6.92411 5.01875 6.92411ZM18.8719 18.8571H15.6112V13.75C15.6112 12.5321 15.5866 10.9656 13.917 10.9656C12.2179 10.9656 11.9576 12.2915 11.9576 13.6616V18.8571H8.69688V8.35804H11.825V9.79196H11.8692C12.3062 8.96696 13.3719 8.09777 14.958 8.09777C18.258 8.09777 18.8719 10.2732 18.8719 13.1018V18.8571Z" fill="#E7E7E7"/>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M19.7386 4.45302C19.7525 4.64845 19.7525 4.84391 19.7525 5.03933C19.7525 11 15.2157 17.868 6.92386 17.868C4.36928 17.868 1.9962 17.1281 0 15.8439C0.362957 15.8858 0.711906 15.8997 1.08883 15.8997C3.19666 15.8997 5.13704 15.1878 6.68654 13.9734C4.7043 13.9315 3.04313 12.6332 2.47079 10.8464C2.75 10.8883 3.02917 10.9162 3.32234 10.9162C3.72715 10.9162 4.132 10.8604 4.50888 10.7627C2.4429 10.3439 0.893363 8.52917 0.893363 6.33755V6.28173C1.49359 6.61676 2.19162 6.82614 2.93141 6.85403C1.71695 6.04437 0.921293 4.66241 0.921293 3.09895C0.921293 2.2614 1.1446 1.49364 1.53549 0.823582C3.75504 3.55962 7.09135 5.34639 10.8324 5.54185C10.7626 5.20682 10.7207 4.85788 10.7207 4.50888C10.7207 2.02409 12.7309 0 15.2296 0C16.5278 0 17.7004 0.544414 18.524 1.42386C19.543 1.22843 20.5202 0.851512 21.3857 0.335027C21.0506 1.382 20.3387 2.26145 19.4035 2.81978C20.3109 2.72211 21.1903 2.47079 21.9999 2.12184C21.3858 3.0152 20.618 3.81086 19.7386 4.45302Z" fill="#E7E7E7"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M22 11C22 4.92422 17.0758 0 11 0C4.92422 0 0 4.92422 0 11C0 16.1562 3.55352 20.4875 8.34453 21.6777V14.3602H6.07578V11H8.34453V9.55195C8.34453 5.80938 10.0375 4.07344 13.7156 4.07344C14.4117 4.07344 15.6114 4.21094 16.109 4.34844V7.39062C15.8512 7.36484 15.4 7.34766 14.8371 7.34766C13.0324 7.34766 12.3363 8.03086 12.3363 9.80547V11H15.9285L15.3098 14.3602H12.332V21.9184C17.7805 21.2609 22 16.6246 22 11Z" fill="#E7E7E7"/>
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
    <footer className="w-full bg-[#0C5D56]" style={{ padding: '80px 20px 40px' }}>
      <div className="mx-auto flex w-full flex-col" style={{ maxWidth: '1440px', gap: '60px' }}>
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <FooterLogo />
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#E7E7E7', letterSpacing: '0.1em' }}>
                ANVILA
              </span>
            </div>
            <p style={{ color: '#E7E7E7', fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: 'normal', maxWidth: '300px' }}>
              Builders use Anvila to turn plain descriptions into reusable AI agent packages that can be cloned, adapted, published, or kept private.
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