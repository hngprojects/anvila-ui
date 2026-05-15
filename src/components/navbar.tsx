"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVLINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

const InlineLogo = ({ fill = "#0C5D56" }: { fill?: string }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
      fill={fill}
    />
  </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Standard Inter font for ALL nav text except logo
  const navLinkStyle = (isActive: boolean) => ({
    color: isActive ? "#0C5D56" : "#F6F7F7",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal" as const,
    fontWeight: 500,
    lineHeight: "normal",
    textDecoration: "none",
    transition: "opacity 0.2s",
  });

  // Hmm wait — your spec says #F6F7F7 (very light gray) for nav text, but that's
  // for the BUTTON text on the green bg. For regular nav links on white bg I'm
  // keeping them dark. If you want them all #F6F7F7 let me know.

  const navLinkOnWhite = (isActive: boolean) => ({
    color: isActive ? "#0C5D56" : "#0C0E0D",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal" as const,
    fontWeight: 500,
    lineHeight: "normal",
    textDecoration: "none",
    transition: "opacity 0.2s",
  });

  const loginBtnStyle = {
    height: "40px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "1px solid #E4E4E7",
    background: "rgba(244, 244, 245, 0.2)",
    color: "#0C0E0D",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal" as const,
    fontWeight: 500,
    lineHeight: "normal",
    cursor: "pointer",
    transition: "opacity 0.2s",
  };

  // Get Started — your exact spec
  const ctaBtnStyle = {
    height: "40px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "0.5px solid #0C5D56",
    background: "#0C5D56",
    color: "#F6F7F7",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal" as const,
    fontWeight: 500,
    lineHeight: "normal",
    cursor: "pointer",
    transition: "opacity 0.2s",
  };

  // Logo text — your exact spec: Inknut Antiqua
  const logoTextStyle = {
    color: "#0C5D56",
    fontFamily: '"Inknut Antiqua", serif',
    fontSize: "24px",
    fontStyle: "normal" as const,
    fontWeight: 400,
    lineHeight: "30px",
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <nav className="flex w-full items-center justify-between px-5 py-3 sm:px-10 lg:px-20">
        <Link href="/" className="flex items-center gap-2 shrink-0" style={{ textDecoration: "none" }}>
          <InlineLogo fill="#0C5D56" />
          <span style={logoTextStyle}>
            Anvila
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {NAVLINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href} style={navLinkOnWhite(isActive)}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" style={loginBtnStyle} className="hover:opacity-80">
            Log in
          </button>
          <button type="button" style={ctaBtnStyle} className="hover:opacity-90">
            Get Started
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="#0C0E0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#0C0E0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 z-50 flex w-full flex-col px-5 py-6 lg:hidden sm:px-10"
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {NAVLINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    style={{ ...navLinkOnWhite(isActive), display: "block", width: "100%", padding: "8px 0" }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "24px" }}>
            <button type="button" style={{ ...loginBtnStyle, width: "100%" }}>Log in</button>
            <button type="button" style={{ ...ctaBtnStyle, width: "100%" }}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}