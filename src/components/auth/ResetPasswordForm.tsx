"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function SetNewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      {/* Back Button */}
      <Link 
        href="/auth/forgot-password/check-mail"
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Set a  new Password</h1>
        <p className="text-xs md:text-sm text-[#667085]">Choose a strong password for your account</p>
      </div>

      <form className="space-y-3 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
        
        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Password</label>
          <div className="relative">
            {/* Left Icon: Lock */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-[#98A2B3]" />
            </div>
            
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-3 bg-white border border-[#D0D5DD] rounded-xl text-sm focus:ring-2 focus:ring-[#004D4D]/10 focus:border-[#004D4D] outline-none transition-all"
            />

            {/* Right Icon: Toggle visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#98A2B3] hover:text-[#667085]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-3 bg-white border border-[#D0D5DD] rounded-xl text-sm focus:ring-2 focus:ring-[#004D4D]/10 focus:border-[#004D4D] outline-none transition-all"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#98A2B3] hover:text-[#667085]"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Link
          type="submit"
          className="block text-center w-full py-3.5 bg-[#004D4D] hover:bg-[#003636] text-white rounded-xl font-semibold text-sm transition-all shadow-sm mt-2"
          href="/auth/reset-password/success"
        >
          Continue
        </Link>
      </form>
    </div>
  );
}