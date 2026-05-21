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

        <p className="mb-14 max-w-[520px] text-center text-sm leading-relaxed text-zinc-500 md:text-[15px]">
          Effortlessly create organized GitHub-ready agent setup files you can
          reuse, publish, and adapt across projects in less time.
        </p>

        {/* Steps */}
        <div className="relative grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Dashed connector line — desktop only */}
          <div
            aria-hidden
            className="absolute left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] top-9 hidden border-t-[1.5px] border-dashed border-zinc-300 md:block"
          />

          {STEPS.map((step, i) => {
            const { Icon } = step;
            return (
              <div
                key={step.title}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                {/* Icon circle */}
                <div
                  className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full border ${step.iconBg} ${step.iconBorder}`}
                >
                  {/* Step number badge */}
                  <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-teal-brand text-[10px] font-semibold text-white">
                    {i + 1}
                  </div>
                  <Icon stroke={step.stroke} />
                </div>

                <h3 className="text-center text-base font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="max-w-[200px] text-center text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
