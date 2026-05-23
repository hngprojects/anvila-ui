import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1439px] flex-col items-center gap-6 px-5 py-20 text-center">
        <h2 className="m-0 max-w-[725px] text-center text-5xl font-medium leading-[48px] tracking-[-1.2px] text-logo">
          Your agent setup, built once and reused forever.
        </h2>

        <p className="m-0 max-w-[545px] text-base font-normal leading-6 text-copy-muted">
          Use Anvila to create, package, and reuse AI agent setups. No technical{" "}
          <br className="hidden md:inline" />
          expertise needed.
        </p>

        <Button
          asChild
          className="inline-flex h-auto items-center justify-center gap-2 rounded-lg border-[0.5px] border-teal-brand bg-teal-brand px-8 py-4 text-base font-medium leading-normal text-white transition-opacity hover:opacity-90"
        >
          <Link href="/register">Start Building</Link>
        </Button>
      </div>
    </section>
  );
}
