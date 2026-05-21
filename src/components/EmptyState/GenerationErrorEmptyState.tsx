"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, Clock, Edit, HelpCircle, RefreshCw, Sparkles, X } from "lucide-react";
import type { GenerationErrorEmptyStateProps } from "@/types";
import { SUPPORT_SUBJECTS, SUPPORT_BODIES } from "@/constants/support";
import { GENERIC_STEPS, ERROR_TIMEOUT_STEPS } from "@/constants/steps";
import { FALLBACK_ERROR_DETAIL, TIMEOUT_ERROR_DETAIL, DEFAULT_ERROR_CODES } from "@/constants/content";
import { buildMailtoUrl } from "@/utils/support";


// ─── Shared sub-component ─────────────────────────────────────────────────────

type StepCardType = {
  number: number | string;
  title: string;
  description: string | ((countdown: number) => string);
};

function StepCard({ step, countdown }: { step: StepCardType; countdown: number }) {
  const desc = typeof step.description === "function"
    ? step.description(countdown)
    : step.description;

  return (
    <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center">
        <span className="text-white text-xs font-semibold">{step.number}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800 leading-tight">{step.title}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Generic ──────────────────────────────────────────────────────────────────

function GenericError({ errorCode, errorDetail, onRetry, onReport }: Pick<GenerationErrorEmptyStateProps, "errorCode" | "errorDetail" | "onRetry" | "onReport">) {
  const [retrying, setRetrying] = useState(false);

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1800);
    onRetry?.();
  }

  function handleReport() {
      if (onReport) { onReport(); return; }
    window.open(buildMailtoUrl(SUPPORT_SUBJECTS.failed, SUPPORT_BODIES.failed, errorCode), "_blank", "noopener");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Generation failed
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your generation couldn&apos;t be completed. This can happen due to a server error, an invalid input, or an interrupted connection.
        </p>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-8 text-left">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-1">Error code: {errorCode}</p>
            <p className="text-xs text-amber-700 leading-relaxed">{errorDetail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-8 text-left">
          {GENERIC_STEPS.map((step) => <StepCard key={step.number} step={step} countdown={0} />)}
        </div>

        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={handleRetry} disabled={retrying}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0a4d47] active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150 disabled:opacity-70">
            <RefreshCw className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`} />
            {retrying ? "Retrying…" : "Try again"}
          </button>
          <button type="button" onClick={handleReport}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150">
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

// ─── Timeout ──────────────────────────────────────────────────────────────────

function TimeoutError({ errorCode, errorDetail, autoRetrySeconds = 30, onRetry, onReport }: Pick<GenerationErrorEmptyStateProps, "errorCode" | "errorDetail" | "autoRetrySeconds" | "onRetry" | "onReport">) {
  const [countdown, setCountdown] = useState(autoRetrySeconds);
  const [cancelled, setCancelled] = useState(false);
  const [retrying, setRetrying]   = useState(false);
  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRetriedRef = useRef(false);

const triggerRetryOnce = useCallback(() => {
  if (!hasRetriedRef.current) {
    hasRetriedRef.current = true;
    onRetry?.();
  }
}, [onRetry]);

useEffect(() => {
  if (cancelled) return;

 timerRef.current = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
  return () => clearInterval(timerRef.current!);
}, [cancelled, triggerRetryOnce]);

 useEffect(() => {
    if (!cancelled && countdown === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      triggerRetryOnce();
    }
  }, [countdown, cancelled, triggerRetryOnce]);


  function handleRetry() {
    clearInterval(timerRef.current!);
    setCancelled(true);
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1800);
    if (!hasRetriedRef.current) { hasRetriedRef.current = true; onRetry?.(); }
  }

  function handleCancel() {
    clearInterval(timerRef.current!);
    setCancelled(true);
  }

  function handleReport() {
    if (onReport) { onReport(); return; }
    window.location.href = buildMailtoUrl(SUPPORT_SUBJECTS.failed, SUPPORT_BODIES.failed, errorCode);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-amber-800 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Request timed out
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-3">Generation timed out</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your request took longer than expected and was cancelled automatically. The server is likely under high load right now.
        </p>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-8 text-left">
          <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-1">Error code: {errorCode}</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              {errorDetail}
              {!cancelled && countdown > 0 && (
                <span className="font-semibold"> Auto-retrying in {countdown}s.</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-8 text-left">
          {ERROR_TIMEOUT_STEPS.map((step) => <StepCard key={step.number} step={step} countdown={countdown} />)}
        </div>

        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={handleRetry} disabled={retrying}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0a4d47] active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150 disabled:opacity-70">
            <RefreshCw className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`} />
            {retrying ? "Retrying…" : "Retry now"}
          </button>
          {!cancelled && (
            <button type="button" onClick={handleCancel}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150">
              <X className="w-4 h-4 text-gray-400" />
              Cancel auto-retry
            </button>
          )}
          <button type="button" onClick={handleReport}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Report this issue
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">Your input has been preserved and will be resubmitted</span>
        </div>
      </div>
    </div>
  );
}

