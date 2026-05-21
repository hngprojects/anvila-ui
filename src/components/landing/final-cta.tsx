import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-teal-brand">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]"
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[960px] flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5">
          <span aria-hidden className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-white/80">Get started free</span>
        </div>

        <h2 className="m-0 max-w-[620px] text-center text-[32px] font-semibold leading-tight tracking-tight text-white md:text-[44px]">
          Your agent setup, built once and reused forever.
        </h2>

        <p className="m-0 max-w-[480px] text-sm leading-relaxed text-white/70 md:text-base">
          Use Anvila to create, package, and reuse AI agent setups. No technical expertise needed.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            className="group inline-flex h-auto items-center gap-2 rounded-lg border-none bg-white px-8 py-3.5 text-sm font-semibold text-teal-brand shadow-none hover:bg-white/90 hover:text-teal-brand"
          >
            <Link href="/login">
              Start building
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="inline-flex h-auto items-center gap-2 rounded-lg border border-white/25 bg-transparent px-8 py-3.5 text-sm font-medium text-white shadow-none hover:bg-white/10 hover:text-white"
          >
            <Link href="/explore">
              View public registry
            </Link>
          </Button>
        </div>

        <p className="text-xs text-white/50">No credit card required · 3 free packages included</p>
      </div>
    </section>
  );
}
