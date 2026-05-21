"use client"

import { Search, RefreshCw, HelpCircle, Sparkles } from "lucide-react";
import type { NoSearchResultsEmptyStateProps } from "@/types";
import { SUPPORT_SUBJECTS, SUPPORT_BODIES } from "../../../constants/support";
import { DEFAULT_SEARCH_SUGGESTIONS } from "../../../constants/content";
import { buildMailtoUrl } from "@/utils/support";

export default function NoSearchResultsEmptyState({
  query,
  onClear,
  onHelp,
  suggestions = DEFAULT_SEARCH_SUGGESTIONS,
}: NoSearchResultsEmptyStateProps) {

  function handleHelp() {
    if (onHelp) { onHelp(); return; }
    window.location.href = buildMailtoUrl(SUPPORT_SUBJECTS.search, SUPPORT_BODIES.search);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {query && (
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-brand-primary text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Search className="w-3 h-3" />
            &ldquo;{query}&rdquo;
          </div>
        )}

        <h1 className="text-xl font-semibold text-gray-900 mb-3">No results found</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          We couldn&apos;t find anything matching your search. Try adjusting your keywords or explore the suggestions below.
        </p>

        <div className="flex flex-col gap-2 mb-8 text-left">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 px-1">Try instead</p>
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
              <p className="text-sm text-gray-700">{s}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={onClear}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0a4d47] active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150">
            <RefreshCw className="w-4 h-4" />
            Clear search
          </button>
          <button type="button" onClick={handleHelp}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Get support
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">Most searches resolve with simpler keywords</span>
        </div>
      </div>
    </div>
  );
}