"use client";

import React from "react";
import Link from "next/link";
import MyAgentsEmptyState from "@/components/my-agents/MyAgentsEmptyState";
import MyAgentsPopulatedState from "@/components/my-agents/MyAgentsPopulatedState";
import { useAgent } from "@/context/agent";
import { Bell, PanelLeftClose } from "lucide-react";

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
    <div id="my-agents-screen-root" className="h-full w-full flex flex-col bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-sm overflow-hidden">
      <header className="flex h-[56px] w-full items-center justify-between px-4 md:pl-6 md:pr-[70px] bg-white md:bg-[#F6F7F7] border-[#E7E7E7] shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
            className="flex md:hidden w-8 h-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
          
          <h1 className="hidden md:block text-sm font-bold text-gray-900">My Agents</h1>
        </div>

        <div>
          <Link
            href="/generator"
            className="inline-flex md:hidden items-center justify-center h-[32px] rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors gap-1.5"
          >
            <span className="text-gray-500 text-sm font-medium leading-none">+</span> New Agent
          </Link>

          <div className="hidden md:block relative cursor-pointer text-gray-700 hover:text-gray-900 transition-colors">
            <Bell size={20} className="stroke-[1.5]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#22c55e] rounded-full ring-1 ring-white" />
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {agents.length === 0 ? <MyAgentsEmptyState /> : <MyAgentsPopulatedState />}
      </div>
    </div>
  );
}

