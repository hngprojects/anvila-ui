export const PROGRESS_MESSAGES = [
  "Analysing your requirements and scaffolding agent structure…",
  "Generating capability modules and routing logic…",
  "Configuring integrations and response handlers…",
  "Running validation and quality checks…",
  "Almost there — finalising your agent package…",
];

export const DEFAULT_SEARCH_SUGGESTIONS = [
  "Try using fewer or different keywords",
  "Check for spelling mistakes",
  "Search with a broader term",
];

export const FALLBACK_ERROR_DETAIL =
  "The server encountered an unexpected condition. Your input was received but the generation could not be completed.";

export const TIMEOUT_ERROR_DETAIL =
  "The generation exceeded the 60-second time limit. Complex or long prompts are more likely to time out during peak hours.";

export const DEFAULT_ERROR_CODES = {
  generic: "GEN_500",
  timeout: "GEN_TIMEOUT",
} as const;