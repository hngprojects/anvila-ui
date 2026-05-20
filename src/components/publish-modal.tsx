"use client";

import { useState } from "react";
import { Github, CopyIcon, NewDownloadIcon, DownloadZipIcon} from "@/components/icons";

interface GithubPublishModalProps {
  onClose?: () => void;
}

export function GithubPublishModal({ onClose }: GithubPublishModalProps) {
  const [activeTab, setActiveTab] = useState<"git" | "zip">("git");

  const isZip = activeTab === "zip";
  
  const textToCopy = isZip
    ? "curl -L https://Anvila.dev/r/under-grad-v1/archive.zip -o under-grad-v1.zip"
    : "git clone https://github.com/Anvila/under-grad-v1.git";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex flex-col bg-white w-full max-w-[512px] h-auto min-h-[450px] rounded-[16px] border border-[#8F9492] p-4 md:p-[24px] gap-[10px]">
        
        <div className="flex justify-between w-full h-[75px] py-[16px] border-b border-[#E7E7E7]">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#0C0E0D] tracking-wider">CLONE AGENT</span>
            <span className="text-[16px] font-medium text-[#0C0E0D]">Anvila/under-grad</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 pb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

       
        <div className="flex items-center w-full h-[42px] rounded-[8px] border-[0.5px] border-[#E4E4E7] p-[4px] gap-[6px] bg-white mt-[14px]">
          <button
            onClick={() => setActiveTab("git")}
            className={`flex flex-1 items-center justify-center gap-2 h-full rounded-[6px] text-sm font-medium transition-colors ${
              !isZip ? "bg-gray-100/80 text-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Github className="size-4"/>
            Git clone
          </button>
          <button
            onClick={() => setActiveTab("zip")}
            className={`flex flex-1 items-center justify-center gap-2 h-full rounded-[6px] text-sm font-medium transition-colors ${
              isZip ? "bg-gray-100/80 text-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <DownloadZipIcon />
            Download ZIP
          </button>
        </div>

        <div className="mt-2 text-[12px] text-gray-700 font-medium">
          {isZip ? "Download the repository as a zip file." : "Clone the repository directly with git."}
        </div>

        
        <div className="flex items-center justify-between w-full h-[54px] rounded-[8px] border border-[#E5E6E6] py-[12px] px-[16px] bg-[#E5E6E6]">
          <div className="text-[13px] font-medium text-[#4DA075] truncate mr-4">
            {textToCopy}
          </div>
          <button 
            onClick={handleCopy}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded border border-gray-300/50 hover:bg-gray-200 transition-colors bg-white/40"
          >
            <CopyIcon />
          </button>
        </div>

       
        <div className="flex gap-[12px] mt-2 mb-2">
          <div className="flex flex-col justify-center flex-1 h-[62px] rounded-[10px] border border-[#CECFCF] p-[12px] gap-[4px] bg-[#F6F7F7]">
            <span className="text-[12px] text-gray-900 font-medium w-[43px] h-[15px]">License</span>
            <span className="text-[14px] text-gray-900 font-medium">MIT</span>
          </div>

          
          <div className="flex flex-col justify-center flex-1 h-[62px] rounded-[10px] border border-[#CECFCF] p-[12px] gap-[4px] bg-[#F6F7F7]">
            <span className="text-[12px] text-gray-900 font-medium w-[43px] h-[15px]">Size</span>
            <span className="text-[14px] text-gray-900 font-medium">42 KB</span>
          </div>

          <div className="flex flex-col justify-center flex-1 h-[62px] rounded-[10px] border border-[#CECFCF] p-[12px] gap-[4px] bg-[#F6F7F7]">
            <span className="text-[12px] text-gray-900 font-medium w-[43px] h-[15px]">Version</span>
            <span className="text-[14px] text-gray-900 font-medium">v1.4.2</span>
          </div>
        </div>
 
        <button className="flex items-center justify-center font-medium transition-colors hover:bg-[#004f4a] mt-auto w-full h-[40.5px] rounded-[8px] border-[0.5px] border-[#005F5A] py-[12px] px-[20px] bg-[#005F5A] text-white gap-[8px]">
          {isZip ? (
            <>
              <NewDownloadIcon />
              Download
            </>
          ) : (
            <>
              <Github  />
              Open in Github
            </>
          )}
        </button>
      </div>
    </div>
  );
}
