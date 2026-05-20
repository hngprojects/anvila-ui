"use client"

import { AlertCircle, RefreshCw, HelpCircle, Sparkles, AlertTriangle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  number: number;
  title: string;
  description: string;
}

interface GenerationFailedEmptyStateProps {
  errorCode?: string;
  errorDetail?: string;
  onRetry?: () => void;
  onReport?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SUPPORT_EMAIL = "anvila.dev@gmail.com";
const SUPPORT_SUBJECT = "Generation Failed — Error Report";
const SUPPORT_BODY =
  "Hi, my generation failed and I'd like to report the issue. Here are the details:\n\n- Error code: \n- What I was trying to do: \n- Steps to reproduce: ";

const steps: Step[] = [
  {
    number: 1,
    title: "Check your input",
    description: "Make sure your prompt is clear and within the allowed length",
  },
  {
    number: 2,
    title: "Wait a moment",
    description: "The server may be under load — waiting 30 seconds often helps",
  },
  {
    number: 3,
    title: "Try again",
    description: "Retry with the same or a simplified version of your request",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GenerationFailedEmptyState({
  errorCode = "GEN_500",
  errorDetail = "The server encountered an unexpected condition. Your input was received but the generation could not be completed.",
  onRetry,
  onReport,
}: GenerationFailedEmptyStateProps) {

  // BUTTON 1 — Try again
  function handleRetry() {
    if (onRetry) onRetry();
  }

  // BUTTON 2 — Report this issue
  function handleReport() {
    if (onReport) {
      onReport();
    } else {
      const body = `${SUPPORT_BODY}\n- Error code seen: ${errorCode}`;
      const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        SUPPORT_SUBJECT
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#0C5D56] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Badge — red to signal failure */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Generation failed
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your generation couldn&apos;t be completed. This can happen due to a
          server error, an invalid input, or an interrupted connection.
        </p>

        {/* Error detail box — amber/warning tone */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-8 text-left">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-1">
              Error code: {errorCode}
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              {errorDetail}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-8 text-left">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0C5D56] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {step.number}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">

          {/*
            TRY AGAIN BUTTON
          */}
          <button
             type="button"
            onClick={handleRetry}
             disabled={!onRetry}
            className="w-full flex items-center justify-center gap-2 bg-[#0C5D56] hover:bg-[#0a4d47] active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>

          {/*
            REPORT BUTTON
          */}
          <button
             type="button"
            onClick={handleReport}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Report this issue
          </button>

        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">
            Most failures resolve on the first retry
          </span>
        </div>

      </div>
    </div>
  );
}
