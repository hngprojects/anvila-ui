"use client"

import { Bot, Plus, Info, Zap, Radio, Pencil, Briefcase, Sparkles } from "lucide-react";
import type { NoRecentAgentsEmptyStateProps } from "@/types";
import { SUPPORT_SUBJECTS, SUPPORT_BODIES } from "../../../constants/support";
import { buildMailtoUrl } from "@/utils/support";

// Features stay here — they contain JSX icons
const features = [
  { icon: <Zap className="w-3.5 h-3.5 text-brand-primary" />,      title: "Instant actions",  description: "Agents run tasks automatically on your behalf" },
  { icon: <Radio className="w-3.5 h-3.5 text-brand-primary" />,    title: "Always on",        description: "Configure once and reuse across all projects" },
  { icon: <Pencil className="w-3.5 h-3.5 text-brand-primary" />,   title: "Fully custom",     description: "Set the name, role, and behaviour of each agent" },
  { icon: <Briefcase className="w-3.5 h-3.5 text-brand-primary" />, title: "Team-ready",      description: "Share agents with your team in one click" },
];

export default function NoRecentAgentsEmptyState({ onCreate, onLearn }: NoRecentAgentsEmptyStateProps) {

  function handleLearn() {
    if (onLearn) { onLearn(); return; }
    window.location.href = buildMailtoUrl(SUPPORT_SUBJECTS.agents, SUPPORT_BODIES.agents);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-brand-primary text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          No agents yet
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-3">Your agents will live here</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          You haven&apos;t created any agents yet. Agents are smart assistants you configure once and reuse across your projects.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center mb-3">{f.icon}</div>
              <p className="text-xs font-semibold text-gray-800 mb-1">{f.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={onCreate}
            className="w-full flex items-center justify-center gap-2 bg-[#0C5D56] hover:bg-[#0a4d47] active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150">
            <Plus className="w-4 h-4" />
            Create your first agent
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button type="button" onClick={handleLearn}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150">
            <Info className="w-4 h-4 text-gray-400" />
            Learn how agents work
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">Most users create their first agent in under 2 minutes</span>
        </div>
      </div>
    </div>
  );
}