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
import { Github, Google, LogoIcon } from "@/components/icons";
import { BACKEND_URL } from "@/lib/consts";

type AuthDialogProps = {
  trigger: React.ReactNode;
};

export function AuthDialog({ trigger }: AuthDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-[28px] border-none p-0 shadow-2xl sm:max-w-[420px]">
        <div className="flex flex-col items-center bg-white px-8 py-10 text-center sm:px-10">

          {/* Logo */}
          <div className="mb-7 flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-brand/15 bg-[#F0FDFA]">
              <LogoIcon className="h-7 w-7 text-teal-brand" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.22em] text-teal-brand">ANVILA</span>
          </div>

          <DialogHeader className="mb-8 flex flex-col items-center gap-2">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
              Start building smarter.
            </DialogTitle>
            <DialogDescription className="max-w-[280px] text-sm leading-relaxed text-zinc-500">
              Join thousands of developers building reusable AI agent setups.
            </DialogDescription>
          </DialogHeader>

          {/* OAuth buttons */}
          <div className="w-full space-y-3">
            <Button
              variant="outline"
              className="group h-12 w-full gap-3 rounded-xl border-zinc-200 text-sm font-semibold transition-all hover:border-zinc-300 hover:bg-zinc-50"
              onClick={() => { window.location.href = `${BACKEND_URL}/api/v1/auth/google`; }}
            >
              <Google className="h-5 w-5 transition-transform group-hover:scale-105" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="group h-12 w-full gap-3 rounded-xl border-zinc-200 text-sm font-semibold transition-all hover:border-zinc-300 hover:bg-zinc-50"
              onClick={() => { window.location.href = `${BACKEND_URL}/api/v1/auth/github`; }}
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-105" />
              Continue with GitHub
            </Button>
          </div>

          <div className="mt-7 flex flex-col items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-teal-brand transition-opacity hover:opacity-70"
            >
              Use email instead →
            </Link>
            <p className="max-w-[260px] text-[11px] leading-relaxed text-zinc-400">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-600 transition-colors">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-600 transition-colors">Privacy Policy</Link>.
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
