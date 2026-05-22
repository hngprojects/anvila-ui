// ─── Demo Data ───────────────────────────────────────────────────────────
import { AgentCardData, Category } from "@/types";
import { AgentFile, ChatMessageProps, ManifestDataProps } from "@/interface";

export const CATEGORIES: Category[] = [
  "All",
  "Marketing",
  "Development",
  "Research",
  "Finance",
  "Operation",
];

export const AGENTS: AgentCardData[] = [
  {
    title: "DevOps Sentinel",
    description:
      "Autonomous infrastructural monitoring and incident response agents for modern cloud-native systems",
    tags: [
      { label: "KUBERNETES", color: "#2563EB", bgColor: "#DBEAFE" },
      { label: "LOGS", color: "#EA580C", bgColor: "#FFEDD5" },
      { label: "PHYTONS", color: "#EA580C", bgColor: "#DCFCE7" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "web Scryer",
    description:
      "Deep-web research agent specialized in academic paper synthesis and data discovery",
    tags: [
      { label: "KUBERNETES", color: "#0D9488", bgColor: "#DCFCE7" },
      { label: "LOGS", color: "#0891B2", bgColor: "#CFFAFE" },
      { label: "PHYTONS", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Market Plus",
    description:
      "Real-time Sentiment analysis engine. Scanning crypto exchanges and social media",
    tags: [
      { label: "TRADING", color: "#DB2777", bgColor: "#FCE7F3" },
      { label: "WEB_SOCKETS", color: "#9333EA", bgColor: "#F3E8FF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Finance"],
  },
  {
    title: "Biotech Research Assistant",
    description:
      "Literature synthesis, protocol design and data interpretation for life science",
    tags: [
      { label: "LITERATURE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "INFORMATIC", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "DATA", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Code Review Specialist",
    description:
      "In-depth code review with security, performance and readability focus",
    tags: [
      { label: "CODE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "PERFORMANCE", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "Spotify Summer Campaign Agent",
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: "AUDIENCE TARGET", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "SOCIAL-M CONTENT", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Marketing"],
  },
  {
    title: "Biotech Research Assistant",
    description:
      "Literature synthesis, protocol design and data interpretation for life science",
    tags: [
      { label: "LITERATURE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "INFORMATIC", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "DATA", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Code Review Specialist",
    description:
      "In-depth code review with security, performance and readability focus",
    tags: [
      { label: "CODE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "PERFORMANCE", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "Spotify Summer Campaign Agent",
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: "AUDIENCE TARGET", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "SOCIAL-M CONTENT", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Marketing"],
  },
];

export const AGENT_TITLE = "Agent for physics under-grad";
export const AGENT_SUBTITLE =
  "Generated a full agent profile for physics undergrad, skills, system prompts & MCP config automatically.";

export const DEMO_FILES: AgentFile[] = [
  {
    id: "identity",
    name: "identity.md",
    content: `# Content creator agent for NIOR

**Name:** Research Analyst
**Role:** Autonomous research and synthesis

## Description

*"I gather sources, weigh them, and write the brief you would have written if you had three more hours."*

## Boundaries

- Does not give medical, legal, or financial advice.
- Does not speculate beyond cited evidence.
- Does not impersonate real people.

## Signature

Every brief ends with a confidence score and a list of open questions.`,
  },
  {
    id: "soul",
    name: "soul.md",
    content: `# Soul — Anatassia Rhodes

## Personality

Warm, direct, and relentlessly curious. Anatassia treats every brief like a craft challenge.

## Communication Style

- Leads with the headline, supports with evidence.
- Uses plain language; avoids jargon unless the audience expects it.
- Ends each response with a clear next step.`,
  },
  {
    id: "dna",
    name: "dna.md",
    content: `# DNA — Agent Behaviour Specification

## Core Behaviours

1. **Research first** — always pull at least three independent sources before forming a conclusion.
2. **Cite everything** — inline citations, not footnotes.
3. **Flag uncertainty** — use confidence brackets [HIGH / MED / LOW].

## Escalation Protocol

If the user's request falls outside Boundaries, respond:
> "This is outside my scope. Here's who can help: [referral]."`,
  },
  {
    id: "heartbeat",
    name: "heartbeat.md",
    content: `# Heartbeat — Operational Schedule

## Triggers

| Trigger | Action |
|---|---|
| New brief request | Start research pipeline |
| Source conflict detected | Pause and flag |
| Confidence < 60 % | Request clarification |

## SLA

- First draft delivered within 5 minutes of brief confirmation.
- Revisions within 2 minutes per round.`,
  },
  // Skills files — grouped under the 'skills' subfolder in the file tree
  {
    id: "research-thesis",
    name: "Research thesis.ts",
    folder: "skills",
    content: `// Research Thesis Skill
// Gathers academic sources and synthesises research briefs.

export async function researchThesis(topic: string) {
  // TODO: integrate with academic search API
  return { summary: "", sources: [] as string[] };
}`,
  },
  {
    id: "experiments",
    name: "Experiments.ts",
    folder: "skills",
    content: `// Experiments Skill
// Designs and evaluates experimental protocols.

export async function runExperiment(hypothesis: string) {
  // TODO: implement experiment runner
  return { hypothesis, results: null };
}`,
  },
  {
    id: "growth-metrics",
    name: "Growth metrics.ts",
    folder: "skills",
    content: `// Growth Metrics Skill
// Tracks and reports growth KPIs.

export function computeGrowthMetrics(data: number[]) {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  return { mean, count: data.length };
}`,
  },
  {
    id: "solid-state",
    name: "Solid state.ts",
    folder: "skills",
    content: `// Solid State Skill
// Analyses solid-state physics problems.

export function analyzeSolidState(params: Record<string, number>) {
  return { ...params, analysed: true };
}`,
  },
  {
    id: "data-analysis",
    name: "Data analysis.ts",
    folder: "skills",
    content: `// Data Analysis Skill
// Processes datasets and returns statistical summaries.

export function analyzeData(rows: number[][]) {
  return { rowCount: rows.length, colCount: rows[0]?.length ?? 0 };
}`,
  },
  {
    id: "user-retention",
    name: "User retention.ts",
    folder: "skills",
    content: `// User Retention Skill
// Computes cohort retention rates.

export function retentionRate(cohort: number[], followup: number[]) {
  return followup.map((v, i) => (cohort[i] ? v / cohort[i] : 0));
}`,
  },
  // Root-level files rendered after the skills folder
  {
    id: "readme",
    name: "README.md",
    content: `# Agent for physics under-grad

under-grad is a research-focused AI agent built with Anvila. It browses the open web, extracts key evidence, and composes answers with inline citations.

## Installation

\`\`\`
npx Anvila install Anvila/under-grad
\`\`\`

## Usage

\`\`\`js
import { underGrad } from "@Anvila/under-grad";
const agent = new underGrad({ apiKey: process.env.AF_KEY });
const answer = await agent.ask("What's the state of small LLMs in 2026?");
console.log(answer.summary, answer.citations);
\`\`\`

## License

MIT — fork freely, attribution appreciated.`,
  },
  {
    id: "package",
    name: "package.json",
    content: `{
  "name": "under-grad",
  "version": "1.4.2",
  "description": "Research-focused AI agent built with Anvila",
  "license": "MIT",
  "main": "index.ts"
}`,
  },
];

export const MANIFEST: ManifestDataProps = {
  name: "under-grad",
  version: "v1.4.2",
  model: "gemini-3-flash",
  license: "MIT",
  files: 12,
  skills: [
    "Research thesis",
    "Data analysis",
    "Experiments",
    "Solid state",
    "Growth metrics",
    "User retention",
  ],
};

export const INITIAL_MESSAGES: ChatMessageProps[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "I'd love to build this for you! Let me ask a couple of quick questions to make sure I create exactly what you envision ...",
  },
  {
    id: "2",
    role: "user",
    content: "Agent type: content creator for a skincare brand and automates snapchat",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Got it – Agent Anatassia Rhodes content creator for a skincare brand. Let's verify some info about your brand before proceeding...",
  },
  {
    id: "4",
    role: "assistant",
    content: "Got it- Nior is a skincare brand for middle aged women. Forging agent...",
  },
  {
    id: "5",
    role: "assistant",
    content: "Done! Successfully created content creator- Anatassia Rhodes....",
    card: {
      title: "Forged Anatassia - content creator agent",
      subtitle: "",
      action: "Preview",
    },
  },
];
