"use client";

import React from "react";
import { ThinkingAgentIcon } from "@/components/icons";

interface ForgingStatusBubbleProps {
  type: "skills" | "personalities";
}

export const ForgingStatusBubble: React.FC<ForgingStatusBubbleProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
      <div className="flex items-center gap-2.5 text-sm text-[#000000] font-medium">
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <ThinkingAgentIcon fill="#0C5D56" className="w-[14px] h-[14px]" />
        </div>
        {type === "skills" ? (
          <span className="italic">
            Matching agent <span className="text-gray-400">skills...</span>
          </span>
        ) : (
          <span className="italic">
            Generating personalities <span className="text-gray-400">files...</span>
          </span>
        )}
      </div>
    </div>
  );
};
