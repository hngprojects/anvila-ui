"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDraft } from "@/hooks/useDraft";
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
import { AuthOAuthButtons } from "./authOAthButtons";
import { IconPrefix } from "@/components/icons";
import { Logo } from "@/components/icons";
import { FieldError } from "@/components/ui/field-error";

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

const REGISTER_DRAFT_KEY = "anvila:register-draft";

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
      className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border ${
        passing
          ? "border-[color:var(--color-teal-accent)] bg-[color:var(--color-teal-accent)]"
          : "border-red-400"
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

export function AuthSignUpForm() {
  const router = useRouter();

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const [bannerError, setBannerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
    mode: "onBlur",
  });

  const nameValue = useWatch({ control, name: "display_name" }) ?? "";
  const emailValue = useWatch({ control, name: "email" }) ?? "";
  const password = useWatch({ control, name: "password" }) ?? "";
  const cpwValue = useWatch({ control, name: "confirmPassword" }) ?? "";
  const agreed = useWatch({ control, name: "agreed" }) ?? false;

  const { clearDraft } = useDraft(
    REGISTER_DRAFT_KEY,
    { display_name: nameValue, email: emailValue, agreed },
    (draft) => {
      reset({
        display_name: draft.display_name ?? "",
        email: draft.email ?? "",
        password: "",
        confirmPassword: "",
        agreed: draft.agreed ?? false,
      });
    },
  );

  const nameEmpty = nameValue.length === 0;
  const emailEmpty = emailValue.length === 0;
  const pwEmpty = password.length === 0;
  const cpwEmpty = cpwValue.length === 0;

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

      clearDraft();
      const encoded = encodeURIComponent(values.email);
      router.push(`/confirm-email?email=${encoded}`);
    } catch {
      setBannerError("Network error. Please check your connection.");
    }
  }

  return (
    <>
      <div className="flex w-full max-w-[520px] flex-col rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-background)] px-6 py-6 sm:px-8 sm:py-8">
        <div className="hidden max-[700px]:flex justify-center">
          <Logo />
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="hidden cursor-pointer items-center gap-1 self-start border-0 bg-transparent px-0 pb-2 pt-3 text-base font-medium text-[color:var(--color-copy-heading)] md:flex"
        >
          <ArrowLeft size={13} />
          <span>Back</span>
        </button>

        <div className="mb-5 mt-1 text-center">
          <h1 className="mb-1 text-[32px] font-bold text-[color:var(--color-copy-heading)]">
            Create account
          </h1>
          <p className="m-0 text-base text-[color:var(--color-copy-muted)]">
            Enter your details to create an account
          </p>
        </div>

        {bannerError && (
          <div role="alert" className="mb-3 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2">
            <p className="m-0 text-[12px] text-red-600">{bannerError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[14px]"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="display_name"
              className="text-base font-medium text-[color:var(--color-copy-heading)]"
            >
              Full name
            </label>
            <div className="relative">
              <IconPrefix icon={User} show={nameEmpty} />
              <input
                {...register("display_name")}
                id="display_name"
                type="text"
                placeholder="Enter full name"
                aria-invalid={!!errors.display_name}
                aria-describedby={errors.display_name ? "display_name-error" : undefined}
                className={[
                  "w-full rounded-[8px] border bg-[color:var(--color-background)] py-[11px] text-sm text-[color:var(--color-copy-heading)] outline-none transition-all placeholder:text-[color:var(--color-copy-muted)]",
                  errors.display_name
                    ? "border-red-500"
                    : "border-[color:var(--color-border-subtle)]",
                  nameEmpty ? "pl-[34px]" : "pl-[12px] pr-[12px]",
                ].join(" ")}
              />
            </div>
            <FieldError id="display_name-error" message={errors.display_name?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-base font-medium text-[color:var(--color-copy-heading)]"
            >
              Email
            </label>
            <div className="relative">
              <IconPrefix icon={Mail} show={emailEmpty} />
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter email address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={[
                  "w-full rounded-[8px] border bg-[color:var(--color-background)] py-[11px] text-sm text-[color:var(--color-copy-heading)] outline-none transition-all placeholder:text-[color:var(--color-copy-muted)]",
                  errors.email
                    ? "border-red-500"
                    : "border-[color:var(--color-border-subtle)]",
                  emailEmpty ? "pl-[34px]" : "pl-[12px]",
                ].join(" ")}
              />
            </div>
            <FieldError id="email-error" message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-base font-medium text-[color:var(--color-copy-heading)]"
            >
              Password
            </label>
            <div className="relative">
              <IconPrefix icon={Lock} show={pwEmpty} />
              <input
                {...register("password")}
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                onFocus={() => setPwTouched(true)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={[
                  "w-full rounded-[8px] border bg-[color:var(--color-background)] py-[11px] text-sm text-[color:var(--color-copy-heading)] outline-none transition-all placeholder:text-[color:var(--color-copy-muted)]",
                  errors.password
                    ? "border-red-500"
                    : "border-[color:var(--color-border-subtle)]",
                  pwEmpty ? "pl-[34px]" : "pl-[12px] pr-[80px]",
                ].join(" ")}
              />
              <div className="absolute right-[10px] top-1/2 flex -translate-y-1/2 items-center gap-[6px]">
                {showPw && !pwEmpty && (
                  <div
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] ${
                      allPassing
                        ? "border-[color:var(--color-teal-accent)] bg-[color:var(--color-teal-accent)]"
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
                  className="border-0 bg-transparent text-[color:var(--color-copy-muted)] cursor-pointer"
                >
                  {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
                </button>
              </div>
            </div>

            {showPwRules && (
              <div className="mt-1 flex flex-col gap-[6px]">
                <div className="flex items-center gap-[6px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-[4px] flex-1 rounded-[2px]"
                      style={{
                        background: score >= i ? strengthColor : "#e5e7eb",
                      }}
                    />
                  ))}
                  <span
                    className="min-w-[40px] text-right text-[11px]"
                    style={{ color: strengthColor }}
                  >
                    {strengthLabel}
                  </span>
                </div>
                {PW_RULES.map((rule) => {
                  const passing = rule.test(password);
                  return (
                    <div
                      key={rule.label}
                      className="flex items-center gap-[6px]"
                    >
                      <RoundTick passing={passing} />
                      <span
                        className="text-[12px]"
                        style={{
                          color: passing
                            ? "var(--color-teal-accent)"
                            : "#f87171",
                        }}
                      >
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <FieldError id="password-error" message={errors.password?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-base font-medium text-[color:var(--color-copy-heading)]"
            >
              Confirm password
            </label>
            <div className="relative">
              <IconPrefix icon={Lock} show={cpwEmpty} />
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                className={[
                  "w-full rounded-[8px] border bg-[color:var(--color-background)] py-[11px] text-sm text-[color:var(--color-copy-heading)] outline-none placeholder:text-[color:var(--color-copy-muted)]",
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-[color:var(--color-border-subtle)]",
                  cpwEmpty ? "pl-[34px]" : "pl-[12px] pr-[40px]",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-[10px] top-1/2 -translate-y-1/2 border-0 bg-transparent text-[color:var(--color-copy-muted)] cursor-pointer"
              >
                {showConfirm ? <Eye size={15} /> : <EyeClosed size={15} />}
              </button>
            </div>
            <FieldError id="confirmPassword-error" message={errors.confirmPassword?.message} />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-[12px] font-normal text-[color:var(--color-copy-heading)]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setValue("agreed", e.target.checked, { shouldValidate: true });
              }}
              aria-describedby={errors.agreed ? "agreed-error" : undefined}
              className="h-[14px] w-[14px] accent-[color:var(--color-primary)]"
            />
            <span className="text-[12px]">
              I agree to{" "}
              <Link
                href="/terms"
                className="text-[color:var(--color-teal-accent)] text-[12px] underline"
              >
                Terms & Conditions
              </Link>
            </span>
          </label>
          <FieldError id="agreed-error" message={errors.agreed?.message} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              "w-full rounded-[8px] py-3 text-sm font-medium text-white bg-[color:var(--color-primary)] transition-all",
              isSubmitting
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:opacity-90",
            ].join(" ")}
          >
            {isSubmitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <div className="mt-4">
          <AuthOAuthButtons />
        </div>

        <p className="mt-3 text-center text-lg text-[color:var(--color-copy-heading)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[color:var(--color-teal-accent)] no-underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
