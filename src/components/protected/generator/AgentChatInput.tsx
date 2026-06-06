"use client";

import React, { useRef, useState } from "react";
import { FileText, X, Loader2, Paperclip, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".txt", ".md", ".pdf", ".docx"];

interface AgentChatInputProps {
  disabled?: boolean;
  disableFileAttachment?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  onSubmit: (prompt: string, file: File | null) => Promise<void> | void;
}

export default function AgentChatInput({
  disabled,
  disableFileAttachment = false,
  isLoading,
  placeholder = "Describe your agent...",
  onSubmit,
}: AgentChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const canSubmit = prompt.trim().length > 0 && !disabled && !isLoading;
  const fileControlsDisabled = disabled || disableFileAttachment || isLoading;
  const visibleFile = disableFileAttachment ? null : file;
  const visibleError = disableFileAttachment ? "" : error;

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || disabled || isLoading) return;
    setError("");
    const submittedFile = disableFileAttachment ? null : file;
    setPrompt("");
    setFile(null);
    await onSubmit(trimmed, submittedFile);
  }

  function handleFileSelect(nextFile: File | null) {
    setError("");
    if (disableFileAttachment) {
      setFile(null);
      return;
    }

    if (!nextFile) {
      setFile(null);
      return;
    }
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
    <div className="shrink-0 px-[17px] pb-4 pt-2 w-full">
      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-gray-200 bg-white p-3 shadow-sm"
      >
        {visibleFile && (
          <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
            <div className="flex min-w-0 items-center gap-2 text-gray-700">
              <FileText size={16} className="shrink-0 text-[#0C5D56]" />
              <span className="truncate">{visibleFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Remove file"
            >
              <X size={15} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".txt,.md,.pdf,.docx,text/plain,text/markdown,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              handleFileSelect(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={fileControlsDisabled}
            className="shrink-0 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            title={
              disableFileAttachment
                ? "Files are not supported while refining"
                : "Attach file"
            }
          >
            <Paperclip size={18} />
          </Button>

          <textarea
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
            rows={1}
            className="max-h-56 flex-1 resize-none bg-transparent px-1 py-2 text-base text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
          />

          <Button
            type="submit"
            size="icon"
            disabled={!canSubmit}
            className="shrink-0 rounded-full bg-[#0C5D56] text-white hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            title="Generate agent"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowUp size={18} />
            )}
          </Button>
        </div>
      </form>

      {visibleError && (
        <p className="mt-2 font-sans text-xs text-red-600">{visibleError}</p>
      )}
    </div>
  );
}
