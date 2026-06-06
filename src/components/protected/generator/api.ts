import type {
  AgentGenerateResult,
  AgentPersona,
  AgentMessage,
  PublishLinks,
} from "@/types/agent";

export interface ClarificationAnswer {
  id: string;
  answer: string;
}

export type RefineStreamEvent = {
  type: string;
  [key: string]: unknown;
};

export type RefineStreamHandlers = {
  onEvent: (event: RefineStreamEvent) => void;
};

export async function generateAgent(prompt: string, file: File | null) {
  const formData = new FormData();
  formData.set("prompt", prompt);
  if (file) formData.set("file", file);

  const json = await requestJson<{ data: AgentGenerateResult }>(
    "/api/personas/generate",
    {
      method: "POST",
      body: formData,
    },
  );

  rememberSession(json.data.agentId, json.data.sessionId);

  return json.data;
}

export async function fetchAgent(agentId: string) {
  const json = await requestJson<{ data: AgentPersona }>(
    `/api/personas/${agentId}`,
  );

  return json.data;
}

export async function fetchAgentMessages(
  agentId: string,
  cursor?: string | null,
  size = 50,
) {
  const params = new URLSearchParams({ size: String(size) });
  if (cursor) params.set("cursor", cursor);

  return requestJson<{ data: AgentMessage[]; meta: unknown }>(
    `/api/personas/${agentId}/messages?${params.toString()}`,
  );
}

export async function submitClarification(
  agentId: string,
  sessionId: string,
  answers: ClarificationAnswer[],
) {
  return requestJson<{ data: { status: string; round: number } }>(
    `/api/personas/${agentId}/clarify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, answers }),
    },
  );
}

export async function publishAgent(agentId: string) {
  const json = await requestJson<{
    data: PublishLinks & { agentId: string; status: string };
  }>(`/api/personas/${agentId}/publish`, {
    method: "POST",
  });

  return json.data;
}

export async function publishAgentPrivate(agentId: string) {
  const json = await requestJson<{
    data: PublishLinks & { agentId: string; status: string };
  }>(`/api/personas/${agentId}/publish/private`, {
    method: "POST",
  });

  return json.data;
}

export async function refineAgent(
  agentId: string,
  message: string,
  handlers: RefineStreamHandlers,
) {
  const res = await fetch(`/api/personas/${agentId}/refine`, {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
    cache: "no-store",
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(getErrorMessage(res.status, json));
  }

  if (!res.body) {
    throw new Error("Could not connect to refinement stream.");
  }

  await readEventStream(res.body, handlers.onEvent);
}

export function rememberSession(agentId: string, sessionId: string) {
  if (!agentId || !sessionId || typeof window === "undefined") return;
  window.localStorage.setItem(sessionStorageKey(agentId), sessionId);
}

export function forgetRememberedSession(agentId: string, sessionId?: string) {
  if (!agentId || typeof window === "undefined") return;
  const key = sessionStorageKey(agentId);
  if (sessionId && window.localStorage.getItem(key) !== sessionId) return;
  window.localStorage.removeItem(key);
}

export function readRememberedSession(agentId: string) {
  if (!agentId || typeof window === "undefined") return "";
  return window.localStorage.getItem(sessionStorageKey(agentId)) ?? "";
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = getErrorMessage(res.status, json);
    throw new Error(message);
  }

  return json as T;
}

function sessionStorageKey(agentId: string) {
  return `anvila:agent:${agentId}:session`;
}

async function readEventStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: RefineStreamEvent) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      buffer = flushEventBuffer(buffer, onEvent);
    }

    buffer += decoder.decode();
    flushEventBuffer(buffer, onEvent, true);
  } finally {
    reader.releaseLock();
  }
}

function flushEventBuffer(
  buffer: string,
  onEvent: (event: RefineStreamEvent) => void,
  flushAll = false,
) {
  let nextBuffer = buffer;
  const separatorPattern = /\r?\n\r?\n/;

  while (true) {
    const match = separatorPattern.exec(nextBuffer);
    if (!match) break;

    const chunk = nextBuffer.slice(0, match.index);
    nextBuffer = nextBuffer.slice(match.index + match[0].length);
    emitStreamChunk(chunk, onEvent);
  }

  if (flushAll && nextBuffer.trim()) {
    nextBuffer
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => emitStreamChunk(line, onEvent));
    return "";
  }

  if (!nextBuffer.includes("data:") && !nextBuffer.includes("event:")) {
    const lines = nextBuffer.split(/\r?\n/);
    if (lines.length > 1) {
      const remainder = lines.pop() ?? "";
      lines
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => emitStreamChunk(line, onEvent));
      return remainder;
    }
  }

  return nextBuffer;
}

function emitStreamChunk(
  chunk: string,
  onEvent: (event: RefineStreamEvent) => void,
) {
  const trimmed = chunk.trim();
  if (!trimmed) return;

  const dataLines: string[] = [];
  let eventType = "";

  trimmed.split(/\r?\n/).forEach((line) => {
    if (line.startsWith(":")) return;

    if (line.startsWith("event:")) {
      eventType = line.slice("event:".length).trim();
      return;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trimStart());
      return;
    }

    dataLines.push(line);
  });

  const rawData = dataLines.join("\n").trim();
  if (!rawData || rawData === "[DONE]") return;

  try {
    const parsed = JSON.parse(rawData) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const record = parsed as RefineStreamEvent;
      onEvent({
        ...record,
        type: typeof record.type === "string" ? record.type : eventType || "message",
      });
      return;
    }
  } catch {}

  onEvent({
    type: eventType || "token",
    text: rawData,
  });
}

function getErrorMessage(status: number, json: unknown) {
  if (status === 403) {
    return "You have exhausted your free generation quota. Upgrade to continue creating agents.";
  }

  if (json && typeof json === "object" && "message" in json) {
    return String(json.message);
  }

  if (json && typeof json === "object" && "detail" in json) {
    const detail = (json as Record<string, unknown>).detail;
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object" && "message" in detail) {
      const detailMessage = (detail as Record<string, unknown>).message;
      if (typeof detailMessage === "string") return detailMessage;
    }
  }

  return "Request failed";
}
