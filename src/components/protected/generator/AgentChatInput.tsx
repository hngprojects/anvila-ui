"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUp, FileText, Loader2, Paperclip, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".txt", ".md", ".pdf", ".docx"];

interface AgentChatInputProps {
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  onSubmit: (prompt: string, file: File | null) => Promise<void> | void;
}

export default function AgentChatInput({
  disabled,
  isLoading,
  placeholder = "Start a fresh agent...",
  onSubmit,
}: AgentChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const canSubmit = prompt.trim().length > 0 && !disabled && !isLoading;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || disabled || isLoading) return;

    setError("");
    await onSubmit(trimmed, file);
    setPrompt("");
    setFile(null);
  }

  function handleFileSelect(nextFile: File | null) {
    setError("");

    if (!nextFile) {
      setFile(null);
      return;
    }

    const name = nextFile.name.toLowerCase();
    const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));

    if (!hasAllowedExtension) {
      setError("Only txt, md, pdf, and docx files are supported.");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setError("File must be 5MB or smaller.");
      return;
    }

    setFile(nextFile);
  }

  return (
    <div className="shrink-0 border-t border-gray-100 bg-[#FBFBFB] px-4 py-3">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        {file && (
          <div className="mb-2 flex w-fit max-w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700">
            <FileText size={14} className="shrink-0 text-[#0C5D56]" />
            <span className="truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="flex size-5 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Remove file"
            >
              <X size={13} />
            </button>
          </div>
        )}

        <div className="flex min-h-14 items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:border-[#0C5D56]">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".txt,.md,.pdf,.docx,text/plain,text/markdown,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => {
              handleFileSelect(event.target.files?.[0] ?? null);
              event.target.value = "";
            }}
          />

          <button
            type="button"
            disabled={disabled || isLoading}
            onClick={() => fileInputRef.current?.click()}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            title="Attach file"
          >
            <Paperclip size={17} />
          </button>

          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 md:text-base"
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0C5D56] text-white transition hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            title="Send prompt"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
          </button>
        </div>

        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}
