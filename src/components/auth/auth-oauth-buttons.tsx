"use client";

import { Google, Github } from "@/components/icons";

const providers = [
  {
    provider: "google",
    Icon: Google,
    label: "Google",
    href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`,
  },
  {
    provider: "github",
    Icon: Github,
    label: "GitHub",
    href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/github`,
  },
] as const;

export const AuthOAuthButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-zinc-100" />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">or</span>
        <span className="h-px flex-1 bg-zinc-100" />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ provider, Icon, label, href }) => (
          <button
            key={provider}
            type="button"
            onClick={() => { window.location.href = href; }}
            aria-label={`Continue with ${label}`}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <Icon className="h-5 w-5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
