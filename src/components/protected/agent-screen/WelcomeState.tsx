"use client";

import React from "react";

interface WelcomeStateProps {
  onTryPrompt: () => void;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ onTryPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto space-y-5 animate-fade-in mt-12">
      <button
        onClick={onTryPrompt}
        className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#1a6b5a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 shadow-sm transition-all cursor-pointer active:scale-95"
      >
        Try: &quot;Build a content creator for skincare brand&quot;
      </button>
    </div>
  );
};
