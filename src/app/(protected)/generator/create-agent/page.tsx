"use client";

import * as React from "react";

import ChatPanel from "@/components/create-agent/ChatPanel";
import { ChatMessageProps } from "@/interface";
import { INITIAL_MESSAGES } from "@/data/agents";
import PreviewSection from "@/components/create-agent/PreviewSection";

export default function CreateAgentPage() {
  const [messages, setMessages] = React.useState<ChatMessageProps[]>(INITIAL_MESSAGES);

  function handleSend(content: string) {
    const userMsg: ChatMessageProps = { id: crypto.randomUUID(), role: "user", content };
    const reply: ChatMessageProps = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Thanks — I'll refine the agent based on your input. (Demo response)",
    };
    setMessages((prev) => [...prev, userMsg, reply]);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#FBFBFB] md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">

      {/* 2-column content area */}
      <div className="flex flex-col md:flex-row min-h-0 flex-1 gap-3 px-2 md:px-4 pb-2 md:pb-4 overflow-y-auto md:overflow-hidden">
        {/* Chat panel — fixed width on md+ */}
        <div className="w-full md:w-72 xl:w-80 shrink-0 h-[60vh] md:h-full min-h-[500px] md:min-h-0 mb-4 md:mb-0">
          <ChatPanel messages={messages} onSend={handleSend} />
        </div>
        
        {/* Preview section */}
        <div className="w-full md:flex-1 min-h-[600px] md:min-h-0 h-auto md:h-full flex flex-col">
          <PreviewSection />
        </div>
      </div>
    </div>
  );
}
