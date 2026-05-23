import Link from "next/link";

export const metadata = {
  title: "Coming Soon | Anvila",
  description: "Private agent publishing and Pro features are coming soon.",
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:py-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-copy-muted/30 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <span className="text-xs font-medium tracking-[0.08em] text-copy-muted">
            COMING SOON
          </span>
        </div>

        <h1 className="max-w-2xl text-3xl font-medium leading-tight text-logo sm:text-5xl">
          Private publishing is not open yet.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-copy-muted sm:text-base">
          We are preparing private repositories, registry controls, and Pro
          account features for the MVP. Public agent publishing is available
          now.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white hover:bg-primary"
          >
            Create a public agent
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-teal-brand px-5 text-sm font-medium text-teal-brand hover:bg-teal-brand hover:text-white"
          >
            Back to pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
