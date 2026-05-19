"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  ArrowUp,
  Square,
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
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  FileIcon,
} from "@/components/icons";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text?: string;
  type:
    | "text"
    | "thinking"
    | "questionnaire"
    | "verification-card"
    | "forging-identity"
    | "forging-skills"
    | "forging-personalities"
    | "forging-done"
    | "forging-interrupted";
}

interface RadioQuestion {
  title: string;
  options: string[];
  hasOther?: boolean;
}

interface TextQuestion {
  title: string;
  placeholder: string;
}

const RADIO_QUESTIONS: Record<number, RadioQuestion> = {
  1: {
    title: "What's the goal of this agent?",
    options: ["Drive conversions sales", "Boost engagement", "Educate audience"],
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

const TEXT_QUESTIONS: Record<number, TextQuestion> = {
  1: {
    title: "What is the name of your skincarebrand",
    placeholder: "e.g @nior",
  },
  2: {
    title: "Who is your target audience",
    placeholder: "e.g Nior",
  },
  3: {
    title: "How often do you want to post?",
    placeholder: "e.g Nior",
  },
};

export default function AgentScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Radio Questionnaire States
  const [radioStep, setRadioStep] = useState<number>(1);
  const [selectedRadioOptions, setSelectedRadioOptions] = useState<
    Record<number, string>
  >({
    1: "",
    2: "",
    3: "",
  });
  const [radioOtherText, setRadioOtherText] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });

  // Short Answer Verification Card States
  const [textStep, setTextStep] = useState<number>(1);
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });

  // Identity expanded accordion state
  const [identityExpanded, setIdentityExpanded] = useState(true);

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
  }, [messages, radioStep, textStep]);

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

  const handleRadioOptionChange = (step: number, option: string) => {
    setSelectedRadioOptions((prev) => ({ ...prev, [step]: option }));
  };

  // Main input submission
  const handleSendPrompt = () => {
    const prompt = inputValue.trim() || "Build a content creator for skincare brand";
    setInputValue("");

    // Reset all questionnaire and forging states
    setSelectedRadioOptions({ 1: "", 2: "", 3: "" });
    setRadioOtherText({ 1: "", 2: "", 3: "" });
    setRadioStep(1);

    setTextAnswers({ 1: "", 2: "", 3: "" });
    setTextStep(1);
    setIdentityExpanded(true);

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

    // Transition from Thinking to Radio Questionnaire after 1.5s
    forgingTimerRef.current = setTimeout(() => {
      setMessages((prev) => {
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
            id: `a-radio-quest-${Date.now()}`,
            sender: "assistant",
            type: "questionnaire",
          },
        ];
      });
    }, 1500);
  };

  // Radio Choice Questionnaire Card Next Navigation
  const handleNextRadio = () => {
    if (radioStep < 3) {
      setRadioStep((prev) => prev + 1);
    } else {
      // Finished all multiple choice questions! Transition to Short-Answer Brand verification
      triggerShortAnswerVerification();
    }
  };

  const handleSkipAllRadio = () => {
    triggerShortAnswerVerification();
  };

  const triggerShortAnswerVerification = () => {
    // 1. Remove active radio questionnaire card
    setMessages((prev) => prev.filter((m) => m.type !== "questionnaire"));

    // 2. Summary of choices
    const chosenFormat =
      selectedRadioOptions[2] === "other"
        ? radioOtherText[2] || "Snapchat post"
        : selectedRadioOptions[2] || "snapchat";

    const summaryMsg: ChatMessage = {
      id: `u-radio-summary-${Date.now()}`,
      sender: "user",
      text: `Agent type: content creator for a skincare brand and automates ${chosenFormat.toLowerCase()}`,
      type: "text",
    };

    // 3. Check if any radio question used "other" — if so, show the short-answer brand card
    const userChoseOther = Object.values(selectedRadioOptions).some(
      (val) => val === "other"
    );

    if (userChoseOther) {
      // Assistant transition reply before short-answer card
      const transitionMsg: ChatMessage = {
        id: `a-radio-trans-${Date.now()}`,
        sender: "assistant",
        text: "Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding...",
        type: "text",
      };

      const verificationCardMsg: ChatMessage = {
        id: `a-verify-card-${Date.now()}`,
        sender: "assistant",
        type: "verification-card",
      };

      setMessages((prev) => [...prev, summaryMsg, transitionMsg, verificationCardMsg]);
    } else {
      // No "other" selected — go straight to forging
      setMessages((prev) => [...prev, summaryMsg]);
      triggerForgingSequence();
    }
  };

  // Short Answer verification navigation
  const handleNextShortAnswer = () => {
    if (textStep < 3) {
      setTextStep((prev) => prev + 1);
    } else {
      // Completed brand verification questions! Start actual Forging animations
      triggerForgingSequence();
    }
  };

  const handleSkipAllShortAnswer = () => {
    triggerForgingSequence();
  };

  const triggerForgingSequence = () => {
    // 1. Remove active short answer verification card (safe even if none exists)
    setMessages((prev) => prev.filter((m) => m.type !== "verification-card"));

    // 2. Build forging intro — use text answers if available, else fall back to radio choices
    const brandName = textAnswers[1]?.trim() ||
      (selectedRadioOptions[1] !== "other" ? selectedRadioOptions[1] : radioOtherText[1]) ||
      "Nior";
    const brandAudience = textAnswers[2]?.trim() ||
      (selectedRadioOptions[3] !== "other" ? selectedRadioOptions[3] : radioOtherText[3]) ||
      "middle aged women";

    const forgeIntroMsg: ChatMessage = {
      id: `a-forge-intro-${Date.now()}`,
      sender: "assistant",
      text: `Got it- ${brandName} is a skincare brand for ${brandAudience.toLowerCase()}. Forging agent...`,
      type: "text",
    };

    setMessages((prev) => [...prev, forgeIntroMsg]);

    // 3. Trigger incremental forging animations
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

          // Stage 4: Forging Complete / Success Card
          forgingTimerRef.current = setTimeout(() => {
            setMessages((prev) => {
              // Filter out active loading spinners
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

  // Interrupt / Stop response
  const handleInterrupt = () => {
    if (forgingTimerRef.current) {
      clearTimeout(forgingTimerRef.current);
    }
    setMessages((prev) => {
      // Remove loading status blocks and append interrupted alert
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

  // Flag states to control bottom input send button
  const isThinking = messages.some((m) => m.type === "thinking");
  const isRadioActive = messages.some((m) => m.type === "questionnaire");
  const isVerifyActive = messages.some((m) => m.type === "verification-card");
  const isQuestionnaireActive = isRadioActive || isVerifyActive;

  const isForgingActive =
    messages.some(
      (m) =>
        m.type === "forging-identity" ||
        m.type === "forging-skills" ||
        m.type === "forging-personalities"
    ) &&
    !messages.some(
      (m) => m.type === "forging-done" || m.type === "forging-interrupted"
    );

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
                    <ThumbsUpIcon className="w-[14px] h-[14px]" />
                  </button>
                  <button className="hover:text-zinc-600 transition-colors cursor-pointer">
                    <ThumbsDownIcon className="w-[14px] h-[14px]" />
                  </button>
                  <button
                    onClick={() => handleCopy(msg.text || "", msg.id)}
                    className="hover:text-zinc-600 transition-colors relative cursor-pointer"
                  >
                    <CopyIcon classname="w-[14px] h-[14px]" />
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

          // Radio Questionnaire Card Phase
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
                    <span className="font-mono text-zinc-500">{radioStep}/3</span>
                  </div>

                  {/* Title */}
                  <div className="py-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-black mb-4">
                      <span>{RADIO_QUESTIONS[radioStep].title}</span>
                      <span className="text-[11px] font-normal text-zinc-500">
                        Select one answer
                      </span>
                    </div>

                    {/* Options List */}
                    <div className="space-y-3">
                      {RADIO_QUESTIONS[radioStep].options.map((option) => {
                        const isSelected = selectedRadioOptions[radioStep] === option;
                        const hasSelection = selectedRadioOptions[radioStep] !== "";
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
                              name={`radio-${radioStep}`}
                              checked={isSelected}
                              onChange={() => handleRadioOptionChange(radioStep, option)}
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
                      {RADIO_QUESTIONS[radioStep].hasOther && (
                        <div className="space-y-3">
                          <label
                            className={`flex items-center gap-3.5 cursor-pointer text-sm transition-colors ${
                              selectedRadioOptions[radioStep] !== "" &&
                              selectedRadioOptions[radioStep] !== "other"
                                ? "text-zinc-400"
                                : "text-zinc-950 font-medium"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`radio-${radioStep}`}
                              checked={selectedRadioOptions[radioStep] === "other"}
                              onChange={() => handleRadioOptionChange(radioStep, "other")}
                              className="sr-only"
                            />
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-zinc-900 transition-all ${
                                selectedRadioOptions[radioStep] === "other"
                                  ? "bg-white ring-[4px] ring-zinc-950"
                                  : "bg-white"
                              }`}
                            />
                            <span>other</span>
                          </label>

                          {selectedRadioOptions[radioStep] === "other" && (
                            <div className="pl-8 transition-all duration-200 animate-fade-in">
                              <input
                                type="text"
                                placeholder="pinterest post"
                                value={radioOtherText[radioStep]}
                                onChange={(e) =>
                                  setRadioOtherText((prev) => ({
                                    ...prev,
                                    [radioStep]: e.target.value,
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
                      onClick={handleSkipAllRadio}
                      className="text-xs font-semibold text-black hover:underline cursor-pointer bg-transparent border-none"
                    >
                      Skip all
                    </button>
                    <button
                      onClick={handleNextRadio}
                      disabled={
                        !selectedRadioOptions[radioStep] ||
                        (selectedRadioOptions[radioStep] === "other" && !radioOtherText[radioStep]?.trim())
                      }
                      className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm border-none ${
                        selectedRadioOptions[radioStep] &&
                        !(selectedRadioOptions[radioStep] === "other" && !radioOtherText[radioStep]?.trim())
                          ? "bg-[#0c5d56] hover:bg-[#0a4d47] active:scale-[0.98] cursor-pointer"
                          : "bg-[#0c5d56]/40 cursor-not-allowed opacity-60"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Short-Answer Verification Card Phase
          if (msg.type === "verification-card") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                <div className="w-[450px] max-w-full rounded-2xl border border-zinc-200 bg-[#F4F4F5] p-5 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3 text-sm font-semibold text-black">
                    <span>Questions</span>
                    <span className="font-mono text-zinc-500">{textStep}/3</span>
                  </div>

                  {/* Question */}
                  <div className="py-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-black mb-4">
                      <span>{TEXT_QUESTIONS[textStep].title}</span>
                      <span className="text-[11px] font-normal text-zinc-500">
                        Writ short answer
                      </span>
                    </div>

                    {/* Text input */}
                    <div className="transition-all duration-200">
                      <input
                        type="text"
                        placeholder={TEXT_QUESTIONS[textStep].placeholder}
                        value={textAnswers[textStep]}
                        onChange={(e) =>
                          setTextAnswers((prev) => ({
                            ...prev,
                            [textStep]: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-3.5 text-sm text-gray-800 placeholder-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && textAnswers[textStep].trim()) {
                            handleNextShortAnswer();
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-6 pt-2">
                    <button
                      onClick={handleSkipAllShortAnswer}
                      className="text-xs font-semibold text-black hover:underline cursor-pointer bg-transparent border-none"
                    >
                      Skip all
                    </button>
                    <button
                      onClick={handleNextShortAnswer}
                      disabled={!textAnswers[textStep].trim()}
                      className={`rounded-lg px-5 py-2 text-xs font-bold text-white transition-all shadow-sm cursor-pointer border-none ${
                        textAnswers[textStep].trim()
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

          // Forging Identity Stage
          if (msg.type === "forging-identity") {
            const brandName = textAnswers[1] || "Nior";
            const brandAudience = textAnswers[2] || "middle aged women";
            const chosenGoal =
              selectedRadioOptions[1] === "other"
                ? radioOtherText[1] || "pinterest post"
                : selectedRadioOptions[1] || "Drive conversions sales";
            const chosenFormat =
              selectedRadioOptions[2] === "other"
                ? radioOtherText[2] || "Snapchat post"
                : selectedRadioOptions[2] || "Snapchat post";

            return (
              <div
                key={msg.id}
                className="flex flex-col items-start space-y-4 max-w-2xl mr-auto pl-2 animate-fade-in"
              >
                {/* Expandable Accordion Header */}
                <button
                  onClick={() => setIdentityExpanded((prev) => !prev)}
                  className="flex items-center gap-2.5 text-sm text-[#0c5d56] font-medium bg-transparent border-none cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Users size={13} />
                  </div>
                  <span className="italic">
                    Generating Identity <span className="text-gray-400">files...</span>
                  </span>
                  {identityExpanded ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
                </button>

                {/* Forged Identity Card Content */}
                {identityExpanded && (
                  <div className="w-[450px] max-w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[350px]">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                      <FileText size={18} className="text-gray-500 shrink-0" />
                      <h3 className="font-semibold text-gray-700 text-sm truncate">
                        Skincare brand AI content creator agent
                      </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55">
                      <div className="space-y-4 text-left">
                        <div>
                          <span className="text-gray-400"># Identity</span>
                        </div>
                        <div>
                          <span className="text-gray-400"># Core Purpose</span>
                          <p className="mt-1 text-gray-700 font-sans">
                            You are a content creator designed for a skincare brand {brandName}.
                          </p>
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
                          <p className="mt-1 text-gray-700 font-sans">
                            Professional, insightful, and results-oriented.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          if (msg.type === "forging-interrupted") {
            const brandName = textAnswers[1] || "Nior";

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
                <div className="w-[450px] max-w-full bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[300px]">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                    <FileText size={18} className="text-gray-500 shrink-0" />
                    <h3 className="font-semibold text-gray-700 text-sm truncate">
                      Skincare brand AI content creator agent
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5 font-mono text-[13px] text-gray-600 leading-relaxed bg-[#FAFAFA]/55 text-left">
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400"># Identity</span>
                      </div>
                      <div>
                        <span className="text-gray-400"># Core Purpose</span>
                        <p className="mt-1 text-gray-700 font-sans">
                          You are a content creator designed for a skincare brand {brandName}.
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">#Primary Responsibilities</span>
                        <ol className="mt-1 list-decimal pl-5 space-y-1 font-sans text-gray-700">
                          <li>Generate multiple content materials</li>
                          <li>Automate product campaigns for new collections</li>
                          <li>Stay current with industry best practices and emerging trends</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interrupted Alert */}
                <div className="w-full space-y-2 text-left">
                  <div className="text-red-500 text-sm font-medium italic pl-1 flex items-center gap-1.5 animate-bounce">
                    <AlertCircle size={14} className="shrink-0" />
                    Agent Forge response was interrupted!
                  </div>
                  <div className="flex items-center gap-3.5 pl-1 text-zinc-400">
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
                      <ThumbsUpIcon className="w-[14px] h-[14px]" />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
                      <ThumbsDownIcon className="w-[14px] h-[14px]" />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
                      <CopyIcon classname="w-[14px] h-[14px]" />
                    </button>
                    <button className="hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none">
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
                <div 
                  className="bg-white flex items-center justify-between px-5 shadow-sm border-[2.5px] border-[#A1A1AA] rounded-[15px]"
                  style={{ width: "685px", maxWidth: "100%", height: "75px" }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="shrink-0 flex items-center justify-center">
                      <FileIcon className="w-12 h-12 text-black" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-sm font-semibold text-gray-800 truncate">
                        Forged Anatassia
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        content creator agent
                      </p>
                    </div>
                  </div>
                  <button 
                    className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all shrink-0 cursor-pointer flex items-center justify-center rounded-[16px]"
                    style={{ width: "95px", height: "40px" }}
                  >
                    Preview
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3.5 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
                    <ThumbsUpIcon className="w-[14px] h-[14px]" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
                    <ThumbsDownIcon className="w-[14px] h-[14px]" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
                    <CopyIcon classname="w-[14px] h-[14px]" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none">
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
              className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer bg-transparent border-none"
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
                className="w-9 h-9 rounded-full bg-[#1a6b5a] text-white flex items-center justify-center shadow-md hover:bg-[#124e42] transition-all shrink-0 cursor-pointer border-none"
                title="Stop generation"
              >
                <Square size={13} fill="white" className="text-white" />
              </button>
            ) : (
              <button
                onClick={handleSendPrompt}
                disabled={isQuestionnaireActive}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer border-none ${
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