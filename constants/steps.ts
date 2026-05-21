import type { Step, GenerationStep } from "@/types";

export const TIMEOUT_STEPS: Step[] = [
  {
    number: 1,
    title: "Check your connection",
    description: "A stable network speeds up generation significantly",
  },
  {
    number: 2,
    title: "Simplify your request",
    description: "Start with a shorter prompt to test your setup",
  },
  {
    number: 3,
    title: "Try again",
    description: "Retry with the same or a lighter prompt below",
  },
];

export const GENERIC_STEPS: Step[] = [
  {
    number: 1,
    title: "Check your input",
    description: "Make sure your prompt is clear and within the allowed length",
  },
  {
    number: 2,
    title: "Wait a moment",
    description: "The server may be under load — waiting 30 seconds often helps",
  },
  {
    number: 3,
    title: "Try again",
    description: "Retry with the same or a simplified version of your request",
  },
];

export const ERROR_TIMEOUT_STEPS: Step[] = [
  {
    number: 1,
    title: "Simplify your prompt",
    description: "Break it into smaller, focused requests to reduce processing time",
  },
  {
    number: 2,
    title: "Retry automatically",
    description: (cd: number) =>
      cd > 0
        ? `We'll retry once in ${cd}s — or click below to retry now`
        : "Click below to retry now",
  },
  {
    number: 3,
    title: "Try off-peak hours",
    description: "Servers are less loaded early morning or late evening",
  },
];

export const GENERATION_STEPS: GenerationStep[] = [
  { id: "parse",     name: "Parsing requirements",        durationSeconds: 4 },
  { id: "scaffold",  name: "Scaffolding agent structure",  durationSeconds: 6 },
  { id: "generate",  name: "Generating capabilities",     durationSeconds: 8 },
  { id: "integrate", name: "Configuring integrations",    durationSeconds: 7 },
  { id: "validate",  name: "Running validation checks",   durationSeconds: 5 },
];