"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

export default function GithubConnectionCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [refreshError, setRefreshError] = useState("");

  const connected = searchParams.get("github") === "connected";
  const failed = searchParams.get("github") === "error";

  const title = useMemo(() => {
    if (connected) return "GitHub connected";
    if (failed) return "GitHub connection failed";
    return "GitHub connection";
  }, [connected, failed]);

  useEffect(() => {
    let cancelled = false;

    async function refreshUser() {
      if (!connected) {
        setIsRefreshing(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.user) {
          throw new Error("Connected, but could not refresh your account state.");
        }
        if (!cancelled) setUser(json.user);
      } catch (err) {
        if (!cancelled) {
          setRefreshError(
            err instanceof Error
              ? err.message
              : "Could not refresh your account state.",
          );
        }
      } finally {
        if (!cancelled) setIsRefreshing(false);
      }
    }

    refreshUser();

    return () => {
      cancelled = true;
    };
  }, [connected, setUser]);

  return (
    <main className="flex h-full min-h-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#FBFBFB] px-4 shadow-sm">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div
          className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${
            connected ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}
        >
          {connected ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-normal text-gray-950">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          {connected
            ? "Your GitHub account is ready for private publishing."
            : "We could not complete the GitHub connection. You can try again from GitHub settings."}
        </p>

        {isRefreshing && (
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Refreshing account...
          </div>
        )}

        {refreshError && (
          <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {refreshError}
          </p>
        )}

        <Button
          type="button"
          onClick={() => router.replace("/generator/github")}
          className="mt-6 w-full bg-teal-brand text-white hover:bg-[#094a45]"
        >
          Back to GitHub settings
        </Button>
      </section>
    </main>
  );
}
