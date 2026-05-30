import { CheckCircle2, Loader2 } from "lucide-react";

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
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gray-100 px-4 py-3 text-sm leading-6 text-gray-800">
          {item.text}
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
    <div className="mr-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-800">{item.text}</p>
      {canPreview && (
        <button
          onClick={onPreview}
          className="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Preview
        </button>
      )}
    </div>
  );
}
