"use client";
import React from "react";
import { Mail, ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function ForgotPasswordForm() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      {/* Back Button */}
      <button className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Forgot Password?</h1>
        <p className="text-xs md:text-sm text-[#667085]">Enter your details to receive a reset link</p>
      </div>

      <form className="space-y-3 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#344054]">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full pl-10 pr-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm outline-none focus:border-[#004D4D] focus:ring-1 focus:ring-[#004D4D] transition-all"
            />
          </div>
        </div>

        <Link
          type="submit"
          className="block text-center w-full py-2.5 bg-[#004D4D] hover:bg-[#003636] text-white rounded-lg text-sm transition-all shadow-sm"
          href="/auth/forgot-password/check-mail"
        >
          Send Reset Link
        </Link>
      </form>

      <div className="mt-10 text-center">
        <p className="text-xs text-[#667085]">
          Need help? <button className="font-bold text-[#101828] hover:underline">Contact support</button>
        </p>
      </div>
    </div>
  );
}