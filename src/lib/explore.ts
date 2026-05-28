export interface ExplorePersona {
  id: string;
  name: string;
  description: string;
  category: string;
  githubRepoUrl: string;
  publishedAt: string | null;
  skillNames: string[];
}

export interface ExploreMeta {
  page: number;
  size: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ExploreResult {
  personas: ExplorePersona[];
  categories: string[];
  meta: ExploreMeta;
}

export function normalizeExplore(raw: unknown): ExploreResult {
  const record = getRecord(raw);
  const data = getRecord(record.data);

  return {
    personas: getArray(data.personas).map((item) => {
      const persona = getRecord(item);

      return {
        id: getString(persona.id),
        name: getString(persona.name, "Untitled agent"),
        description: getString(persona.description_summary),
        category: getString(persona.category),
        githubRepoUrl: getString(persona.github_repo_url),
        publishedAt: getString(persona.published_at) || null,
        skillNames: getArray(persona.skill_names)
          .map((skill) => getString(skill))
          .filter(Boolean),
      };
    }),
    categories: getArray(data.categories)
      .map((category) => getString(category))
      .filter(Boolean),
    meta: normalizeMeta(record.meta),
  };
}

function normalizeMeta(raw: unknown): ExploreMeta {
  const meta = getRecord(raw);

  return {
    page: getNumber(meta.page, 1),
    size: getNumber(meta.size, 20),
    total: getNumber(meta.total),
    pages: getNumber(meta.pages, 1),
    hasNext: Boolean(meta.has_next),
    hasPrev: Boolean(meta.has_prev),
  };
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
