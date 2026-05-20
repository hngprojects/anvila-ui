"use client"

import { Clock, RefreshCw, HelpCircle, Wifi, FileText, Sparkles } from "lucide-react";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface GenerationTimeoutEmptyStateProps {
  onRetry?: () => void;
  onHelp?: () => void;
}

const SUPPORT_EMAIL = "anvila.dev@gmail.com";
const SUPPORT_SUBJECT = "Generation Timeout — I need help";
const SUPPORT_BODY = "Hi, I ran into a generation timeout and need some help.";

const steps: Step[] = [
  {
    number: 1,
    icon: <Wifi className="w-4 h-4 text-[#0C5D56]" />,
    title: "Check your connection",
    description: "A stable network speeds up generation significantly",
  },
  {
    number: 2,
    icon: <FileText className="w-4 h-4 text-[#0C5D56]" />,
    title: "Simplify your request",
    description: "Start with a shorter prompt to test your setup",
  },
  {
    number: 3,
    icon: <RefreshCw className="w-4 h-4 text-[#0C5D56]" />,
    title: "Try again",
    description: "Retry with the same or a lighter prompt below",
  },
];


export default function GenerationTimeoutEmptyState({
  onRetry,
  onHelp,
}: GenerationTimeoutEmptyStateProps) {


 function handleRetry() {
    if (onRetry) {
      onRetry();
    }
  }

  function handleHelp() {
    if (onHelp) {
      onHelp();
      return;
    }
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      SUPPORT_SUBJECT
    )}&body=${encodeURIComponent(SUPPORT_BODY)}`;
    window.location.href = mailto;
  }
    
  return (
    <>
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm px-10 py-12 text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#0C5D56] flex items-center justify-center shadow-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0C5D56] border border-green-50 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-50" />
          Generation timed out
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          Taking longer than expected
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Your first generation hit a timeout. No worries — this is common on
          slow connections or heavy requests. Here&apos;s how to get up and running.
        </p>

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

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
              onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 bg-[#0C5D56]  active:scale-[0.98] text-white text-sm font-medium py-3 rounded-xl transition-all duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Retry generation
          </button>
          <button
          onClick={handleHelp}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium py-3 rounded-xl border border-gray-200 transition-all duration-150"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Get help & support
          </button>
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2e7b78]" />
          <span className="text-xs text-gray-400">
            Typically resolves within one retry
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
