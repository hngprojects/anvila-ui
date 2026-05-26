import { LockKeyhole } from "lucide-react";

import { Github } from "@/components/icons";

export default function GeneratorGithubPage() {
  return (
    <main className="flex h-full min-h-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] px-4 shadow-sm">
      <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#0C5D56]/10 text-[#0C5D56]">
          <Github size={26} />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-gray-950">
          GitHub publishing controls
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Connect your own GitHub account, publish private repositories, and manage
          organization-level destinations from Anvila.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
          <LockKeyhole size={15} />
          Pro feature coming soon
        </div>
      </section>
    </main>
  );
}
