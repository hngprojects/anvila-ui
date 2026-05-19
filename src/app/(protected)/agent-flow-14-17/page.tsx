"use client";

import AgentGenerationFlow from "@/components/protected/agent-generation-14-17";
import { ArrowUp } from "lucide-react";

export default function AgentFlowPage() {
  return (
    <main className="bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 h-full overflow-hidden">
      
      {/* Scrollable Chat Area */}
      <div className="overflow-y-auto p-4 md:p-15 w-full mx-auto flex-1">
        <div className="text-center text-xs text-gray-400 my-2">
          Apr 29 at 12:49 AM
        </div>
        <AgentGenerationFlow />
      </div>

      {/* Bottom Input Bar */}
      <div className="w-full p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="w-full mx-auto flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 bg-white shadow-sm">
          <button className="text-gray-400 hover:text-gray-600 text-xl font-light">+</button>
          <input
            type="text"
            placeholder="Describe your agent..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700"
          />
          <button className="w-8 h-8 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shrink-0 shadow-sm">
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

    </main>
  );
}