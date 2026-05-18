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

export const AGENT_TITLE = "Anatassia Rhodes - Content creator agent for NIOR";
export const AGENT_SUBTITLE =
  "Generated a full agent AI-powered content creator agent for a skincare brand";

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
];

export const MANIFEST: ManifestDataProps = {
  name: "Anatassia Rhodes",
  version: "0.1.0",
  model: "gemini-3-flash",
  license: "MIT",
  files: 5,
  skills: [
    "Research thesis",
    "Data analysis",
    "Experiments",
    "Solid state",
    "Growth metrics",
    "Web Search",
    "File Generator",
    "GitHub Push"
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
