
import { Tag, AgentCardData } from "@/types";
import { Github } from "@/components/icons";

interface AgentTagProps {
  tag: Tag;
}

export function AgentTag({ tag }: AgentTagProps) {
  return (
    <span
      className="shrink-0 truncate rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: tag.bgColor, color: tag.color, maxWidth: "130px" }}
      title={tag.label}
    >
      {tag.label}
    </span>
  );
}

interface AgentCardProps {
  agent: AgentCardData;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.10)]">
      {/* Subtle teal corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(12,93,86,0.06)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
          <Github />
        </div>
        <button className="cursor-pointer rounded-lg border-none bg-teal-brand px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-85">
          View
        </button>
      </div>

      {/* Title + description */}
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold leading-snug text-zinc-900">
          {agent.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
          {agent.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-hide">
        {agent.tags.map((tag) => (
          <AgentTag key={tag.label} tag={tag} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-zinc-100 pt-4">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-zinc-400"
        >
          <path
            d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs font-semibold text-zinc-700">
          {agent.downloads}
        </span>
        <span className="text-xs text-zinc-400">downloads</span>
      </div>
    </div>
  );
}

export function AgentCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-zinc-100" />
        <div className="h-7 w-16 animate-pulse rounded-lg bg-zinc-100" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
        <div className="h-3 w-full animate-pulse rounded bg-zinc-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-100" />
      </div>
      <div className="mt-4 flex gap-1.5">
        <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-100" />
        <div className="h-5 w-20 animate-pulse rounded-md bg-zinc-100" />
      </div>
      <div className="mt-4 border-t border-zinc-100 pt-4">
        <div className="h-3 w-24 animate-pulse rounded bg-zinc-100" />
      </div>
    </div>
  );
}

interface AgentGridProps {
  agents: AgentCardData[];
  isLoading?: boolean;
}

export function AgentGrid({ agents, isLoading = false }: AgentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <AgentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#A1A1AA" strokeWidth="1.5" />
            <path
              d="M21 21l-4.35-4.35"
              stroke="#A1A1AA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-zinc-700">No packages found</p>
        <p className="max-w-[280px] text-xs leading-relaxed text-zinc-400">
          No agent packages match this category yet. Try a different filter or
          create your own.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, idx) => (
        <AgentCard key={`${agent.title}-${idx}`} agent={agent} />
      ))}
    </div>
  );
}
