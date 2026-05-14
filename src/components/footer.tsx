//TODO: redesign
"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "@/components/icons";

function FooterLogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099
        fill="#E7E7E7"
      />
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      { label: "Create Package", href: "#" },
      { label: "Browse Registry", href: "/explore" },
      { label: "GitHub Publishing", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Early Access", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#" },
      { label: "FAQ", href: "/faq" },
      { label: "Contacts", href: "/contact" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Product Hunt", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cookies Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A4A44]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 xl:px-20 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <FooterLogoIcon />
              <span className="text-xl font-bold text-[#E7E7E7] tracking-wide">
                ANVILA
              </span>
            </div>
            <p className="text-sm font-normal text-[#E7E7E7]/80 leading-relaxed max-w-xs">
              Builders use Anvila to turn plain descriptions into reusable AI
              agent packages that can be cloned, adapted, published, or kept
              private.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[#E7E7E7]/70 transition-colors hover:text-[#E7E7E7]"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-[#E7E7E7]">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-[#E7E7E7]/70 transition-colors hover:text-[#E7E7E7]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-[#E7E7E7]/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm font-normal text-[#E7E7E7]/70">
            © 2026 Anvila. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#E7E7E7]/40">•</span>}
                <Link
                  href={link.href}
                  className="text-sm font-normal text-[#E7E7E7]/70 transition-colors hover:text-[#E7E7E7]"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
