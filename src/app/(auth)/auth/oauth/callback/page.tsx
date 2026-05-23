"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;

    const ott = searchParams.get("ott");

    if (!ott) {
      router.replace("/login?error=oauth_missing_ott");
      return;
    }

    async function exchange() {
      try {
        const res = await fetch("/api/auth/exchange-ott", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ott }),
        });

        const data = await res.json();

        if (!res.ok) {
          router.replace(
            `/login?error=oauth_failed&message=${encodeURIComponent(data.message ?? "OAuth failed")}`,
          );
          return;
        }

        setUser(data.user);
        router.replace("/generator");
      } catch {
        router.replace("/login?error=oauth_network");
      }
    }

    exchange();
  }, [searchParams, router, setUser]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[color:var(--color-background)]">
      <Loader2
        size={32}
        className="animate-spin text-[color:var(--color-primary)]"
      />
      <p className="text-sm text-[color:var(--color-copy-muted)]">
        Completing sign-in…
      </p>
    </div>
  );
}
