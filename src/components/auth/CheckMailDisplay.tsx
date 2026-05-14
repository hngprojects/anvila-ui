"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function CheckMailDisplay() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      {/* Back Button */}
      <button className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Check your mail</h1>
        <p className="text-xs md:text-sm text-[#667085]">We sent a password re-set link to jo******gmail.com</p>
      </div>
   
        <Link
          type="submit"
          className="block text-center w-full py-2.5 bg-[#004D4D] hover:bg-[#003636] text-white rounded-lg text-sm transition-all shadow-sm"
          href="/auth/reset-password"
        >
          Resend Reset Link
        </Link>
      
      <div className="mt-10 text-center">
        <p className="text-xs text-[#667085]">
          Need help? <button className="font-bold text-[#101828] hover:underline">Contact support</button>
        </p>
      </div>
    </div>
  );
}