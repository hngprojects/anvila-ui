"use client";

import React, { useRef, useState } from "react";
import { FileText, X, Loader2 } from "lucide-react";
import { InputPlusIcon, InputArrowUpIcon } from "@/components/icons";

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
  placeholder = "Describe your agent...",
  onSubmit,
}: AgentChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const canSubmit = prompt.trim().length > 0 && !disabled && !isLoading;

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
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
    if (!nextFile) { setFile(null); return; }
    const name = nextFile.name.toLowerCase();
    if (!ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
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
    <div className="shrink-0 px-[17px] pb-4 pt-2">
      {file && (
        <div className="mb-2 flex w-fit max-w-full items-center gap-2 rounded-lg border border-border-subtle bg-white px-2.5 py-1 font-sans text-xs text-gray-700">
          <FileText size={14} className="shrink-0 text-teal-brand" />
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

      <form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".txt,.md,.pdf,.docx,text/plain,text/markdown,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => { handleFileSelect(e.target.files?.[0] ?? null); e.target.value = ""; }}
        />

        <div className="flex items-center gap-[10px] rounded-3xl border border-[#A1A1AA] bg-white/10 px-6 py-4 shadow-[0_6px_18px_-2px_rgba(0,0,0,0.10)]">
          <button
            type="button"
            disabled={disabled || isLoading}
            onClick={() => fileInputRef.current?.click()}
            className="flex shrink-0 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Attach file"
          >
            <InputPlusIcon />
          </button>

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="min-w-0 flex-1 bg-transparent font-sans text-xl font-medium text-input-placeholder outline-none placeholder:text-input-placeholder disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={!canSubmit}
            aria-label="Send prompt"
            className={`flex shrink-0 items-center justify-center rounded-full p-3 transition disabled:cursor-not-allowed ${
              canSubmit ? "bg-teal-brand" : "bg-btn-inactive"
            }`}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin text-white" /> : <InputArrowUpIcon />}
          </button>
        </div>

        {error && <p className="mt-2 font-sans text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}
