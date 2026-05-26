"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Mail, ArrowLeft, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo, IconPrefix } from "@/components/icons";
import { authApi } from "@/lib/auth/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const email = useWatch({ control, name: "email" }) ?? "";
  const emailEmpty = email.length === 0;
  const emailValid = !errors.email && email.length > 0;

  const handleFormSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setApiError(null);

    const formattedEmail = values.email.trim();
    const result = await authApi.forgotPassword({ email: formattedEmail });

    if (result.ok) {
      router.push(
        `/forgot-password/check-mail?email=${encodeURIComponent(formattedEmail)}`
      );
    } else {
      setApiError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
      {/* Logo — mobile only */}
      <div className="hidden max-[700px]:flex justify-center">
        <Logo />
      </div>

      {/* Back button */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => router.back()}
        className="hidden cursor-pointer items-center gap-1 self-start px-0 pb-2 pt-3 text-[16px] font-medium text-[#111] md:flex hover:bg-transparent"
      >
        <ArrowLeft size={13} />
        <span>Back</span>
      </Button>

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-[34px] font-bold text-[#0C0E0D]">
          Forgot Password?
        </h1>
        <p className="m-0 text-[16px] text-[#A1A1AA]">
          Enter your email to receive a reset link.
        </p>
      </div>

      {/* Server / API error */}
      {apiError && (
        <div className="mb-4 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
          <p className="m-0 text-[12px] text-[#DC2626]">{apiError}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-[#000000]"
          >
            Email
          </label>
          <div className="relative">
            <IconPrefix icon={Mail} show={emailEmpty} />
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] py-[11px] text-[16px] text-[#000000] outline-none transition-all placeholder:text-[#000000] shadow-none focus-visible:ring-0 ${
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
          {errors.email && (
            <p className="m-0 text-[11px] text-[#DC2626]">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-[8px] px-3 py-3 text-[14px] font-medium text-white transition-all ${
            isLoading
              ? "cursor-not-allowed bg-[#0F4F4A] opacity-60"
              : "cursor-pointer bg-[#0F4F4A] hover:bg-[#0a3835]"
          }`}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-4 text-center text-[18px] text-[#000000]">
        {"Remember your password?"}{" "}
        <Link
          href="/login"
          className="font-semibold text-[#0F6E56] no-underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}