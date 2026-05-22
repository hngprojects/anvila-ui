"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Globe, Lock, Download } from "lucide-react";
import MyAgentsTable from "./MyAgentsTable";
import { useAgent } from "@/context/agent";

// TODO: endpoint — GET /api/agents/stats
// Expected response: { weeklyNew: number, publicGrowth: string, privateGrowth: string, downloadsGrowth: string }
// Replace the hardcoded trend strings below ("+ 2 this week", "+12.4%") with values from this endpoint

export default function MyAgentsPopulatedState() {
  const [activeTab, setActiveTab] = useState<"All" | "Public" | "Private">("All");
  const { agents } = useAgent();

  // Derived from local agent state; will be replaced by API response when endpoint is live
  const totalCount = agents.length;
  const publicCount = agents.filter(a => a.visibility === "Public").length;
  const privateCount = agents.filter(a => a.visibility === "Private").length;
  const totalDownloads = agents.reduce((acc, curr) => acc + (curr.clone || 0), 0);

  const publicPercentage = totalCount > 0 ? Math.round((publicCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col w-full h-full bg-white md:bg-[#FBFBFB] p-4 md:p-6 overflow-y-auto">
      <header className="hidden md:flex items-center justify-between gap-4 mb-8 w-full">
        <h1 className="text-[28px] font-semibold text-gray-900">My Agents</h1>
        <Link
          href="/generator"
          className="inline-flex items-center justify-center h-[36px] rounded-lg border border-[#005F5A] bg-white px-4 text-xs font-semibold text-[#52525B] hover:bg-teal-50/50 transition-colors gap-1.5"
        >
          <span className="text-[#52525B] text-base leading-none font-medium">+</span> New Agent
        </Link>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-2 md:mt-0">
        <div className="bg-[#F4F4F5] border border-gray-200 border-t-[#C9C9C9CC] rounded-[14px] p-4 flex flex-col justify-between h-[104px] flex-1   shrink-0">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-600">Total agents</span>
            <Activity size={16} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-2xl font-bold text-gray-900 leading-none">{totalCount}</div>
            <div className="text-[10px] text-gray-500 leading-none mt-[5px]">+2 this week</div>
          </div>
        </div>

        <div className="bg-[#F4F4F5] border border-gray-200 border-t-[#C9C9C9CC] rounded-[14px] p-4 flex flex-col justify-between h-[104px] flex-1   shrink-0">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-600">Public</span>
            <Globe size={16} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-2xl font-bold text-gray-900 leading-none">{publicCount}</div>
            <div className="text-[10px] text-gray-500 leading-none mt-[5px]">{publicPercentage}% of total</div>
          </div>
        </div>

        <div className="bg-[#F4F4F5] border border-gray-200 border-t-[#C9C9C9CC] rounded-[14px] p-4 flex flex-col justify-between h-[104px] flex-1   shrink-0">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-600">Private</span>
            <Lock size={16} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-2xl font-bold text-gray-900 leading-none">{privateCount}</div>
            <div className="text-[10px] text-gray-500 leading-none mt-[5px]">+12.4%</div>
          </div>
        </div>

        <div className="bg-[#F4F4F5] border border-gray-200 border-t-[#C9C9C9CC] rounded-[14px] p-4 flex flex-col justify-between h-[104px] flex-1    shrink-0">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-gray-600">Downloads (30d)</span>
            <Download size={16} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-2xl font-bold text-gray-900 leading-none">{totalDownloads || "-"}</div>
            <div className="text-[10px] text-gray-500 leading-none mt-[5px]">+12.4%</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("All")}
          className={`transition-all duration-200 ${
            activeTab === "All"
              ? "h-[32px] w-[129px] flex items-center justify-center gap-[8px] rounded-[8px] border-[0.5px] border-[#005F5A] bg-[#005F5A] text-white text-xs font-medium"
              : "h-[32px] w-[120px] flex items-center justify-center gap-[8px] rounded-[8px] text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-xs font-medium"
          }`}
        >
          All agents {totalCount}
        </button>
        <button
          onClick={() => setActiveTab("Public")}
          className={`transition-all duration-200 ${
            activeTab === "Public"
              ? "h-[32px] w-[129px] flex items-center justify-center gap-[8px] rounded-[8px] border-[0.5px] border-[#005F5A] bg-[#005F5A] text-white text-xs font-medium"
              : "h-[32px] w-[120px] flex items-center justify-center gap-[8px] rounded-[8px] text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-xs font-medium"
          }`}
        >
          Public {publicCount}
        </button>
        <button
          onClick={() => setActiveTab("Private")}
          className={`transition-all duration-200 ${
            activeTab === "Private"
              ? "h-[32px] w-[129px] flex items-center justify-center gap-[8px] rounded-[8px] border-[0.5px] border-[#005F5A] bg-[#005F5A] text-white text-xs font-medium"
              : "h-[32px] w-[120px] flex items-center justify-center gap-[8px] rounded-[8px] text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-xs font-medium"
          }`}
        >
          Private {privateCount}
        </button>
      </div>

      <MyAgentsTable filter={activeTab} agents={agents} />
    </div>
  );
}
