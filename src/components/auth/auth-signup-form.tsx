"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeClosed,
  User,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import { RegisterSchema, type RegisterInput } from "@/schemas/auth";
import { AuthOAuthButtons } from "./auth-oauth-buttons";
import { IconPrefix, Logo } from "@/components/icons";

const PW_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  {
    label: "At least one uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  { label: "At least one number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "At least one special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

function getStrength(pw: string) {
  const score = PW_RULES.filter((r) => r.test(pw)).length;
  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score === 2) return { score, label: "Fair", color: "#f97316" };
  if (score === 3) return { score, label: "Good", color: "#eab308" };
  return { score, label: "Strong", color: "#22c55e" };
}

function RoundTick({ passing }: { passing: boolean }) {
  return (
    <div
      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
        passing ? "border-teal-brand bg-teal-brand" : "border-red-400"
      }`}
    >
      {passing ? (
        <Check size={8} color="#fff" />
      ) : (
        <X size={8} color="#f87171" />
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-1 focus:ring-teal-brand/20";

export function AuthSignUpForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [bannerError, setBannerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { agreed: false },
    mode: "onBlur",
  });

  const nameValue = useWatch({ control, name: "display_name" }) ?? "";
  const emailValue = useWatch({ control, name: "email" }) ?? "";
  const password = useWatch({ control, name: "password" }) ?? "";
  const cpwValue = useWatch({ control, name: "confirmPassword" }) ?? "";


  const {
    score,
    label: strengthLabel,
    color: strengthColor,
  } = getStrength(password);
  const allPassing = score === 4;
  const showPwRules = pwTouched && password.length > 0;

  async function onSubmit(values: RegisterInput) {
    setBannerError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setBannerError(
          data.message ?? "Registration failed. Please try again.",
        );
        return;
      }
      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
    } catch {
      setBannerError("Network error. Please check your connection.");
    }
  }

  const fieldBorder = (field: keyof RegisterInput) =>
    errors[field] ? "border-red-400" : "border-zinc-200";

  return (
    <div className="flex w-full max-w-[480px] flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Logo — mobile only */}
      <div className="mb-4 hidden justify-center max-[700px]:flex">
        <Logo />
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-2 hidden cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent p-0 text-sm font-medium text-zinc-600 transition-opacity hover:opacity-70 md:flex"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="mb-1 text-[28px] font-semibold tracking-tight text-zinc-900">
          Create account
        </h1>
        <p className="text-sm text-zinc-500">
          Enter your details to get started.
        </p>
      </div>

      {/* Banner error */}
      {bannerError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-medium text-red-600">{bannerError}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="display_name"
            className="text-sm font-medium text-zinc-700"
          >
            Full name
          </label>
          <div className="relative">
            <IconPrefix icon={User} show={nameValue.length === 0} />
            <input
              {...register("display_name")}
              id="display_name"
              type="text"
              placeholder="Enter full name"
              className={`${inputBase} ${fieldBorder("display_name")} ${nameValue.length === 0 ? "pl-9" : "pl-3"}`}
            />
          </div>
          {errors.display_name && (
            <p className="text-xs text-red-500">
              {errors.display_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <div className="relative">
            <IconPrefix icon={Mail} show={emailValue.length === 0} />
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter email address"
              className={`${inputBase} ${fieldBorder("email")} ${emailValue.length === 0 ? "pl-9" : "pl-3"}`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <div className="relative">
            <IconPrefix icon={Lock} show={password.length === 0} />
            <input
              {...register("password")}
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter password"
              onFocus={() => setPwTouched(true)}
              className={`${inputBase} ${fieldBorder("password")} ${
                password.length === 0 ? "pl-9" : "pl-3 pr-16"
              }`}
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              {showPw && password.length > 0 && (
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] ${
                    allPassing
                      ? "border-teal-brand bg-teal-brand"
                      : "border-red-400"
                  }`}
                >
                  {allPassing ? (
                    <Check size={10} color="#fff" />
                  ) : (
                    <X size={10} color="#f87171" />
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="cursor-pointer border-0 bg-transparent text-zinc-400 hover:text-zinc-600"
              >
                {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          {showPwRules && (
            <div className="mt-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{
                      background: score >= i ? strengthColor : "#e5e7eb",
                    }}
                  />
                ))}
                <span
                  className="min-w-[40px] text-right text-[11px] font-medium"
                  style={{ color: strengthColor }}
                >
                  {strengthLabel}
                </span>
              </div>
              {PW_RULES.map((rule) => {
                const passing = rule.test(password);
                return (
                  <div key={rule.label} className="flex items-center gap-1.5">
                    <RoundTick passing={passing} />
                    <span
                      className="text-[11px]"
                      style={{ color: passing ? "#0C5D56" : "#f87171" }}
                    >
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-zinc-700"
          >
            Confirm password
          </label>
          <div className="relative">
            <IconPrefix icon={Lock} show={cpwValue.length === 0} />
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              className={`${inputBase} ${fieldBorder("confirmPassword")} ${
                cpwValue.length === 0 ? "pl-9" : "pl-3 pr-10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              aria-label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent text-zinc-400 hover:text-zinc-600"
            >
              {showConfirm ? <Eye size={15} /> : <EyeClosed size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setValue("agreed", e.target.checked, { shouldValidate: true });
            }}
            className="h-3.5 w-3.5 accent-teal-brand"
          />
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-medium text-teal-brand underline underline-offset-2"
          >
            Terms & Conditions
          </Link>
        </label>
        {errors.agreed && (
          <p className="text-xs text-red-500">{errors.agreed.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-1 flex h-11 w-full items-center justify-center rounded-xl border-none text-sm font-semibold text-white transition-opacity ${
            isSubmitting
              ? "cursor-not-allowed bg-teal-brand opacity-60"
              : "cursor-pointer bg-teal-brand hover:opacity-85"
          }`}
        >
          {isSubmitting ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      <p className="mt-5 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-teal-brand transition-opacity hover:opacity-70"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
