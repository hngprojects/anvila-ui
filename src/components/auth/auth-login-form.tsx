"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft, Eye, EyeClosed, Mail, Lock, CircleCheck } from "lucide-react";
import { LoginSchema, type LoginInput } from "../schemas/auth";
import { AuthOAuthButtons } from "./auth-oauth-buttons";
import { Logo } from "@/components/icons";
import { IconPrefix } from "@/components/icons";
import { useAuth } from "@/context/auth";

export const AuthLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { setUser } = useAuth();

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
      router.replace(searchParams.get("next") ?? "/generator");
    } catch {
      setServerError("Network error. Please check your connection.");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-1";

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
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-[28px] font-semibold tracking-tight text-zinc-900">Welcome back</h1>
        <p className="text-sm text-zinc-500">Enter your details to access your account.</p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-medium text-red-600">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
          <div className="relative">
            <IconPrefix icon={Mail} show={emailEmpty} />
            <input
              {...register("email", {
                validate: (v) =>
                  LoginSchema.shape.email.safeParse(v).success || "Invalid email address",
              })}
              id="email"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              className={`${inputBase} ${emailEmpty ? "pl-9" : "pl-3 pr-9"} ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : emailValid
                  ? "border-teal-brand focus:ring-teal-brand/20"
                  : "border-zinc-200 focus:ring-teal-brand/20"
              }`}
            />
            {emailValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-brand">
                <CircleCheck size={15} />
              </span>
            )}
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
          <div className="relative">
            <IconPrefix icon={Lock} show={passwordEmpty} />
            <input
              {...register("password", { required: "Password is required" })}
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              className={`${inputBase} ${passwordEmpty ? "pl-9" : "pl-3 pr-10"} ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-zinc-200 focus:ring-teal-brand/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent text-zinc-400 hover:text-zinc-600"
            >
              {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 accent-teal-brand"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-teal-brand transition-opacity hover:opacity-70">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-1 flex h-11 w-full items-center justify-center rounded-xl border-none text-sm font-semibold text-white transition-opacity ${
            isSubmitting ? "cursor-not-allowed bg-teal-brand opacity-60" : "cursor-pointer bg-teal-brand hover:opacity-85"
          }`}
        >
          {isSubmitting ? "Signing in…" : "Continue"}
        </button>
      </form>

      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      <p className="mt-5 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-teal-brand transition-opacity hover:opacity-70">
          Sign up
        </Link>
      </p>
    </div>
  );
};
