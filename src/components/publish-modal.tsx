"use client";

import { useState } from "react";
import { Github } from "@/components/icons";

interface GithubPublishModalProps {
  onClose?: () => void;
  defaultTab?: "git" | "zip";
  agentName?: string;
  githubRepoUrl?: string;
  githubCloneUrl?: string;
  githubZipUrl?: string;
}

const DownloadSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M19 13V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V13M15 8L10 13L5 8M10 13V1" stroke="#E6EFEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyBoxSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
    <path d="M13.332 4.66675H6.66536C5.92898 4.66675 5.33203 5.18908 5.33203 5.83341V11.6667C5.33203 12.3111 5.92898 12.8334 6.66536 12.8334H13.332C14.0684 12.8334 14.6654 12.3111 14.6654 11.6667V5.83341C14.6654 5.18908 14.0684 4.66675 13.332 4.66675Z" stroke="#8F9492" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.66536 9.33341C1.93203 9.33341 1.33203 8.80841 1.33203 8.16675V2.33341C1.33203 1.69175 1.93203 1.16675 2.66536 1.16675H9.33203C10.0654 1.16675 10.6654 1.69175 10.6654 2.33341" stroke="#8F9492" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M0.667969 0.666748L8.66797 8.66675" stroke="#3D3E3D" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.66797 0.666748L0.667969 8.66675" stroke="#3D3E3D" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZipSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 10L7 1M7 10L4 7M7 10L10 7M1 13H13" stroke="#0C0E0D" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SuccessCheckSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4018 8.4L9.6438 4.1574L8.7954 3.309L5.4018 6.7032L3.7044 5.0058L2.856 5.8542L5.4018 8.4Z" fill="#16A34A"/>
  </svg>
);

const ErrorSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z" fill="#DC2626"/>
  </svg>
);

const ToastCloseSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g opacity="0.4">
      <path d="M7.99809 7.15164L10.9681 4.18164L11.8165 5.03004L8.84649 8.00004L11.8165 10.97L10.9681 11.8184L7.99809 8.84844L5.02809 11.8184L4.17969 10.97L7.14969 8.00004L4.17969 5.03004L5.02809 4.18164L7.99809 7.15164Z" fill="#0C0E0D"/>
    </g>
  </svg>
);

const INFO_CARDS = [
  { label: "License", value: "MIT" },
  { label: "Size", value: "42 KB" },
  { label: "Version", value: "v1.4.2" },
];

export function GithubPublishModal({
  onClose,
  defaultTab = "git",
  agentName = "Anvila/under-grad",
  githubRepoUrl = "https://github.com/Anvila/under-grad-v1",
  githubCloneUrl = "https://github.com/Anvila/under-grad-v1.git",
  githubZipUrl = "https://Anvila.dev/r/under-grad-v1/archive.zip",
}: GithubPublishModalProps) {
  const [activeTab, setActiveTab] = useState<"git" | "zip">(defaultTab);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [toastText, setToastText] = useState("");

  const isZip = activeTab === "zip";
  const zipFileName = `${agentName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "agent"}.zip`;

  const textToCopy = isZip
    ? `curl -L ${githubZipUrl} -o ${zipFileName}`
    : `git clone ${githubCloneUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  const handleAction = () => {
    const targetUrl = isZip ? githubZipUrl : githubRepoUrl;

    if (!targetUrl) {
      setToastText(isZip ? "Download URL unavailable" : "GitHub URL unavailable");
      setToast("error");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");

    setToastText(isZip ? "Download started" : "GitHub opened");
    setToast("success");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[390px]">
          <div
            className="flex items-center gap-2 px-2 py-2 rounded-[8px]"
            style={{ background: toast === "success" ? "#E8F6ED" : "#FCE9E9" }}
          >
            {toast === "success" ? <SuccessCheckSVG /> : <ErrorSVG />}
            <span className="flex-1 text-[#0C0E0D] text-[14px] font-normal leading-normal">
              {toastText || (toast === "success" ? "Action completed" : "Action failed")}
            </span>
            <button onClick={() => setToast(null)} className="cursor-pointer border-none bg-transparent p-0">
              <ToastCloseSVG />
            </button>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        <div
          className="flex flex-col bg-white w-full max-w-[512px] rounded-[16px] border border-[#8F9492] p-6 gap-[10px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full h-[75px] py-4 border-b border-[#E7E7E7]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] font-normal text-[#0C0E0D] uppercase tracking-wider">
                Clone Agent
              </span>
              <span className="text-[16px] font-normal text-[#0C0E0D]">
                {agentName}
              </span>
            </div>
            <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0">
              <CloseSVG />
            </button>
          </div>

          <div className="flex items-center w-full h-[42px] rounded-[8px] border-[0.5px] border-[#E7E7E7] p-[4px] bg-[#E7E7E7]">
            <button
              onClick={() => setActiveTab("git")}
              className={`flex flex-1 items-center justify-center gap-2 h-full rounded-[4px] text-[12px] font-medium transition-colors px-4 text-[#0C0E0D] ${
                !isZip ? "bg-white" : "bg-transparent"
              }`}
            >
              <Github className="w-4 h-4" />
              Git clone
            </button>
            <button
              onClick={() => setActiveTab("zip")}
              className={`flex flex-1 items-center justify-center gap-2 h-full rounded-[4px] text-[12px] font-medium transition-colors px-4 text-[#0C0E0D] ${
                isZip ? "bg-white" : "bg-transparent"
              }`}
            >
              <ZipSVG />
              Download ZIP
            </button>
          </div>

          <p className="text-[12px] font-normal text-[#0C0E0D] leading-[16px]">
            {isZip ? "Download the repository as a zip file." : "Clone the repository directly with git."}
          </p>

          <div className="flex items-center justify-between w-full h-[54px] rounded-[8px] border border-[#E5E6E6] py-3 px-4 bg-[#E5E6E6]">
            <span className="text-[14px] font-normal leading-[20px] flex-1 truncate mr-3" style={{ color: "#149443" }}>
              {textToCopy}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-[4px] border border-[#CBCECD] bg-transparent p-[6px] cursor-pointer"
            >
              <CopyBoxSVG />
            </button>
          </div>

          <div className="flex gap-3">
            {INFO_CARDS.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col justify-center flex-1 h-[62px] rounded-[10px] border border-[#CECFCF] p-3 gap-1 bg-[#F6F7F7]"
              >
                <span className="text-[12px] font-normal text-[#0C0E0D]">{label}</span>
                <span className="text-[12px] font-normal text-[#0C0E0D]">{value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAction}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-[8px] border-[0.5px] border-[#005F5A] bg-[#005F5A] text-[#F6F7F7] text-[18px] font-medium hover:bg-[#004D4D] transition-colors cursor-pointer"
          >
            {isZip ? (
              <>
                <DownloadSVG />
                Download
              </>
            ) : (
              <>
                <Github className="w-5 h-5 text-[#F6F7F7]" />
                Open in Github
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
