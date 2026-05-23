import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-center">
      <section className="mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-copy-muted/30 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <span className="text-xs font-medium tracking-[0.08em] text-copy-muted">
            404
          </span>
        </div>

        <h1 className="text-3xl font-medium leading-tight text-logo sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-copy-muted sm:text-base">
          The page you are looking for does not exist, was moved, or is not
          available yet.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white hover:bg-primary"
          >
            Return home
          </Link>
          <Link
            href="/explore"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-teal-brand px-5 text-sm font-medium text-teal-brand hover:bg-teal-brand hover:text-white"
          >
            Explore agents
          </Link>
        </div>
      </section>
    </main>
  );
}
