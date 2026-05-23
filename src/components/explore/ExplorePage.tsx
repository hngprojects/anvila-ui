"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Github } from "./../icons";
import { Button } from "../ui/button";
import type { ExplorePersona, ExploreResult } from "@/lib/explore";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
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

export function AgentTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex shrink-0 rounded-lg bg-[#F0FDFA] px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[#0C5D56]"
      title={label}
    >
      {label}
    </span>
  );
}

export function AgentCard({ agent }: { agent: ExplorePersona }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-copy-muted/20 bg-white p-6 h-[280px]">
      <div className="flex flex-col gap-3">
        <Github />
        <h3 className="text-lg font-medium text-logo leading-none">
          {agent.name}
        </h3>
        <p className="line-clamp-3 text-sm font-normal text-copy-muted leading-5">
          {agent.description}
        </p>
      </div>

      {/* <div className="mt-4 flex flex-wrap gap-2"> */}
      <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
        {agent.skillNames.length > 0 ? (
          agent.skillNames
            .slice(0, 4)
            .map((skill) => <AgentTag key={skill} label={skill} />)
        ) : (
          <AgentTag label={agent.category || "agent"} />
        )}
      </div>

      <div className="mt-3 h-px w-full bg-copy-muted/10" />

      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-base font-semibold text-logo">
            {agent.publishedAt
              ? new Date(agent.publishedAt).toLocaleDateString()
              : "Published"}
          </span>
          <span className="block text-xs font-normal text-copy-muted">
            {agent.category || "Agent"}
          </span>
        </div>
        {agent.githubRepoUrl ? (
          <a
            href={agent.githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none"
          >
            View
          </a>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-md bg-muted-bg px-5 py-2 text-sm font-medium text-copy-muted border-none"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

interface AgentGridProps {
  agents: ExplorePersona[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
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
      <h1 className="text-center text-xl text-logo font-medium md:text-[52px] md:leading-normal max-w-[900px]">
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
      <h2 className="text-center text-logo font-medium text-[clamp(28px,4vw,40px)] leading-[44px]">
        {heading}
      </h2>
      <p className="text-center text-sm font-normal text-copy-muted max-w-[420px] mt-3 leading-[22px]">
        {body}
      </p>
      <Button
        asChild
        onClick={onButtonClick}
        className="mt-8 cursor-pointer rounded-lg bg-teal-brand px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none"
      >
        <Link href="/register">{buttonText}</Link>
      </Button>
    </section>
  );
}

export function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<ExploreResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => {
    const apiCategories = result?.categories ?? [];
    return ["All", ...apiCategories.filter((category) => category !== "All")];
  }, [result]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAgents() {
      setIsLoading(true);

      const params = new URLSearchParams({
        page: String(page),
        size: "12",
      });

      if (activeCategory !== "All") {
        params.set("category", activeCategory);
      }

      try {
        const res = await fetch(`/api/explore?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.message ?? "Could not load published agents.");
        }

        setResult(json.data);
      } catch {
        if (!controller.signal.aborted) {
          setResult(null);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadAgents();

    return () => controller.abort();
  }, [activeCategory, page]);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Explore Reusable AI Agent Setup Packages"
        subtitle="Browse public Anvila packages for marketing, development, research, finance, and operations. Clone a setup, adapt the files, or use it as a starting point for your own agent pack"
      />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-10 xl:px-20">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(category) => {
              setActiveCategory(category);
              setPage(1);
            }}
          />

          {isLoading ? (
            <AgentGridSkeleton />
          ) : result?.personas.length ? (
            <>
              <AgentGrid agents={result.personas} />
              <Pagination
                page={result.meta.page}
                pages={result.meta.pages}
                hasNext={result.meta.hasNext}
                hasPrev={result.meta.hasPrev}
                onPage={setPage}
              />
            </>
          ) : (
            <ExploreEmptyState />
          )}
        </div>
      </section>

      <CTASection
        heading="Can't find the setup you need?"
        body="Describe the agent setup you want, and Anvila will help you turn it into a reusable package with files, Skills, and GitHub-ready structure."
        buttonText="Create your own package"
      />
    </main>
  );
}

function AgentGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[280px] animate-pulse rounded-xl border border-copy-muted/20 bg-white"
        />
      ))}
    </div>
  );
}

function ExploreEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-copy-muted/20 bg-white px-6 py-12 text-center">
      <h2 className="text-2xl font-medium text-logo">
        Publish the first agent
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-copy-muted">
        No published agent packages are available yet. Create an account to
        build and publish a reusable agent package.
      </p>
      <Link
        href="/register"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white hover:bg-primary"
      >
        Sign up
      </Link>
    </div>
  );
}

function Pagination({
  page,
  pages,
  hasNext,
  hasPrev,
  onPage,
}: {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPage: (page: number) => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        onClick={() => onPage(page - 1)}
        disabled={!hasPrev}
        className="rounded-lg border border-copy-muted/20 bg-white px-4 py-2 text-sm font-medium text-copy-muted hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-copy-muted">
        Page {page} of {Math.max(pages, 1)}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={!hasNext}
        className="rounded-lg border border-copy-muted/20 bg-white px-4 py-2 text-sm font-medium text-copy-muted hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
