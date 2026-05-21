"use client";

import React from "react";
import { ChevronDown, ChevronRight, FileText} from "lucide-react";
import { ThinkingAgentIcon, ThumbsUpIcon, ThumbsDownIcon, CopyIcon, ThreeDottedIcon } from "@/components/icons";

interface ForgingIdentityCardProps {
  msgId: string;
  brandName: string;
  identityExpanded: boolean;
  onToggleExpand: () => void;
  isInterrupted: boolean;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export const ForgingIdentityCard: React.FC<ForgingIdentityCardProps> = ({
  msgId,
  brandName,
  identityExpanded,
  onToggleExpand,
  isInterrupted,
  copiedId,
  onCopy,
}) => {
  const identityText = `You are a content creator designed for a skincare brand ${brandName}.\nPrimary Responsibilities:\n1. Generate multiple content materials\n2. Automate product campaigns for new collections\n3. Stay current with industry best practices and emerging trends\nCommunication Style:\nProfessional, insightful, and results-oriented.`;

  if (isInterrupted) {
    return (
      <div className="flex flex-col items-start gap-4 max-w-2xl mr-auto pl-2">
        <div className="w-full max-w-[522px] h-[320px] rounded-[15px] border-[2.5px] border-[#E4E4E7] bg-white shadow-[0px_25px_50px_-12px_rgba(142,81,255,0.1)] flex flex-col overflow-hidden gap-[8px]">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 shrink-0">
            <FileText size={18} className="text-gray-500 shrink-0" />
            <h3 className="font-semibold text-gray-700 text-sm truncate">
              Skincare brand AI content creator agent
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55 text-left">
            <div className="space-y-4">
              <div>
                <span className="text-gray-400"># Identity</span>
              </div>
              <div>
                <span className="text-gray-400"># Core Purpose</span>
                <p className="mt-1 text-gray-700 font-sans">
                  You are a content creator designed for a skincare brand {brandName}.
                </p>
              </div>
              <div>
                <span className="text-gray-400">#Primary Responsibilities</span>
                <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                  <li>Generate multiple content materials</li>
                  <li>Automate product campaigns for new collections</li>
                  <li>Stay current with industry best practices and emerging trends</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-2 text-left">
          <div className="pl-1 flex items-center gap-1.5 font-sans font-normal italic text-[18px] leading-[100%] text-[#E86E6E]">
           
            Anvila response was interrupted!
          </div>
          <div className="flex items-center gap-3.5 pl-1 text-zinc-400">
            <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
              <ThumbsUpIcon className="w-[14px] h-[14px]" />
            </button>
            <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
              <ThumbsDownIcon className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onCopy(identityText, msgId)}
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
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 max-w-2xl mr-auto pl-2">
      <button
        onClick={onToggleExpand}
        className="flex items-center gap-2.5 text-sm text-[#000000] font-medium bg-transparent border-none cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <ThinkingAgentIcon fill="#0C5D56" className="w-[14px] h-[14px]" />
        </div>
        <span className="italic">
          Generating Identity <span className="text-gray-400">files...</span>
        </span>
        {identityExpanded ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
      </button>

      {identityExpanded && (
        <div className="w-full max-w-[522px] h-[320px] rounded-[15px] border-[2.5px] border-[#E4E4E7] bg-white shadow-[0px_25px_50px_-12px_rgba(142,81,255,0.1)] flex flex-col overflow-hidden gap-[8px]">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 shrink-0">
            <FileText size={18} className="text-gray-500 shrink-0" />
            <h3 className="font-semibold text-gray-700 text-sm truncate">
              Skincare brand AI content creator agent
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
            <div className="space-y-4 text-left">
              <div>
                <span className="text-gray-400"># Identity</span>
              </div>
              <div>
                <span className="text-gray-400"># Core Purpose</span>
                <p className="mt-1 text-gray-700 font-sans">
                  You are a content creator designed for a skincare brand {brandName}.
                </p>
              </div>
              <div>
                <span className="text-gray-400">#Primary Responsibilities</span>
                <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                  <li>Generate multiple content materials</li>
                  <li>Automate product campaigns for new collections</li>
                  <li>Stay current with industry best practices and emerging trends</li>
                </ol>
              </div>
              <div>
                <span className="text-gray-400">## Communication Style</span>
                <p className="mt-1 text-gray-700 font-sans">
                  Professional, insightful, and results-oriented.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
