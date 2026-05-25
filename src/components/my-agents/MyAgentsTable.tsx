"use client";

import { useState } from "react";
import { AgentData } from "@/interface/agent";
import { useAgent } from "@/context/agent";
import DeleteAgentModal from "../shared-components/DeleteAgentModal";
import DeleteSuccessModal from "../shared-components/DeleteSuccessModal";
import FilePreviewPanel from "../create-agent/FilePreviewPanel";
import { DEMO_FILES, MANIFEST, AGENT_TITLE, AGENT_SUBTITLE } from "@/data/agents";
import { X, Lock, Globe } from "lucide-react";

export default function MyAgentsTable({ filter, agents }: { filter: "All" | "Public" | "Private", agents: AgentData[] }) {
  const { deleteAgent } = useAgent();
  const [agentToDelete, setAgentToDelete] = useState<AgentData | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [viewingAgent, setViewingAgent] = useState<AgentData | null>(null);

  const filteredAgents = agents.filter((agent) => {
    if (filter === "All") return true;
    return agent.visibility === filter;
  });

  const handleDeleteConfirm = () => {
    if (agentToDelete) {
      deleteAgent(agentToDelete.id);
      setAgentToDelete(null);
      setShowDeleteSuccess(true);
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
                    <button
                      onClick={() => setViewingAgent(agent)}
                      className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-white transition-colors bg-white/50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setAgentToDelete(agent)}
                      className="px-3 py-1 rounded-full border border-red-200 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors bg-white/50"
                    >
                      Delete
                    </button>
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

      {/* Delete Confirmation Modal */}
      {agentToDelete && !showDeleteSuccess && (
        <DeleteAgentModal
          agentName={agentToDelete.name}
          onCancel={() => setAgentToDelete(null)}
          onConfirmDelete={handleDeleteConfirm}
        />
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccess && (
        <DeleteSuccessModal onBackToAgents={() => setShowDeleteSuccess(false)} />
      )}

      {/* Agent Preview Modal */}
      {viewingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-sm font-semibold text-gray-900 truncate">{viewingAgent.name}</h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                    viewingAgent.visibility === "Public"
                      ? "bg-green-100 text-green-700"
                      : "bg-cyan-100 text-cyan-700"
                  }`}
                >
                  {viewingAgent.visibility === "Public" ? <Globe size={10} /> : <Lock size={10} />}
                  {viewingAgent.visibility}
                </span>
              </div>
              <button
                onClick={() => setViewingAgent(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-3"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Agent title / subtitle */}
            <div className="shrink-0 border-b border-gray-100 px-5 py-3">
              <h1 className="text-sm font-semibold text-gray-900 truncate">{AGENT_TITLE}</h1>
              <p className="mt-0.5 text-xs text-gray-500 truncate">{AGENT_SUBTITLE}</p>
            </div>

            {/* FilePreviewPanel */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <FilePreviewPanel files={DEMO_FILES} manifest={MANIFEST} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
