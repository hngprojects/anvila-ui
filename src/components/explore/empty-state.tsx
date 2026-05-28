import Link from "next/link";

export function ExploreEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-copy-muted/20 bg-white px-6 py-12 text-center">
      <h2 className="text-2xl font-medium text-logo">
        Publish the first agent
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-copy-muted">
        No published agent packages are available yet. Create an account to
        build and publish a reusable agent package.
      </p>
      <Link
        href="/register"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-teal-brand px-5 text-sm font-medium text-white hover:bg-primary"
      >
        Sign up
      </Link>
    </div>
  );
}
