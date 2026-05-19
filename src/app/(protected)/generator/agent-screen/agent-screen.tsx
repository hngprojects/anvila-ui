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
  Sparkles,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text?: string;
  type: "text" | "thinking" | "questionnaire" | "transition" | "forging-identity" | "forging-skills" | "forging-personalities" | "forging-done" | "forging-interrupted";
}

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Questionnaire States
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  // Forging timer references to allow cancellation
  const forgingTimerRef = useRef<NodeJS.Timeout | null>(null);

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
  }, [messages, currentStep]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (forgingTimerRef.current) clearTimeout(forgingTimerRef.current);
    };
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOptionChange = (step: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
  };

  // Main input submission
  const handleSendPrompt = () => {
    const prompt = inputValue.trim() || "Build a content creator for skincare brand";
    setInputValue("");

    // Reset questionnaire selections
    setSelectedOptions({ 1: "", 2: "", 3: "" });
    setOtherText({ 1: "", 2: "", 3: "" });
    setCurrentStep(1);

    const newUserMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: prompt,
      type: "text",
    };

    const newThinkingMsg: ChatMessage = {
      id: `a-think-${Date.now()}`,
      sender: "assistant",
      type: "thinking",
    };

    setMessages([newUserMsg, newThinkingMsg]);

    // Transition from Thinking to Questionnaire after 1.5s
    forgingTimerRef.current = setTimeout(() => {
      setMessages((prev) => {
        // Replace thinking with welcoming intro message
        const filtered = prev.filter((m) => m.type !== "thinking");
        return [
          ...filtered,
          {
            id: `a-intro-${Date.now()}`,
            sender: "assistant",
            text: "I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...",
            type: "text",
          },
          {
            id: `a-quest-${Date.now()}`,
            sender: "assistant",
            type: "questionnaire",
          },
        ];
      });
    }, 1500);
  };

  // Questionnaire navigation
  const handleNextQuestion = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finished all questionnaire steps! Transition to Forging
      triggerForgingTransition();
    }
  };

  const handleSkipAll = () => {
    triggerForgingTransition();
  };

  const triggerForgingTransition = () => {
    // 1. Remove active questionnaire card
    setMessages((prev) => prev.filter((m) => m.type !== "questionnaire"));

    // 2. Summary of choices
    const chosenGoal = selectedOptions[1] === "other" ? (otherText[1] || "Pinterest post") : (selectedOptions[1] || "Drive conversions sales");
    const chosenFormat = selectedOptions[2] === "other" ? (otherText[2] || "Snapchat") : (selectedOptions[2] || "Snapchat post");
    
    // Construct user reply summary
    const summaryMsg: ChatMessage = {
      id: `u-summary-${Date.now()}`,
      sender: "user",
      text: `Agent type: content creator for a skincare brand and automates ${chosenFormat.toLowerCase()}`,
      type: "text",
    };

    // 3. Assistant transition reply
    const transitionMsg: ChatMessage = {
      id: `a-trans-${Date.now()}`,
      sender: "assistant",
      text: "Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding...",
      type: "text",
    };

    setMessages((prev) => [...prev, summaryMsg, transitionMsg]);

    // 4. Trigger Forging sequence
    startForgingSequence();
  };

  const startForgingSequence = () => {
    // Stage 1: Forging Identity
    forgingTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-forge-identity-${Date.now()}`,
          sender: "assistant",
          type: "forging-identity",
        },
      ]);

      // Stage 2: Forging Skills
      forgingTimerRef.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-forge-skills-${Date.now()}`,
            sender: "assistant",
            type: "forging-skills",
          },
        ]);

        // Stage 3: Forging Personalities
        forgingTimerRef.current = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `a-forge-personalities-${Date.now()}`,
              sender: "assistant",
              type: "forging-personalities",
            },
          ]);

          // Stage 4: Forging Complete / Done
          forgingTimerRef.current = setTimeout(() => {
            setMessages((prev) => {
              // Filter out intermediate status spinners
              const filtered = prev.filter(
                (m) =>
                  m.type !== "forging-skills" &&
                  m.type !== "forging-personalities"
              );
              return [
                ...filtered,
                {
                  id: `a-forge-done-${Date.now()}`,
                  sender: "assistant",
                  type: "forging-done",
                },
              ];
            });
          }, 2500);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  // Stop/Interrupt generation
  const handleInterrupt = () => {
    if (forgingTimerRef.current) {
      clearTimeout(forgingTimerRef.current);
    }
    setMessages((prev) => {
      // Remove temporary spinners and append interrupted status
      const filtered = prev.filter(
        (m) =>
          m.type !== "forging-skills" &&
          m.type !== "forging-personalities"
      );
      return [
        ...filtered,
        {
          id: `a-interrupt-${Date.now()}`,
          sender: "assistant",
          type: "forging-interrupted",
        },
      ];
    });
  };

  // Helper flags
  const isThinking = messages.some((m) => m.type === "thinking");
  const isQuestionnaireActive = messages.some((m) => m.type === "questionnaire");
  const isForgingActive = messages.some(
    (m) =>
      m.type === "forging-identity" ||
      m.type === "forging-skills" ||
      m.type === "forging-personalities"
  ) && !messages.some((m) => m.type === "forging-done" || m.type === "forging-interrupted");

  return (
    <main className="h-full flex-1 bg-[#FBFBFB] md:rounded-[24px] md:border md:border-[#E7E8EA] md:shadow-sm flex flex-col min-h-0 overflow-hidden relative">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-16 pb-6 space-y-8 scrollbar-hide">
        {/* Dynamic Timestamp */}
        <div className="text-center text-xs text-gray-500 font-medium py-2">
          {liveTimestamp}
        </div>

        {/* Welcome Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto space-y-5 animate-fade-in mt-12">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1a6b5a] shadow-sm">
              <Sparkles size={26} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-800">Dynamic Agent Architect</h2>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Describe the capabilities or target goals of the agent you want to forge. The wizard questionnaire will dynamically generate choices based on your parameters.
              </p>
            </div>
            <button
              onClick={handleSendPrompt}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#1a6b5a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Try: "Build a content creator for skincare brand"
            </button>
          </div>
        )}

        {/* Dynamic Messages Render Loop */}
        {messages.map((msg) => {
          if (msg.sender === "user") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-end space-y-1.5 max-w-3xl ml-auto animate-fade-in"
              >
                <div className="bg-[#F3F4F6] text-gray-800 text-[15px] px-5 py-3 rounded-[20px] max-w-[85%] shadow-sm leading-relaxed">
                  {msg.text}
                </div>
                <div className="flex items-center gap-3 pr-2">
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    title="Edit prompt"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    title="Retry prompt"
                    onClick={handleSendPrompt}
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              </div>
            );
          }

          // Assistant message types
          if (msg.type === "thinking") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-2 max-w-3xl mr-auto pl-2 animate-fade-in"
              >
                <div className="text-zinc-500 italic text-[15px] leading-relaxed animate-pulse">
                  Thinking...
                </div>
              </div>
            );
          }

          if (msg.type === "text") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-2 max-w-3xl mr-auto pl-2 animate-fade-in"
              >
                <div className="bg-transparent text-zinc-600 italic text-[15px] leading-relaxed">
                  {msg.text}
                </div>
                <div className="flex items-center gap-3.5 text-zinc-400">
                  <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                    <ThumbsDown size={14} />
                  </button>
                  <button
                    onClick={() => handleCopy(msg.text || "", msg.id)}
                    className="hover:text-zinc-600 transition-colors relative cursor-pointer"
                  >
                    <Copy size={14} />
                    {copiedId === msg.id && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                  <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            );
          }

          if (msg.type === "questionnaire") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                <div className="w-[450px] max-w-full rounded-2xl border border-zinc-200 bg-[#F4F4F5] p-5 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3 text-sm font-semibold text-black">
                    <span>Questions</span>
                    <span className="font-mono text-zinc-500">{currentStep}/3</span>
                  </div>

                  {/* Title */}
                  <div className="py-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-black mb-4">
                      <span>{RADIO_QUESTIONS[currentStep].title}</span>
                      <span className="text-[11px] font-normal text-zinc-500">
                        Select one answer
                      </span>
                    </div>

                    {/* Options List */}
                    <div className="space-y-3">
                      {RADIO_QUESTIONS[currentStep].options.map((option) => {
                        const isSelected = selectedOptions[currentStep] === option;
                        const hasSelection = selectedOptions[currentStep] !== "";
                        return (
                          <label
                            key={option}
                            className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                              hasSelection && !isSelected
                                ? "text-zinc-400"
                                : "text-zinc-950 font-medium"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`step-${currentStep}`}
                              checked={isSelected}
                              onChange={() => handleOptionChange(currentStep, option)}
                              className="sr-only"
                            />
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-zinc-900 transition-all ${
                                isSelected
                                  ? "bg-white ring-4 ring-zinc-950"
                                  : "bg-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                              )}
                            </span>
                            <span>{option}</span>
                          </label>
                        );
                      })}

                      {/* "Other" Option */}
                      {RADIO_QUESTIONS[currentStep].hasOther && (
                        <div className="space-y-3">
                          <label
                            className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                              selectedOptions[currentStep] !== "" &&
                              selectedOptions[currentStep] !== "other"
                                ? "text-zinc-400"
                                : "text-zinc-950 font-medium"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`step-${currentStep}`}
                              checked={selectedOptions[currentStep] === "other"}
                              onChange={() => handleOptionChange(currentStep, "other")}
                              className="sr-only"
                            />
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-zinc-900 transition-all ${
                                selectedOptions[currentStep] === "other"
                                  ? "bg-white ring-[4px] ring-zinc-950"
                                  : "bg-white"
                              }`}
                            />
                            <span>other</span>
                          </label>

                          {selectedOptions[currentStep] === "other" && (
                            <div className="pl-8 transition-all duration-200 animate-fade-in">
                              <input
                                type="text"
                                placeholder="Type alternative answer..."
                                value={otherText[currentStep]}
                                onChange={(e) =>
                                  setOtherText((prev) => ({
                                    ...prev,
                                    [currentStep]: e.target.value,
                                  }))
                                }
                                className="w-[220px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-6 pt-2">
                    <button
                      onClick={handleSkipAll}
                      className="text-xs font-semibold text-black hover:underline cursor-pointer"
                    >
                      Skip all
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedOptions[currentStep]}
                      className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
                        selectedOptions[currentStep]
                          ? "bg-[#0c5d56] hover:bg-[#0a4d47] active:scale-[0.98]"
                          : "bg-[#0c5d56]/40 text-white cursor-not-allowed opacity-60"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Forging States
          if (msg.type === "forging-identity") {
            const chosenGoal = selectedOptions[1] === "other" ? (otherText[1] || "Custom goal") : (selectedOptions[1] || "Drive conversions sales");
            const chosenFormat = selectedOptions[2] === "other" ? (otherText[2] || "Custom post") : (selectedOptions[2] || "Snapchat post");
            const chosenAudience = selectedOptions[3] === "other" ? (otherText[3] || "Custom target") : (selectedOptions[3] || "Professionals / B2B");

            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Users size={13} className="animate-pulse" />
                  </div>
                  <span className="italic">
                    Generating Identity <span className="text-gray-400">files...</span>
                  </span>
                  <ChevronDown size={15} className="text-gray-400" />
                </div>

                {/* Forged Identity Card */}
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
                        <p className="mt-1 text-gray-700 font-sans">
                          You are a content creator designed for a skincare brand.
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400"># Primary Responsibilities</span>
                        <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                          <li>Generate multiple content assets focusing on {chosenFormat.toLowerCase()}</li>
                          <li>Drive product sales and {chosenGoal.toLowerCase()} campaigns</li>
                          <li>Tailor campaigns for {chosenAudience.toLowerCase()}</li>
                        </ol>
                      </div>
                      <div>
                        <span className="text-gray-400">## Communication Style</span>
                        <p className="mt-1 text-gray-700 font-sans">
                          Professional, insightful, and results-oriented.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === "forging-interrupted") {
            const chosenFormat = selectedOptions[2] || "Snapchat post";
            const chosenGoal = selectedOptions[1] || "Drive conversions sales";
            const chosenAudience = selectedOptions[3] || "Professionals / B2B";

            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                <div className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Users size={13} />
                  </div>
                  <span className="italic">
                    Generating Identity <span className="text-gray-400">files...</span>
                  </span>
                  <ChevronDown size={15} className="text-gray-400" />
                </div>

                {/* Interrupted Card */}
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
                        <p className="mt-1 text-gray-700 font-sans">
                          You are a content creator designed for a skincare brand.
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400"># Primary Responsibilities</span>
                        <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                          <li>Generate multiple content assets focusing on {chosenFormat.toLowerCase()}</li>
                          <li>Drive product sales and {chosenGoal.toLowerCase()} campaigns</li>
                          <li>Tailor campaigns for {chosenAudience.toLowerCase()}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interrupted Alert */}
                <div className="w-full space-y-2">
                  <div className="text-red-500 text-sm font-medium italic pl-1 flex items-center gap-1.5 animate-bounce">
                    <AlertCircle size={14} className="shrink-0" />
                    Agent Forge response was interrupted!
                  </div>
                  <div className="flex items-center gap-3.5 pl-1 text-zinc-400">
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                      <ThumbsDown size={14} />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                      <Copy size={14} />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === "forging-skills") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
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
            );
          }

          if (msg.type === "forging-personalities") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
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
            );
          }

          if (msg.type === "forging-done") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-3.5 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                <div className="bg-transparent text-[#0c5d56] italic text-[15px] leading-relaxed">
                  Done! Successfully created content creator- Anatassia Rhodes....
                </div>

                {/* Forged Anatassia Success Card */}
                <div className="w-[380px] max-w-full bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1a6b5a] shrink-0">
                      <Sparkles size={20} />
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
                  <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all shrink-0 cursor-pointer">
                    Preview
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3.5 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors cursor-pointer">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer">
                    <ThumbsDown size={14} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer">
                    <Copy size={14} />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}

        <div ref={chatEndRef} />
      </div>

      {/* ---------------- BOTTOM CONTROLLER INPUT BAR ---------------- */}
      <div className="px-6 py-5 bg-[#FBFBFB] md:border-t md:border-gray-100 shrink-0">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-3.5 bg-white shadow-sm focus-within:border-emerald-600/40 focus-within:ring-2 focus-within:ring-emerald-500/5 transition-all">
            {/* Plus Icon */}
            <button
              className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer"
              title="Attach file"
            >
              <Plus size={18} />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your agent..."
              disabled={isQuestionnaireActive}
              className={`flex-1 text-[15px] bg-transparent outline-none text-gray-800 placeholder-gray-400 ${
                isQuestionnaireActive ? "cursor-not-allowed opacity-50" : ""
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isQuestionnaireActive) {
                  handleSendPrompt();
                }
              }}
            />

            {/* Stop or Send Action Button */}
            {isThinking || isForgingActive ? (
              <button
                onClick={handleInterrupt}
                className="w-9 h-9 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shadow-md hover:bg-[#124e42] transition-all shrink-0 cursor-pointer"
                title="Stop generation"
              >
                <Square size={13} fill="white" className="text-white" />
              </button>
            ) : (
              <button
                onClick={handleSendPrompt}
                disabled={isQuestionnaireActive}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer ${
                  isQuestionnaireActive
                    ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    : "bg-[#1a6b5a] text-white hover:bg-[#124e42] active:scale-95"
                }`}
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