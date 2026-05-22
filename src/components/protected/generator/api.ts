import type {
  AgentGenerateResult,
  AgentMessage,
  AgentPersona,
  PublishLinks,
} from "@/lib/personas";

export interface ClarificationAnswer {
  id: string;
  answer: string;
}

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

export function rememberSession(agentId: string, sessionId: string) {
  if (!agentId || !sessionId || typeof window === "undefined") return;
  window.localStorage.setItem(sessionStorageKey(agentId), sessionId);
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
    const message =
      json && typeof json === "object" && "message" in json
        ? String(json.message)
        : "Request failed";
    throw new Error(message);
  }

  return json as T;
}

function sessionStorageKey(agentId: string) {
  return `anvila:agent:${agentId}:session`;
}
