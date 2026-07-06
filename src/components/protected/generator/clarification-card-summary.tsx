"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, MessageSquareText } from "lucide-react";

export interface ClarificationSummaryItem {
  question: string;
  answer: string;
}

interface ClarificationSummaryCardProps {
  round?: number;
  items: ClarificationSummaryItem[];
}

export default function ClarificationSummaryCard({
  round,
  items,
}: ClarificationSummaryCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="mr-auto w-full max-w-2xl rounded-[14px] border-2 border-[#B1B5B4] bg-[#F4F4F5] shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <MessageSquareText size={15} className="shrink-0 text-[#0C5D56]" />
        <p className="text-sm font-semibold text-[#050605]">
          Clarification round {round ?? 1}
        </p>
        <span className="ml-auto text-xs font-medium text-[#050605]">
          {items.length} questions
        </span>
        {expanded ? (
          <ChevronDown size={15} className="shrink-0 text-[#050605]" />
        ) : (
          <ChevronRight size={15} className="shrink-0 text-[#050605]" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-[#E4E4E7] px-4 py-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-[#E4E4E4] py-3 last:border-b-0"
            >
              <p className="text-xs text-[#050605]">{item.question}</p>
              <p className="mt-1 text-sm font-medium text-[#050605]">
                {item.answer ? (
                  item.answer
                ) : (
                  <span className="font-normal italic text-gray-400">
                    No answer
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
