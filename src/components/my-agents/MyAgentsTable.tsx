"use client";

import { AgentData } from "@/interface/agent";
import { useAgent } from "@/context/agent";

export default function MyAgentsTable({ filter, agents }: { filter: "All" | "Public" | "Private", agents: AgentData[] }) {
  const { deleteAgent } = useAgent();
  
  const filteredAgents = agents.filter((agent) => {
    if (filter === "All") return true;
    return agent.visibility === filter;
  });

  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-[960px]">
        <div className="grid grid-cols-[1.5fr_1.5fr_1.2fr_1fr_0.8fr_minmax(140px,1.5fr)_minmax(220px,2fr)] gap-4 px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <div className="col-span-2">Agent</div>
          <div>Categories</div>
          <div>Visibility</div>
          <div>Clone</div>
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

              <div className="text-gray-600">{agent.clone}</div>

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
                  <button className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-white transition-colors bg-white/50">
                    View
                  </button>
                  <button 
                    onClick={() => deleteAgent(agent.id)}
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
  );
}
