"use client";

import {
  Globe,
  Search,
  BookMarked,
  ChevronDown,
  MoreHorizontal,
  LucideBook,
  CirclePlus,
} from "lucide-react";
import { LogoIcon } from "@/components/icons";

/* ── Inline logo for the mockup ───────────────────────────────────────────── */

const MockLogo = () => (
  <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
    <path
      d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
      fill="#0C5D56"
    />
  </svg>
);

const RECENT_ITEMS = [
  "Real estate marketing ca...",
  "7 days of social media...",
  "Business plan outline...",
  "Landing page copy for...",
];

const SUGGESTION_CHIPS = [
  "No-Code Builders",
  "Prompt Engineers",
  "Startup Founders",
  "AI Engineers",
];

const NAV_ITEMS = [
  { icon: <Search size={14} />, label: "Search" },
  { icon: <Globe size={14} />, label: "Explore" },
  { icon: <BookMarked size={14} />, label: "My Agents" },
  { icon: <LucideBook size={14} />, label: "GitHub" },
];

const WHY_CARDS = [
  {
    image: "/tech.png",
    title: "From Chaos to Structure",
    body: "We replace messy, inconsistent prompts with a clean, GitHub-ready file protocol.",
    dark: false,
  },
  {
    image: "/hand.png",
    title: "Collaborative Innovation",
    body: "Through our Public Registry, we empower a global community to share and build upon the world's best AI blueprints.",
    dark: true,
  },
  {
    image: "/glass.png",
    title: "Professional Reliability",
    body: "We treat AI Agents as digital employees. By standardizing their Instruction Manuals, we ensure they remain reliable tools for businesses and builders alike.",
    dark: false,
  },
];

/* ── Dashboard Mockup ─────────────────────────────────────────────────────── */

function DashboardMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-zinc-200 p-4 shadow-sm"
      style={{
        backgroundImage:
          "radial-gradient(circle, #D4D4D8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundColor: "#F4F4F5",
      }}
    >
      <div className="flex gap-3" style={{ minHeight: "520px" }}>
        {/* Sidebar */}
        <div className="hidden w-52 shrink-0 flex-col overflow-hidden rounded-[16px] border border-zinc-200 bg-white p-4 md:flex">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MockLogo />
              <span className="text-sm font-bold tracking-tight text-zinc-900">
                Anvila
              </span>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-400">
              <ChevronDown size={11} />
            </div>
          </div>

          {/* Create button */}
          <button className="mb-5 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-teal-brand text-[11px] font-semibold text-white">
            <CirclePlus size={13} />
            Create Agent
          </button>

          {/* Nav */}
          <div className="mb-5 flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium text-zinc-500"
              >
                <span className="text-zinc-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="mb-4 h-px bg-zinc-100" />

          {/* Recent */}
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
                Recent
              </span>
              <ChevronDown size={11} className="text-zinc-400" />
            </div>
            {RECENT_ITEMS.map((item) => (
              <div
                key={item}
                className="group flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5"
              >
                <span className="truncate text-[11px] text-zinc-400">
                  {item}
                </span>
                <MoreHorizontal size={11} className="shrink-0 text-zinc-300" />
              </div>
            ))}
          </div>

          {/* User */}
          <div className="mt-auto border-t border-zinc-100 pt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-brand">
              <span className="text-[9px] font-bold text-white">DA</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold leading-none text-zinc-800">
                Dave Ash
              </p>
              <p className="mt-0.5 text-[9px] text-zinc-400">Free plan</p>
            </div>
          </div>
        </div>

        {/* Main canvas */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[16px] border border-zinc-200 bg-white px-8 py-10 text-center">
          {/* Inner dot grid + glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-[180px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.08)_0%,transparent_70%)]"
          />

          <div className="relative flex flex-col items-center gap-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-brand/15 bg-[#F0FDFA]">
              <LogoIcon className="h-4 w-4 text-teal-brand" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
              What should we build, <span className="text-teal-brand">Amy</span>
              ?
            </h2>

            {/* Input mockup */}
            <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 shadow-sm">
              <span className="text-zinc-400">
                <CirclePlus size={14} />
              </span>
              <span className="flex-1 text-left text-[12px] text-zinc-400">
                Describe your agent...
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-brand text-white">
                <span className="text-xs">↑</span>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTION_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-500"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-100 px-6 pb-20 pt-28 md:pb-24 md:pt-36">
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
        />
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.09)_0%,transparent_70%)]"
        />

        <div className="relative mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-amber-400"
            />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              About
            </span>
          </div>

          <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[56px]">
            The Standard for{" "}
            <em className="not-italic text-teal-brand">
              Portable Intelligence
            </em>
          </h1>

          <p className="max-w-[560px] text-sm leading-relaxed text-zinc-500 md:text-base">
            In the rapidly evolving world of AI, consistency is often the
            missing piece. Most AI interactions are ephemeral — temporary
            conversations lost in a chat history. At Anvila, we believe an
            AI&apos;s persona, logic, and skill-set should be permanent,
            structured, and reusable assets.
          </p>
        </div>
      </section>

      {/* ── Dashboard Mockup ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[960px] px-6 py-16 md:py-20">
        <DashboardMockup />
      </section>

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section className="border-y border-zinc-100 bg-white px-6 py-20 md:py-24">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-amber-400"
            />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              Our mission
            </span>
          </div>

          <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[48px]">
            Building the distribution layer for{" "}
            <em className="not-italic text-teal-brand">AI agents</em>.
          </h2>

          <p className="max-w-[560px] text-sm leading-relaxed text-zinc-500 md:text-base">
            We&apos;ve built the &ldquo;Forge&rdquo; that transforms natural
            language descriptions into a standardized architecture. By packaging
            an agent&apos;s Identity, Soul, and DNA into a portable file system,
            we enable developers and creators to build AI that is
            version-controlled, shareable, and ready for deployment.
          </p>
        </div>
      </section>

      {/* ── Why We Build ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-amber-400"
              />
              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                Why we build
              </span>
            </div>
            <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[44px]">
              Principles that drive us
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {WHY_CARDS.map((card) => (
              <div
                key={card.title}
                className={`flex flex-col overflow-hidden rounded-2xl ${
                  card.dark
                    ? "border border-white/15 bg-teal-brand"
                    : "border border-zinc-200 bg-white"
                }`}
              >
                {/* Image */}
                <div
                  className="h-56 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />

                {/* Text */}
                <div className="flex flex-col gap-3 p-6">
                  {/* Subtle corner glow on dark card */}
                  <h3
                    className={`text-base font-semibold ${card.dark ? "text-white" : "text-zinc-900"}`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${card.dark ? "text-white/75" : "text-zinc-500"}`}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
