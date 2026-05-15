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
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A1A]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.5612 6.875L42.1667 6.87499L42.1667 10.9185L27.3418 10.9185C26.4922 14.608 20.9133 15.6323 18.2301 15.6834C19.4195 15.6834 22.7413 15.5172 25.4939 16.5139C28.9347 17.7598"
                fill="#0C5D56"
              />
            </svg>

            <span className="text-[24px] font-bold tracking-tight text-[#0C0E0D]">
              Anvila
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Explore", "Pricing", "FAQ", "Contact Us"].map((link) => (
              <Link
                key={link}
                href="#"
                className="font-medium text-[18px] text-[#0C0E0D] hover:text-[#004D40] transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Right — CTA */}
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
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {["Home", "Explore", "Pricing", "FAQ", "Contact Us"].map((link) => (
              <Link
                key={link}
                href="#"
                className="font-medium text-[18px] text-[#0C0E0D]"
              >
                {link}
              </Link>
            ))}
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
          <h1 className="text-[60px] sm:text-5xl md:text-6xl font-medium text-black mb-8 leading-tight">
            The Standard for <br className="hidden sm:block" /> Portable
            Intelligence
          </h1>
          <p className="text-[#52525B] text-[16px] font-normal sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            In the rapidly evolving world of AI, consistency is often the
            missing piece. Most AI interactions are ephemeral temporary
            conversations lost in a chat history.
          </p>
        </section>

        {/* Dashboard Mockup */}
        <section className="mx-auto max-w-5xl px-6 mb-24 md:mb-32">
          <div
            className="relative rounded-[28px] border border-gray-200 p-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, #c8cdd4 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
              backgroundColor: "#f0f2f4",
            }}
          >
            <div className="flex gap-4" style={{ minHeight: "560px" }}>
              {/* Sidebar */}
              <div className="w-56 bg-[#E8EAED] rounded-[20px] p-5 hidden md:flex flex-col shrink-0">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[15px] text-[#0D1B1E]">Anvila</span>
                  </div>
                </div>

                <button className="w-full h-10 bg-[#004D40] text-white text-[12px] font-bold rounded-xl flex items-center justify-center gap-2 mb-6">
                  Create Agent
                </button>

                <nav className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 text-gray-500 text-[13px] font-medium">
                    <Search className="w-4 h-4" /> Search
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-[13px] font-medium">
                    <Globe className="w-4 h-4" /> Explore
                  </div>
                </nav>
              </div>

              {/* Main canvas */}
              <div className="flex-1 bg-[#E8EAED] rounded-[20px] flex items-center justify-center flex-col px-10 text-center">
                <h2 className="text-2xl md:text-[30px] font-bold mb-8 text-[#1A1A1A]">
                  What should we build, Amy?
                </h2>
                <div className="w-full max-w-lg">
                  <div className="w-full py-4 px-6 rounded-full border border-gray-200 bg-white flex items-center justify-between shadow-sm">
                    <span className="text-gray-400 text-[14px]">Describe your agent...</span>
                    <div className="w-9 h-9 bg-[#004D40] rounded-full flex items-center justify-center text-white shrink-0">
                      ↑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0C5D56] text-white pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row gap-16 mb-16">
            <div className="flex flex-col gap-6 md:w-70 shrink-0">
              <div className="flex items-center gap-3">
                <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.703 0H44V4.41112H27.8273C26.9005 8.43596 20.8145 9.55347 17.8873 9.60912" fill="white" />
                </svg>
                <span className="text-[32px] font-normal uppercase">ANVILA</span>
              </div>
              <p className="text-[16px] text-[#E7E7E7] font-normal leading-relaxed">
                Builders use Anvila to turn plain descriptions into reusable AI packages.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="flex flex-col gap-7">
                <h4 className="text-[16px] font-bold text-[#E7E7E7]">Our Services</h4>
                <ul className="flex flex-col gap-5">
                  {["Create Package", "Browse Registry", "Pricing"].map((item) => (
                    <li key={item} className="text-[#E7E7E7] hover:text-white cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="h-px bg-white/10 mb-8" />
          <p className="text-[13px] text-center md:text-left">&copy; 2026 Anvila. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};