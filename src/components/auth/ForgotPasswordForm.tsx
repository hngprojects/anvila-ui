"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    router.push(`/auth/forgot-password/check-mail?email=${encodeURIComponent(values.email.trim())}`);
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      {/* Back Link Component */}
      <Link 
        href="/auth/login" 
        className="hidden md:flex items-center gap-1 text-sm text-[#667085] mb-6 hover:text-black transition-colors"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#101828] md:mb-2 tracking-tight">Forgot Password?</h1>
        <p className="text-xs md:text-sm text-[#667085]">Enter your details to receive a reset link</p>
      </div>

      <form className="space-y-3 md:space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="space-y-1.5">
          <Label htmlFor="email-input" className="text-xs font-semibold text-[#344054]">
            Email
          </Label>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] z-10" />
            
            <Input
              id="email-input"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              className="pl-10 pr-4 w-full"
              {...register("email")}
            />
          </div>
          
          {errors.email && (
            <p className="text-[10px] text-destructive font-medium pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 bg-[#004D4D] hover:bg-[#003636] text-white font-semibold shadow-sm transition-all"
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}