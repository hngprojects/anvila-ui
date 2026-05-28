"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExploreResult } from "@/lib/explore";
import { AgentGrid } from "./agent-card";
import { CategoryFilter } from "./category-filter";
import { HeroSection, CTASection } from "./sections";
import { ExploreEmptyState } from "./empty-state";
import { Pagination } from "./pagination";
import { ExploreErrorState } from "./error-state";

export function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<ExploreResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
 
  const categories = useMemo(() => {
    const apiCategories = result?.categories ?? [];
    return ["All", ...apiCategories.filter((category) => category !== "All")];
  }, [result]);
 
  useEffect(() => {
    const controller = new AbortController();
 
    async function loadAgents() {
      setIsLoading(true);
      setError(null);
 
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
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult(null);
          setError(err instanceof Error ? err.message : "Failed to load agents.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }
 
    loadAgents();
 
    return () => controller.abort();
  }, [activeCategory, page, retryCount]);
 
  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Explore Reusable AI Agent Setup Packages"
        subtitle="Browse public Anvila packages for marketing, development, research, finance, and operations. Clone a setup, adapt the files, or use it as a starting point for your own agent pack"
      />
 
      <section className="bg-background" aria-labelledby="grid-heading">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-10 xl:px-20">
 
          <h2 id="grid-heading" className="sr-only">
            Browse agent packages
          </h2>
 
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
          ) : error ? (
            <ExploreErrorState
              message={error}
              onRetry={() => setRetryCount((c) => c + 1)}
            />
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
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading agent packages"
      aria-busy="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[280px] animate-pulse rounded-xl border border-copy-muted/20 bg-white"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
