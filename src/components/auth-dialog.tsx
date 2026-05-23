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
      <DialogContent className="overflow-hidden rounded-[32px] border-none p-0 shadow-2xl sm:max-w-[420px]">
        <div className="flex flex-col items-center bg-white p-8 text-center sm:p-10">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <LogoIcon className="h-12 w-12" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-teal-brand">
              ANVILA
            </span>
          </div>

          <DialogHeader className="mb-10 flex flex-col items-center space-y-3">
            <DialogTitle className="text-2xl font-bold tracking-tight text-logo sm:text-3xl">
              Start building smarter.
            </DialogTitle>
            <DialogDescription className="max-w-[300px] text-base leading-relaxed text-copy-muted">
              Join thousands of developers building reusable AI agent setups.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-4">
            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-copy-muted/20 text-base font-semibold transition-all duration-200 hover:border-copy-muted/30 hover:bg-background"
              onClick={() => {
                window.location.href = `${BACKEND_URL}/api/v1/auth/google`;
              }}
            >
              <Google className="h-6 w-6 transition-transform group-hover:scale-105" />
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-copy-muted/20 text-base font-semibold transition-all duration-200 hover:border-copy-muted/30 hover:bg-background"
              onClick={() => {
                window.location.href = `${BACKEND_URL}/api/v1/auth/github`;
              }}
            >
              <Github className="h-6 w-6 transition-transform group-hover:scale-105" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-1 text-sm font-bold text-teal-brand transition-colors hover:text-teal-accent"
            >
              Use email instead
            </Link>

            <p className="max-w-[280px] text-[11px] leading-normal text-copy-muted/70">
              By signing up, you agree to our
              <Link
                href="/terms"
                className="underline underline-offset-2 transition-colors hover:text-copy-muted"
              >
                Terms
              </Link>
              and
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-copy-muted"
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
