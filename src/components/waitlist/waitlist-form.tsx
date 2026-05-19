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
    `w-full rounded-[8px] border bg-background px-[14px] py-[11px] text-[15px] outline-none transition-all placeholder:text-[#A1A1AA] text-logo ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-[#B1B5B4] focus:border-teal-accent"
    }`;

  return (
    <div className="flex w-full max-w-[652px] flex-col px-6 py-10 sm:px-10 sm:py-12 rounded-[5px] border border-border-subtle bg-background">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-2xl font-medium text-logo">
            You&apos;re on the list!
          </p>
          <p className="text-base text-copy-muted">
            We&apos;ll reach out as soon as a spot opens up.
          </p>
        </div>
      ) : (
        <>
          <h1 className="mb-3 text-center leading-tight text-[30px] font-medium text-logo">
            Be first to build reusable AI agent packages with Anvila.
          </h1>

          <p className="mb-8 text-base leading-relaxed text-center text-copy-muted">
            Turn one agent idea into a clean setup you can publish, clone, and
            reuse.
          </p>

          {serverError && (
            <div className="mb-4 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2">
              <p className="m-0 text-[12px] text-red-600">{serverError}</p>
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
                className="text-[15px] font-medium text-logo"
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
                <p className="m-0 text-[11px] text-red-600">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[15px] font-medium text-logo"
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
                style={{ color: "#0C0E0D" }}
              />
              {errors.email && (
                <p className="m-0 text-[11px] text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-1 w-full rounded-[8px] py-3 text-[15px] font-medium text-white transition-all bg-primary ${
                isSubmitting
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:opacity-90"
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
