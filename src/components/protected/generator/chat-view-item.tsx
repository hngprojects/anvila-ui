import { CheckCircle2, Loader2 } from "lucide-react";

import { ForgedAgentDocIcon, ChatCopyIcon } from "@/components/icons";
import { type ClarificationAnswer } from "@/components/protected/generator/api";
import {
  CLARIFICATION_FALLBACK_MESSAGE,
  friendlyFileLabel,
} from "@/lib/personas";
import ClarificationSummaryCard from "./clarification-card-summary";
import ClarificationCard from "./clarification-card";
import {
  AssistantText,
  LoadingMessage,
  ErrorMessage,
  ClarificationMessageBubble,
} from "./message-primitives";
import type { ChatItem } from "@/types/agent";

export function ChatItemView({
  item,
  canPreview,
  isClarifying,
  onPreview,
  onClarificationSubmit,
}: {
  item: ChatItem;
  canPreview: boolean;
  isClarifying: boolean;
  onPreview: () => void;
  onClarificationSubmit: (answers: ClarificationAnswer[]) => void;
}) {
  if (item.type === "user") {
    return (
      <div className="flex w-full justify-end gap-5">
        <div
          className="flex items-center justify-center gap-5"
          style={{
            borderRadius: 16,
            background: "#F4F4F5",
            width: 360,
            minHeight: 62,
            padding: 10,
          }}
        >
          <span className="flex-1 text-sm leading-6 text-gray-800">{item.text}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(item.text)}
            className="shrink-0"
            aria-label="Copy message"
          >
            <ChatCopyIcon />
          </button>
        </div>
      </div>
    );
  }

  if (item.type === "assistant") {
    return <AssistantText text={item.text} />;
  }

  if (item.type === "status") {
    return <LoadingMessage text={item.text} />;
  }

  if (item.type === "error") {
    return <ErrorMessage text={item.text} />;
  }
  if (item.type === "file") {
    const isDone = item.completed === true;
    const label = friendlyFileLabel(item.file.key);

    return (
      <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm transition-all duration-300">
        <span
          className={`flex size-6 items-center justify-center rounded-full ${isDone ? "bg-emerald-50" : "bg-[#0C5D56]/10"}`}
        >
          {isDone ? (
            <CheckCircle2 size={14} className="text-emerald-600" />
          ) : (
            <Loader2 size={14} className="animate-spin text-[#0C5D56]" />
          )}
        </span>
        <span className={isDone ? "text-gray-800" : "italic text-gray-600"}>
          {isDone ? (
            <>
              Generated <span className="font-medium">{label}</span> file
            </>
          ) : (
            <>Generating {label} file...</>
          )}
        </span>
      </div>
    );
  }

  if (item.type === "skills") {
    const isDone = item.completed === true;

    return (
      <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm">
        <span
          className={`flex size-6 items-center justify-center rounded-full ${isDone ? "bg-emerald-50" : "bg-[#0C5D56]/10"}`}
        >
          {isDone ? (
            <CheckCircle2 size={14} className="text-emerald-600" />
          ) : (
            <Loader2 size={14} className="animate-spin text-[#0C5D56]" />
          )}
        </span>
        <span className={isDone ? "text-gray-800" : "italic text-gray-600"}>
          {isDone ? (
            <>
              Matched <span className="font-medium">{item.skills.length}</span>{" "}
              skills
            </>
          ) : (
            <>Matching skills...</>
          )}
        </span>
      </div>
    );
  }

  if (item.type === "clarification") {
    return (
      <div className="space-y-3">
        <ClarificationMessageBubble
          text={item.payload.message || CLARIFICATION_FALLBACK_MESSAGE}
        />
        <ClarificationCard
          payload={item.payload}
          answers={item.answers}
          isSubmitting={isClarifying}
          onSubmit={onClarificationSubmit}
        />
      </div>
    );
  }

  if (item.type === "clarification-summary") {
    return (
      <div className="space-y-3">
        <ClarificationMessageBubble
          text={item.message || CLARIFICATION_FALLBACK_MESSAGE}
        />
        <ClarificationSummaryCard round={item.round} items={item.items} />
      </div>
    );
  }

  return (
    <div
      className="flex w-full items-center justify-center self-stretch"
      style={{
        padding: "14px 1.25px 13px 0.75px",
        borderRadius: 15,
        border: "2.5px solid #B1B5B4",
        background: "rgba(182, 184, 189, 0.20)",
        boxShadow: "0 25px 50px -12px rgba(142, 81, 255, 0.10)",
      }}
    >
      <div className="flex items-center gap-4 px-4">
        <ForgedAgentDocIcon />
        <div className="flex flex-col gap-1">
          <p
            style={{
              color: "#050605",
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {item.text}
          </p>
          {canPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="flex items-center justify-center"
              style={{
                height: 40,
                borderRadius: 16,
                border: "1px solid #E4E4E7",
                background: "#fff",
                color: "#050605",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                padding: "0 16px",
              }}
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
