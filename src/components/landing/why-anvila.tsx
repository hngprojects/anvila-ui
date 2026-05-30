import { Button } from "@/components/ui/button";
import Link from "next/link";

type Card = {
  title: string;
  description: string;
  highlighted?: boolean;
};

const CARDS: Card[] = [
  {
    title: "GitHub-ready packages",
    description:
      "Create a clean repository structure without manually setting up every folder, file and README",
    highlighted: true,
  },
  {
    title: "Less Setup Time",
    description:
      "Reuse proven setup packages or clone and adapt other setup files.",
  },
  {
    title: "Easy to Ship",
    description:
      "Publish clean and organized package files. No manual work required.",
  },
  {
    title: "Cleaner Agent behaviour",
    description:
      "Keep the agent's role, tone, rules, limits, workflow and Skills in one structured package.",
  },
];

function Pill() {
  return (
    <div className="inline-flex items-center gap-2 self-start rounded-full border-[0.5px] border-zinc-400 px-3 py-1.5">
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full bg-warning"
      />
      <span className="text-xs font-medium leading-5 text-copy-muted">
        WHY ANVILA
      </span>
    </div>
  );
}

export function WhyAnvila() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 py-12 lg:flex-row lg:flex-wrap lg:justify-between lg:px-20 lg:py-20">
        {/* Left column — heading + subhead + CTA */}
        <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:items-start">
          <Pill />
          <h2 className="m-0 max-w-[479px] text-center text-3xl font-medium leading-[38px] text-logo lg:text-left lg:text-5xl lg:leading-[48px] lg:tracking-[-1.2px]">
            Setting up AI agents is still messy.
          </h2>
          <p className="m-0 max-w-[521px] self-stretch text-center text-base font-normal leading-6 text-copy-muted lg:text-left lg:text-[17.9px] lg:leading-7">
            Developers and builders still rewrite the same agent setup, struggle
            with scattered prompts, and lack a clear structure for files that
            others can reuse.
          </p>
          <Button asChild className="hidden h-auto items-center justify-center gap-2.5 rounded-lg border-none bg-teal-brand p-4 text-lg font-medium leading-6 text-white transition-opacity hover:opacity-90 lg:flex lg:w-[287px]">
            <Link href="/register">Try for Free</Link>
          </Button>
        </div>

        <div className="grid w-full grid-cols-2 self-stretch lg:w-[620px] lg:self-auto">
          {CARDS.map((card, idx) => {
            const isTopRow = idx < 2;
            return (
              <div
                key={card.title}
                className={`flex flex-col items-center justify-center gap-1 px-2.5 py-6 text-center lg:h-[304px] lg:px-[30px] lg:py-0 ${
                  card.highlighted ? "bg-[rgba(16,191,171,0.10)]" : "bg-white"
                } ${isTopRow ? "border-b border-[#F0F0F0]" : ""}`}
              >
                <h3 className="m-0 text-center text-sm font-medium text-[#1C1F25] lg:whitespace-nowrap lg:text-2xl lg:leading-[38px]">
                  {card.title}
                </h3>
                <p className="m-0 line-clamp-4 text-center text-[10px] font-normal text-copy-muted lg:text-base lg:leading-6">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
        <Button asChild className="flex h-auto w-[223px] items-center justify-center gap-2.5 cursor-pointer rounded-lg border-none bg-teal-brand p-4 text-lg font-medium leading-6 text-white transition-opacity hover:opacity-90 lg:hidden">
          <Link href="/register">Try for Free</Link>
        </Button>
      </div>
    </section>
  );
}
