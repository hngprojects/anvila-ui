"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  Mail,
  Lock,
  CircleCheck,
} from "lucide-react";
import { LoginSchema, type LoginInput } from "../schemas/auth";
import { AuthOAuthButtons } from "./authOAthButtons";
import { Logo } from "@/components/icons";
import { IconPrefix } from "@/components/icons";
import { useAuth } from '@/context/auth';
import { FieldError } from "@/components/ui/field-error";

export const AuthLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
  });

  const email = useWatch({ control, name: "email" }) ?? "";
  const password = useWatch({ control, name: "password" }) ?? "";

  const emailEmpty = email.length === 0;
  const passwordEmpty = password.length === 0;
  const emailValid = !errors.email && email.length > 0;

  async function onSubmit(values: LoginInput) {
    setServerError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message ?? "Login failed. Please try again.");
        return;
      }

      setUser(data.user);
      const next = searchParams.get("next") ?? "/generator";
      router.replace(next);
    } catch {
      setServerError("Network error. Please check your connection.");
    }
  }

  return (
    <div className="flex w-full max-w-[520px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
      <div className="hidden max-[700px]:flex justify-center">
        <Logo />
      </div>

      <button
        type="button"
        onClick={() => router.back()}
        className="hidden cursor-pointer items-center gap-1 self-start border-0 bg-transparent px-0 pb-2 pt-3 text-[16px] font-medium text-[#111] md:flex"
      >
        <ArrowLeft size={13} />
        <span>Back</span>
      </button>

      <div className="mb-6 text-center">
        <h1 className="mb-1 text-[34px] font-bold text-[#0C0E0D]">
          Welcome Back
        </h1>
        <p className="m-0 text-[16px] text-[#A1A1AA]">
          Enter your details to access your account.
        </p>
      </div>

      {serverError && (
        <div role="alert" className="mb-4 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
          <p className="m-0 text-[12px] text-[#DC2626]">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-[#000000]"
          >
            Email
          </label>
          <div className="relative">
            <IconPrefix icon={Mail} show={emailEmpty} />
            <input
              {...register("email", {
                validate: (v) =>
                  LoginSchema.shape.email.safeParse(v).success ||
                  "Invalid email address",
              })}
              id="email"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[16px] text-[#000000] outline-none transition-all placeholder:text-[#000000] ${
                errors.email
                  ? "border-[#E24B4A]"
                  : emailValid
                    ? "border-[#0F6E56]"
                    : "border-[#D1D5DB]"
              } ${emailEmpty ? "pl-[34px]" : "pl-[12px] pr-[12px]"}`}
            />
            {emailValid && (
              <span className="absolute right-[10px] top-1/2 flex -translate-y-1/2 text-[#0F6E56]">
                <CircleCheck size={14} />
              </span>
            )}
          </div>
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-[16px] font-medium text-[#111]"
          >
            Password
          </label>
          <div className="relative">
            <IconPrefix icon={Lock} show={passwordEmpty} />
            <input
              {...register("password", { required: "Password is required" })}
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[16px] text-[#111] outline-none transition-all placeholder:text-[#000000] ${
                errors.password ? "border-[#E24B4A]" : "border-[#D1D5DB]"
              } ${passwordEmpty ? "pl-[34px]" : "pl-[12px] pr-[40px]"}`}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute text-[#004C48] right-[10px] top-1/2 flex -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[18px]"
            >
              {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
            </button>
          </div>
          <FieldError id="password-error" message={errors.password?.message} />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-[6px] text-[14px] text-[#111]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-[12px] w-[12px] accent-[#111]"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-[14px] text-[#020303] no-underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-[8px] px-3 py-3 text-[14px] font-medium text-white transition-all ${
            isSubmitting
              ? "cursor-not-allowed bg-[#0F4F4A] opacity-60"
              : "cursor-pointer bg-[#0F4F4A]"
          }`}
        >
          {isSubmitting ? "Signing in..." : "Continue"}
        </button>
      </form>

      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      <p className="mt-4 text-center text-[18px] text-[#000000]">
        {"Don't Have an Account?"}{" "}
        <Link
          href="/register"
          className="font-semibold text-[#0F6E56] no-underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
