import { STEPS } from "@/data/landing/how-it-works";

export function HowItWorks() {
  return (
    <section className="w-full bg-[#FBFBFB]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center px-6 py-18 md:py-20">
        {/* Pill */}
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-amber-400"
          />
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            How it works
          </span>
        </div>

        <h2 className="mb-4 text-center text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 md:text-[36px]">
          How Anvila Works
        </h2>

        <p className="mb-16 max-w-[520px] text-center text-sm leading-relaxed text-zinc-500 md:text-[15px]">
          Effortlessly create organized GitHub-ready agent setup files you can
          reuse, publish, and adapt across projects in less time.
        </p>

        {/* Steps — file pipeline */}
        <div className="relative w-full">
          {/* Blueprint dot-grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgb(212 212 216) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-0">
            {STEPS.map((step, i) => {
              const { Icon } = step;
              const isLast = i === STEPS.length - 1;
              return (
                <>
                  <div
                    key={step.title}
                    className="group relative flex flex-col overflow-hidden rounded-[14px] border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-brand/30 hover:shadow-[0_12px_28px_-12px_rgba(12,93,86,0.25)]"
                  >
                    {/* File tab header */}
                    <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5 transition-colors duration-300 group-hover:bg-[#F0FDFA]">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-teal-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-zinc-300 transition-colors duration-300 group-hover:bg-teal-brand"
                      />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col items-start gap-3 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-teal-brand/12 bg-[#F0FDFA]">
                        <Icon stroke={step.stroke} />
                      </div>
                      <h3 className="text-base font-semibold leading-snug text-zinc-900">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Flow connector — desktop only */}
                  {!isLast && (
                    <div
                      aria-hidden
                      className="hidden items-center justify-center px-3 md:flex"
                    >
                      <svg
                        width="28"
                        height="16"
                        viewBox="0 0 28 16"
                        fill="none"
                        className="text-zinc-300"
                      >
                        <path
                          d="M1 8H23M23 8L17 2M23 8L17 14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
