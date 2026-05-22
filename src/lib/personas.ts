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
}

export interface ClarificationPayload {
  round: number;
  questions: ClarificationQuestion[];
}

export interface PublishLinks {
  githubRepoUrl: string;
  githubCloneUrl: string;
  githubZipUrl: string;
  publishedAt: string;
}

export const PREVIEW_STATUSES = new Set(["generated", "published"]);
export const STREAM_DONE_STATUSES = new Set(["generated", "published", "failed"]);

const FILES = [
  { key: "identity_md", name: "identity.md", label: "Identity" },
  { key: "soul_md", name: "soul.md", label: "Soul" },
  { key: "dna_md", name: "dna.md", label: "DNA" },
  { key: "overview_md", name: "overview.md", label: "Overview" },
  { key: "heartbeat_md", name: "heartbeat.md", label: "Heartbeat" },
];

export function friendlyFileName(key: string) {
  return FILES.find((file) => file.key === key)?.name ?? key.replace(/_/g, "-");
}

export function friendlyFileLabel(key: string) {
  return FILES.find((file) => file.key === key)?.label ?? friendlyFileName(key);
}

export function normalizeGenerateResponse(raw: unknown): AgentGenerateResult {
  const data = getRecord(getRecord(raw).data);
  const personaId = getString(data.persona_id);

  return {
    status: getString(data.status),
    agentId: personaId,
    personaId,
    sessionId: getString(data.session_id),
    jobId: getString(data.job_id),
  };
}

export function normalizePersona(raw: unknown): AgentPersona {
  const data = getRecord(raw);
  const name = getString(data.name, "Untitled agent");
  const skills = getArray(data.skills).map(normalizeSkill);
  const files = FILES.map((file) => {
    const content = getString(data[file.key]);
    if (!content) return null;

    return {
      id: file.key,
      key: file.key,
      name: file.name,
      label: file.label,
      content,
    };
  }).filter((file): file is AgentFileContent => Boolean(file));

  return {
    id: getString(data.id),
    name,
    description: getString(data.description_summary),
    category: getString(data.category, "Agent"),
    status: getString(data.status, "draft"),
    visibility: getString(data.visibility),
    githubRepoUrl: getString(data.github_repo_url),
    githubCloneUrl: getString(data.github_clone_url),
    githubZipUrl: getString(data.github_zip_url),
    publishedAt: getString(data.published_at),
    createdAt: getString(data.created_at),
    files,
    skills,
    manifest: {
      name,
      version: getString(data.version, "0.1.0"),
      model: getString(data.model, "gemini-3-flash"),
      license: getString(data.license, "MIT"),
      files: files.length,
    },
  };
}

export function normalizeFileEvent(raw: unknown): AgentFileContent {
  const data = getRecord(raw);
  const key = getString(data.file);

  return {
    id: key,
    key,
    name: friendlyFileName(key),
    label: friendlyFileLabel(key),
    content: getString(data.content),
  };
}

export function normalizeSkills(raw: unknown): AgentSkill[] {
  const data = getRecord(raw);
  return getArray(data.skills).map(normalizeSkill);
}

export function normalizeSessions(raw: unknown): {
  data: AgentSession[];
  meta: PaginatedMeta;
} {
  const record = getRecord(raw);

  return {
    data: getArray(record.data).map((item) => {
      const session = getRecord(item);

      return {
        sessionId: getString(session.session_id),
        agentId: getString(session.persona_id),
        personaName: getString(session.persona_name, "Untitled agent"),
        lastMessagePreview: getString(session.last_message_preview),
        lastMessageAt: getString(session.last_message_at),
        status: getString(session.status),
      };
    }),
    meta: normalizeMeta(record.meta),
  };
}

export function normalizeMessages(raw: unknown): {
  data: AgentMessage[];
  meta: PaginatedMeta;
} {
  const record = getRecord(raw);

  return {
    data: getArray(record.data).map((item) => {
      const message = getRecord(item);
      const content = getString(message.content);

      return {
        id: getString(message.id),
        role: getString(message.role),
        content,
        roundNumber: getNumber(message.round_number),
        createdAt: getString(message.created_at),
        parsedContent: parseJson(content),
      };
    }),
    meta: normalizeMeta(record.meta),
  };
}

export function normalizeClarificationPayload(raw: unknown): ClarificationPayload {
  const data = getRecord(raw);

  return {
    round: getNumber(data.round),
    questions: getArray(data.questions).map((item) => {
      const question = getRecord(item);

      return {
        id: getString(question.id),
        question: getString(question.question),
        options: getArray(question.options)
          .map((option) => getString(option))
          .filter(Boolean),
        allowCustom: Boolean(question.allow_custom),
      };
    }),
  };
}

export function isClarificationPayload(value: unknown): value is ClarificationPayload {
  const record = getRecord(value);
  return Array.isArray(record.questions);
}

function normalizeSkill(raw: unknown): AgentSkill {
  const skill = getRecord(raw);

  return {
    slug: getString(skill.slug),
    name: getString(skill.name, "Untitled skill"),
    description: getString(skill.description),
    tags: getArray(skill.tags).map((tag) => getString(tag)).filter(Boolean),
  };
}

function normalizeMeta(raw: unknown): PaginatedMeta {
  const meta = getRecord(raw);

  return {
    size: getNumber(meta.size, 20),
    hasMore: Boolean(meta.has_more),
    nextCursor: getString(meta.next_cursor) || null,
  };
}

function parseJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function getRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function getArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function getString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function getNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
