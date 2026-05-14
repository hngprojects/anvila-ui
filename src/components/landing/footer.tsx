"use client";

import Link from "next/link";
import { LucideBook, X, LucideLink, LucideStar } from "lucide-react";
import Image from "next/image";

const ourServices = [
  {
    title: "Create Package",
    href: "#",
  },
  {
    title: "Browse Registry",
    href: "#",
  },
  {
    title: "GitHub Publishing",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Early Access",
    href: "#",
  },
];

const company = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Blog",
    href: "#",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Partners",
    href: "#",
  },
  {
    title: "Press",
    href: "#",
  },
];

const support = [
  {
    title: "GitHub",
    href: "#",
  },
  {
    title: "Twitter/X",
    href: "#",
  },
  {
    title: "LinkedIn",
    href: "#",
  },
  {
    title: "Discord",
    href: "#",
  },
  {
    title: "Product Hunt",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-primary px-6 pt-20 pb-10 text-[#E7E7E7]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex max-w-sm flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <Image
                  src="/images/footer-logo.svg"
                  alt="Agent Forge logo"
                  width={20}
                  height={20}
                  className="size-6"
                />
              </div>
              <span className="text-2xl font-bold text-white">ANVILA</span>
            </div>
            <p>
              Builders use Anvila to turn plain descriptions into
              publishing-ready agent setup packages that can be reused, cloned,
              and adapted for free.
            </p>
            <div className="flex gap-4 lg:gap-8">
              <Link href="#" className="hover:text-white">
                <LucideBook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <X size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <LucideLink size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <LucideStar size={20} />
              </Link>
            </div>
          </div>

          {/* Links Grid - 3 columns on mobile? No, the image shows them stacked or in a small grid */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {/* Platform Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-semibold">Our Services</h4>
              <div className="flex flex-col gap-5">
                {ourServices.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="hover:text-white"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-semibold">Company</h4>
              <div className="flex flex-col gap-3">
                {company.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="hover:text-white"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support Links */}
            <div className="flex flex-col">
              <h4 className="mb-4 font-semibold">Support & Legal</h4>
              <div className="flex flex-col gap-3">
                {support.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="hover:text-white"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
          <p className="text-sm">© 2024 Anvila. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
