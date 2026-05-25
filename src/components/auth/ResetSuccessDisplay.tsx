"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function ResetSuccessDisplay() {
  return (
    <div className="flex w-full max-w-[520px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">
      {/* Back Button */}
      <Link 
        href="/reset-password"
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Password reset</h1>
        <p className="text-xs md:text-sm text-[#667085]">Your password has been successfully reset, click below to login.</p>
      </div>
   
        <Link
          className="block text-center w-full py-2.5 bg-[#004D4D] hover:bg-[#003636] text-white rounded-lg text-sm transition-all shadow-sm"
          href="/login"
        >
          Log In
        </Link>
      
      <div className="mt-10 text-center">
        <p className="text-xs text-[#667085]">
          Need help? <button className="font-bold text-[#101828] hover:underline">Contact support</button>
        </p>
      </div>
    </div>
  );
}