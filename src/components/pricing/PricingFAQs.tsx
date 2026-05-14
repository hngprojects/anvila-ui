import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";

export const FAQS = [
  {
    q: 'What does "one-time per agent" mean?',
    a: "You pay once to turn a specific agent setup private. No recurring subscriptions.",
  },
  {
    q: "Can I make a public agent private later?",
    a: "Yes, upgrade any public agent to professional at any time.",
  },
  {
    q: "Is there a limit on how many agents I can generate?",
    a: "No, both plans allow unlimited agent generation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards, PayPal, and crypto.",
  },
  {
    q: "Do you offer refunds?",
    a: "Generally no, but contact support for issues.",
  },
];

export const FaqItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="rounded-xl border border-[#E4E4E7] bg-white overflow-hidden">
    <button
      className="flex w-full items-center justify-between p-4 text-left gap-3"
      onClick={onToggle}
    >
      <span
        className={`font-semibold text-base leading-7 transition-colors ${
          isOpen ? "text-teal-accent" : "text-[#2D2D2D]"
        }`}
      >
        {question}
      </span>
      <span
        className={`shrink-0 transition-colors ${isOpen ? "text-teal-accent" : "text-[#2D2D2D]"}`}
      >
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </span>
    </button>
    {isOpen && (
      <div className="px-6 pb-5 text-[#2D2D2D] text-sm leading-6">{answer}</div>
    )}
  </div>
);
