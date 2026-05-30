"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AgentData } from "@/interface/agent";
import { useAgent } from "@/context/agent";
import DeleteAgentModal from "@/components/shared-components/DeleteAgentModal";
import DeleteSuccessModal from "@/components/shared-components/DeleteSuccessModal";
import { Button } from "@/components/ui/button";

export default function MyAgentsTable({
  filter,
  agents,
  onDeleteAgent,
}: {
  filter: "All" | "Public" | "Private";
  agents: AgentData[];
  onDeleteAgent?: (id: string) => Promise<void> | void;
}) {
  const { deleteAgent } = useAgent();
  const [pendingDeleteAgentId, setPendingDeleteAgentId] = useState<string | null>(null);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const filteredAgents = agents.filter((agent) => {
    if (filter === "All") return true;
    return agent.visibility === filter;
  });

  const pendingDeleteAgent = useMemo(
    () => agents.find((agent) => agent.id === pendingDeleteAgentId) ?? null,
    [agents, pendingDeleteAgentId]
  );

  const handleConfirmDelete = async () => {
    if (!pendingDeleteAgent || isDeleting) return;
    setIsDeleting(true);
    try {
      if (onDeleteAgent) {
        await onDeleteAgent(pendingDeleteAgent.id);
      } else {
        await deleteAgent(pendingDeleteAgent.id);
      }
      setPendingDeleteAgentId(null);
      setIsDeleteSuccessOpen(true);
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto pb-8">
        <div className="min-w-[960px]">
        <div className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_0.8fr_minmax(140px,1.5fr)_minmax(220px,2fr)] gap-4 px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <div className="col-span-2">Agent</div>
          <div>Categories</div>
          <div>Visibility</div>
          <div>Status</div>
          <div>Owners</div>
          <div className="flex justify-between items-center w-full col-span-1">
            <span>Created</span>
            <span className="ml-4">Actions</span>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_0.8fr_minmax(140px,1.5fr)_minmax(220px,2fr)] gap-4 px-5 py-4 items-center bg-[#F8F9F9] rounded-xl text-sm"
            >
              <div className="col-span-2 font-semibold text-gray-900 truncate">
                {agent.name}
              </div>

              <div className="text-gray-600 truncate">{agent.categories}</div>

              <div>
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    agent.visibility === "Public"
                      ? "bg-green-100 text-green-700"
                      : "bg-cyan-100 text-cyan-700"
                  }`}
                >
                  {agent.visibility}
                </span>
              </div>

              <div className="text-gray-600 capitalize">
                {agent.status ? agent.status.replace(/_/g, " ") : "-"}
              </div>

              <div className="flex items-center gap-2 min-w-0 shrink-0">
                {agent.owners.map((owner, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${owner.color}`}
                    >
                      {owner.initials}
                    </div>
                    <span className="text-gray-600 text-xs">{owner.username}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center w-full col-span-1 min-w-0 shrink-0">
                <span className="text-gray-600">{agent.created}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild variant="outline" size="sm" className="rounded-full border-gray-200 px-3 text-xs font-medium text-gray-700 bg-white/50">
                    <Link href={`/generator/${agent.id}`}>View</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingDeleteAgentId(agent.id)}
                    className="rounded-full border-red-200 px-3 text-xs font-medium text-red-500 hover:bg-red-50 bg-white/50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAgents.length === 0 && (
            <div className="py-8 text-center text-gray-500 text-sm bg-[#F8F9F9] rounded-xl">
              No agents found for this filter.
            </div>
          )}
        </div>
      </div>
      </div>

      {pendingDeleteAgent && (
        <DeleteAgentModal
          agentName={pendingDeleteAgent.name}
          isDeleting={isDeleting}
          onCancel={() => {
            if (isDeleting) return;
            setPendingDeleteAgentId(null);
          }}
          onConfirmDelete={handleConfirmDelete}
        />
      )}

      {isDeleteSuccessOpen && (
        <DeleteSuccessModal onBackToAgents={() => setIsDeleteSuccessOpen(false)} />
      )}
    </>
  );
}
