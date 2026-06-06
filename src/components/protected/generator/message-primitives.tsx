import { AlertCircle, Loader2 } from "lucide-react";

import MarkdownPreview from "@/components/create-agent/MarkDownPreview";

export function AssistantText({ text }: { text: string }) {
  return (
    <div className="mr-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <MarkdownPreview content={text} compact />
    </div>
  );
}

export function ClarificationMessageBubble({ text }: { text: string }) {
  return (
    <div className="mr-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-600 shadow-sm">
      <MarkdownPreview content={text} compact />
    </div>
  );
}

export function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-[720px] items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
      <span className="flex size-6 items-center justify-center rounded-full bg-[#0C5D56]/10">
        <Loader2 size={14} className="animate-spin text-[#0C5D56]" />
      </span>
      {text}
    </div>
  );
}

export function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-[720px] items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}
