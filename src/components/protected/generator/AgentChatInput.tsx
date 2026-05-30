"use client";

import React, { useRef, useState } from "react";
import { FileText, Loader2, X } from "lucide-react";
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <div className="shrink-0 px-[17px] pb-4 pt-2">
      {file && (
        <div className="mb-2 flex w-fit max-w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700">
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

      <form onSubmit={handleSubmit}>
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

        <div
          className="flex items-center gap-[10px]"
          style={{
            borderRadius: 24,
            border: "1px solid #A1A1AA",
            background: "rgba(255, 255, 255, 0.10)",
            boxShadow: "0 6px 18px -2px rgba(0, 0, 0, 0.10)",
            padding: "16px 24px",
          }}
        >
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
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="min-w-0 flex-1 bg-transparent outline-none"
            style={{
              color: "#9E9F9E",
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              fontWeight: 500,
            }}
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex shrink-0 items-center justify-center transition disabled:cursor-not-allowed"
            aria-label="Send prompt"
            style={{
              borderRadius: 100,
              background: canSubmit ? "#0C5D56" : "#C9C9C9",
              padding: 12,
            }}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin text-white" />
            ) : (
              <InputArrowUpIcon />
            )}
          </button>
        </div>

        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}
