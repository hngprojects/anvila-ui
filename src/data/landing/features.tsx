
import { BoltIcon, GitHubIcon, ScaffoldIcon } from "@/components/Icons/landing";
import { Card } from "@/types/landing";

export const CARDS: Card[] = [
  {
    title: "Smart Skill Matching",
    description:
      "Skills are auto-detected and attached based on agent type. Marketing gets SEO and analytics. Dev gets code review and debugging.",
    chip: "auto-assigned",
    variant: "light",
    icon: <BoltIcon />,
  },
  {
    title: "Agent Setup Scaffolder",
    description:
      "Describe any agent in natural language. Get a complete, structured agent package instantly — no repeated prompt engineering, no inconsistency.",
    chip: "identity.md · soul.md · dna.md",
    variant: "dark",
    icon: <ScaffoldIcon color="#ffffff" />,
  },
  {
    title: "GitHub Auto-Publishing",
    description:
      "Every agent becomes a real, cloneable GitHub repository in seconds. Fork it, share it, plug it into any system.",
    chip: "github.com/Anvila/...",
    variant: "light",
    icon: <GitHubIcon />,
  },
];

export const STATS = [
  { num: "2,400+", label: "Agents packaged" },
  { num: "3 min", label: "Average setup time" },
  { num: "98%", label: "Skill match accuracy" },
];
