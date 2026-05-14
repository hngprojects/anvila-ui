"use client";

import { useState } from "react";
import { Category, Tag, AgentCardData, AGENTS, CATEGORIES } from "./DummyData";
import { Github } from "./../icons";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 -mx-6 px-6 sm:-mx-10 sm:px-10 xl:-mx-20 xl:px-20">
      <div className="border-b border-copy-muted/20">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="relative shrink-0 cursor-pointer border-none bg-none px-4 pb-3 transition-colors"
            >
              <span
                className={
                  activeCategory === cat
                    ? "font-medium text-sm text-logo"
                    : "font-normal text-sm text-copy-muted"
                }
              >
                {cat}
              </span>
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AgentTagProps {
  tag: Tag;
}

export function AgentTag({ tag }: AgentTagProps) {
  return (
    <span
      className="shrink-0 truncate rounded-lg px-3 py-1 text-[10px] font-medium uppercase tracking-wide"
      style={{
        background: tag.bgColor,
        color: tag.color,
        maxWidth: "120px",
      }}
      title={tag.label}
    >
      {tag.label}
    </span>
  );
}

interface AgentCardProps {
  agent: AgentCardData;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  return (
    <div
      className="flex flex-col justify-between rounded-xl border border-copy-muted/20 bg-white p-6"
      style={{ height: "280px" }}
    >
      <div className="flex flex-col gap-3">
        <Github />
        <h3 className="text-lg font-medium text-logo leading-none">
          {agent.title}
        </h3>
        <p className="text-sm font-normal text-copy-muted leading-none">
          {agent.description}
        </p>
      </div>

      <div className="hide_scrollbar mt-4 flex flex-nowrap gap-2 overflow-x-auto">
        {agent.tags.map((tag) => (
          <AgentTag key={tag.label} tag={tag} />
        ))}
      </div>

      <div className="mt-3 h-px w-full bg-copy-muted/10" />

      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-base font-semibold text-logo">
            {agent.downloads}
          </span>
          <span className="block text-xs font-normal text-copy-muted">
            Downloads
          </span>
        </div>
        <button className="cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none">
          View
        </button>
      </div>
    </div>
  );
}

interface AgentGridProps {
  agents: AgentCardData[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, idx) => (
        <AgentCard key={`${agent.title}-${idx}`} agent={agent} index={idx} />
      ))}
    </div>
  );
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center bg-white px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <h1
        className="text-center text-logo font-medium max-w-[900px]"
        style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.2" }}
      >
        {title}
      </h1>
      <p className="text-center text-sm font-normal text-copy-muted max-w-[520px] mt-5 leading-5">
        {subtitle}
      </p>
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
    <section className="flex flex-col items-center bg-white px-6 py-16 md:py-20">
      <h2
        className="text-center text-logo font-medium"
        style={{ fontSize: "clamp(24px, 4vw, 36px)", lineHeight: "44px" }}
      >
        {heading}
      </h2>
      <p className="text-center text-sm font-normal text-copy-muted max-w-[420px] mt-3 leading-[22px]">
        {body}
      </p>
      <button
        onClick={onButtonClick}
        className="mt-8 cursor-pointer rounded-lg bg-teal-brand px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none"
      >
        {buttonText}
      </button>
    </section>
  );
}

export function Explore() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredAgents =
    activeCategory === "All"
      ? AGENTS
      : AGENTS.filter((a) => a.category.includes(activeCategory));

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Explore Reusable AI Agent Setup Packages"
        subtitle="Browse public AgentForge packages for marketing, development, research, finance, and operations. Clone a setup, adapt the files, or use it as a starting point for your own agent pack"
      />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-10 xl:px-20">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <AgentGrid agents={filteredAgents} />
        </div>
      </section>

      <CTASection
        heading="Can't find the setup you need?"
        body="Describe the agent setup you want, and AgentForge will help you turn it into a reusable package with files, Skills, and GitHub-ready structure."
        buttonText="Create your own package"
      />
    </main>
  );
}
