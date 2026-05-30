import {
  CLARIFICATION_FALLBACK_MESSAGE,
  isClarificationPayload,
  normalizeClarificationPayload,
} from "@/lib/personas";
import type { AgentFileContent, AgentMessage, ChatItem } from "@/types/agent";

export function extractUserInput(raw: string): string {
  const match = raw.match(/<USER_INPUT>\s*([\s\S]*?)\s*<\/USER_INPUT>/);
  return match ? match[1].trim() : raw.trim();
}

export function messagesToChatItems(messages: AgentMessage[]): ChatItem[] {
  return messages.map((message): ChatItem => {
    if (message.role === "user") {
      return { id: message.id, type: "user", text: message.content };
    }

    if (
      message.parsedContent &&
      isClarificationPayload(message.parsedContent)
    ) {
      const payload = normalizeClarificationPayload(message.parsedContent);

      const summaryItems = payload.questions.map((q) => ({
        question: q.question,
        answer: extractUserInput(q.answer ?? ""),
      }));

      return {
        id: message.id,
        type: "clarification-summary",
        round: payload.round || message.roundNumber || 1,
        message: payload.message || CLARIFICATION_FALLBACK_MESSAGE,
        items: summaryItems,
      };
    }

    return {
      id: message.id,
      type: "assistant",
      text: message.content,
    };
  });
}

export function mergeFiles(
  current: AgentFileContent[],
  incoming: AgentFileContent[],
): AgentFileContent[] {
  const next = new Map<string, AgentFileContent>();
  current.forEach((file) => next.set(file.key, file));
  incoming.forEach((file) => next.set(file.key, file));
  return Array.from(next.values());
}

export function withoutStatus(items: ChatItem[]) {
  return items.filter((item) => item.type !== "status");
}

export function parseEventData(event: Event) {
  const message = event as MessageEvent<string>;
  try {
    return JSON.parse(message.data) as unknown;
  } catch {
    return {};
  }
}

export function statusCopy(status?: string) {
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
