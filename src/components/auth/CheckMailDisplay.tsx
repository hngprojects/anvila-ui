"use client";
import React, { useState, useEffect, Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function CheckMailContent() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email') || "";
  const router = useRouter();


  useEffect(() => {
  if (isFinished) return;
  
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      const newTime = prev - 1;
      if (newTime <= 0) {
        setIsFinished(true);
      }
      return newTime;
    });
  }, 1000);

  return () => clearInterval(timer);
  }, [isFinished]);
  
  const maskEmail = (email: string) => {
    if (!email) return "your email";
    const [name, domain] = email.split("@");
    return `${name.substring(0, 2)}****@${domain}`;
  };

  const handleResend = () => {
    // Reset timer logic
    setTimeLeft(60);
    setIsFinished(false);
  };

  const handleResendClick = () => {
  if (!isFinished) return;  
  handleResend();
  router.push("/auth/reset-password"); 
};

  return (
    <div className="w-full bg-white md:p-12 md:rounded-[32px] md:border md:border-[#F2F4F7] md:shadow-sm relative">
      {/* Back Button */}
      <Link 
        href="/auth/forgot-password"
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] mb-2">Check your mail</h1>
        <p className="text-xs md:text-sm text-[#667085]">
          We sent a password reset link to <span className="font-medium text-[#101828]">{maskEmail(userEmail)}</span>
        </p>
      </div>
   
      <div>
        <p className="text-sm text-[#667085] text-center mb-3">
         Didn&apos;t receive the link?
        </p>
        {/* Conditional Rendering for Link vs Disabled Button */}
      <button
        type="button"
        disabled={!isFinished}
        onClick={handleResendClick}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all text-center ${
          isFinished
            ? "bg-[#004D4D] hover:bg-[#003636] text-white shadow-sm cursor-pointer"
            : "bg-[#667085] text-[#F2F4F7] cursor-not-allowed"
        }`}
      >
        Resend Link
      </button>
      {!isFinished && (
          <p className="text-sm text-[#667085] text-center mt-3">{timeLeft}s</p>
      )}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-xs text-[#667085]">
          Need help? <button className="font-bold text-[#101828] hover:underline">Contact support</button>
        </p>
      </div>
    </div>
  );
}

export default function CheckMailDisplay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckMailContent />
    </Suspense>
  );
}