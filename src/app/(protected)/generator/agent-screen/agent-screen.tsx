"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  MoreHorizontal,
  Edit2,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ArrowUp,
  Square,
} from "lucide-react";

// Types for managing the multi-step form state
type StepId = 1 | 2 | 3;

interface QuestionStep {
  title: string;
  options: string[];
  hasOther?: boolean;
}

const STEPS_DATA: Record<StepId, QuestionStep> = {
  1: {
    title: "What's the goal of this agent?",
    options: [
      "Drive conversions sales",
      "Boost engagement",
      "Educate audience",
    ],
    hasOther: true,
  },
  2: {
    title: "What are you creating?",
    options: ["Blog post", "Social media post", "Snapchat post"],
    hasOther: true,
  },
  3: {
    title: "Who is this for?",
    options: ["Blog post", "Professionals / B2B", "Creators"],
    hasOther: true,
  },
};

export default function AgentFlow() {
  // App context states
  const [isThinking, setIsThinking] = useState(false);
  const [hasStarted, setHasStarted] = useState(true); 
  const [inputValue, setInputValue] = useState("");

  // Questionnaire flow states
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<StepId, string>
  >({
    1: "",
    2: "",
    3: "",
  });
  const [otherText, setOtherText] = useState<Record<StepId, string>>({
    1: "",
    2: "",
    3: "",
  });

  // Dynamic Live Timestamp Manager
  const [liveTimestamp, setLiveTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const formatted = now
        .toLocaleString("en-US", options)
        .replace(",", " at");
      setLiveTimestamp(formatted);
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOptionChange = (step: StepId, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as StepId);
    } else {
      alert("Flow setup complete! Ready for AI integration pipeline.");
    }
  };

  const handleSkipAll = () => {
    alert("Skipped setup questionnaire.");
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F8F9FA] antialiased text-gray-900 selection:bg-teal-100">
      {/* MAIN INTERACTIVE WORKSPACE CANVAS */}
      <main className="flex h-full flex-1 flex-col">
        <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-gray-200/60 bg-white shadow-sm overflow-hidden">
          {/* Scrollable Chat & Flow Container Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8">
            {/* Dynamic Real-Time Timestamp Container Slot */}
            <div className="text-center text-sm font-medium text-gray-500 min-h-[20px]">
              {liveTimestamp}
            </div>

            {/* Static Initial User Intent Request Bubble */}
            <div className="flex flex-col items-end gap-2">
              <div className="max-w-[70%] rounded-2xl bg-[#F1F3F5] px-6 py-3.5 text-[15px] font-medium text-gray-900 shadow-sm">
                Build a content creator for skincare brand
              </div>
              <div className="flex items-center gap-3 px-2 text-gray-400">
                <button className="hover:text-gray-600 transition-colors">
                  <Edit2 size={15} />
                </button>
                <button className="hover:text-gray-600 transition-colors">
                  <RotateCw size={15} />
                </button>
              </div>
            </div>

            {/* CONDITIONAL STATE BLOCKS FOR THE APP */}
            {isThinking ? (
              <div className="flex items-start">
                <div className="rounded-xl bg-[#F8F9FA] px-4 py-2.5 text-sm font-medium text-[#115E56] italic animate-pulse">
                  Thinking...
                </div>
              </div>
            ) : hasStarted ? (
              <div className="space-y-4 max-w-[85%]">
                <div className="rounded-2xl bg-[#F8F9FA] px-6 py-4 text-[15px] font-medium leading-relaxed text-[#115E56] italic">
                  I love to build this for you! Let me ask a couple of quick
                  questions to make sure I create exactly what you envision ...
                </div>

                {/* Micro Action Controls Panel */}
                <div className="flex items-center gap-3 px-1 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors">
                    <ThumbsUp size={16} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <ThumbsDown size={16} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Questionnaire Frame Container Layout Card */}
                <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-bold text-gray-900">
                    <span>Questions</span>
                    <span className="font-mono text-gray-400">
                      {currentStep}/3
                    </span>
                  </div>

                  <div className="py-4">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-4">
                      <span>{STEPS_DATA[currentStep].title}</span>
                      <span className="text-[11px] font-normal text-gray-400">
                        Select one answer
                      </span>
                    </div>

                    <div className="space-y-3">
                      {STEPS_DATA[currentStep].options.map((option) => {
                        const isSelected =
                          selectedOptions[currentStep] === option;
                        const hasSelectionMade =
                          selectedOptions[currentStep] !== "";
                        return (
                          <label
                            key={option}
                            className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                              hasSelectionMade && !isSelected
                                ? "text-gray-300"
                                : "text-gray-900"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`step-${currentStep}`}
                              checked={isSelected}
                              onChange={() =>
                                handleOptionChange(currentStep, option)
                              }
                              className="sr-only"
                            />
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "border-[#0D5C53] bg-white ring-4 ring-[#0D5C53]"
                                  : hasSelectionMade
                                    ? "border-gray-200"
                                    : "border-gray-400 hover:border-gray-600"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0D5C53]" />
                              )}
                            </span>
                            <span className="font-medium">{option}</span>
                          </label>
                        );
                      })}

                      {STEPS_DATA[currentStep].hasOther && (
                        <div className="space-y-3">
                          <label
                            className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                              selectedOptions[currentStep] !== "" &&
                              selectedOptions[currentStep] !== "other"
                                ? "text-gray-300"
                                : "text-gray-900"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`step-${currentStep}`}
                              checked={selectedOptions[currentStep] === "other"}
                              onChange={() =>
                                handleOptionChange(currentStep, "other")
                              }
                              className="sr-only"
                            />
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                                selectedOptions[currentStep] === "other"
                                  ? "border-[#0D5C53] bg-white ring-4 ring-[#0D5C53]"
                                  : selectedOptions[currentStep] !== ""
                                    ? "border-gray-200"
                                    : "border-gray-400 hover:border-gray-600"
                              }`}
                            >
                              {selectedOptions[currentStep] === "other" && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0D5C53]" />
                              )}
                            </span>
                            <span className="font-medium">other</span>
                          </label>

                          {selectedOptions[currentStep] === "other" && (
                            <div className="pl-8 transition-all duration-200">
                              <input
                                type="text"
                                placeholder="pinterest post"
                                value={otherText[currentStep]}
                                onChange={(e) =>
                                  setOtherText((prev) => ({
                                    ...prev,
                                    [currentStep]: e.target.value,
                                  }))
                                }
                                className="w-[220px] rounded-lg border-none bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-6 border-t border-gray-50 pt-4">
                    <button
                      onClick={handleSkipAll}
                      className="text-xs font-semibold text-gray-900 hover:underline transition-all"
                    >
                      Skip all
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedOptions[currentStep]}
                      className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm ${
                        selectedOptions[currentStep]
                          ? "bg-[#0D5C53] hover:bg-[#115E56] active:scale-[0.98]"
                          : "bg-teal-200/40 text-white cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* ================= FOOTER PERSISTENT INPUT PANEL ================= */}
          <div className="border-t border-gray-100 bg-white p-6">
            <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-full border border-gray-300 px-5 py-3 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Plus size={20} />
              </button>
              <input
                type="text"
                placeholder="Describe your agent..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-[15px] text-gray-900 placeholder-gray-400 outline-none"
              />
              {isThinking ? (
                <button
                  onClick={() => setIsThinking(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D5C53] text-white transition-transform active:scale-95"
                >
                  <Square size={14} fill="currentColor" />
                </button>
              ) : (
                <button
                  onClick={() => setIsThinking(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D5C53] text-white transition-transform active:scale-95"
                >
                  <ArrowUp size={18} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}