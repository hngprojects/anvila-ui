"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  WelcomeState,
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
      id: generateMsgId("u"),
      sender: "user",
      text: prompt,
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

  // Radio Choice Questionnaire Card Next Navigation
  const handleNextRadio = () => {
    if (radioStep === 1 && selectedRadioOptions[1] === "other") {
      triggerShortAnswerVerification();
      return;
    }

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
      id: generateMsgId("u-radio-summary"),
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
      id: generateMsgId("a-forge-intro"),
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
          id: generateMsgId("a-forge-identity"),
          sender: "assistant",
          type: "forging-identity",
        },
      ]);

      // Stage 2: Forging Skills
      forgingTimerRef.current = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMsgId("a-forge-skills"),
            sender: "assistant",
            type: "forging-skills",
          },
        ]);

        // Stage 3: Forging Personalities
        forgingTimerRef.current = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMsgId("a-forge-personalities"),
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
          id: generateMsgId("a-interrupt"),
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
          <WelcomeState onTryPrompt={() => handleSendPrompt()} />
        )}

        {/* Dynamic Messages Render Loop */}
        {messages.map((msg) => {
          if (msg.sender === "user") {
            return (
              <UserMessage
                key={msg.id}
                text={msg.text || ""}
                onRetry={handleSendPrompt}
              />
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
              <TextMessage
                key={msg.id}
                id={msg.id}
                text={msg.text || ""}
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            );
          }

          // Radio Questionnaire Card Phase
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

          // Short-Answer Verification Card Phase
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

          // Forging Identity Stage
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

      {/* ---------------- BOTTOM CONTROLLER INPUT BAR ---------------- */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendPrompt}
        onInterrupt={handleInterrupt}
        isThinking={isThinking}
        isForgingActive={isForgingActive}
        isQuestionnaireActive={isQuestionnaireActive}
      />
    </main>
  );
}