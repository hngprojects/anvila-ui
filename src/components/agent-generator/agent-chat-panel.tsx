"use client";

import { Plus, SendHorizonal } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/data/demo-agent";

type AgentChatPanelProps = {
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  placeholder?: string;
  className?: string;
};

export function AgentChatPanel({
  messages,
  onSend,
  placeholder = "Describe your agent...",
  className,
}: AgentChatPanelProps) {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setInput("");
  }

  return (
    <section
      className={cn(
        "flex min-h-0 flex-1 flex-col rounded-2xl bg-dashboard-surface shadow-sm",
        className,
      )}
    >
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 sm:p-6"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[90%] text-sm leading-relaxed",
              message.role === "user"
                ? "ml-auto rounded-2xl rounded-br-md bg-teal-brand/10 px-4 py-3 text-logo"
                : "mr-auto rounded-2xl rounded-bl-md bg-background px-4 py-3 text-copy-muted",
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border-subtle p-4 sm:p-5"
      >
        <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-background px-3 py-2">
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-copy-muted transition-colors hover:bg-white hover:text-logo"
            aria-label="Add attachment"
          >
            <Plus className="size-5" />
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-logo outline-none placeholder:text-copy-muted/60"
          />
          <button
            type="submit"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-brand text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <SendHorizonal className="size-4" />
          </button>
        </div>
      </form>
    </section>
  );
}
