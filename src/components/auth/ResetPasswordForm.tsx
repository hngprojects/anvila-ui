"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authApi } from "@/lib/auth/api";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function SetNewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  ;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      setApiError("Reset token missing. Please check your email and click the link again.");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    const result = await authApi.resetPassword({
      token: token,
      new_password: data.password.trim(),
    });

    if (result.ok) {
      router.push("/reset-password/success");
    } else {
      setApiError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
      <Link 
        href="forgot-password/check-mail"
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Set a new Password</h1>
        <p className="text-xs md:text-sm text-[#667085]">Choose a strong password for your account</p>
      </div>

      <form className="space-y-3 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Token Alert Guard Display */}
        {!token && (
          <div className="p-3 text-xs font-medium text-amber-700 bg-amber-50 rounded-xl border border-amber-200">
            Warning: Secure verification token not detected from link.
          </div>
        )}

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-[#98A2B3]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              disabled={isLoading || !token} 
              {...register("password")}
              placeholder="Enter password"
              className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm outline-none transition-all ${
                errors.password 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-[#D0D5DD] focus:ring-2 focus:ring-[#004D4D]/10 focus:border-[#004D4D]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#98A2B3] hover:text-[#667085]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 font-medium ml-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Confirm password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-[#98A2B3]" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              disabled={isLoading || !token}
              {...register("confirmPassword")}
              placeholder="Re-enter password"
              className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm outline-none transition-all ${
                errors.confirmPassword 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-[#D0D5DD] focus:ring-2 focus:ring-[#004D4D]/10 focus:border-[#004D4D]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#98A2B3] hover:text-[#667085]"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-red-500 font-medium ml-1">{errors.confirmPassword.message}</p>
          )}

          {apiError && (
            <p className="text-[11px] text-red-500 font-medium ml-1 mt-1">{apiError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !token}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#004D4D] hover:bg-[#003636] text-white rounded-xl font-semibold text-sm transition-all shadow-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Resetting Password...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </div>
  );
}