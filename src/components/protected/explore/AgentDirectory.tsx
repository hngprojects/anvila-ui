"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Github } from "@/components/icons";
import type { ExplorePersona, ExploreResult } from "@/lib/explore";

interface AgentDirectoryProps {
  mode: "explore" | "search";
  framed?: boolean;
}

export default function AgentDirectory({ mode, framed }: AgentDirectoryProps) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<ExploreResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(() => result?.categories ?? [], [result]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        size: "12",
      });

      if (submittedQuery) params.set("search", submittedQuery);
      if (mode === "explore" && category) params.set("category", category);

      try {
        const res = await fetch(`/api/explore?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const json = await res.json();

        if (!res.ok) throw new Error(json?.message ?? "Could not load agents");

        setResult(json.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Could not load agents");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [category, mode, page, submittedQuery]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setPage(1);
    setSubmittedQuery(query.trim());
  }

  return (
    <main
      className={
        framed
          ? "flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] shadow-sm"
          : "min-h-screen bg-white"
      }
    >
      <section className={framed ? "shrink-0 border-b border-gray-200 bg-white px-5 py-5" : "bg-white px-6 py-14 md:py-20"}>
        <div className={framed ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl text-center"}>
          <h1 className={framed ? "text-2xl font-semibold text-gray-950" : "text-4xl font-semibold text-logo md:text-5xl"}>
            {mode === "search" ? "Search Published Agents" : "Explore Published Agents"}
          </h1>
          <p className={framed ? "mt-2 max-w-2xl text-sm text-gray-500" : "mx-auto mt-4 max-w-2xl text-sm leading-6 text-copy-muted"}>
            {mode === "search"
              ? "Find public personas by name, skill, category, or description."
              : "Browse public agent packages, inspect their skills, and open their GitHub repositories."}
          </p>

          <form
            onSubmit={handleSearch}
            className={framed ? "mt-5 flex max-w-2xl gap-2" : "mx-auto mt-8 flex max-w-2xl gap-2"}
          >
            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3">
              <Search size={17} className="shrink-0 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search agents..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
            <button className="h-11 rounded-lg bg-[#0C5D56] px-5 text-sm font-semibold text-white hover:bg-[#094a45]">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className={framed ? "min-h-0 flex-1 overflow-y-auto px-5 py-5" : "bg-background px-6 py-12"}>
        <div className="mx-auto max-w-6xl">
          {mode === "explore" && categories.length > 0 && (
            <div className="mb-6 flex gap-2 overflow-x-auto border-b border-gray-200 pb-2">
              <CategoryButton
                label="All"
                active={!category}
                onClick={() => {
                  setCategory("");
                  setPage(1);
                }}
              />
              {categories.map((item) => (
                <CategoryButton
                  key={item}
                  label={item}
                  active={category === item}
                  onClick={() => {
                    setCategory(item);
                    setPage(1);
                  }}
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-64 animate-pulse rounded-xl border border-gray-200 bg-white" />
              ))}
            </div>
          ) : result?.personas.length ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result.personas.map((persona) => (
                  <ExploreAgentCard key={persona.id} persona={persona} />
                ))}
              </div>
              <Pagination
                page={result.meta.page}
                pages={result.meta.pages}
                hasNext={result.meta.hasNext}
                hasPrev={result.meta.hasPrev}
                onPage={setPage}
              />
            </>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-medium text-gray-900">No agents found</p>
              <p className="mt-1 text-sm text-gray-500">Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ExploreAgentCard({ persona }: { persona: ExplorePersona }) {
  return (
    <article className="flex min-h-64 flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <Github size={22} className="mb-4 text-[#0C5D56]" />
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-gray-950">
            {persona.name}
          </h2>
          {persona.category && (
            <span className="shrink-0 rounded-full bg-[#0C5D56]/10 px-2.5 py-1 text-xs font-medium capitalize text-[#0C5D56]">
              {persona.category}
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-gray-500">
          {persona.description || "No description available."}
        </p>
      </div>

      <div>
        {persona.skillNames.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {persona.skillNames.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xs text-gray-400">
            {persona.publishedAt ? new Date(persona.publishedAt).toLocaleDateString() : "Published"}
          </span>
          {persona.githubRepoUrl ? (
            <a
              href={persona.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[#0C5D56] px-4 py-2 text-sm font-semibold text-white hover:bg-[#094a45]"
            >
              View
            </a>
          ) : (
            <button disabled className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500">
              View
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium capitalize ${
        active
          ? "border-[#0C5D56] text-[#0C5D56]"
          : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
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
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => onPage(page - 1)}
        disabled={!hasPrev}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-500">
        Page {page} of {Math.max(pages, 1)}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={!hasNext}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
