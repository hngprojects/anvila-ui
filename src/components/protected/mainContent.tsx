"use client";

import React, { useRef, useState, useEffect } from "react";
import { Plus, ArrowUp, Paperclip, X, FileText } from "lucide-react";
import { useAuth } from "@/context/auth";
import {
  UserMessage,
  TextMessage,
  RadioQuestionnaire,
  ShortAnswerVerification,
  ForgingIdentityCard,
  ForgingStatusBubble,
  ForgingDoneCard,
  ChatInput,
} from "@/components/protected/agent-screen";

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

let messageIdCounter = 0;
const generateMsgId = (prefix: string): string => {
  messageIdCounter += 1;
  return `${prefix}-${messageIdCounter}-${Date.now()}`;
};

export default function MainPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

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

  // Welcome state variables
  const firstName = user?.display_name?.split(" ")[0] ?? "there";
  const hasInput = prompt.trim().length > 0 || attachedFile !== null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);
    e.target.value = "";
  }

  function handleRemoveFile() {
    setAttachedFile(null);
  }

  function handleAddDocs() {
    setShowMenu(false);
    fileInputRef.current?.click();
  }

  const sendBtnClass = hasInput
    ? "bg-[#1a6b5a] text-white hover:bg-[#124e42] active:scale-95"
    : "bg-zinc-200 text-zinc-400 cursor-not-allowed";

  // Main input submission
  const handleSendPrompt = (customPrompt?: string) => {
    const activePrompt = customPrompt?.trim() || prompt.trim() || "Build a content creator for skincare brand";
    setPrompt("");
    setAttachedFile(null); // Clear attached file

    // Reset all questionnaire and forging states
    setSelectedRadioOptions({ 1: "", 2: "", 3: "" });
    setRadioOtherText({ 1: "", 2: "", 3: "" });
    setRadioStep(1);

    setTextAnswers({ 1: "", 2: "", 3: "" });
    setTextStep(1);
    setIdentityExpanded(true);

    const newUserMsg: ChatMessage = {
      id: generateMsgId("u"),
      sender: "user",
      text: activePrompt,
      type: "text",
    };

    const newThinkingMsg: ChatMessage = {
      id: generateMsgId("a-think"),
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
            id: generateMsgId("a-intro"),
            sender: "assistant",
            text: "I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...",
            type: "text",
          },
          {
            id: generateMsgId("a-radio-quest"),
            sender: "assistant",
            type: "questionnaire",
          },
        ];
      });
    }, 1500);
  };

  const handleInterrupt = () => {
    if (forgingTimerRef.current) {
      clearTimeout(forgingTimerRef.current);
    }
    setMessages((prev) => {
      const filtered = prev.filter(
        (m) =>
          m.type !== "forging-skills" &&
          m.type !== "forging-personalities"
      );
      return [
        ...filtered,
        {
          id: generateMsgId("a-interrupt"),
          sender: "assistant",
          type: "forging-interrupted",
        },
      ];
    });
  };

  const handleNextRadio = () => {
    if (radioStep === 1 && selectedRadioOptions[1] === "other") {
      triggerShortAnswerVerification();
      return;
    }

    if (radioStep < 3) {
      setRadioStep((prev) => prev + 1);
    } else {
      triggerShortAnswerVerification();
    }
  };

  const handleSkipAllRadio = () => {
    triggerShortAnswerVerification();
  };

  const triggerShortAnswerVerification = () => {
    setMessages((prev) => prev.filter((m) => m.type !== "questionnaire"));

    const chosenFormat =
      selectedRadioOptions[2] === "other"
        ? radioOtherText[2] || "Snapchat post"
        : selectedRadioOptions[2] || "snapchat";

    const summaryMsg: ChatMessage = {
      id: generateMsgId("u-radio-summary"),
      sender: "user",
      text: `Agent type: content creator for a skincare brand and automates ${chosenFormat.toLowerCase()}`,
      type: "text",
    };

    const userChoseOther = Object.values(selectedRadioOptions).some(
      (val) => val === "other"
    );

    if (userChoseOther) {
      const transitionMsg: ChatMessage = {
        id: generateMsgId("a-radio-trans"),
        sender: "assistant",
        text: "Got it - Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding...",
        type: "text",
      };

      const verificationCardMsg: ChatMessage = {
        id: generateMsgId("a-verify-card"),
        sender: "assistant",
        type: "verification-card",
      };

      setMessages((prev) => [...prev, summaryMsg, transitionMsg, verificationCardMsg]);
    } else {
      setMessages((prev) => [...prev, summaryMsg]);
      triggerForgingSequence();
    }
  };

  const handleNextShortAnswer = () => {
    if (textStep < 3) {
      setTextStep((prev) => prev + 1);
    } else {
      triggerForgingSequence();
    }
  };

  const handleSkipAllShortAnswer = () => {
    triggerForgingSequence();
  };

  const triggerForgingSequence = () => {
    setMessages((prev) => prev.filter((m) => m.type !== "verification-card"));

    const brandName = textAnswers[1]?.trim() ||
      (selectedRadioOptions[1] !== "other" ? selectedRadioOptions[1] : radioOtherText[1]) ||
      "Nior";
    const brandAudience = textAnswers[2]?.trim() ||
      (selectedRadioOptions[3] !== "other" ? selectedRadioOptions[3] : radioOtherText[3]) ||
      "middle aged women";

    const forgeIntroMsg: ChatMessage = {
      id: generateMsgId("a-forge-intro"),
      sender: "assistant",
      text: `Got it- ${brandName} is a skincare brand for ${brandAudience.toLowerCase()}. Forging agent...`,
      type: "text",
    };

    setMessages((prev) => [...prev, forgeIntroMsg]);

    forgingTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId("a-forge-identity"),
          sender: "assistant",
          type: "forging-identity",
        },
      ]);

      forgingTimerRef.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMsgId("a-forge-skills"),
            sender: "assistant",
            type: "forging-skills",
          },
        ]);

        forgingTimerRef.current = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMsgId("a-forge-personalities"),
              sender: "assistant",
              type: "forging-personalities",
            },
          ]);

          forgingTimerRef.current = setTimeout(() => {
            setMessages((prev) => {
              const filtered = prev.filter(
                (m) =>
                  m.type !== "forging-skills" &&
                  m.type !== "forging-personalities"
              );
              return [
                ...filtered,
                {
                  id: generateMsgId("a-forge-done"),
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

  const handleWelcomeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hasInput) {
      handleSendPrompt();
    }
  };

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

  // Conditional Rendering
  if (messages.length > 0) {
    return (
      <main className="h-full flex-1 bg-[#FBFBFB] md:rounded-[24px] md:border md:border-[#E7E8EA] md:shadow-sm flex flex-col min-h-0 overflow-hidden relative">
        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-[80px] pt-16 pb-6 space-y-8 scrollbar-hide">
          {/* Dynamic Timestamp */}
          <div className="text-center text-xs text-gray-500 font-medium py-2">
            {liveTimestamp}
          </div>

          {/* Dynamic Messages Render Loop */}
          {messages.map((msg) => {
            if (msg.sender === "user") {
              return (
                <UserMessage
                  key={msg.id}
                  text={msg.text || ""}
                  onRetry={() => handleSendPrompt(msg.text)}
                />
              );
            }

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
                <TextMessage
                  key={msg.id}
                  id={msg.id}
                  text={msg.text || ""}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              );
            }

            if (msg.type === "questionnaire") {
              return (
                <RadioQuestionnaire
                  key={msg.id}
                  radioStep={radioStep}
                  title={RADIO_QUESTIONS[radioStep].title}
                  options={RADIO_QUESTIONS[radioStep].options}
                  hasOther={!!RADIO_QUESTIONS[radioStep].hasOther}
                  selectedOption={selectedRadioOptions[radioStep]}
                  otherText={radioOtherText[radioStep]}
                  onOptionChange={(option) => handleRadioOptionChange(radioStep, option)}
                  onOtherTextChange={(text) =>
                    setRadioOtherText((prev) => ({ ...prev, [radioStep]: text }))
                  }
                  onNext={handleNextRadio}
                  onSkip={handleSkipAllRadio}
                />
              );
            }

            if (msg.type === "verification-card") {
              return (
                <ShortAnswerVerification
                  key={msg.id}
                  textStep={textStep}
                  title={TEXT_QUESTIONS[textStep].title}
                  placeholder={TEXT_QUESTIONS[textStep].placeholder}
                  answer={textAnswers[textStep]}
                  onAnswerChange={(text) =>
                    setTextAnswers((prev) => ({ ...prev, [textStep]: text }))
                  }
                  onNext={handleNextShortAnswer}
                  onSkip={handleSkipAllShortAnswer}
                />
              );
            }

            if (msg.type === "forging-identity") {
              const brandName = textAnswers[1] || "Nior";
              return (
                <ForgingIdentityCard
                  key={msg.id}
                  msgId={msg.id}
                  brandName={brandName}
                  identityExpanded={identityExpanded}
                  onToggleExpand={() => setIdentityExpanded((prev) => !prev)}
                  isInterrupted={false}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              );
            }

            if (msg.type === "forging-interrupted") {
              const brandName = textAnswers[1] || "Nior";
              return (
                <ForgingIdentityCard
                  key={msg.id}
                  msgId={msg.id}
                  brandName={brandName}
                  identityExpanded={true}
                  onToggleExpand={() => {}}
                  isInterrupted={true}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              );
            }

            if (msg.type === "forging-skills") {
              return <ForgingStatusBubble key={msg.id} type="skills" />;
            }

            if (msg.type === "forging-personalities") {
              return <ForgingStatusBubble key={msg.id} type="personalities" />;
            }

            if (msg.type === "forging-done") {
              return (
                <ForgingDoneCard
                  key={msg.id}
                  msgId={msg.id}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              );
            }

            return null;
          })}

          <div ref={chatEndRef} />
        </div>

        {/* BOTTOM CONTROLLER INPUT BAR */}
        <ChatInput
          value={prompt}
          onChange={setPrompt}
          onSend={() => handleSendPrompt()}
          onInterrupt={handleInterrupt}
          isThinking={isThinking}
          isForgingActive={isForgingActive}
          isQuestionnaireActive={isQuestionnaireActive}
        />
      </main>
    );
  }

  // Welcome State View (messages.length === 0)
  return (
    <main className="flex-1 bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <h1 className="text-[32px] font-bold mb-8 tracking-tight text-black font-sans leading-none">
          What should we build, {firstName}?
        </h1>

        <div className="w-full max-w-[726px]">
          {/* File attachment preview */}
          {attachedFile && (
            <div className="flex items-center gap-2 mb-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm text-gray-600">
              <Paperclip size={13} className="text-gray-400 shrink-0" />
              <span className="truncate flex-1">{attachedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer bg-transparent border-none"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* Input row configured precisely according to the user spec */}
          <div className="w-full max-w-[726px] h-[64px] rounded-[50px] border border-[var(--fg-subtle,#A1A1AA)] pt-[8px] pr-[24px] pb-[8px] pl-[24px] gap-[10px] relative flex items-center bg-white shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200/20 transition-all">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Plus button */}
            <div className="relative flex items-center">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer flex items-center justify-center shrink-0"
              >
                <Plus size={18} />
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute bottom-9 left-0 z-20 bg-[#e5e5e5] rounded-xl shadow-md overflow-hidden min-w-[160px]">
                    <button
                      onClick={handleAddDocs}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-black hover:bg-[#d4d4d4] transition-colors border-none cursor-pointer bg-transparent"
                    >
                      <FileText size={14} className="text-black" />
                      Add docs / files
                    </button>
                  </div>
                </>
              )}
            </div>

            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your agent..."
              onKeyDown={handleWelcomeKeyDown}
              className="flex-1 text-[20px] font-medium leading-[100%] bg-transparent outline-none text-gray-800 placeholder-gray-400 tracking-normal font-sans"
            />

            {/* Send button styled identically to the active chat input bar send button */}
            <button
              onClick={() => handleSendPrompt()}
              disabled={!hasInput}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer border-none ${sendBtnClass}`}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Tag recommendation Pills */}
          <div className="flex flex-wrap gap-2.5 mt-5 justify-center">
            {["No - Code Builder", "Prompt Engineering", "Startup Founders", "AI Engineers"].map((tag) => (
              <button
                key={tag}
                onClick={() => setPrompt(tag)}
                className="px-4 py-2 text-xs font-semibold text-[#52525B] bg-[#F4F4F5] hover:bg-[#E4E4E7] rounded-full transition-colors cursor-pointer border-none shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
