"use client";

import React from "react";
import { PencilIcon, RestartIcon } from "@/components/icons";

interface UserMessageProps {
  text: string;
  onRetry: () => void;
}

export const UserMessage: React.FC<UserMessageProps> = ({ text, onRetry }) => {
  return (
    <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto animate-fade-in">
      <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
        {text}
      </div>
      <div className="flex items-center gap-3 pr-2">
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none"
          title="Edit prompt"
        >
          <PencilIcon className="w-3.5 h-3.5" />
        </button>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none"
          title="Retry prompt"
          onClick={onRetry}
        >
          <RestartIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
