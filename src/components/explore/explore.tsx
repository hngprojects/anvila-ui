"use client";

import { useState } from "react";
import { AGENTS, CATEGORIES } from "@/data/agents";
import { Category } from "@/types";
import { CategoryFilter } from "./category-filter";
import { AgentGrid } from "./agent-card";


interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-100 bg-[#FAFAFA] px-6 pb-14 pt-16 md:pb-16 md:pt-24">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
      />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.08)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-brand/20 bg-[#F0FDFA] px-3.5 py-1.5 text-xs font-medium text-teal-brand">
          <span
            aria-hidden
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-brand"
          />
          Public registry
        </div>
        <h1
          className="font-semibold tracking-tight text-zinc-900"
          style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: "1.15" }}
        >
          {title}
        </h1>
        <p className="max-w-[500px] text-sm leading-relaxed text-zinc-500 md:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

interface CTASectionProps {
  heading: string;
  body: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function CTASection({
  heading,
  body,
  buttonText,
  onButtonClick,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-teal-brand px-6 py-20">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]"
      />

      <div className="relative mx-auto flex max-w-[600px] flex-col items-center gap-4 text-center">
        <h2
          className="font-semibold tracking-tight text-white"
          style={{ fontSize: "clamp(22px, 4vw, 36px)", lineHeight: "1.2" }}
        >
          {heading}
        </h2>
        <p className="max-w-[400px] text-sm leading-relaxed text-white/70 md:text-base">
          {body}
        </p>
        <button
          onClick={onButtonClick}
          className="group mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border-none bg-white px-7 py-3 text-sm font-semibold text-teal-brand transition-opacity hover:opacity-90"
        >
          {buttonText}
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}

export function Explore() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // TODO: replace with API call
  const filteredAgents =
    activeCategory === "All"
      ? AGENTS
      : AGENTS.filter((a) => a.category.includes(activeCategory));

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Explore Reusable AI Agent Setup Packages"
        subtitle="Browse public packages for marketing, development, research, finance, and operations. Clone a setup, adapt the files, or use it as a starting point for your own agent pack."
      />

      <section className="bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-12 sm:px-8">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          {/* TODO: pass isLoading={true} while API data is fetching */}
          <AgentGrid agents={filteredAgents} />
        </div>
      </section>

      <CTASection
        heading="Can't find the setup you need?"
        body="Describe the agent setup you want and Anvila will help you turn it into a reusable package with files, Skills, and GitHub-ready structure."
        buttonText="Create your own package"
      />
    </main>
  );
}
