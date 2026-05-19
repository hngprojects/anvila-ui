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
  MessageSquare,
} from "lucide-react";

// Flow states: 
// 1. Short Answer Questionnaire (Text Inputs 1-3)
// 2. Transition State
// 3. Radio Choice Questionnaire (Radio Buttons 1-3)
// 4. Forging sequence (Identity -> Interrupted -> Skills -> Personalities -> Success)
type FlowState =
  | "text-questionnaire-1" // "What is the name of your skincarebrand"
  | "text-questionnaire-2" // "Who is your target audience"
  | "text-questionnaire-3" // "What is your brand tone"
  | "transition-message"    // "Got it - Agent Anatassia Rhodes... Lets verify some info..."
  | "radio-questionnaire-1" // "What's the goal of this agent?"
  | "radio-questionnaire-2" // "What are you creating?"
  | "radio-questionnaire-3" // "Who is this for?"
  | "forging-identity"      // Generating Identity
  | "forging-interrupted"   // Interrupted
  | "forging-skills"        // Matching Skills
  | "forging-personalities" // Generating Personalities
  | "forging-done";         // Done (Success)

interface TextQuestion {
  question: string;
  placeholder: string;
}

const TEXT_QUESTIONS: TextQuestion[] = [
  { question: "What is the name of your skincarebrand", placeholder: "e.g. @nior" },
  { question: "Who is your target audience", placeholder: "e.g. Nior" },
  { question: "What is your brand tone", placeholder: "e.g. playful and bold" },
];

interface RadioQuestion {
  title: string;
  options: string[];
  hasOther?: boolean;
}

