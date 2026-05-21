import React, { useState } from "react";
import { CheckCircle2, Copy, Check, Box, ArrowUpFromLine } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  repoUrl?: string;
  licenseType?: string;
  sshKeyType?: string;
  versionNumber?: string;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  agentName = "Anvila/under-grad",
  repoUrl = "https://agentforge.dev/raw/anvila-grad-v1/archive.zip",
  licenseType = "MIT",
  sshKeyType = "4096",
  versionNumber = "v1.4.2",
}: PaymentSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const curlCommand = `curl -L ${repoUrl} -o under-grad-v1.zip`;

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Main Container*/}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-card-title"
        className="relative w-full max-w-[440px] transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all text-left sm:p-8"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="rounded-full bg-[#E6F4F0] p-1.5 mt-0.5">
            <CheckCircle2 className="h-5 w-5 text-[#004D4D]" />
          </div>
          <div>
            <h2 id="success-card-title" className="text-lg font-bold text-[#101828]">
              Payment Successful
            </h2>
            <p className="text-sm text-[#667085] mt-0.5">
              Your agent is now private.
            </p>
          </div>
        </div>

        {/* Inner Card Section */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-4">
          
          {/* Row 1: Registry Target and Badge */}
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black block">
                Clone Agent
              </span>
              <span className="text-sm text-black mt-0.5 block">
                {agentName}
              </span>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 px-2.5 py-1 text-xs font-semibold text-[#004D4D]">
                Private
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B9B48]" />
              </span>
            </div>
          </div>

          {/* Row 2: ZIP and Github action */}
          <div className="p-1 text-sm rounded-sm flex items-center justify-between shadow-sm bg-[#CBCECD]">
            <div className="flex items-center gap-2.5 p-2 text-black font-semibold text-xs">
              <svg className="h-4 w-4 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.069-.608 1.003.708 1.53 1.038 1.53 1.038.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Git Clone
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 justify-center rounded-sm bg-[#F6F7F7] hover:bg-white px-3.5 py-1.5 text-xs font-bold text-black transition-all"
            >
              <Box className="h-3.5 w-3.5" />  
              Download ZIP
            </button>
          </div>

          {/* Row 3: Copy Input Box Section */}
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

          {/* Row 4: Specs Metric Row Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 text-center">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide">
                License
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block">
                {licenseType}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 text-center">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide">
                SSH
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block">
                {sshKeyType}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 text-center">
              <span className="block text-[10px] font-medium text-[#667085] uppercase tracking-wide">
                Version
              </span>
              <span className="text-xs font-bold text-[#101828] mt-0.5 block">
                {versionNumber}
              </span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#004D4D] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#003333] transition-all"
          >
            <ArrowUpFromLine className="h-4 w-4 stroke-[2.5]" />
            Publish
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-[#344054] shadow-sm hover:bg-slate-50 transition-all"
          >
            <svg className="h-4 w-4 text-[#667085]" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.069-.608 1.003.708 1.53 1.038 1.53 1.038.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Open on GitHub
          </button>
        </div>
      </div>
    </div>
  );
}