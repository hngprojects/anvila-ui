import { Button } from "@/components/ui/button";
import { CARDS, STATS } from "@/data/landing/features";

export function Features() {
  return (
    <section className="w-full bg-zinc-100">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center px-6 py-18 md:py-20">
        {/* Pill */}
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-amber-400"
          />
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            Features
          </span>
        </div>

        {/* Heading */}
        <h2 className="mb-4 max-w-[640px] text-center text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[40px]">
          One setup. Clean files.
          <br className="hidden md:block" /> Reusable agents.
        </h2>

        {/* Subhead */}
        <p className="mb-12 max-w-[520px] text-center text-sm leading-relaxed text-zinc-500 md:text-[15px]">
          Keep your agent&apos;s personality, rules, and skills in one reusable
          ready-to-publish package. Find the perfect setup on the public
          registry.
        </p>

        {/* Cards */}
        <div className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map((card) => {
            const isDark = card.variant === "dark";
            return (
              <div
                key={card.title}
                className={`relative flex flex-col gap-4 overflow-hidden rounded-[20px] p-6 ${
                  isDark
                    ? "border border-white/15 bg-teal-brand"
                    : "border border-zinc-200 bg-white"
                }`}
              >
                {/* Subtle corner glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${
                    isDark ? "bg-white/8" : "bg-teal-brand/8"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${
                    isDark
                      ? "border border-white/20 bg-white/12"
                      : "border border-teal-brand/12 bg-[#F0FDFA]"
                  }`}
                >
                  {card.icon}
                </div>

                <h3
                  className={`text-base font-semibold leading-snug ${isDark ? "text-white" : "text-zinc-900"}`}
                >
                  {card.title}
                </h3>

                <p
                  className={`flex-1 text-sm leading-relaxed ${isDark ? "text-white/75" : "text-zinc-500"}`}
                >
                  {card.description}
                </p>

                <div
                  className={`mt-auto self-start truncate rounded-full px-3.5 py-1.5 text-xs font-medium ${
                    isDark
                      ? "bg-white/15 text-white/90"
                      : "bg-[#E7EFF1] text-zinc-500"
                  }`}
                >
                  {card.chip}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mb-10 grid w-full grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <span className="text-2xl font-semibold tracking-tight text-teal-brand">
                {s.num}
              </span>
              <span className="text-xs text-zinc-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button className="group flex h-auto items-center gap-2 rounded-lg border-none bg-teal-brand px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85">
          Create your first package
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Button>
      </div>
    </section>
  );
}
