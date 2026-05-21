"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "./auth-dialog";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";
import { NavLinkProps } from "@/types";

const NAVLINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

const NavLink = ({ href, label, pathname, onClick, isMobile }: NavLinkProps) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-medium font-medium transition-opacity hover:opacity-70",
        isActive ? "text-teal-brand" : "text-zinc-700",
        isMobile && "block w-full py-2 text-base",
      )}
    >
      {label}
    </Link>
  );
};

export default function Navbar({ waitlist = false }: { waitlist?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 outline-none focus-visible:outline-none"
        >
          <Logo />
          <span className="text-lg font-bold tracking-tight text-zinc-900">Anvila</span>
        </Link>

        {/* Desktop links — centered */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} pathname={pathname} />
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {waitlist ? (
            <Link
              href="/waitlist"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Join Waitlist
            </Link>
          ) : (
            <>
              <AuthDialog
                trigger={
                  <Button
                    variant="ghost"
                    className="h-9 rounded-lg border border-zinc-200 bg-zinc-50 px-5 text-sm font-medium text-zinc-700 transition-opacity hover:opacity-80"
                  >
                    Log in
                  </Button>
                }
              />
              <AuthDialog
                trigger={
                  <Button className="h-9 rounded-lg border-none bg-teal-brand px-5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                    Get Started
                  </Button>
                }
              />
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-zinc-100 bg-white px-5 py-5 shadow-lg sm:px-8 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAVLINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                  onClick={closeMobileMenu}
                  isMobile
                />
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5 border-t border-zinc-100 pt-5">
            {waitlist ? (
              <Link
                href="/waitlist"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-teal-brand text-sm font-medium text-white"
              >
                Join Waitlist
              </Link>
            ) : (
              <>
                <AuthDialog
                  trigger={
                    <Button
                      variant="ghost"
                      className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-700"
                    >
                      Log in
                    </Button>
                  }
                />
                <AuthDialog
                  trigger={
                    <Button className="h-10 w-full rounded-lg border-none bg-teal-brand text-sm font-medium text-white">
                      Get Started
                    </Button>
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
