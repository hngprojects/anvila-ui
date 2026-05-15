"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Globe,
  Search,
  BookMarked,
  ChevronDown,
  MoreHorizontal,
  LucideBook,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AnvilaLogo = ({ color = "#0C5D56", size = 44 }: { color?: string; size?: number }) => (
  <svg width={size} height={Math.round(size * 33 / 44)} viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.703 0L44 0L44 4.41112L27.8273 4.41112C26.9005 8.43596 20.8145 9.55347 17.8873 9.60912C19.1848 9.60912 22.8086 9.4279 25.8115 10.5152C29.565 11.8743 32.4381 15.8562 31.8589 22.461C31.3955 27.7448 35.5893 31.6886 37.7441 33L14.1569 33L14.1569 28.0643C14.1569 28.0643 18.119 28.3218 23.3091 26.3953C29.7967 23.987 26.9005 14.7832 21.8262 14.1633C16.4971 13.5122 2.22433 8.72689 0 4.41112L23.703 4.41112L23.703 0Z"
      fill={color}
    />
  </svg>
);

export const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A1A]">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <AnvilaLogo color="#0C5D56" size={36} />
            <span className="text-[22px] font-bold tracking-tight text-[#0C0E0D]">
              Anvila
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Explore", "Pricing", "FAQ", "Contact Us"].map((link) => (
              <Link
                key={link}
                href="#"
                className="font-medium text-[15px] text-[#0C0E0D] hover:text-[#004D40] transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden md:flex h-9 px-5 text-sm font-semibold text-gray-600 border-gray-200 rounded-lg"
            >
              Log in
            </Button>
            <Button className="hidden md:flex h-9 px-5 text-sm font-semibold bg-[#004D40] hover:bg-[#003632] text-white rounded-lg">
              Get Started
            </Button>
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {["Home", "Explore", "Pricing", "FAQ", "Contact Us"].map((link) => (
              <Link key={link} href="#" className="font-medium text-[15px] text-[#0C0E0D]">
                {link}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="outline" className="w-full text-sm font-semibold">Log in</Button>
              <Button className="w-full text-sm font-semibold bg-[#004D40] text-white">Get Started</Button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24">

        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 text-center py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#A1A1AA] mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#52525B]">
              About
            </span>
          </div>
          <h1 className="text-5xl md:text-[60px] font-medium text-[#000000] mb-8 leading-tight">
            The Standard for <br className="hidden sm:block" /> Portable Intelligence
          </h1>
          <p className="text-[#52525B] text-[16px] font-normal max-w-2xl mx-auto leading-relaxed">
            In the rapidly evolving world of AI, consistency is often the missing piece.
            Most AI interactions are ephemeral temporary conversations lost in a chat history.
            At Anvila, we believe that an AI&apos;s persona, logic, and skill-set should be
            more than just a fleeting prompt. They should be permanent, structured, and reusable assets.
          </p>
        </section>

        {/* Dashboard Mockup */}
        <section className="mx-auto max-w-5xl px-6 mb-24 md:mb-32">
          <div
            className="relative rounded-[28px] border border-gray-200 p-5"
            style={{
              backgroundImage: "radial-gradient(circle, #c8cdd4 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
              backgroundColor: "#f0f2f4",
            }}
          >
            <div className="flex gap-4" style={{ minHeight: "560px" }}>

              {/* Sidebar */}
              <div className="w-56 bg-white rounded-[20px] p-5 hidden md:flex flex-col shrink-0">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <AnvilaLogo color="#0C5D56" size={28} />
                    <span className="font-bold text-[15px] text-[#0D1B1E]">Anvila</span>
                  </div>
                  <button className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-[11px] font-bold">
                    &#91;&#8592;&#93;
                  </button>
                </div>

                <button className="w-full h-10 bg-[#004D40] text-white text-[12px] font-bold rounded-xl flex items-center justify-center gap-2 mb-6">
                  <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[11px] leading-none">+</div>
                  Create Agent
                </button>

                <div className="flex flex-col gap-5 mb-6">
                  {[
                    { icon: <Search className="w-4 h-4" />, label: "Search" },
                    { icon: <Globe className="w-4 h-4" />, label: "Explore" },
                    { icon: <BookMarked className="w-4 h-4" />, label: "My Agents" },
                    { icon: <LucideBook className="w-4 h-4" />, label: "GitHub" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-gray-500 text-[13px] font-medium">
                      <span className="text-gray-400">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-100 mb-5" />

                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Recent</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  {[
                    "Real estate marketing ca...",
                    "7 days of social media...",
                    "Business plan outline...",
                    "Landing page copy for...",
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between py-1 cursor-pointer group">
                      <span className="text-[12px] text-gray-400 truncate flex-1 group-hover:text-gray-600 transition-colors">{item}</span>
                      <MoreHorizontal className="w-3.5 h-3.5 text-gray-300 shrink-0 ml-1" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1a2c11] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">DA</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-700 leading-none">Dave Ash</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Premium</p>
                  </div>
                </div>
              </div>

              {/* Main canvas */}
              <div className="flex-1 bg-[#E8EAED] rounded-[20px] flex items-center justify-center flex-col px-10 text-center">
                <h2 className="text-2xl md:text-[30px] font-bold mb-8 text-[#1A1A1A]">
                  What should we build, Amy?
                </h2>
                <div className="w-full max-w-lg">
                  <div className="w-full py-4 px-6 rounded-full border border-gray-200 bg-white flex items-center justify-between shadow-sm">
                    <span className="flex items-center gap-3 text-gray-400 text-[14px]">
                      <span className="text-gray-300 text-lg leading-none">+</span>
                      Describe your agent...
                    </span>
                    <div className="w-9 h-9 bg-[#004D40] rounded-full flex items-center justify-center text-white text-base shrink-0">↑</div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 mt-6">
                  {["No-Code Builder", "Prompt Engineering", "Startup Founders", "AI Engineers"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-white text-[12px] text-[#52525B] font-medium rounded-full border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-3xl px-6 text-center mb-24 md:mb-32">
          <h2 className="text-4xl md:text-[60px] font-medium mb-8 text-[#000000]">Our Mission</h2>
          <p className="text-[#52525B] text-[16px] leading-relaxed">
            Our mission is to provide the distribution layer for the next generation of AI Agents.
            We&apos;ve built the &quot;Forge&quot; that transforms natural language descriptions into a
            standardized architecture. By packaging an agent&apos;s Identity, Soul, and DNA into a
            portable file system, we enable developers and creators to build AI that is version
            controlled, shareable, and ready for deployment.
          </p>
        </section>

        {/* Why we Build */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-40">
          <h2 className="text-4xl md:text-[60px] font-medium text-center mb-12 md:mb-20 text-[#000000]">
            Why we Build
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">

            {/* Card 1 */}
            <div className="bg-white rounded-[20px] border border-gray-100 flex flex-col overflow-hidden shadow-sm">
              <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/tech.png')" }} />
              <div className="p-8">
                <h3 className="text-[20px] font-semibold mb-3 text-[#000000]">From Chaos to Structure</h3>
                <p className="text-[#52525B] text-[16px] font-normal leading-relaxed">
                  We replace messy, inconsistent prompts with a clean, GitHub ready file protocol.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[20px] flex flex-col overflow-hidden shadow-sm">
              <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/hand.png')" }} />
              <div className="p-8 bg-[#0C5D56]">
                <h3 className="text-[20px] font-semibold mb-3 text-white">Collaborative Innovation</h3>
                <p className="text-white/80 text-[16px] font-normal leading-relaxed">
                  Through our Public Registry, we empower a global community to share and build
                  upon the world&apos;s best AI blueprints.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] border border-gray-100 flex flex-col overflow-hidden shadow-sm">
              <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/glass.png')" }} />
              <div className="p-8">
                <h3 className="text-[20px] font-semibold mb-3 text-[#000000]">Professional Reliability</h3>
                <p className="text-[#52525B] text-[16px] font-normal leading-relaxed">
                  We treat AI Agents as digital employees. By standardizing their &quot;Instruction
                  Manuals,&quot; we ensure they remain reliable tools for businesses and builders alike.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0C5D56] text-white pt-16 md:pt-20 pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 mb-16 md:mb-20">

            {/* Left */}
            <div className="flex flex-col gap-6 md:w-70 shrink-0">
              <div className="flex items-center gap-3">
                <AnvilaLogo color="white" size={36} />
                <span className="text-[28px] font-normal uppercase tracking-wider text-white">ANVILA</span>
              </div>
              <p className="text-[16px] text-[#E7E7E7] font-normal leading-relaxed">
                Builders use Anvila to turn plain descriptions into reusable AI agent packages
                that can be cloned, adapted, published, or kept private.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white hover:text-white/60 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/60 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/60 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/60 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — 3 columns */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
              <div className="flex flex-col gap-7">
                <h4 className="text-[16px] font-bold text-[#E7E7E7] tracking-wide">Our Services</h4>
                <ul className="flex flex-col gap-5">
                  {["Create Package", "Browse Registry", "GitHub Publishing", "Pricing", "Early Access"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-[16px] text-[#E7E7E7] font-normal hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-7">
                <h4 className="text-[16px] font-bold text-[#E7E7E7] tracking-wide">Company</h4>
                <ul className="flex flex-col gap-5">
                  {["Home", "About Us", "FAQ", "Contacts", "Partners"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-[16px] text-[#E7E7E7] font-normal hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-7">
                <h4 className="text-[16px] font-bold text-[#E7E7E7] tracking-wide">Support &amp; Legal</h4>
                <ul className="flex flex-col gap-5">
                  {["GitHub", "Twitter / X", "Linkedin", "Discord", "Product Hunt"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-[16px] text-[#E7E7E7] font-normal hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#F6F7F7]/30 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-white font-normal">&copy; 2026 Anvila. All rights reserved.</p>
            <div className="flex items-center gap-5 text-[13px] text-white font-normal">
              <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <Link href="#" className="hover:text-white/70 transition-colors">Terms of service</Link>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <Link href="#" className="hover:text-white/70 transition-colors">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};