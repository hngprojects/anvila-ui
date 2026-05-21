"use client";

import React from "react";
import { Plus, Square, ArrowUp } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  onInterrupt: () => void;
  isThinking: boolean;
  isForgingActive: boolean;
  isQuestionnaireActive: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onInterrupt,
  isThinking,
  isForgingActive,
  isQuestionnaireActive,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isQuestionnaireActive) {
      onSend();
    }
  };

  return (
    <div className="px-4 md:px-6 py-3 md:py-5 bg-[#FBFBFB] md:border-t md:border-gray-100 shrink-0">
      <div className="w-full max-w-[917px] mx-auto">
        <div className="flex items-center border border-[var(--fg-subtle,#A1A1AA)] bg-white shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200/20 transition-all w-full max-w-[917px] h-auto min-h-[56px] md:min-h-[64px] rounded-[50px] py-2 px-4 md:px-[24px] gap-[10px]">
          <button
            className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer bg-transparent border-none"
            title="Attach file"
          >
            <Plus size={18} />
          </button>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your agent..."
            disabled={isQuestionnaireActive}
            className={`flex-1 text-base md:text-[20px] font-medium leading-[100%] bg-transparent outline-none text-gray-800 placeholder-gray-400 tracking-normal font-sans min-w-0 ${
              isQuestionnaireActive ? "cursor-not-allowed opacity-50" : ""
            }`}
            onKeyDown={handleKeyDown}
          />

          {isThinking || isForgingActive ? (
            <button
              onClick={onInterrupt}
              className="w-9 h-9 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shadow-md hover:bg-[#124e42] transition-all shrink-0 cursor-pointer border-none"
              title="Stop generation"
            >
              <Square size={13} fill="white" className="text-white" />
            </button>
          ) : (
            <button
              onClick={onSend}
              disabled={isQuestionnaireActive}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer border-none ${
                isQuestionnaireActive
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  : "bg-[#1a6b5a] text-white hover:bg-[#124e42] active:scale-95"
              }`}
              title="Send description"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
