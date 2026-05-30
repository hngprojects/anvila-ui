import type { ExplorePersona } from "@/lib/explore";
import { useState } from "react";
import { Github } from "../icons";

export function AgentTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex shrink-0 rounded-lg bg-[#F0FDFA] px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-teal-brand"
      title={label}
    >
      {label}
    </span>
  );
}

export function AgentCard({ agent }: { agent: ExplorePersona }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = agent.description && agent.description.length > 120;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-copy-muted/20 bg-white p-6">
      <div className="flex flex-col gap-3">
        <Github aria-hidden="true" />
        <h3 className="text-lg font-medium text-logo leading-none">
          {agent.name}
        </h3>

        <div>
          <p
            className={`text-sm font-normal leading-5 text-[#595959] ${
              expanded ? "" : "line-clamp-3"
            }`}
            id={`desc-${agent.id}`}
          >
            {agent.description}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls={`desc-${agent.id}`}
              className="mt-1 text-xs font-medium border-none bg-transparent cursor-pointer p-0 text-teal-brand"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
        {agent.skillNames.length > 0 ? (
          agent.skillNames
            .slice(0, 4)
            .map((skill) => <AgentTag key={skill} label={skill} />)
        ) : (
          <AgentTag label={agent.category || "agent"} />
        )}
      </div>

      <div className="mt-3 h-px w-full bg-copy-muted/10" aria-hidden="true" />

      <div className="mt-3 flex items-center justify-between">
        <div>
          <span
            className="text-base font-semibold text-[#1A1A1A]"
          >
            {agent.publishedAt
              ? new Date(agent.publishedAt).toLocaleDateString()
              : "Published"}
          </span>
          <span
            className="block text-xs font-normal text-[#595959]"
          >
            {agent.category || "Agent"}
          </span>
        </div>
        <a
          href={agent.githubRepoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${agent.name} on GitHub (opens in new tab)`}
          className="cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none"
        >
          View
        </a>
      </div>
    </div>
  );
}

interface AgentGridProps {
  agents: ExplorePersona[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
      aria-atomic="false"
    >
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
