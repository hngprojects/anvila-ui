"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  ArrowUp,
  Square,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  Edit2,
  RotateCw,
  FileText,
  ChevronDown,
  ChevronRight,
  Users,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Flow states: Questionnaire Wizard (1-3) -> Forging sequence (4-8)
type FlowState =
  | "questionnaire-1" // Goal
  | "questionnaire-2" // Asset Format
  | "questionnaire-3" // Target Audience
  | "forging-identity" // Forging State 1
  | "forging-interrupted" // Forging State 2
  | "forging-skills" // Forging State 3
  | "forging-personalities" // Forging State 4
  | "forging-done"; // Forging State 5 (Success)

interface QuestionStep {
  title: string;
  options: string[];
  hasOther?: boolean;
}

const STEPS_DATA: Record<number, QuestionStep> = {
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

export default function AgentScreen() {
  const [flowState, setFlowState] = useState<FlowState>("questionnaire-1");
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Questionnaire selection states
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });
  const [otherText, setOtherText] = useState<Record<number, string>>({
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [flowState]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionChange = (step: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
  };

  const handleNextQuestion = () => {
    if (flowState === "questionnaire-1") {
      setFlowState("questionnaire-2");
    } else if (flowState === "questionnaire-2") {
      setFlowState("questionnaire-3");
    } else if (flowState === "questionnaire-3") {
      setFlowState("forging-identity");
    }
  };

  const handleSkipAll = () => {
    setFlowState("forging-identity");
  };

  const handleBottomSubmit = () => {
    if (inputValue.trim() !== "") {
      setInputValue("");
    }
    // Advance flows dynamically
    if (flowState === "questionnaire-1") {
      setFlowState("questionnaire-2");
    } else if (flowState === "questionnaire-2") {
      setFlowState("questionnaire-3");
    } else if (flowState === "questionnaire-3") {
      setFlowState("forging-identity");
    } else if (flowState === "forging-interrupted") {
      setFlowState("forging-skills");
    } else if (flowState === "forging-skills") {
      setFlowState("forging-personalities");
    } else if (flowState === "forging-personalities") {
      setFlowState("forging-done");
    } else if (flowState === "forging-done") {
      // Cycle back
      setFlowState("questionnaire-1");
      setSelectedOptions({ 1: "", 2: "", 3: "" });
      setOtherText({ 1: "", 2: "", 3: "" });
    }
  };

  // Map states to Questionnaire IDs for rendering
  const getStepId = (): number => {
    if (flowState === "questionnaire-1") return 1;
    if (flowState === "questionnaire-2") return 2;
    return 3;
  };

  const currentQuestionStep = getStepId();

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-[24px] md:border md:border-[#E7E8EA] md:shadow-sm flex flex-col min-h-0 overflow-hidden relative">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-16 pb-6 space-y-8 scrollbar-hide">
        {/* Dynamic Timestamp */}
        <div className="text-center text-xs text-gray-500 font-medium py-2">
          {liveTimestamp}
        </div>

        {/* 1. Initial User Request */}
        <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto animate-fade-in">
          <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
            Build a content creator for skincare brand
          </div>
          <div className="flex items-center gap-3 pr-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit prompt">
              <Edit2 size={14} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Retry prompt">
              <RotateCw size={14} />
            </button>
          </div>
        </div>

        {/* 2. Initial Assistant Bot Message */}
        <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto animate-fade-in">
          <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
            I&apos;d love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...
          </div>
          <div className="flex items-center gap-3.5 pl-2 text-gray-400">
            <button className="hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
            <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
            <button
              onClick={() => handleCopy("I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...")}
              className="hover:text-gray-600 transition-colors relative"
            >
              <Copy size={14} />
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">
                  Copied!
                </span>
              )}
            </button>
            <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
          </div>
        </div>

        {/* ---------------- QUESTIONNAIRE STEPS ---------------- */}
        {flowState.startsWith("questionnaire") && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="w-[450px] max-w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-bold text-gray-900">
                <span>Questions</span>
                <span className="font-mono text-gray-400">
                  {currentQuestionStep}/3
                </span>
              </div>

              {/* Title */}
              <div className="py-4">
                <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-4">
                  <span>{STEPS_DATA[currentQuestionStep].title}</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    Select one answer
                  </span>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {STEPS_DATA[currentQuestionStep].options.map((option) => {
                    const isSelected = selectedOptions[currentQuestionStep] === option;
                    const hasSelectionMade = selectedOptions[currentQuestionStep] !== "";
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                          hasSelectionMade && !isSelected ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`step-${currentQuestionStep}`}
                          checked={isSelected}
                          onChange={() => handleOptionChange(currentQuestionStep, option)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? "border-[#1a6b5a] bg-white ring-4 ring-[#1a6b5a]"
                              : hasSelectionMade
                                ? "border-gray-200"
                                : "border-gray-400 hover:border-gray-600"
                          }`}
                        >
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#1a6b5a]" />}
                        </span>
                        <span className="font-medium">{option}</span>
                      </label>
                    );
                  })}

                  {/* "Other" Option */}
                  {STEPS_DATA[currentQuestionStep].hasOther && (
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                          selectedOptions[currentQuestionStep] !== "" &&
                          selectedOptions[currentQuestionStep] !== "other"
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`step-${currentQuestionStep}`}
                          checked={selectedOptions[currentQuestionStep] === "other"}
                          onChange={() => handleOptionChange(currentQuestionStep, "other")}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                            selectedOptions[currentQuestionStep] === "other"
                              ? "border-[#1a6b5a] bg-white ring-4 ring-[#1a6b5a]"
                              : selectedOptions[currentQuestionStep] !== ""
                                ? "border-gray-200"
                                : "border-gray-400 hover:border-gray-600"
                          }`}
                        >
                          {selectedOptions[currentQuestionStep] === "other" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1a6b5a]" />
                          )}
                        </span>
                        <span className="font-medium">other</span>
                      </label>

                      {selectedOptions[currentQuestionStep] === "other" && (
                        <div className="pl-8 transition-all duration-200 animate-fade-in">
                          <input
                            type="text"
                            placeholder="Type alternative answer..."
                            value={otherText[currentQuestionStep]}
                            onChange={(e) =>
                              setOtherText((prev) => ({
                                ...prev,
                                [currentQuestionStep]: e.target.value,
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

              {/* Actions */}
              <div className="mt-2 flex items-center justify-end gap-6 border-t border-gray-50 pt-4">
                <button
                  onClick={handleSkipAll}
                  className="text-xs font-semibold text-gray-500 hover:underline hover:text-gray-800 transition-all"
                >
                  Skip all
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedOptions[currentQuestionStep]}
                  className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm ${
                    selectedOptions[currentQuestionStep]
                      ? "bg-[#1a6b5a] hover:bg-[#124e42] active:scale-[0.98]"
                      : "bg-[#1a6b5a]/30 text-white cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- FORGING STATES ---------------- */}

        {/* Render persistent Questionnaire replies if we are in forging state */}
        {!flowState.startsWith("questionnaire") && (
          <>
            {/* User replies about brand details */}
            <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto animate-fade-in">
              <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
                Agent type: content creator for a skincare brand and automates snapchat
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto animate-fade-in">
              <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
                Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let&apos;s verify some info about your brand before proceeding...
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto animate-fade-in">
              <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
                Got it- Nior is a skincare brand for middle aged women. Forging agent...
              </div>
              <div className="flex items-center gap-3.5 pl-2 text-gray-400">
                <button className="hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
            </div>
          </>
        )}

        {/* FORGING STATE 1: Generating Identity File */}
        {flowState === "forging-identity" && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} className="animate-pulse" />
              </div>
              <span className="italic">
                Generating Identity <span className="text-gray-400">files...</span>
              </span>
              <ChevronDown size={15} className="text-gray-400" />
            </div>

            {/* Skincare Brand AI Content Creator Agent Card */}
            <div className="w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[300px]">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <FileText size={18} className="text-gray-500 shrink-0" />
                <h3 className="font-semibold text-gray-700 text-sm truncate">
                  Skincare brand AI content creator agent
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400"># Identity</span>
                  </div>
                  <div>
                    <span className="text-gray-400"># Core Purpose</span>
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand Nior.</p>
                  </div>
                  <div>
                    <span className="text-gray-400">#Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials</li>
                      <li>Automate product campaigns for new collections</li>
                      <li>Stay current with industry best practices and emerging trends</li>
                    </ol>
                  </div>
                  <div>
                    <span className="text-gray-400">## Communication Style</span>
                    <p className="mt-1 text-gray-700 font-sans">Professional, insightful, and results-oriented.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORGING STATE 2: Interrupted */}
        {flowState === "forging-interrupted" && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users size={13} />
              </div>
              <span className="italic">
                Generating Identity <span className="text-gray-400">files...</span>
              </span>
              <ChevronDown size={15} className="text-gray-400" />
            </div>

            {/* Skincare Brand Card */}
            <div className="w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[300px]">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <FileText size={18} className="text-gray-500 shrink-0" />
                <h3 className="font-semibold text-gray-700 text-sm truncate">
                  Skincare brand AI content creator agent
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400"># Identity</span>
                  </div>
                  <div>
                    <span className="text-gray-400"># Core Purpose</span>
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand Nior.</p>
                  </div>
                  <div>
                    <span className="text-gray-400">#Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials</li>
                      <li>Automate product campaigns for new collections</li>
                      <li>Stay current with industry best practices and emerging trends</li>
                    </ol>
                  </div>
                  <div>
                    <span className="text-gray-400">## Communication Style</span>
                    <p className="mt-1 text-gray-700 font-sans">Professional, insightful, and results-oriented.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Interruption Text */}
            <div className="w-full space-y-2">
              <div className="text-red-500 text-sm font-medium italic pl-1 flex items-center gap-1.5">
                <AlertCircle size={14} className="shrink-0" />
                Agent Forge response was interrupted!
              </div>
              <div className="flex items-center gap-3.5 pl-1 text-gray-400">
                <button className="hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
                <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* FORGING STATE 3: Matching Agent Skills */}
        {flowState === "forging-skills" && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Loader2 size={13} className="animate-spin" />
              </div>
              <span className="italic">
                Matching agent <span className="text-gray-400">skills...</span>
              </span>
              <ChevronRight size={15} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* FORGING STATE 4: Generating Personalities File */}
        {flowState === "forging-personalities" && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Loader2 size={13} className="animate-spin" />
              </div>
              <span className="italic">
                Generating personalities <span className="text-gray-400">files...</span>
              </span>
              <ChevronRight size={15} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* FORGING STATE 5: Done Successfully */}
        {flowState === "forging-done" && (
          <div className="flex flex-col items-start space-y-3.5 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
              Done! Successfully created content creator- Anatassia Rhodes....
            </div>

            {/* Forged Anatassia Card */}
            <div className="w-[380px] max-w-full bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100 shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-700 truncate">
                    Forged Anatassia
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    content creator agent
                  </p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all shrink-0">
                Preview
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3.5 pl-2 text-gray-400">
              <button className="hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ---------------- BOTTOM CONTROLLER INPUT BAR ---------------- */}
      <div className="px-6 py-5 bg-[#FBFBFB] md:border-t md:border-gray-100 shrink-0">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-3.5 bg-white shadow-sm focus-within:border-emerald-600/40 focus-within:ring-2 focus-within:ring-emerald-500/5 transition-all">
            {/* Plus Icon */}
            <button className="text-gray-400 hover:text-gray-600 shrink-0" title="Attach file">
              <Plus size={18} />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your agent..."
              className="flex-1 text-[15px] bg-transparent outline-none text-gray-800 placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBottomSubmit();
                }
              }}
            />

            {/* Action Button: Stop or Send */}
            {flowState === "forging-identity" ||
            flowState === "forging-skills" ||
            flowState === "forging-personalities" ? (
              <button
                onClick={() => setFlowState("forging-interrupted")}
                className="w-9 h-9 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shadow-md hover:bg-[#124e42] transition-all shrink-0 cursor-pointer"
                title="Stop generation"
              >
                <Square size={13} fill="white" className="text-white" />
              </button>
            ) : (
              <button
                onClick={handleBottomSubmit}
                className="w-9 h-9 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shadow-md hover:bg-[#124e42] transition-all shrink-0 cursor-pointer"
                title="Send description"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}