const RADIO_QUESTIONS: Record<number, RadioQuestion> = {
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
  const [flowState, setFlowState] = useState<FlowState>("text-questionnaire-1");
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Short Answer Questionnaire States
  const [textAnswers, setTextAnswers] = useState<string[]>(["", "", ""]);

  // Radio Questionnaire Selection States
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

  // Text Questionnaire handlers
  const handleTextAnswerChange = (index: number, value: string) => {
    setTextAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleNextTextQuestion = () => {
    if (flowState === "text-questionnaire-1") {
      setFlowState("text-questionnaire-2");
    } else if (flowState === "text-questionnaire-2") {
      setFlowState("text-questionnaire-3");
    } else if (flowState === "text-questionnaire-3") {
      setFlowState("transition-message");
    }
  };

  const handleSkipAllText = () => {
    setFlowState("transition-message");
  };

  // Radio Questionnaire handlers
  const handleOptionChange = (step: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
  };

  const handleNextRadioQuestion = () => {
    if (flowState === "radio-questionnaire-1") {
      setFlowState("radio-questionnaire-2");
    } else if (flowState === "radio-questionnaire-2") {
      setFlowState("radio-questionnaire-3");
    } else if (flowState === "radio-questionnaire-3") {
      setFlowState("forging-identity");
    }
  };

  const handleSkipAllRadio = () => {
    setFlowState("forging-identity");
  };

  const handleBottomSubmit = () => {
    if (inputValue.trim() !== "") {
      setInputValue("");
    }
    // Advance flows dynamically based on state
    if (flowState === "text-questionnaire-1") {
      setFlowState("text-questionnaire-2");
    } else if (flowState === "text-questionnaire-2") {
      setFlowState("text-questionnaire-3");
    } else if (flowState === "text-questionnaire-3") {
      setFlowState("transition-message");
    } else if (flowState === "transition-message") {
      setFlowState("radio-questionnaire-1");
    } else if (flowState === "radio-questionnaire-1") {
      setFlowState("radio-questionnaire-2");
    } else if (flowState === "radio-questionnaire-2") {
      setFlowState("radio-questionnaire-3");
    } else if (flowState === "radio-questionnaire-3") {
      setFlowState("forging-identity");
    } else if (flowState === "forging-interrupted") {
      setFlowState("forging-skills");
    } else if (flowState === "forging-skills") {
      setFlowState("forging-personalities");
    } else if (flowState === "forging-personalities") {
      setFlowState("forging-done");
    } else if (flowState === "forging-done") {
      // Restart the entire unified flow
      setFlowState("text-questionnaire-1");
      setTextAnswers(["", "", ""]);
      setSelectedOptions({ 1: "", 2: "", 3: "" });
      setOtherText({ 1: "", 2: "", 3: "" });
    }
  };

  // Helper getters
  const getTextStepIndex = (): number => {
    if (flowState === "text-questionnaire-1") return 0;
    if (flowState === "text-questionnaire-2") return 1;
    return 2;
  };

  const getRadioStepId = (): number => {
    if (flowState === "radio-questionnaire-1") return 1;
    if (flowState === "radio-questionnaire-2") return 2;
    return 3;
  };

  const currentTextIndex = getTextStepIndex();
  const currentRadioStepId = getRadioStepId();

  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-[24px] md:border md:border-[#E7E8EA] md:shadow-sm flex flex-col min-h-0 overflow-hidden relative">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-16 pb-6 space-y-8 scrollbar-hide">
        {/* Dynamic Timestamp */}
        <div className="text-center text-xs text-gray-500 font-medium py-2">
          {liveTimestamp}
        </div>

        {/* 1. Initial User Prompt */}
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

        {/* ---------------- FLOW PHASE 1: SHORT ANSWER QUESTIONNAIRE (TEXT INPUT) ---------------- */}
        {flowState.startsWith("text-questionnaire") && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="w-[450px] max-w-full rounded-2xl border-[2.5px] border-[#B1B5B4] bg-[#F4F4F5] p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E4E4E4] pb-3 text-sm font-semibold text-black">
                <span>Questions</span>
                <span className="font-mono">
                  {currentTextIndex + 1}/3
                </span>
              </div>

              {/* Body */}
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-black">
                  <label htmlFor={`text-q-${currentTextIndex}`}>
                    {TEXT_QUESTIONS[currentTextIndex].question}
                  </label>
                  <span className="shrink-0 text-xs font-medium text-zinc-500">
                    Write short answer
                  </span>
                </div>

                <input
                  id={`text-q-${currentTextIndex}`}
                  type="text"
                  value={textAnswers[currentTextIndex]}
                  onChange={(e) => handleTextAnswerChange(currentTextIndex, e.target.value)}
                  placeholder={TEXT_QUESTIONS[currentTextIndex].placeholder}
                  className="w-full rounded-lg border border-[#E4E4E4] bg-[#EEEFEE]/70 px-4 py-3 text-sm text-black placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#B1B5B4]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && textAnswers[currentTextIndex].trim() !== "") {
                      handleNextTextQuestion();
                    }
                  }}
                  autoFocus
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-6 pt-2">
                <button
                  onClick={handleSkipAllText}
                  className="text-xs font-semibold text-black hover:underline cursor-pointer"
                >
                  Skip all
                </button>
                <button
                  onClick={handleNextTextQuestion}
                  disabled={textAnswers[currentTextIndex].trim() === ""}
                  className={`rounded-lg border-[0.5px] border-[#9E9F9E] px-5 py-2 text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
                    textAnswers[currentTextIndex].trim() !== ""
                      ? "bg-[#1a6b5a] hover:opacity-90 active:scale-[0.98]"
                      : "bg-[#1a6b5a]/30 text-white cursor-not-allowed opacity-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- FLOW PHASE 2: SHORT ANSWER REPLIES & TRANSITION STATE ---------------- */}
        {!flowState.startsWith("text-questionnaire") && (
          <>
            {/* Display the answers user provided as a persistent user message in the chat */}
            <div className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto animate-fade-in">
              <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
                Agent details verified: Skincare brand name is <span className="font-semibold">{textAnswers[0] || "Nior"}</span>, targeting <span className="font-semibold">{textAnswers[1] || "middle-aged women"}</span>, using a <span className="font-semibold">{textAnswers[2] || "playful and bold"}</span> brand tone.
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto animate-fade-in">
              <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
                Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let&apos;s verify some info about your brand before proceeding...
              </div>
            </div>

            {/* Transition State Proceed Card */}
            {flowState === "transition-message" && (
              <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
                <div className="w-[450px] max-w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#1a6b5a]">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Details Collected Successfully!</h3>
                    <p className="text-xs text-gray-500 mt-1">Let&apos;s run a quick 3-step criteria verification to configure your agent.</p>
                  </div>
                  <button
                    onClick={() => setFlowState("radio-questionnaire-1")}
                    className="w-full rounded-lg bg-[#1a6b5a] text-white px-5 py-2.5 text-xs font-bold shadow-sm hover:bg-[#124e42] transition-all cursor-pointer active:scale-[0.98]"
                  >
                    Start Verification &rarr;
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---------------- FLOW PHASE 3: RADIO CHOICE QUESTIONNAIRE ---------------- */}
        {flowState.startsWith("radio-questionnaire") && (
          <div className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in">
            <div className="w-[450px] max-w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-bold text-gray-900">
                <span>Verification Criteria</span>
                <span className="font-mono text-gray-400">
                  {currentRadioStepId}/3
                </span>
              </div>

              {/* Title */}
              <div className="py-4">
                <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-4">
                  <span>{RADIO_QUESTIONS[currentRadioStepId].title}</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    Select one answer
                  </span>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {RADIO_QUESTIONS[currentRadioStepId].options.map((option) => {
                    const isSelected = selectedOptions[currentRadioStepId] === option;
                    const hasSelectionMade = selectedOptions[currentRadioStepId] !== "";
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                          hasSelectionMade && !isSelected ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`step-${currentRadioStepId}`}
                          checked={isSelected}
                          onChange={() => handleOptionChange(currentRadioStepId, option)}
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
                  {RADIO_QUESTIONS[currentRadioStepId].hasOther && (
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                          selectedOptions[currentRadioStepId] !== "" &&
                          selectedOptions[currentRadioStepId] !== "other"
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`step-${currentRadioStepId}`}
                          checked={selectedOptions[currentRadioStepId] === "other"}
                          onChange={() => handleOptionChange(currentRadioStepId, "other")}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                            selectedOptions[currentRadioStepId] === "other"
                              ? "border-[#1a6b5a] bg-white ring-4 ring-[#1a6b5a]"
                              : selectedOptions[currentRadioStepId] !== ""
                                ? "border-gray-200"
                                : "border-gray-400 hover:border-gray-600"
                          }`}
                        >
                          {selectedOptions[currentRadioStepId] === "other" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1a6b5a]" />
                          )}
                        </span>
                        <span className="font-medium">other</span>
                      </label>

                      {selectedOptions[currentRadioStepId] === "other" && (
                        <div className="pl-8 transition-all duration-200 animate-fade-in">
                          <input
                            type="text"
                            placeholder="Type alternative answer..."
                            value={otherText[currentRadioStepId]}
                            onChange={(e) =>
                              setOtherText((prev) => ({
                                ...prev,
                                [currentRadioStepId]: e.target.value,
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
                  onClick={handleSkipAllRadio}
                  className="text-xs font-semibold text-gray-500 hover:underline hover:text-gray-800 transition-all cursor-pointer"
                >
                  Skip all
                </button>
                <button
                  onClick={handleNextRadioQuestion}
                  disabled={!selectedOptions[currentRadioStepId]}
                  className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
                    selectedOptions[currentRadioStepId]
                      ? "bg-[#1a6b5a] hover:bg-[#124e42] active:scale-[0.98]"
                      : "bg-[#1a6b5a]/30 text-white cursor-not-allowed opacity-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- FLOW PHASE 4: FORGING STATE SEQUENCE ---------------- */}
        
        {/* Render persistent replies when in forging phase */}
        {(flowState.startsWith("forging") || flowState === "forging-done") && (
          <div className="flex flex-col items-start space-y-2 max-w-3xl mr-auto animate-fade-in">
            <div className="bg-[#F3F4F6]/50 text-[#0c5d56] italic text-[15px] px-5 py-3.5 rounded-[20px] max-w-[90%] border border-gray-100/50 leading-relaxed">
              Got it - <span className="font-semibold">{textAnswers[0] || "Nior"}</span> is a skincare brand for <span className="font-semibold">{textAnswers[1] || "middle-aged women"}</span>. Goal is <span className="font-semibold">{selectedOptions[1]}</span>. Forging agent...
            </div>
            <div className="flex items-center gap-3.5 pl-2 text-gray-400">
              <button className="hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><Copy size={14} /></button>
              <button className="hover:text-gray-600 transition-colors"><MoreHorizontal size={14} /></button>
            </div>
          </div>
        )}

        {/* STATE: Generating Identity File */}
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
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand {textAnswers[0] || "Nior"}.</p>
                  </div>
                  <div>
                    <span className="text-gray-400"># Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials designed for {textAnswers[1] || "middle aged women"}</li>
                      <li>Automate product campaigns with a {textAnswers[2] || "playful and bold"} tone</li>
                      <li>Stay current with skincare industry best practices and emerging trends</li>
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

        {/* STATE: Interrupted */}
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
                    <p className="mt-1 text-gray-700 font-sans">You are a content creator designed for a skincare brand {textAnswers[0] || "Nior"}.</p>
                  </div>
                  <div>
                    <span className="text-gray-400"># Primary Responsibilities</span>
                    <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                      <li>Generate multiple content materials designed for {textAnswers[1] || "middle aged women"}</li>
                      <li>Automate product campaigns with a {textAnswers[2] || "playful and bold"} tone</li>
                      <li>Stay current with skincare industry best practices and emerging trends</li>
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

        {/* STATE: Matching Agent Skills */}
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

        {/* STATE: Generating Personalities File */}
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

        {/* STATE: Done Successfully */}
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
                    content creator agent ({textAnswers[0] || "Nior"})
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