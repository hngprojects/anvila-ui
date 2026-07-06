import { Step } from "@/types/landing"
import { ClipboardPencilIcon, AtomIcon } from "@/components/Icons/landing";

function GridIcon({ stroke }: { stroke: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M13.3333 28V10.6667C13.3333 10.313 13.1929 9.97391 12.9428 9.72386C12.6928 9.47381 12.3536 9.33333 12 9.33333H5.33333C4.97971 9.33333 4.64057 9.47381 4.39052 9.72386C4.14048 9.97391 4 10.313 4 10.6667V26.6667C4 27.0203 4.14048 27.3594 4.39052 27.6095C4.64057 27.8595 4.97971 28 5.33333 28H21.3333C21.687 28 22.0261 27.8595 22.2761 27.6095C22.5262 27.3594 22.6667 27.0203 22.6667 26.6667V20C22.6667 19.6464 22.5262 19.3072 22.2761 19.0572C22.0261 18.8071 21.687 18.6667 21.3333 18.6667H4M20 4H26.6667C27.403 4 28 4.59695 28 5.33333V12C28 12.7364 27.403 13.3333 26.6667 13.3333H20C19.2636 13.3333 18.6667 12.7364 18.6667 12V5.33333C18.6667 4.59695 19.2636 4 20 4Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const STEPS: Step[] = [
  {
    Icon: GridIcon,
    stroke: "#DB2777",
    iconBg: "bg-[#FCE7F3]",
    iconBorder: "border-pink-200",
    title: "Describe the setup",
    description: "Tell Anvila the role, tone, rules, and tasks your agent needs.",
  },
  {
    Icon: ClipboardPencilIcon,
    stroke: "#16A34A",
    iconBg: "bg-[#DCFCE7]",
    iconBorder: "border-green-200",
    title: "Scaffold the files",
    description: "Anvila drafts the personality files, README, and package structure.",
  },
  {
    Icon: AtomIcon,
    stroke: "#9333EA",
    iconBg: "bg-[#F3E8FF]",
    iconBorder: "border-purple-200",
    title: "Match reusable Skills",
    description: "Skills are matched to the tasks your agent should handle.",
  },
];
