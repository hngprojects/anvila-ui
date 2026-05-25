"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

import AgentChatInput from "@/components/protected/generator/AgentChatInput";
import AgentPreviewPanel from "@/components/protected/generator/AgentPreviewPanel";
import ClarificationCard from "@/components/protected/generator/ClarificationCard";
import {
  fetchAgent,
  fetchAgentMessages,
  generateAgent,
  publishAgent,
  readRememberedSession,
  submitClarification,
  type ClarificationAnswer,
} from "@/components/protected/generator/api";
import {
  PREVIEW_STATUSES,
  STREAM_DONE_STATUSES,
  friendlyFileLabel,
  isClarificationPayload,
  normalizeClarificationPayload,
  normalizeFileEvent,
  normalizeSkills,
  type AgentFileContent,
  type AgentMessage,
  type AgentPersona,
  type AgentSkill,
  type ClarificationPayload,
} from "@/lib/personas";

type ChatItem =
  | { id: string; type: "user"; text: string }
  | { id: string; type: "assistant"; text: string }
  | { id: string; type: "status"; text: string }
  | { id: string; type: "file"; file: AgentFileContent }
  | { id: string; type: "skills"; skills: AgentSkill[] }
  | {
      id: string;
      type: "clarification";
      payload: ClarificationPayload;
      readOnly: boolean;
      answers?: ClarificationAnswer[];
    }
  | { id: string; type: "done"; text: string }
  | { id: string; type: "error"; text: string };

interface AgentWorkspaceProps {
  agentId: string;
}

