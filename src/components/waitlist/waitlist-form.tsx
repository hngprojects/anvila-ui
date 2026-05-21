"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailRegex } from "@/schemas/auth";

const WaitlistSchema = z.object({
  full_name: z.string().min(1, "Please enter your full name."),
  email: z
    .string()
    .regex(emailRegex, { message: "Please enter a valid email" }),
});

type WaitlistInput = z.infer<typeof WaitlistSchema>;

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(WaitlistSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: WaitlistInput) {
    setServerError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.message ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection.");
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-2xl border bg-surface-base px-4 py-3 text-[15px] outline-none transition-all placeholder:text-copy-faint text-copy-heading ${
      hasError
        ? "border-warning focus:border-warning"
        : "border-border-subtle focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/10"
    }`;

  return (
    <div className="flex w-full max-w-[652px] flex-col rounded-2xl border border-border-subtle bg-surface-base px-6 py-10 sm:px-10 sm:py-12">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal-surface text-teal-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-copy-heading">
            You&apos;re on the list!
          </p>
          <p className="text-base text-copy-muted">
            We&apos;ll reach out as soon as a spot opens up.
          </p>
        </div>
      ) : (
        <>
          <h1 className="mb-3 text-center text-[28px] font-semibold leading-tight tracking-tight text-copy-heading sm:text-[32px]">
            Be first to build reusable AI agent packages with Anvila.
          </h1>

          <p className="mb-8 text-center text-base leading-relaxed text-copy-muted">
            Turn one agent idea into a clean setup you can publish, clone, and
            reuse.
          </p>

          {serverError && (
            <div className="mb-4 rounded-xl border border-warning/30 bg-warning/5 px-4 py-3">
              <p className="text-xs font-medium text-warning">{serverError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-copy-heading"
              >
                Your name
              </label>
              <input
                {...register("full_name")}
                id="name"
                type="text"
                placeholder="Enter your name"
                aria-invalid={!!errors.full_name}
                className={inputClass(!!errors.full_name)}
              />
              {errors.full_name && (
                <p className="text-xs font-medium text-warning">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-copy-heading"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email address"
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs font-medium text-warning">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-1 w-full rounded-2xl py-3.5 text-[15px] font-semibold text-white transition-all bg-primary ${
                isSubmitting
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
