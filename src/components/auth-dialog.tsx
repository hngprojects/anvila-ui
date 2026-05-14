"use client";

import Link from "next/link";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.71-.42-.225-1.02-.78-.0
        fill="currentColor"
      />
    </svg>
  );
}

type AuthDialogProps = {
  trigger: React.ReactNode;
};

export function AuthDialog({ trigger }: AuthDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-[32px] border-none p-0 shadow-2xl sm:max-w-[420px]">
        <div className="flex flex-col items-center bg-white p-8 text-center sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D5C4E]/5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D5C4E]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="4" fill="white" />
                  <path
                    d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <span
              className="text-[10px] font-bold tracking-[0.2em] text-[#0D5C4E]"
              style={{ fontFamily: "Inter" }}
            >
              AGENTFORGE
            </span>
          </div>

          <DialogHeader className="mb-10 flex flex-col items-center space-y-3">
            <DialogTitle className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
              Start building smarter.
            </DialogTitle>
            <DialogDescription className="max-w-[300px] text-base leading-relaxed text-[#6B7280]">
              Join thousands of developers building reusable AI agent setups.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-4">
            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-[#E5E7EB] text-base font-semibold transition-all duration-200 hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              onClick={() => {
                window.location.href = "/api/auth/google";
              }}
            >
              <GoogleLogo className="h-6 w-6 transition-transform group-hover:scale-105" />
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-[#E5E7EB] text-base font-semibold transition-all duration-200 hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              onClick={() => {
                window.location.href = "/api/auth/github";
              }}
            >
              <GithubLogo className="h-6 w-6 transition-transform group-hover:scale-105" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-1 text-sm font-bold text-[#0D5C4E] transition-colors hover:text-[#0a4a3f]"
            >
              Use email instead
            </Link>

            <p className="max-w-[280px] text-[11px] leading-normal text-[#9CA3AF]">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 transition-colors hover:text-[#6B7280]"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-[#6B7280]"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
