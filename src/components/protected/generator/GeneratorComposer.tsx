"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUp, FileText, Loader2, Paperclip, X } from "lucide-react";

import { useAuth } from "@/context/auth";
import { useAgent } from "@/context/agent";
import { generateAgent } from "@/components/protected/generator/api";
import { useDraft } from "@/hooks/useDraft";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".txt", ".md", ".pdf", ".docx"];

type ComposerDraft = { prompt: string };

export default function GeneratorComposer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { fetchAgents } = useAgent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryPrompt =
    searchParams.get("message") ?? searchParams.get("prompt") ?? "";

  const [prompt, setPrompt] = useState(queryPrompt);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firstName = user?.display_name?.split(" ")[0] ?? "there";
  const canSubmit = prompt.trim().length > 0 && !isSubmitting;

  useEffect(() => {
    if (!queryPrompt) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("message");
    next.delete("prompt");
    const clean = next.toString();
    router.replace(`/generator${clean ? `?${clean}` : ""}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { clearDraft } = useDraft<ComposerDraft>(
    "generator:composer",
    { prompt },
    (draft) => {
      // Only restore draft if there was no query param
      if (!queryPrompt && draft.prompt) setPrompt(draft.prompt);
    },
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      clearDraft();
      const result = await generateAgent(trimmed, file);
      fetchAgents();
      router.push(`/generator/${result.agentId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not start generation",
      );
      setIsSubmitting(false);
    }
  }

  function handleFileSelect(nextFile: File | null) {
    setError("");

    if (!nextFile) {
      setFile(null);
      return;
    }

    const name = nextFile.name.toLowerCase();
    const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) =>
      name.endsWith(ext),
    );

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
    <main className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] shadow-sm">
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-normal text-gray-950 md:text-3xl">
              What agent should Anvila forge, {firstName}?
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-gray-200 bg-white p-3 shadow-sm"
          >
            {file && (
              <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                <div className="flex min-w-0 items-center gap-2 text-gray-700">
                  <FileText size={16} className="shrink-0 text-[#0C5D56]" />
                  <span className="truncate">{file.name}</span>
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

            <div className="flex items-end gap-2">
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
                onClick={() => fileInputRef.current?.click()}
                className="mb-1 flex size-10 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                title="Attach file"
              >
                <Paperclip size={18} />
              </button>

              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Describe your agent..."
                rows={3}
                className="max-h-56 min-h-24 flex-1 resize-none bg-transparent px-1 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400 md:text-lg"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={!canSubmit}
                className="mb-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0C5D56] text-white transition hover:bg-[#094a45] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                title="Generate agent"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowUp size={18} />
                )}
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-3 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
