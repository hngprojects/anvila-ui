"use client"

import { Clock, RefreshCw, HelpCircle, Sparkles } from "lucide-react";
import type { GenerationTimeoutEmptyStateProps } from "@/types";
import { SUPPORT_SUBJECTS, SUPPORT_BODIES } from "@/constants/support";
import { TIMEOUT_STEPS } from "@/constants/steps";
import { buildMailtoUrl } from "@/utils/support";

export default function GenerationTimeoutEmptyState({
  onRetry,
  onHelp,
}: GenerationTimeoutEmptyStateProps) {

  function handleRetry() {
    onRetry?.();
  }

  function handleHelp() {
    if (onHelp) { onHelp(); return; }
    window.location.href = buildMailtoUrl(
      SUPPORT_SUBJECTS.timeout,
      SUPPORT_BODIES.timeout
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-primary border border-green-50 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-50" />
          Generation timed out
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          Taking longer than expected
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Your first generation hit a timeout. No worries — this is common on
          slow connections or heavy requests. Here&apos;s how to get up and running.
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-8 text-left">
          {TIMEOUT_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{step.number}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 leading-tight">{step.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleRetry}
            disabled={!onRetry}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-all duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Retry generation
          </button>
          <button
            type="button"
            onClick={handleHelp}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Get help & support
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span className="text-xs text-gray-400">Typically resolves within one retry</span>
        </div>
      </div>
    </div>
  );
}