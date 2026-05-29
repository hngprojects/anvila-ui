"use client";
import Link from "next/link";
import { FOOTER_COLUMNS, SOCIAL_LINKS, LEGAL_LINKS } from "@/data/footer";

function FooterLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
        fill="currentColor"
      />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="w-full bg-footer-bg text-footer-text">
      <div className="px-6 py-12 md:px-10 xl:px-20 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="text-footer-text">
                <FooterLogo />
              </span>
              <span className="text-xl font-bold text-footer-text tracking-wide">
                ANVILA
              </span>
            </div>
            <p className="text-sm font-normal text-footer-text/80 leading-relaxed max-w-xs">
              Builders use Anvila to turn plain descriptions into reusable AI
              agent packages that can be cloned, adapted, published, or kept
              private.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={social.label}
                   className="inline-flex h-11 w-11 items-center justify-center text-footer-text/70 transition-colors hover:text-footer-text"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-footer-text">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-footer-text/70 transition-colors hover:text-footer-text"
                       {...(link.isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
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
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-footer-text/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm font-normal text-footer-text/70">
            © 2026 Anvila. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-footer-text/40">•</span>}
                <Link
                  href={link.href}
                  className="text-sm font-normal text-footer-text/70 transition-colors hover:text-footer-text"
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
