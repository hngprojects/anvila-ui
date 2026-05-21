import { Button } from "@/components/ui/button";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="#0C5D56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#0C5D56" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="#0C5D56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="#0C5D56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Card = {
  title: string;
  description: string;
  highlighted?: boolean;
  icon: React.ReactNode;
};

const CARDS: Card[] = [
  {
    title: "GitHub-ready packages",
    description: "Clean repository structure without manually setting up every folder, file and README.",
    highlighted: true,
    icon: <GitHubIcon />,
  },
  {
    title: "Less setup time",
    description: "Reuse proven setup packages or clone and adapt other setup files.",
    icon: <SunIcon />,
  },
  {
    title: "Easy to ship",
    description: "Publish clean and organized package files. No manual work required.",
    icon: <ArrowIcon />,
  },
  {
    title: "Cleaner agent behaviour",
    description: "Keep the agent's role, tone, rules, limits, and Skills in one structured package.",
    icon: <UserIcon />,
  },
];

export function WhyAnvila() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center gap-12 px-6 py-18 md:grid md:grid-cols-2 md:items-center md:py-20">

        {/* Left column */}
        <div className="flex flex-col items-center gap-5 md:items-start">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Why Anvila</span>
          </div>

          <h2 className="max-w-[420px] text-center text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-left md:text-[36px]">
            Setting up{" "}
            <em className="not-italic text-teal-brand">AI agents</em>{" "}
            is still messy.
          </h2>

          <p className="max-w-[420px] text-center text-sm leading-relaxed text-zinc-500 md:text-left md:text-[15px]">
            Developers and builders still rewrite the same agent setup, struggle with scattered prompts, and lack a clear structure for files that others can reuse.
          </p>

          <Button className="group hidden h-auto items-center gap-2 rounded-lg border-none bg-teal-brand px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 md:flex">
            Try for free
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Button>
        </div>

        {/* Right — 2×2 card grid */}
        <div className="grid w-full grid-cols-2 overflow-hidden rounded-[20px] border border-zinc-200">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col gap-2 p-6 ${card.highlighted ? "bg-[rgba(16,191,171,0.08)]" : "bg-white"} border border-zinc-100`}
            >
              <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-[8px] border border-teal-brand/12 bg-[#F0FDFA]">
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 md:text-[15px]">{card.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500 md:text-sm">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <Button className="group flex h-auto w-full items-center justify-center gap-2 rounded-lg border-none bg-teal-brand px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 md:hidden">
          Try for free
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Button>

      </div>
    </section>
  );
}
