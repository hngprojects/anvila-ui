"use client";

import React from "react";
import MyAgentsEmptyState from "@/components/my-agents/MyAgentsEmptyState";
import MyAgentsPopulatedState from "@/components/my-agents/MyAgentsPopulatedState";
import { useAgent } from "@/context/agent";

export default function MyAgentsPage() {
  const { agents, isLoading } = useAgent();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
        <div className="w-8 h-8 border-4 border-[#1a6b5a] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
      {agents.length === 0 ? <MyAgentsEmptyState /> : <MyAgentsPopulatedState />}
    </div>
  );
}
