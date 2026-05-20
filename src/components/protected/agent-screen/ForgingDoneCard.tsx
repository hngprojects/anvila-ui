"use client";

import React from "react";
import { FileIcon, ThumbsUpIcon, ThumbsDownIcon, CopyIcon, ThreeDottedIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

interface ForgingDoneCardProps {
  msgId: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export const ForgingDoneCard: React.FC<ForgingDoneCardProps> = ({
  msgId,
  copiedId,
  onCopy,
}) => {
  const successText = "Done! Successfully created content creator- Anatassia Rhodes....";
  const router = useRouter();

  return (
    <div className="flex flex-col items-start space-y-3.5 max-w-2xl mr-auto pl-2 animate-fade-in">
      <div className="bg-transparent text-[#000000] italic text-[15px] leading-relaxed text-left">
        {successText}
      </div>

      <div className="bg-white flex items-center justify-between px-4 md:px-5 py-3 md:py-0 shadow-sm border-[2.5px] border-[#A1A1AA] rounded-[15px] w-full max-w-[685px] h-auto min-h-[75px] gap-3 md:gap-0">
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 flex items-center justify-center">
            <FileIcon className="w-12 h-12 text-black" />
          </div>
          <div className="min-w-0 text-left">
            <h4 className="text-sm font-semibold text-gray-800 truncate">
              Forged Anatassia
            </h4>
            <p className="text-xs text-gray-400 truncate">
              content creator agent
            </p>
          </div>
        </div>
        <button 
          onClick={() => router.push("/generator/create-agent")}
          className="text-xs font-semibold text-[#52525B] bg-white transition-all shrink-0 cursor-pointer flex items-center justify-center border-[0.5px] border-[#52525B] rounded-[8px] w-[95px] h-[40px] py-[12px] px-[20px] gap-[8px]"
        >
          Preview
        </button>
      </div>

      <div className="flex items-center gap-3.5 text-gray-400">
        <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThumbsUpIcon className="w-[14px] h-[14px]" />
        </button>
        <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThumbsDownIcon className="w-[14px] h-[14px]" />
        </button>
        <button
          onClick={() => onCopy(successText, msgId)}
          className="hover:text-zinc-600 transition-colors relative cursor-pointer bg-transparent border-none"
        >
          <CopyIcon className="w-[14px] h-[14px]" />
          {copiedId === msgId && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-sans">
              Copied!
            </span>
          )}
        </button>
        <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
          <ThreeDottedIcon className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
};
