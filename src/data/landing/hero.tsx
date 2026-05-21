import { BoltIcon, GridIcon, ShareIcon } from "@/components/Icons/landing";

export const CAREER_CHIPS = [
  "AI Developers & Engineers",
  "Prompt Engineers",
  "No-Code Builders",
  "Founders",
];

export const FEATURES = [
  {
    icon: <GridIcon />,
    title: "Structured packages",
    desc: "Every setup outputs clean, GitHub-ready files you can publish in seconds.",
  },
  {
    icon: <BoltIcon />,
    title: "Smart skill matching",
    desc: "Skills are auto-assigned based on agent type — no manual wiring.",
  },
  {
    icon: <ShareIcon />,
    title: "One-click sharing",
    desc: "Fork, clone, or share any package from the public registry instantly.",
  },
];

export const AVATARS = [
  { initials: "JK", bg: "bg-sky-100", text: "text-sky-700" },
  { initials: "SR", bg: "bg-yellow-100", text: "text-yellow-800" },
  { initials: "AM", bg: "bg-pink-100", text: "text-pink-700" },
  { initials: "TL", bg: "bg-teal-50", text: "text-teal-700" },
];
