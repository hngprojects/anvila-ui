// ─── Demo Data ───────────────────────────────────────────────────────────

import { AgentFile, ChatMessageProps, ManifestDataProps } from "@/interface";

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
    "GitHub Push",
    "Research thesis",
    "Data analysis",
    "Experiments",
    "Solid state",
    "Growth metrics",
    "Web Search",
    "File Generator",
    "GitHub Push",
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
