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

const NavLink = ({
  href,
  label,
  pathname,
  onClick,
  isMobile,
}: NavLinkProps) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-medium text-lg leading-normal transition-opacity hover:opacity-70",
        isActive ? "text-teal-brand" : "text-logo",
        isMobile && "block w-full py-2",
      )}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex w-full items-center justify-between px-5 py-3 sm:px-10 lg:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 outline-hidden focus:outline-hidden focus-visible:outline-hidden"
        >
          <Logo />
          <span className="text-xl font-bold text-logo sm:text-2xl">
            Anvila
          </span>
        </Link>

        {/* Desktop Nav Links — centered */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAVLINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                pathname={pathname}
              />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthDialog
            trigger={
              <Button
                variant="ghost"
                className="h-10 px-10 items-center justify-center rounded-lg border border-copy-muted/30 bg-muted-bg/20 font-medium text-base text-logo transition-opacity hover:opacity-80"
              >
                Log in
              </Button>
            }
          />

          <AuthDialog
            trigger={
              <Button className="h-10 px-10 items-center justify-center rounded-lg border border-primary bg-primary font-medium text-base text-white transition-opacity hover:opacity-90">
                Get Started
              </Button>
            }
          />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            width="24"
            height="24"
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
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 z-50 flex w-full flex-col border-b border-copy-muted/10 bg-background px-5 py-6 shadow-lg lg:hidden sm:px-10">
          <ul className="flex flex-col gap-4">
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

          <div className="mt-6 flex flex-col gap-3 border-t border-copy-muted/10 pt-6">
            <AuthDialog
              trigger={
                <Button
                  variant="ghost"
                  className="h-10 w-full items-center justify-center rounded-lg border border-copy-muted/30 bg-muted-bg/20 font-medium text-base text-logo"
                >
                  Log in
                </Button>
              }
            />
            <AuthDialog
              trigger={
                <Button className="h-10 w-full items-center justify-center rounded-lg border border-primary bg-primary font-medium text-base text-white">
                  Get Started
                </Button>
              }
            />
          </div>
        </div>
      )}
    </header>
  );
}
