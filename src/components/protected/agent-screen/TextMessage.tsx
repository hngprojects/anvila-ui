"use client";

import React from "react";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  ThreeDottedIcon,
} from "@/components/icons";

interface TextMessageProps {
  id: string;
  text: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export const TextMessage: React.FC<TextMessageProps> = ({
  id,
  text,
  copiedId,
  onCopy,
}) => {
  return (
    <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto pl-2 animate-fade-in">
      <div className="bg-transparent text-zinc-600 italic text-[15px] leading-relaxed text-left">
        {text}
      </div>
      <div className="flex items-center gap-3.5 text-zinc-400">
        <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThumbsUpIcon className="w-[14px] h-[14px]" />
        </button>
        <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThumbsDownIcon className="w-[14px] h-[14px]" />
        </button>
        <button
          onClick={() => onCopy(text, id)}
          className="hover:text-zinc-600 transition-colors relative cursor-pointer bg-transparent border-none"
        >
          <CopyIcon className="w-[14px] h-[14px]" />
          {copiedId === id && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-sans">
              Copied!
            </span>
          )}
        </button>
        <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThreeDottedIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