// ─── Inline ───────────────────────────────────────────────────────────────────

function InlineError({ errorCode, preservedInput = "", onRetry, onReport, onEditPrompt }: Pick<GenerationErrorEmptyStateProps, "errorCode" | "preservedInput" | "onRetry" | "onReport" | "onEditPrompt">) {
  const [retrying, setRetrying] = useState(false);

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1800);
    onRetry?.();
  }

  function handleReport() {
    if (onReport) { onReport(); return; }
    window.location.href = buildMailtoUrl(SUPPORT_SUBJECTS.failed, SUPPORT_BODIES.failed, errorCode);
  }

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-t-xl px-4 py-3.5 border-b-0">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">Your prompt</p>
        <p className="text-sm text-gray-900 leading-relaxed">{preservedInput}</p>
      </div>
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-b-xl px-4 py-3.5 text-left">
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-red-800 mb-1">Generation failed — {errorCode}</p>
          <p className="text-xs text-red-700 leading-relaxed">
            The server couldn&apos;t complete this request. Your prompt is saved and ready to resubmit.
          </p>
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <button type="button" onClick={handleRetry} disabled={retrying}
              className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-[#0a4d47] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-70">
              <RefreshCw className={`w-3 h-3 ${retrying ? "animate-spin" : ""}`} />
              {retrying ? "Retrying…" : "Try again"}
            </button>
            {onEditPrompt && (
              <button type="button" onClick={onEditPrompt}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 transition-colors">
                <Edit className="w-3 h-3 text-gray-500" />
                Edit prompt
              </button>
            )}
            <button type="button" onClick={handleReport}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 transition-colors">
              <HelpCircle className="w-3 h-3 text-gray-500" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function GenerationErrorEmptyState({
  variant = "generic",
  errorCode,
  errorDetail,
  preservedInput = "",
  autoRetrySeconds = 30,
  onRetry,
  onReport,
  onEditPrompt,
}: GenerationErrorEmptyStateProps) {
  if (variant === "timeout") return (
    <TimeoutError
      errorCode={errorCode ?? DEFAULT_ERROR_CODES.timeout}
      errorDetail={errorDetail ?? TIMEOUT_ERROR_DETAIL}
      autoRetrySeconds={autoRetrySeconds}
      onRetry={onRetry}
      onReport={onReport}
    />
  );

  if (variant === "inline") return (
    <InlineError
      errorCode={errorCode}
      preservedInput={preservedInput}
      onRetry={onRetry}
      onReport={onReport}
      onEditPrompt={onEditPrompt}
    />
  );

  return (
    <GenericError
      errorCode={errorCode ?? DEFAULT_ERROR_CODES.generic}
      errorDetail={errorDetail ?? FALLBACK_ERROR_DETAIL}
      onRetry={onRetry}
      onReport={onReport}
    />
  );
}