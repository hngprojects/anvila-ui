"use client"

import { Search, RefreshCw, HelpCircle, Sparkles } from "lucide-react";

interface NoSearchResultsEmptyStateProps {
  query?: string;
  onClear: () => void;
  onHelp?: () => void;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "Try using fewer or different keywords",
  "Check for spelling mistakes",
  "Search with a broader term",
];

const SUPPORT_EMAIL = "anvila.dev@gmail.com";
const SUPPORT_SUBJECT = "Search — I can't find what I'm looking for";
const SUPPORT_BODY = "Hi, I searched but got no results and need some help finding what I need.";

export default function NoSearchResultsEmptyState({
  query,
  onClear,
  onHelp,
  suggestions = DEFAULT_SUGGESTIONS,
}: NoSearchResultsEmptyStateProps) {
     const canClear = Boolean(onClear);


  function handleClear() {
    onClear();
  }

  // BUTTON 2 — Get support
  function handleHelp() {
    if (onHelp) {
      onHelp();
    } else {
      const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        SUPPORT_SUBJECT
      )}&body=${encodeURIComponent(SUPPORT_BODY)}`;
      window.location.href = mailto;
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#0C5D56] flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Query pill — only shows if a query was passed */}
        {query && (
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-[#0C5D56] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Search className="w-3 h-3" />
            &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          No results found
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          We couldn&apos;t find anything matching your search. Try adjusting
          your keywords or explore the suggestions below.
        </p>

        {/* Suggestions */}
        <div className="flex flex-col gap-2 mb-8 text-left">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 px-1">
            Try instead
          </p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C5D56] flex-shrink-0" />
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">

         
          <button
             type="button"
            onClick={handleClear}
              disabled={!canClear}
            className="w-full flex items-center justify-center gap-2 bg-[`#0C5D56`] hover:bg-[`#0a4d47`] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-all duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Clear search
          </button>

        
          <button
          type="button"
            onClick={handleHelp}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Get support
          </button>

        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">
            Most searches resolve with simpler keywords
          </span>
        </div>

      </div>
    </div>
  );
}
