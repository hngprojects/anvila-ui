"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Globe, Lock, Download } from "lucide-react";
import MyAgentsTable from "./MyAgentsTable";
import { useAgent } from "@/context/agent";

function buildPageWindow(currentPage: number, totalPages: number): (number | "...")[] {
  const delta = 2;
  const range: number[] = [];
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }
  const pages: (number | "...")[] = [1];
  if (range.length > 0 && range[0] > 2) pages.push("...");
  pages.push(...range);
  if (range.length > 0 && range[range.length - 1] < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export default function MyAgentsPopulatedState() {
  const [activeTab, setActiveTab] = useState<"All" | "Public" | "Private">("All");
  const {
    agents,
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    goToPage,
    statusFilter,
    setStatusFilter,
  } = useAgent();

  const totalCount = agents.length;
  const publicCount = agents.filter(a => a.visibility === "Public").length;
  const privateCount = agents.filter(a => a.visibility === "Private").length;
  const totalDownloads = agents.reduce((acc, curr) => acc + (curr.clone || 0), 0);

  const publicPercentage = totalCount > 0 ? Math.round((publicCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col w-full h-full bg-white md:bg-[#FBFBFB] p-4 md:p-6 overflow-y-auto">
      <header className="hidden md:flex items-center justify-between gap-4 mb-8 w-full">
        <h1 className="text-[28px] font-semibold text-gray-900">My Agents</h1>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-[36px] rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 outline-none focus:border-[#005F5A]"
            aria-label="Filter agents by status"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="needs_clarification">Needs clarification</option>
            <option value="generating">Generating</option>
            <option value="skills_matching">Skills matching</option>
            <option value="generated">Generated</option>
            <option value="published">Published</option>
            <option value="failed">Failed</option>
          </select>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center h-[36px] rounded-lg border border-[#005F5A] bg-white px-4 text-xs font-semibold text-[#52525B] hover:bg-teal-50/50 transition-colors gap-1.5"
          >
            <span className="text-[#52525B] text-base leading-none font-medium">+</span> New Agent
          </Link>
        </div>
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

      {totalPages > 1 && (
        <nav aria-label="Agents pagination" className="flex items-center justify-center gap-2 py-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
            className="h-[32px] px-3 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {buildPageWindow(currentPage, totalPages).map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="h-[32px] w-[32px] flex items-center justify-center text-xs text-gray-400">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`h-[32px] w-[32px] rounded-lg text-xs font-medium transition-colors ${
                  page === currentPage
                    ? "bg-[#005F5A] text-white border border-[#005F5A]"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!hasNext}
            aria-label="Next page"
            className="h-[32px] px-3 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
