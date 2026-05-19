"use client";

import React, { useState } from "react";
import AgentScreenContent from "./agent-screen";
import { CreateAgentChat } from "./createAgentChat";

export default function AgentScreenPage() {
  const [activeFlow, setActiveFlow] = useState<"radio" | "text">("radio");

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Premium Segmented Toggle Control */}
      <div className="absolute top-4 right-8 z-40 bg-white/80 backdrop-blur-md border border-zinc-200/80 p-1 rounded-full shadow-sm flex items-center gap-1">
        <button
          onClick={() => setActiveFlow("radio")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeFlow === "radio"
              ? "bg-[#1a6b5a] text-white shadow-sm"
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
        >
          Radio Choice Wizard
        </button>
        <button
          onClick={() => setActiveFlow("text")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeFlow === "text"
              ? "bg-[#1a6b5a] text-white shadow-sm"
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
        >
          Short Answer Chat
        </button>
      </div>

      {/* Render the selected flow */}
      <div className="flex-1 min-h-0 flex flex-col">
        {activeFlow === "radio" ? <AgentScreenContent /> : <CreateAgentChat />}
      </div>
    </div>
  );
}