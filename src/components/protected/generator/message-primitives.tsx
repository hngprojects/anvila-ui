import { AlertCircle, Loader2 } from "lucide-react";

export function AssistantText({ text }: { text: string }) {
  return (
    <div className="mr-auto max-w-2xl text-sm italic leading-6 text-gray-600">
      {text}
    </div>
  );
}

export function ClarificationMessageBubble({ text }: { text: string }) {
  return (
    <div className="mr-auto max-w-2xl text-sm italic leading-6 text-gray-500">
      {text}
    </div>
  );
}

export function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm italic text-gray-600">
      <span className="flex size-6 items-center justify-center rounded-full bg-[#0C5D56]/10">
        <Loader2 size={14} className="animate-spin text-[#0C5D56]" />
      </span>
      {text}
    </div>
  );
}

export function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-2xl items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}
