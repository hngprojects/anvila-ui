"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { GithubPublishModal } from "@/components/publish-modal";
import AgentChatInput from "@/components/protected/generator/AgentChatInput";
import AgentPreviewPanel from "@/components/protected/generator/AgentPreviewPanel";
import { startGithubConnect } from "@/components/protected/github-connect";
import {
  PublishingSpinnerIcon,
  PublishedSuccessIcon,
  PublishFailedIcon,
} from "@/components/icons";
import { useAuth } from "@/context/auth";
import {
  fetchAgent,
  fetchAgentMessages,
  generateAgent,
  publishAgent,
  publishAgentPrivate,
  refineAgent,
  submitClarification,
  readRememberedSession,
  type ClarificationAnswer,
  type RefineStreamEvent,
} from "@/components/protected/generator/api";
import {
  PREVIEW_STATUSES,
  STREAM_DONE_STATUSES,
  friendlyFileName,
  normalizeClarificationPayload,
  normalizeFileEvent,
  normalizeSkills,
} from "@/lib/personas";
import { ChatItemView } from "./chat-view-item";
import type {
  AgentFileContent,
  AgentMessage,
  AgentPersona,
  AgentSkill,
  ChatItem,
  ClarificationPayload,
} from "@/types/agent";
import { LoadingMessage, ErrorMessage } from "./message-primitives";
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

const STREAM_STATUS_ID = "stream-status";

function refineStatusCopy(event: RefineStreamEvent) {
  const state = typeof event.state === "string" ? event.state : "";

  switch (state) {
    case "regenerating":
      return "Thinking through the changes...";
    default:
      return state ? "Thinking..." : "Thinking...";
  }
}

function refineErrorCopy(event: RefineStreamEvent) {
  const message = event.message;
  const detail = event.detail;

  if (typeof message === "string") return message;
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object" && "message" in detail) {
    const detailMessage = (detail as Record<string, unknown>).message;
    if (typeof detailMessage === "string") return detailMessage;
  }

  return "Refinement failed. Please try again.";
}

