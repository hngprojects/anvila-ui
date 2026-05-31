export interface ClarificationAnswer {
  id: string;
  answer: string;
}

export type PersonaStatus =
  | "draft"
  | "needs_clarification"
  | "generating"
  | "skills_matching"
  | "generated"
  | "published"
  | "failed";

export interface AgentSkill {
  slug: string;
  name: string;
  description: string;
  tags: string[];
}

export interface AgentFileContent {
  id: string;
  key: string;
  name: string;
  label: string;
  content: string;
}

export interface AgentManifest {
  name: string;
  version: string;
  model: string;
  license: string;
  files: number;
}

export interface AgentPersona {
  id: string;
  name: string;
  description: string;
  category: string;
  status: PersonaStatus | string;
  visibility: string;
  githubRepoUrl: string;
  githubCloneUrl: string;
  githubZipUrl: string;
  publishedAt: string;
  createdAt: string;
  files: AgentFileContent[];
  skills: AgentSkill[];
  manifest: AgentManifest;
}

export interface AgentGenerateResult {
  status: string;
  agentId: string;
  personaId: string;
  sessionId: string;
  jobId: string;
}

export interface AgentSession {
  sessionId: string;
  agentId: string;
  personaName: string;
  lastMessagePreview: string;
  lastMessageAt: string;
  status: string;
}

export interface PaginatedMeta {
  size: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | string;
  content: string;
  roundNumber: number;
  createdAt: string;
  parsedContent: unknown | null;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  options: string[];
  allowCustom: boolean;
  answer?: string;
}

export interface ClarificationPayload {
  round: number;
  message?: string;
  questions: ClarificationQuestion[];
}

export interface PublishLinks {
  githubRepoUrl: string;
  githubCloneUrl: string;
  githubZipUrl: string;
  publishedAt: string;
}

export type ChatItem =
  | { id: string; type: "user"; text: string }
  | { id: string; type: "assistant"; text: string }
  | { id: string; type: "status"; text: string }
  | { id: string; type: "file"; file: AgentFileContent; completed?: boolean }
  | { id: string; type: "skills"; skills: AgentSkill[]; completed?: boolean }
  | {
      id: string;
      type: "clarification";
      payload: ClarificationPayload;
      readOnly: boolean;
      answers?: ClarificationAnswer[];
    }
  | {
      id: string;
      type: "clarification-summary";
      round?: number;
      message?: string;
      items: { question: string; answer: string }[];
    }
  | { id: string; type: "done"; text: string }
  | { id: string; type: "error"; text: string };
