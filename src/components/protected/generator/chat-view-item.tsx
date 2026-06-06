import { CheckCircle2, Loader2 } from "lucide-react";

import { FileIcon } from "@/components/icons";
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
      <div className="flex w-full justify-end">
        <div className="flex min-h-12 w-fit max-w-[min(82%,560px)] items-center rounded-2xl bg-user-bubble px-4 py-3">
          <span className="min-w-0 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-gray-800">
            {item.text}
          </span>
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
          readOnly={item.readOnly}
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
    <div className="mr-auto flex w-full max-w-[520px] items-center justify-between rounded-xl border border-tag-border bg-white px-4 py-3 shadow-sm">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileIcon className="size-9 shrink-0" />
          <p className="font-sans text-xs font-semibold leading-5 text-dark-fg">
            {item.text}
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center justify-end">
          {canPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="flex h-8 items-center justify-center rounded-lg border border-[#9E9F9E] px-3 font-sans text-xs font-semibold text-dark-fg hover:bg-gray-50"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