export default function AgentWorkspace({ agentId }: AgentWorkspaceProps) {
  const router = useRouter();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [persona, setPersona] = useState<AgentPersona | null>(null);
  const [files, setFiles] = useState<AgentFileContent[]>([]);
  const [skills, setSkills] = useState<AgentSkill[]>([]);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isStartingFresh, setIsStartingFresh] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isClarifying, setIsClarifying] = useState(false);
  const [activeClarificationId, setActiveClarificationId] = useState("");
  const [streamRun, setStreamRun] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMode, setPublishMode] = useState<"public" | "private">("public");
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [showPublishLinks, setShowPublishLinks] = useState(false);
  const [showGithubConnectPrompt, setShowGithubConnectPrompt] = useState(false);
  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const [githubConnectError, setGithubConnectError] = useState("");
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const [streamReconnectNonce, setStreamReconnectNonce] = useState(0);

  const canPreview = PREVIEW_STATUSES.has(persona?.status ?? "");
  const isTerminal = STREAM_DONE_STATUSES.has(persona?.status ?? "");
  const canRefine = PREVIEW_STATUSES.has(persona?.status ?? "");
  const isInputDisabled = !isTerminal || Boolean(activeClarificationId);
  const isPromptSubmitting = isStartingFresh || isRefining;
  const inputPlaceholder = canRefine
    ? "Ask for changes to this agent..."
    : isTerminal
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

  const refreshConversation = useCallback(async () => {
    const [nextPersona, messageResult] = await Promise.all([
      fetchAgent(agentId),
      fetchAgentMessages(agentId).catch(() => ({
        data: [] as AgentMessage[],
      })),
    ]);

    setPersona(nextPersona);
    setFiles((current) => mergeFiles(current, nextPersona.files));
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

  const appendAssistantChunk = useCallback((id: string, text: string) => {
    if (!text) return;

    setItems((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index === -1) {
        const statusIndex = current.findIndex(
          (item) => item.id === STREAM_STATUS_ID,
        );
        if (statusIndex === -1) {
          return [...current, { id, type: "assistant", text }];
        }

        return [
          ...current.slice(0, statusIndex),
          { id, type: "assistant", text },
          ...current.slice(statusIndex),
        ];
      }

      const next = [...current];
      const item = next[index];
      if (item.type === "assistant") {
        next[index] = { ...item, text: `${item.text}${text}` };
      }
      return next;
    });
  }, []);

  const handleRefineStreamEvent = useCallback(
    (event: RefineStreamEvent, assistantId: string) => {
      switch (event.type) {
        case "status":
          upsertStatus(STREAM_STATUS_ID, refineStatusCopy(event));
          return;
        case "token":
          appendAssistantChunk(
            assistantId,
            typeof event.text === "string" ? event.text : "",
          );
          return;
        case "file": {
          const file = normalizeFileEvent(event);
          if (!file.key) return;

          setFiles((current) => mergeFiles(current, [file]));
          upsertStatus(
            STREAM_STATUS_ID,
            `Generating ${friendlyFileName(file.key)}...`,
          );
          return;
        }
        case "skills": {
          const nextSkills = normalizeSkills(event);
          setSkills(nextSkills);
          upsertStatus(STREAM_STATUS_ID, "Matching skills...");
          return;
        }
        case "error":
          setItems((current) => [
            ...withoutStatus(current),
            { id: `error-${Date.now()}`, type: "error", text: refineErrorCopy(event) },
          ]);
          return;
        case "done":
        case "complete":
          setItems((current) => withoutStatus(current));
          return;
        default:
          return;
      }
    },
    [appendAssistantChunk, upsertStatus],
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

    upsertStatus(STREAM_STATUS_ID, statusCopy(persona.status));

    source.addEventListener("start", () => {
      reconnectAttemptsRef.current = 0;
      upsertStatus(STREAM_STATUS_ID, "Starting generation...");
    });

    source.addEventListener("file", (event) => {
      const data = parseEventData(event);
      const file = normalizeFileEvent(data);
      if (!file.key) return;

      setFiles((current) => mergeFiles(current, [file]));
      upsertStatus(
        STREAM_STATUS_ID,
        `Generating ${friendlyFileName(file.key)}...`,
      );
    });

    source.addEventListener("skills", (event) => {
      const data = parseEventData(event);
      const nextSkills = normalizeSkills(data);
      setSkills(nextSkills);
      upsertStatus(STREAM_STATUS_ID, "Matching skills...");
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
          STREAM_STATUS_ID,
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
    if (canRefine) {
      await handleRefinePrompt(prompt);
      return;
    }

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

  async function handleRefinePrompt(prompt: string) {
    const assistantId = `refine-assistant-${Date.now()}`;
    let streamFailed = false;

    setIsRefining(true);
    setItems((current) => [
      ...withoutStatus(current),
      { id: `refine-user-${Date.now()}`, type: "user", text: prompt },
      { id: STREAM_STATUS_ID, type: "status", text: "Thinking..." },
    ]);

    try {
      await refineAgent(agentId, prompt, {
        onEvent: (event) => {
          if (event.type === "error") streamFailed = true;
          handleRefineStreamEvent(event, assistantId);
        },
      });
      if (!streamFailed) {
        await refreshConversation();
      }
    } catch (err) {
      setItems((current) => [
        ...withoutStatus(current),
        {
          id: `error-${Date.now()}`,
          type: "error",
          text:
            err instanceof Error
              ? err.message
              : "Could not refine this agent.",
        },
      ]);
    } finally {
      setIsRefining(false);
    }
  }

  async function handleRefreshPreview() {
    try {
      const nextPersona = await fetchAgent(agentId);
      setPersona(nextPersona);
    } catch {}
  }

  async function handlePublish(mode: "public" | "private" = "public") {
    if (!persona || persona.status === "published") return;

    if (mode === "private" && !user?.github_connected) {
      setGithubConnectError("");
      setShowGithubConnectPrompt(true);
      return;
    }

    setPublishMode(mode);
    setIsPublishing(true);
    setPublishError("");
    setPublishSuccess(false);
    setShowPublishLinks(false);

    try {
      const result =
        mode === "private"
          ? await publishAgentPrivate(agentId)
          : await publishAgent(agentId);
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
      await new Promise((resolve) => setTimeout(resolve, 450));
      setPublishSuccess(true);
      if (result.githubRepoUrl || result.githubCloneUrl || result.githubZipUrl) {
        window.setTimeout(() => {
          setPublishSuccess(false);
          setShowPublishLinks(true);
        }, 750);
      }
    } catch (err) {
      setPublishError(
        err instanceof Error ? err.message : "Could not publish agent.",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleGithubConnect() {
    setIsConnectingGithub(true);
    setGithubConnectError("");

    try {
      await startGithubConnect();
    } catch (err) {
      setGithubConnectError(
        err instanceof Error ? err.message : "Could not start GitHub connection.",
      );
      setIsConnectingGithub(false);
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
        className={`flex min-h-0 flex-col ${previewOpen ? "md:w-[457px] md:min-w-[457px] md:shrink-0 w-full" : "min-w-0 flex-1"}`}
      >
        <div className="flex shrink-0 items-center border-b border-border-subtle bg-white px-5 py-[18px] h-[64px]">
          <h1 className="font-sans text-[16px] font-semibold text-dark-fg truncate">
            {title}
          </h1>
        </div>

        <div
          ref={scrollRef}
          className="flex flex-1 flex-col items-start gap-[18px] overflow-y-auto self-stretch px-[17px] py-[9px]"
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
          disableFileAttachment={canRefine}
          isLoading={isPromptSubmitting}
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
              onRefresh={handleRefreshPreview}
              onPublish={handlePublish}
              onSaveAsPrivate={() => handlePublish("private")}
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
              onRefresh={handleRefreshPreview}
              onPublish={handlePublish}
              onSaveAsPrivate={() => handlePublish("private")}
            />
          </div>
        </>
      )}

      {showPublishLinks && persona && (
        <GithubPublishModal
          onClose={() => setShowPublishLinks(false)}
          agentName={persona.name}
          githubRepoUrl={persona.githubRepoUrl}
          githubCloneUrl={persona.githubCloneUrl}
          githubZipUrl={persona.githubZipUrl}
        />
      )}

      {(isPublishing || publishSuccess || publishError) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            isPublishing
              ? "Publishing Agent"
              : publishSuccess
                ? "Agent Published"
                : "Publish Agent Failed"
          }
          className="absolute inset-0 z-50 flex items-center justify-center bg-white/90"
        >
          <div className="relative mx-4 flex w-full max-w-[520px] flex-col items-center gap-6 rounded-2xl bg-white px-8 py-10 shadow-2xl">
            {!isPublishing && (
              <button
                type="button"
                onClick={() => {
                  setPublishSuccess(false);
                  setPublishError("");
                }}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close publish status"
              >
                ×
              </button>
            )}

            {isPublishing && (
              <>
                <div className="animate-spin">
                  <PublishingSpinnerIcon />
                </div>
                <h2 className="text-center font-sans text-2xl font-bold text-black">
                  {publishMode === "private"
                    ? "Publishing Private Agent"
                    : "Publishing Agent"}
                </h2>
                <p className="text-center font-sans text-sm font-normal text-black">
                  Wait while agent is processing, please don&apos;t close this
                  window.
                </p>
                <div className="relative h-2.5 w-full max-w-[410px] overflow-hidden rounded-full bg-progress-grey">
                  <div className="absolute inset-0 rounded-full bg-progress-grey" />
                  <div className="absolute inset-y-0 left-0 w-1/2 animate-[publish-progress_1.25s_ease-in-out_infinite] rounded-full bg-teal-brand" />
                </div>
              </>
            )}

            {publishSuccess && !isPublishing && (
              <>
                <PublishedSuccessIcon />
                <h2 className="text-center font-sans text-2xl font-bold text-black">
                  {publishMode === "private"
                    ? "Private Agent Published"
                    : "Agent Published"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setPublishSuccess(false);
                    if (
                      persona?.githubRepoUrl ||
                      persona?.githubCloneUrl ||
                      persona?.githubZipUrl
                    ) {
                      setShowPublishLinks(true);
                      return;
                    }
                    router.push("/generator/my-agents");
                  }}
                  className="flex h-10 items-center justify-center gap-2 self-stretch rounded-lg border-[0.5px] border-input-placeholder bg-teal-brand px-5 py-3 font-sans text-sm font-normal text-btn-fg"
                >
                  {publishMode === "public" ? "View Links" : "Manage Agents"}
                </button>
              </>
            )}

            {publishError && !isPublishing && (
              <>
                <PublishFailedIcon />
                <h2 className="text-center font-sans text-2xl font-bold text-black">
                  Publish Agent Failed
                </h2>
                <p className="text-center font-sans text-sm font-normal text-label-dark">
                  {publishError}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPublishError("");
                    handlePublish(publishMode);
                  }}
                  className="flex h-10 items-center justify-center gap-2 self-stretch rounded-lg border-[0.5px] border-input-placeholder bg-teal-brand px-5 py-3 font-sans text-sm font-medium text-btn-fg"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showGithubConnectPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Connect GitHub"
          className="absolute inset-0 z-50 flex items-center justify-center bg-white/90"
        >
          <div className="relative mx-4 flex w-full max-w-[420px] flex-col gap-5 rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowGithubConnectPrompt(false);
                setGithubConnectError("");
              }}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close GitHub connect prompt"
            >
              ×
            </button>
            <div>
              <h2 className="font-sans text-xl font-semibold text-gray-950">
                Connect GitHub
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Private publishing needs access to your GitHub account so Anvila
                can create the private repository.
              </p>
            </div>
            {githubConnectError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {githubConnectError}
              </p>
            )}
            <button
              type="button"
              onClick={handleGithubConnect}
              disabled={isConnectingGithub}
              className="flex h-11 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConnectingGithub ? "Connecting..." : "Connect GitHub"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
