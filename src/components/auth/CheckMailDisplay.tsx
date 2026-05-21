"use client";
import React, { useState, useEffect, Suspense } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { maskEmail } from "@/lib/utils";
import { Logo } from "@/components/icons";

const RESEND_TIMER_DURATION = 60;

function CheckMailContent() {
  const [isFinished, setIsFinished] = useState(false);
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email") || "";
  const router = useRouter();

  useEffect(() => {
    if (isFinished) return;
    const timer = setTimeout(() => setIsFinished(true), RESEND_TIMER_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [isFinished]);

  const handleResendClick = () => {
    if (!isFinished) return;
    setIsFinished(false);
    router.push("/reset-password");
  };

  return (
    <div className="flex w-full max-w-[580px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
      <Link
        href="/forgot-password"
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="flex flex-col items-center mb-6">
        <Logo />
        <p className="text-xs font-semibold tracking-widest uppercase text-[#337F7B] mt-4 mb-4">
          Confirm Email
        </p>
        <div className="w-full h-px bg-[#CBCECD]" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] mb-2">
          Check your mail
        </h1>
        <p className="text-xs md:text-sm text-[#667085]">
          We sent a password reset link to{" "}
          <span className="font-medium text-[#101828]">
            {maskEmail(userEmail)}
          </span>
        </p>
      </div>

      <div>
        <p className="text-sm text-[#667085] text-center mb-3">
          Didn&apos;t receive the link?
        </p>
        <button
          type="button"
          disabled={!isFinished}
          onClick={handleResendClick}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all text-center ${
            isFinished
              ? "bg-[#005F5A] hover:bg-[#004D4D] text-white shadow-sm cursor-pointer"
              : "bg-[#667085] text-[#F2F4F7] cursor-not-allowed"
          }`}
        >
          Resend Link
        </button>
      </div>
    </div>
  );
}

export default function CheckMailDisplay() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-50">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <CheckMailContent />
    </Suspense>
  );
}
