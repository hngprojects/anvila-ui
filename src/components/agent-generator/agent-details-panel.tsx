"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AgentDraft } from "@/data/demo-agent";

type AgentDetailsPanelProps = {
  agent: AgentDraft;
  className?: string;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border-subtle/80 py-3 last:border-0">
      <span className="text-[11px] font-medium uppercase tracking-wide text-copy-muted">
        {label}
      </span>
      <span className="text-sm font-medium text-logo">{value}</span>
    </div>
  );
}

export function AgentDetailsPanel({ agent, className }: AgentDetailsPanelProps) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-1 gap-0 overflow-hidden rounded-2xl bg-dashboard-surface shadow-sm",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-logo">{agent.name}</h2>
          <p className="mt-1 text-sm text-copy-muted">{agent.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-copy-muted">
            Available Models
          </h3>
          <ul className="space-y-2">
            {agent.models.map((model) => (
              <li key={model.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={model.selected}
                  readOnly
                  className="size-4 rounded border-border-subtle text-teal-brand accent-teal-brand"
                />
                <span className="text-logo">{model.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-copy-muted">
            Instructions
          </h3>
          <p className="mb-3 text-sm font-medium text-logo">Main Goal</p>
          <p className="mb-4 text-sm leading-relaxed text-copy-muted">
            {agent.mainGoal}
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-copy-muted">
            {agent.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="w-[200px] shrink-0 border-l border-border-subtle bg-background/50 p-4 sm:w-[220px]">
        <DetailRow label="Name" value={agent.name} />
        <DetailRow label="Model" value={agent.model} />
        <DetailRow label="Version" value={agent.version} />
        <DetailRow label="Status" value={agent.status} />

        <div className="mt-4">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-copy-muted">
            Skills &amp; Capabilities
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.map((skill) => (
              <Badge key={skill.id} variant="skill">
                {skill.label}
              </Badge>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
