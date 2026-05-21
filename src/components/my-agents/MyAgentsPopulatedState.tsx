"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Globe, Lock, Download } from "lucide-react";
import MyAgentsTable from "./MyAgentsTable";
import { useAgent } from "@/context/agent";

export default function MyAgentsPopulatedState() {
  const [activeTab, setActiveTab] = useState<"All" | "Public" | "Private">("All");
  const { agents } = useAgent();

  const totalCount = agents.length;
  const publicCount = agents.filter(a => a.visibility === "Public").length;
  const privateCount = agents.filter(a => a.visibility === "Private").length;
  const totalDownloads = agents.reduce((acc, curr) => acc + (curr.clone || 0), 0);

  const publicPercentage = totalCount > 0 ? Math.round((publicCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col w-full h-full bg-white md:bg-[#FBFBFB] md:p-6 overflow-y-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-[28px] font-semibold text-gray-900">My Agents</h1>
        <Link
          href="/generator"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors gap-2"
        >
          <span className="text-gray-400 text-lg leading-none">+</span> New Agent
        </Link>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Agents */}
        <div className="bg-[#F8F9F9] rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-sm text-gray-600 font-medium">Total agents</span>
            <Activity size={16} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[32px] leading-none font-medium text-gray-900 mb-2">{totalCount}</div>
            <div className="text-xs text-gray-500">+0 this week</div>
          </div>
        </div>

        {/* Public */}
        <div className="bg-[#F8F9F9] rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-sm text-gray-600 font-medium">Public</span>
            <Globe size={16} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[32px] leading-none font-medium text-gray-900 mb-2">{publicCount}</div>
            <div className="text-xs text-gray-500">{publicPercentage}% of total</div>
          </div>
        </div>

        {/* Private */}
        <div className="bg-[#F8F9F9] rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-sm text-gray-600 font-medium">Private</span>
            <Lock size={16} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[32px] leading-none font-medium text-gray-900 mb-2">{privateCount}</div>
            <div className="text-xs text-gray-500">+0%</div>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-[#F8F9F9] rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-sm text-gray-600 font-medium">Downloads (30d)</span>
            <Download size={16} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[32px] leading-none font-medium text-gray-900 mb-2 text-gray-200">{totalDownloads}</div>
            <div className="text-xs text-gray-500">+0%</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("All")}
          className={`px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
            activeTab === "All"
              ? "bg-[#005F5A] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          All agents {totalCount}
        </button>
        <button
          onClick={() => setActiveTab("Public")}
          className={`px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
            activeTab === "Public"
              ? "bg-[#005F5A] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Public {publicCount}
        </button>
        <button
          onClick={() => setActiveTab("Private")}
          className={`px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
            activeTab === "Private"
              ? "bg-[#005F5A] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Private {privateCount}
        </button>
      </div>

      {/* Data Table */}
      <MyAgentsTable filter={activeTab} agents={agents} />
    </div>
  );
}