export default function AgentWorkspace({ agentId }: AgentWorkspaceProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [persona, setPersona] = useState<AgentPersona | null>(null);
  const [files, setFiles] = useState<AgentFileContent[]>([]);
  const [skills, setSkills] = useState<AgentSkill[]>([]);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isStartingFresh, setIsStartingFresh] = useState(false);
  const [isClarifying, setIsClarifying] = useState(false);
  const [activeClarificationId, setActiveClarificationId] = useState("");
  const [streamRun, setStreamRun] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  const canPreview = PREVIEW_STATUSES.has(persona?.status ?? "");
  const isTerminal = STREAM_DONE_STATUSES.has(persona?.status ?? "");
  const isInputDisabled = !isTerminal || Boolean(activeClarificationId);
  const inputPlaceholder = isTerminal
    ? "Start a fresh agent..."
    : activeClarificationId
      ? "Answer the clarification questions to continue"
      : "Generation in progress...";

  useEffect(() => {
    setSessionId(readRememberedSession(agentId));
  }, [agentId]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadError("");
      setItems([]);
      setPersona(null);
      setFiles([]);
      setSkills([]);
      setActiveClarificationId("");
      setPreviewOpen(false);

      try {
        const [nextPersona, messageResult] = await Promise.all([
          fetchAgent(agentId),
          fetchAgentMessages(agentId).catch(() => ({ data: [] as AgentMessage[] })),
        ]);

        if (cancelled) return;

        setPersona(nextPersona);
        setFiles(nextPersona.files);
        setSkills(nextPersona.skills);

        const chatItems = messagesToChatItems(messageResult.data);
        if (PREVIEW_STATUSES.has(nextPersona.status)) {
          chatItems.push({
            id: `done-${agentId}`,
            type: "done",
            text:
              nextPersona.status === "published"
                ? `${nextPersona.name || "Agent"} is published and ready to preview.`
                : `Done. Successfully created ${nextPersona.name || "agent"}.`,
          });
        }
        setItems(chatItems);
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Could not load agent");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [agentId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [items]);

  const refreshPersona = useCallback(async () => {
    const nextPersona = await fetchAgent(agentId);
    setPersona(nextPersona);
    setFiles((current) => mergeFiles(current, nextPersona.files));
    setSkills(nextPersona.skills);
    return nextPersona;
  }, [agentId]);

  const upsertItem = useCallback((nextItem: ChatItem) => {
    setItems((current) => {
      const withoutExisting = current.filter((item) => item.id !== nextItem.id);
      return [...withoutExisting, nextItem];
    });
  }, []);

  const upsertStatus = useCallback(
    (id: string, text: string) => {
      upsertItem({ id, type: "status", text });
    },
    [upsertItem],
  );

  useEffect(() => {
    if (isLoading || loadError || !persona || isTerminal || activeClarificationId) return;

    const source = new EventSource(`/api/personas/${agentId}/stream`);
    let closed = false;

    upsertStatus("stream-status", statusCopy(persona.status));

    source.addEventListener("start", () => {
      upsertStatus("stream-status", "Starting generation...");
    });

    source.addEventListener("file", (event) => {
      const data = parseEventData(event);
      const file = normalizeFileEvent(data);
      if (!file.key) return;

      setFiles((current) => mergeFiles(current, [file]));
      upsertItem({
        id: `file-${file.key}`,
        type: "file",
        file,
      });
    });

    source.addEventListener("skills", (event) => {
      const data = parseEventData(event);
      const nextSkills = normalizeSkills(data);
      setSkills(nextSkills);
      upsertItem({ id: "skills", type: "skills", skills: nextSkills });
    });

    source.addEventListener("clarification", (event) => {
      const payload = normalizeClarificationPayload(parseEventData(event));
      const itemId = `clarification-${payload.round}-${Date.now()}`;

      closed = true;
      source.close();
      setActiveClarificationId(itemId);
      setPersona((current) =>
        current ? { ...current, status: "needs_clarification" } : current,
      );
      setItems((current) => [
        ...withoutStatus(current),
        {
          id: itemId,
          type: "clarification",
          payload,
          readOnly: false,
        },
      ]);
    });

    source.addEventListener("complete", (event) => {
      const data = parseEventData(event) as Record<string, unknown>;
      const name = typeof data.name === "string" ? data.name : "agent";

      closed = true;
      source.close();
      setActiveClarificationId("");
      setItems((current) => [
        ...withoutStatus(current),
        {
          id: `done-${Date.now()}`,
          type: "done",
          text: `Done. Successfully created ${name}.`,
        },
      ]);
      refreshPersona().catch(() => {
        setPersona((current) =>
          current ? { ...current, status: "generated" } : current,
        );
      });
    });

    source.addEventListener("error", (event) => {
      const data = parseEventData(event);
      const message =
        data && typeof data === "object" && "message" in data
          ? String(data.message)
          : "Generation failed. Start a fresh prompt to try again.";

      closed = true;
      source.close();
      setActiveClarificationId("");
      setPersona((current) => (current ? { ...current, status: "failed" } : current));
      setItems((current) => [
        ...withoutStatus(current),
        { id: `error-${Date.now()}`, type: "error", text: message },
      ]);
    });

    source.onerror = () => {
      if (closed) return;
      closed = true;
      source.close();
      setPersona((current) => (current ? { ...current, status: "failed" } : current));
      setItems((current) => [
        ...withoutStatus(current),
        {
          id: `error-${Date.now()}`,
          type: "error",
          text: "The stream disconnected. Start a fresh prompt to try again.",
        },
      ]);
    };

    return () => {
      closed = true;
      source.close();
    };
  }, [
    activeClarificationId,
    agentId,
    isLoading,
    isTerminal,
    loadError,
    persona,
    refreshPersona,
    streamRun,
    upsertItem,
    upsertStatus,
  ]);

  async function handleClarificationSubmit(
    itemId: string,
    payload: ClarificationPayload,
    answers: ClarificationAnswer[],
  ) {
    if (!sessionId) {
      setItems((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          type: "error",
          text: "This session cannot submit clarification after refresh. Start a fresh prompt to continue.",
        },
      ]);
      return;
    }

    setIsClarifying(true);

    try {
      await submitClarification(agentId, sessionId, answers);
      setItems((current) =>
        current.map((item) =>
          item.id === itemId && item.type === "clarification"
            ? { ...item, payload, readOnly: true, answers }
            : item,
        ),
      );
      setActiveClarificationId("");
      setPersona((current) => (current ? { ...current, status: "generating" } : current));
      setStreamRun((value) => value + 1);
    } catch (err) {
      setItems((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          type: "error",
          text: err instanceof Error ? err.message : "Could not submit clarification.",
        },
      ]);
    } finally {
      setIsClarifying(false);
    }
  }

  async function handleFreshPrompt(prompt: string, file: File | null) {
    setIsStartingFresh(true);
    try {
      const result = await generateAgent(prompt, file);
      router.push(`/generator/${result.agentId}`);
    } catch (err) {
      setItems((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          type: "error",
          text: err instanceof Error ? err.message : "Could not start a fresh agent.",
        },
      ]);
      setIsStartingFresh(false);
    }
  }

  async function handlePublish() {
    if (!persona || persona.status === "published") return;

    setIsPublishing(true);
    setPublishError("");

    try {
      const result = await publishAgent(agentId);
      setPersona((current) =>
        current
          ? {
              ...current,
              status: "published",
              publishedAt: result.publishedAt,
              githubRepoUrl: result.githubRepoUrl,
              githubCloneUrl: result.githubCloneUrl,
              githubZipUrl: result.githubZipUrl,
            }
          : current,
      );
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Could not publish agent.");
    } finally {
      setIsPublishing(false);
    }
  }

  const title = persona?.name || "Agent";
  const visibleFiles = useMemo(() => mergeFiles(files, persona?.files ?? []), [files, persona?.files]);
  const visibleSkills = skills.length > 0 ? skills : persona?.skills ?? [];

  return (
    <div className="relative flex h-full min-h-0 overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] shadow-sm">
      <section
        className={`flex min-h-0 flex-col transition-[width] ${
          previewOpen ? "w-full md:w-[340px] xl:w-[380px]" : "w-full"
        }`}
      >
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-gray-950">{title}</h1>
            <p className="mt-0.5 truncate text-xs text-gray-500">
              {persona?.description || statusCopy(persona?.status)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <StatusBadge status={persona?.status} />
            {canPreview && (
              <button
                onClick={() => setPreviewOpen(true)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Preview
              </button>
            )}
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          {isLoading ? (
            <LoadingMessage text="Loading agent..." />
          ) : loadError ? (
            <ErrorMessage text={loadError} />
          ) : items.length === 0 ? (
            <LoadingMessage text={statusCopy(persona?.status)} />
          ) : (
            items.map((item) => (
              <ChatItemView
                key={item.id}
                item={item}
                canPreview={canPreview}
                isClarifying={isClarifying}
                onPreview={() => setPreviewOpen(true)}
                onClarificationSubmit={(answers) => {
                  if (item.type === "clarification") {
                    handleClarificationSubmit(item.id, item.payload, answers);
                  }
                }}
              />
            ))
          )}
        </div>

        <AgentChatInput
          disabled={isInputDisabled}
          isLoading={isStartingFresh}
          placeholder={inputPlaceholder}
          onSubmit={handleFreshPrompt}
        />
      </section>

      {previewOpen && (
        <>
          <div className="hidden min-w-0 flex-1 md:flex">
            <AgentPreviewPanel
              persona={persona}
              files={visibleFiles}
              skills={visibleSkills}
              isPublishing={isPublishing}
              publishError={publishError}
              onClose={() => setPreviewOpen(false)}
              onPublish={handlePublish}
            />
          </div>
          <div className="absolute inset-0 z-30 bg-white md:hidden">
            <AgentPreviewPanel
              persona={persona}
              files={visibleFiles}
              skills={visibleSkills}
              isPublishing={isPublishing}
              publishError={publishError}
              onClose={() => setPreviewOpen(false)}
              onPublish={handlePublish}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ChatItemView({
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
    return (
      <div className="mr-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FileText size={16} className="text-[#0C5D56]" />
          Generating {friendlyFileLabel(item.file.key)} file
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-gray-500">
          {excerpt(item.file.content)}
        </p>
      </div>
    );
  }

  if (item.type === "skills") {
    return (
      <div className="mr-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Sparkles size={16} className="text-[#0C5D56]" />
          Matching skills
        </div>
        {item.skills.length > 0 ? (
          <div className="space-y-2">
            {item.skills.map((skill) => (
              <div key={skill.slug || skill.name}>
                <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                {skill.description && (
                  <p className="text-xs leading-5 text-gray-500">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Matching agent skills...</p>
        )}
      </div>
    );
  }

  if (item.type === "clarification") {
    return (
      <ClarificationCard
        payload={item.payload}
        answers={item.answers}
        readOnly={item.readOnly}
        isSubmitting={isClarifying}
        onSubmit={onClarificationSubmit}
      />
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

function AssistantText({ text }: { text: string }) {
  return (
    <div className="mr-auto max-w-2xl text-sm italic leading-6 text-gray-600">
      {text}
    </div>
  );
}

function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-2xl items-center gap-2 text-sm italic text-gray-600">
      <span className="flex size-6 items-center justify-center rounded-full bg-[#0C5D56]/10">
        <Loader2 size={14} className="animate-spin text-[#0C5D56]" />
      </span>
      {text}
    </div>
  );
}

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto flex max-w-2xl items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const label = status || "loading";
  const generated = label === "generated" || label === "published";
  const failed = label === "failed";

  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium sm:inline-flex ${
        generated
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : failed
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {generated && <CheckCircle2 size={13} />}
      {label.replace(/_/g, " ")}
    </span>
  );
}

function messagesToChatItems(messages: AgentMessage[]): ChatItem[] {
  return messages.map((message): ChatItem => {
    if (message.role === "user") {
      return { id: message.id, type: "user", text: message.content };
    }

    if (message.parsedContent && isClarificationPayload(message.parsedContent)) {
      const payload = normalizeClarificationPayload(message.parsedContent);
      return {
        id: message.id,
        type: "clarification",
        payload: {
          ...payload,
          round: payload.round || message.roundNumber,
        },
        readOnly: true,
        answers: extractClarificationAnswers(message.parsedContent),
      };
    }

    return {
      id: message.id,
      type: "assistant",
      text: message.content,
    };
  });
}

function extractClarificationAnswers(value: unknown): ClarificationAnswer[] {
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;

  if (Array.isArray(record.answers)) {
    return record.answers
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const answer = item as Record<string, unknown>;
        const id = typeof answer.id === "string" ? answer.id : "";
        const text = typeof answer.answer === "string" ? answer.answer : "";
        if (!id || !text.trim()) return null;
        return { id, answer: text };
      })
      .filter((item): item is ClarificationAnswer => Boolean(item));
  }

  return [];
}

function mergeFiles(
  current: AgentFileContent[],
  incoming: AgentFileContent[],
): AgentFileContent[] {
  const next = new Map<string, AgentFileContent>();
  current.forEach((file) => next.set(file.key, file));
  incoming.forEach((file) => next.set(file.key, file));
  return Array.from(next.values());
}

function withoutStatus(items: ChatItem[]) {
  return items.filter((item) => item.type !== "status");
}

function parseEventData(event: Event) {
  const message = event as MessageEvent<string>;
  try {
    return JSON.parse(message.data) as unknown;
  } catch {
    return {};
  }
}

function statusCopy(status?: string) {
  switch (status) {
    case "needs_clarification":
      return "Waiting for clarification...";
    case "skills_matching":
      return "Matching agent skills...";
    case "generated":
      return "Agent generated.";
    case "published":
      return "Agent published.";
    case "failed":
      return "Generation failed.";
    case "draft":
    case "generating":
    default:
      return "Generating agent...";
  }
}

function excerpt(content: string) {
  const compact = content.replace(/\s+/g, " ").trim();
  if (compact.length <= 180) return compact;
  return `${compact.slice(0, 180)}...`;
}
