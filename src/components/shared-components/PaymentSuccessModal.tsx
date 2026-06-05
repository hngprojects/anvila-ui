import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, Copy, Check, Box, ArrowUpFromLine } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  repoUrl?: string;
  licenseType?: string;
  sshKeyType?: string;
  versionNumber?: string;
  githubUrl?: string;
  onPublish?: () => void;
  onDownloadZip?: () => void;
  isPublishing?: boolean;
}

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.708.069-.708 1.003.708 1.53 1.038 1.53 1.038.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 4.484 17.522 2 12 2z" />
  </svg>
);

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  agentName = "Anvila/under-grad",
  repoUrl = "https://agentforge.dev/raw/anvila-grad-v1/archive.zip",
  licenseType = "MIT",
  sshKeyType = "4096",
  versionNumber = "v1.4.2",
  githubUrl = "https://github.com/Anvila/under-grad",
  onPublish,
  onDownloadZip,
  isPublishing = false,
}: PaymentSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousBodyOverflowRef = useRef<string>("");

  // lock body scroll
  useEffect(() => {
    if (isOpen) {
    previousFocusRef.current = document.activeElement as HTMLElement;
    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousFocusRef.current?.focus();
    };
    }
  }, [isOpen, onClose]);

  // Clean timeout
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const curlCommand = `curl -L ${repoUrl} -o under-grad-v1.zip`;

  const handleCopyCommand = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Main Container Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-card-title"
        className="relative w-full max-w-[440px] my-auto transform overflow-hidden rounded-2xl bg-white p-5 shadow-2xl transition-all text-left outline-none sm:p-8"
      >
        {/* Header Elements */}
        <div className="flex items-start gap-3 mb-5">
          <div className="rounded-full bg-[#E6F4F0] p-1.5 mt-0.5 shrink-0">
            <CheckCircle2 className="h-5 w-5 text-[#004D4D]" />
          </div>
          <div className="min-w-0">
            <h2 id="success-card-title" className="text-lg font-bold text-[#101828] truncate">
              Payment Successful
            </h2>
            <p className="text-sm text-[#667085] mt-0.5 break-words">
              Your agent is now private.
            </p>
          </div>
        </div>

        {/* Detailed Spec Area */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4 space-y-4">
          
          {/* Item Info Header */}
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-3.5 gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-black block">
                Clone Agent
              </span>
              <span className="text-sm text-black mt-0.5 block truncate">
                {agentName}
              </span>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 px-2.5 py-1 text-xs font-semibold text-[#004D4D]">
                Private
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B9B48]" />
              </span>
            </div>
          </div>

          {/* ZIP & Github clone */}
          <div className="p-1 text-sm rounded-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between shadow-sm bg-[#CBCECD] gap-1 sm:gap-2">
            <div className="flex items-center gap-2.5 p-2 text-black font-semibold text-xs shrink-0">
              <GitHubIcon className="h-4 w-4 text-slate-700" />
              Git Clone
            </div>
            <button
              type="button"
              onClick={onDownloadZip}
              disabled={!onDownloadZip}
              className="inline-flex items-center gap-2 justify-center rounded-sm bg-[#F6F7F7] hover:bg-white px-3.5 py-1.5 text-xs font-bold text-black transition-all shadow-sm"
            >
              <Box className="h-3.5 w-3.5" />  
              Download ZIP
            </button>
          </div>

          {/* Code Shell Display Container */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs text-black block">
              Clone the repository directly with git.
            </span>
            <div className="flex items-start justify-between gap-3 rounded bg-[#A1A1AA] p-2 font-mono text-[11px] text-[#344054]">
              <span className="break-all select-all text-white font-medium pr-1 pt-0.5 leading-normal">
                {curlCommand}
              </span>
              <button
                type="button"
                onClick={handleCopyCommand}
                aria-label="Copy input code"
                className="shrink-0 rounded-lg border border-slate-200 bg-white p-1.5 text-[#667085] hover:text-[#344054] shadow-sm transition-all active:scale-95"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Metric Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200/60 bg-white p-2 sm:p-2.5 text-center min-w-0">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide truncate">
                License
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block truncate">
                {licenseType}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-2 sm:p-2.5 text-center min-w-0">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide truncate">
                SSH
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block truncate">
                {sshKeyType}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-2 sm:p-2.5 text-center min-w-0">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide truncate">
                Version
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block truncate">
                {versionNumber}
              </span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPublish}      
            disabled={isPublishing || !onPublish}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#004D4D] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#003333] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUpFromLine className="h-4 w-4 stroke-[2.5]" />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
          
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-[#344054] shadow-sm hover:bg-slate-50 transition-all"
          >
            <GitHubIcon className="h-4 w-4 text-[#667085]" />
            Open on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}