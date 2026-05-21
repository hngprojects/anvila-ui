"use client"

import { AlertCircle, AlertTriangle, RefreshCw, HelpCircle, Sparkles } from "lucide-react";
import type { GenerationFailedEmptyStateProps } from "@/types";
import { SUPPORT_SUBJECTS, SUPPORT_BODIES } from "../../../constants/support";
import { GENERIC_STEPS } from "../../../constants/steps";
import { FALLBACK_ERROR_DETAIL, DEFAULT_ERROR_CODES } from "../../../constants/content";
import { buildMailtoUrl } from "@/utils/support";

export default function GenerationFailedEmptyState({
  errorCode = DEFAULT_ERROR_CODES.generic,
  errorDetail = FALLBACK_ERROR_DETAIL,
  onRetry,
  onReport,
}: GenerationFailedEmptyStateProps) {

  function handleRetry() {
    onRetry?.();
  }

  function handleReport() {
    if (onReport) { onReport(); return; }
    window.location.href = buildMailtoUrl(
      SUPPORT_SUBJECTS.failed,
      SUPPORT_BODIES.failed,
      errorCode
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Generation failed
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your generation couldn&apos;t be completed. This can happen due to a
          server error, an invalid input, or an interrupted connection.
        </p>

        {/* Error detail */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-8 text-left">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-1">Error code: {errorCode}</p>
            <p className="text-xs text-amber-700 leading-relaxed">{errorDetail}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-8 text-left">
          {GENERIC_STEPS.map((step) => (
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
                  {typeof step.description === "function" ? step.description(0) : step.description}
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
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0a4d47] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-all duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <button
            type="button"
            onClick={handleReport}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Report this issue
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">Most failures resolve on the first retry</span>
        </div>
      </div>
    </div>
  );
}