"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import AgentChatInput from "@/components/protected/generator/AgentChatInput";
import AgentPreviewPanel from "@/components/protected/generator/AgentPreviewPanel";
import {
  fetchAgent,
  fetchAgentMessages,
  generateAgent,
  publishAgent,
  submitClarification,
  readRememberedSession,
  type ClarificationAnswer,
} from "@/components/protected/generator/api";
import {
  PREVIEW_STATUSES,
  STREAM_DONE_STATUSES,
  normalizeClarificationPayload,
  normalizeFileEvent,
  normalizeSkills,
} from "@/lib/personas";
import { ChatItemView } from "./chat-view-item";
import type { AgentFileContent, AgentMessage, AgentPersona, AgentSkill, ChatItem, ClarificationPayload } from "@/types/agent";
import { LoadingMessage, ErrorMessage } from "./message-primitives";
import { StatusBadge } from "./status-badge";
import {
  messagesToChatItems,
  mergeFiles,
  statusCopy,
  parseEventData,
  withoutStatus,
} from "./utils";

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
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const [streamReconnectNonce, setStreamReconnectNonce] = useState(0);

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
          fetchAgentMessages(agentId).catch(() => ({
            data: [] as AgentMessage[],
          })),
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
          setLoadError(
            err instanceof Error ? err.message : "Could not load agent",
          );
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

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!persona?.name || !agentId) return;

    const bc =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("agent-sessions")
        : null;

    if (bc) {
      bc.postMessage({ type: "update-name", agentId, name: persona.name });
      bc.close();
    }
  }, [persona?.name, agentId]);

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
    if (
      isLoading ||
      loadError ||
      !persona ||
      isTerminal ||
      activeClarificationId
    )
      return;

    const source = new EventSource(`/api/personas/${agentId}/stream`);
    let closed = false;

    upsertStatus("stream-status", statusCopy(persona.status));

    source.addEventListener("start", () => {
      reconnectAttemptsRef.current = 0;
      upsertStatus("stream-status", "Starting generation...");
    });

    source.addEventListener("file", (event) => {
      const data = parseEventData(event);
      const file = normalizeFileEvent(data);
      if (!file.key) return;

      setFiles((current) => mergeFiles(current, [file]));
      upsertItem({ id: `file-${file.key}`, type: "file", file });
      setTimeout(() => {
        upsertItem({
          id: `file-${file.key}`,
          type: "file",
          file,
          completed: true,
        });
      }, 800);
    });

    source.addEventListener("skills", (event) => {
      const data = parseEventData(event);
      const nextSkills = normalizeSkills(data);
      setSkills(nextSkills);
      upsertItem({ id: "skills", type: "skills", skills: nextSkills });
      setTimeout(() => {
        upsertItem({
          id: "skills",
          type: "skills",
          skills: nextSkills,
          completed: true,
        });
      }, 800);
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
      reconnectAttemptsRef.current = 0;
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
      reconnectAttemptsRef.current = 0;
      setActiveClarificationId("");
      setPersona((current) =>
        current ? { ...current, status: "failed" } : current,
      );
      setItems((current) => [
        ...withoutStatus(current),
        { id: `error-${Date.now()}`, type: "error", text: message },
      ]);
    });

    source.onerror = () => {
      if (closed) return;
      closed = true;
      source.close();
      const attempts = reconnectAttemptsRef.current;
      if (attempts < 3) {
        const nextAttempt = attempts + 1;
        reconnectAttemptsRef.current = nextAttempt;
        const delay = nextAttempt * 1500;
        upsertStatus(
          "stream-status",
          `Connection lost. Reconnecting (${nextAttempt}/3)...`,
        );
        reconnectTimerRef.current = setTimeout(() => {
          setStreamReconnectNonce((value) => value + 1);
        }, delay);
        return;
      }
      reconnectAttemptsRef.current = 0;
      setPersona((current) =>
        current ? { ...current, status: "failed" } : current,
      );
      setItems((current) => [
        ...withoutStatus(current),
        {
          id: `error-${Date.now()}`,
          type: "error",
          text: "The stream disconnected after multiple retries. Start a fresh prompt to try again.",
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
    streamReconnectNonce,
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
      setPersona((current) =>
        current ? { ...current, status: "generating" } : current,
      );
      setStreamRun((value) => value + 1);
    } catch (err) {
      setItems((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          type: "error",
          text:
            err instanceof Error
              ? err.message
              : "Could not submit clarification.",
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
          text:
            err instanceof Error
              ? err.message
              : "Could not start a fresh agent.",
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
      setPublishError(
        err instanceof Error ? err.message : "Could not publish agent.",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  const title = persona?.name || "Agent";
  const visibleFiles = useMemo(
    () => mergeFiles(files, persona?.files ?? []),
    [files, persona?.files],
  );
  const visibleSkills = skills.length > 0 ? skills : (persona?.skills ?? []);

  return (
    <div className="relative flex h-full min-h-0 overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] shadow-sm">
      <section
        className={`flex min-h-0 flex-col transition-[width] ${
          previewOpen ? "w-full md:w-[340px] xl:w-[380px]" : "w-full"
        }`}
      >
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-gray-950">
              {title}
            </h1>
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

        <div
          ref={scrollRef}
          className="flex-1 space-y-5 overflow-y-auto px-4 py-5"
        >
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
