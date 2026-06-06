import { CheckCircle2, Loader2 } from "lucide-react";
import { FileIcon } from "@/components/icons";
import { type ClarificationAnswer } from "@/components/protected/generator/api";
import { CLARIFICATION_FALLBACK_MESSAGE, friendlyFileLabel } from "@/lib/personas";
import ClarificationSummaryCard from "./clarification-card-summary";
import ClarificationCard from "./clarification-card";
import { AssistantText, LoadingMessage, ErrorMessage, ClarificationMessageBubble } from "./message-primitives";
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
        <div className="flex min-h-[62px] w-[360px] items-center gap-5 rounded-2xl bg-user-bubble p-2.5">
          <span className="flex-1 font-sans text-sm leading-6 text-gray-800">{item.text}</span>
        </div>
      </div>
    );
  }

  if (item.type === "assistant") return <AssistantText text={item.text} />;
  if (item.type === "status") return <LoadingMessage text={item.text} />;
  if (item.type === "error") return <ErrorMessage text={item.text} />;

  if (item.type === "file") {
    const isDone = item.completed === true;
    const label = friendlyFileLabel(item.file.key);
    return (
      <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm transition-all duration-300">
        <span className={`flex size-6 items-center justify-center rounded-full ${isDone ? "bg-emerald-50" : "bg-teal-brand/10"}`}>
          {isDone ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Loader2 size={14} className="animate-spin text-teal-brand" />}
        </span>
        <span className={isDone ? "text-gray-800" : "italic text-gray-600"}>
          {isDone ? <>Generated <span className="font-medium">{label}</span> file</> : <>Generating {label} file...</>}
        </span>
      </div>
    );
  }

  if (item.type === "skills") {
    const isDone = item.completed === true;
    return (
      <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm">
        <span className={`flex size-6 items-center justify-center rounded-full ${isDone ? "bg-emerald-50" : "bg-teal-brand/10"}`}>
          {isDone ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Loader2 size={14} className="animate-spin text-teal-brand" />}
        </span>
        <span className={isDone ? "text-gray-800" : "italic text-gray-600"}>
          {isDone ? <>Matched <span className="font-medium">{item.skills.length}</span> skills</> : <>Matching skills...</>}
        </span>
      </div>
    );
  }

  if (item.type === "clarification") {
    return (
      <div className="space-y-3">
        <ClarificationMessageBubble text={item.payload.message || CLARIFICATION_FALLBACK_MESSAGE} />
        <ClarificationCard payload={item.payload} answers={item.answers} isSubmitting={isClarifying} onSubmit={onClarificationSubmit} />
      </div>
    );
  }

  if (item.type === "clarification-summary") {
    return (
      <div className="space-y-3">
        <ClarificationMessageBubble text={item.message || CLARIFICATION_FALLBACK_MESSAGE} />
        <ClarificationSummaryCard round={item.round} items={item.items} />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center self-stretch rounded-[15px] border-[2.5px] border-tag-border bg-[rgba(182,184,189,0.20)] px-[0.75px] pb-[13px] pt-[14px] shadow-[0_25px_50px_-12px_rgba(142,81,255,0.10)]">
      <div className="flex w-full items-center pl-6 pr-6">
        <FileIcon className="h-12 w-[46px] shrink-0 mr-4" />
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex flex-1 min-w-0 flex-col pl-2">
            <p className="truncate font-sans text-xs font-semibold text-dark-fg">{item.text.split(" - ")[0]}</p>
            {item.text.includes(" - ") && (
              <p className="truncate font-sans text-xs font-normal text-dark-fg">{item.text.split(" - ").slice(1).join(" - ")}</p>
            )}
          </div>
          {canPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="ml-4 flex self-stretch items-center justify-center gap-2 rounded-lg border-[0.5px] border-input-placeholder px-5 py-3 font-sans text-sm font-bold text-dark-fg outline-none"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
