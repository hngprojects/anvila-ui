'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, type LucideIcon } from 'lucide-react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AxiosError } from 'axios'
import { LoginSchema, type LoginInput } from '../schemas/auth'
import { useAuth } from '../hooks/useAuth'
import { AuthOAuthButtons } from './authOAthButtons'
import { LuEyeClosed } from "react-icons/lu";

// Prefix icon — shown only when field is empty, disappears on typing
const IconPrefix = ({ icon: Icon, show }: { icon: LucideIcon; show: boolean }) =>
  show ? (
    <span style={{
      position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
      color: '#9CA3AF', display: 'flex', alignItems: 'center', pointerEvents: 'none',
    }}>
      <Icon size={15} />
    </span>
  ) : null



export const AuthLoginForm = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [remember, setRemember] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) })

  const AnvilaLogo = () => (
  <div className=" flex items-center justify-center gap-2">
    
    {/* Logo container */}
    <div className="flex h-[35.97px] w-[35.97px] items-center justify-center rounded-full bg-[#005F5A] shadow-sm">
      <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="44" rx="22" fill="#005F5A"/>
              <path d="M25.5 17.5C25.5 19.433 23.933 21 22 21C20.067 21 18.5 19.433 18.5 17.5C18.5 15.567 20.067 14 22 14C23.933 14 25.5 15.567 25.5 17.5Z" fill="#F6F7F7"/>
              <path d="M28 26.5C28 28.433 25.3137 30 22 30C18.6863 30 16 28.433 16 26.5C16 24.567 18.6863 23 22 23C25.3137 23 28 24.567 28 26.5Z" fill="#F6F7F7"/>
              <path d="M17.122 15C17.2995 15 17.4728 15.0174 17.6401 15.0506C17.2325 15.7745 17 16.6101 17 17.5C17 18.3683 17.2213 19.1848 17.6106 19.8964C17.4524 19.9258 17.2891 19.9413 17.122 19.941
              <path d="M15.4473 28.986C14.8794 28.3071 14.5 27.474 14.5 26.5C14.5 25.5558 14.8566 24.744 15.3958 24.0767C13.4911 24.2245 12 25.2662 12 26.5294C12 27.8044 13.5173 28.8538 15.4473 28.986
              <path d="M26.9999 17.5C26.9999 18.3683 26.7786 19.1848 26.3893 19.8964C26.5475 19.9258 26.7108 19.9413 26.8779 19.9413C28.2923 19.9413 29.4389 18.8351 29.4389 17.4706C29.4389 16.1061 28.
              <path d="M28.5526 28.986C30.4826 28.8538 31.9999 27.8044 31.9999 26.5294C31.9999 25.2662 30.5088 24.2245 28.6041 24.0767C29.1433 24.744 29.4999 25.5558 29.4999 26.5C29.4999 27.474 29.120
            </svg>
    </div>

  </div>
)

  const emailValue = watch('email', '')
  const passwordValue = watch('password', '')

  const emailEmpty = !emailValue || emailValue.length === 0
  const passwordEmpty = !passwordValue || passwordValue.length === 0
  const emailValid = !errors.email && emailValue && emailValue.length > 0

  const onSubmit = async (data: LoginInput) => {
    setServerError(null)
    try {
      await login(data)
      router.replace('/generator')
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const status = err.response?.status
        const detail = err.response?.data?.detail ?? ''
        const message = err.response?.data?.message ?? ''
        const lower = (detail + message).toLowerCase()

        if (status === 403 || lower.includes('verify') || lower.includes('confirmed')) {
          let sentEmail = ''
          try { sentEmail = JSON.parse(err.config?.data ?? '{}').email ?? '' } catch {}
          router.push(`/confirm-email?email=${encodeURIComponent(sentEmail)}`)
          return
        }
        if (lower.includes('password') || lower.includes('invalid') || lower.includes('credentials')) {
          setServerError('Invalid email or password')
          return
        }
        if (lower.includes('not found') || lower.includes('no user') || lower.includes('does not exist')) {
          setServerError('Email does not exist.')
          return
        }
      }
      setServerError('Something went wrong. Please try again.')
    }
  }


 return (
 <div className="flex w-full max-w-[520px] flex-col rounded-xl border border-[#E6E6E6] bg-[#F6F7F7] p-6 sm:p-8">


      {/* Logo — mobile only */}
      <div className="hidden max-[700px]:flex justify-center">
        <AnvilaLogo />
      </div>
      
    {/* Back */}
        <button
        type="button"
        onClick={() => router.back()}
        className="hidden cursor-pointer items-center gap-1 self-start border-0 bg-transparent px-0 pb-2 pt-3 text-[16px] font-medium text-[#111] md:flex"
      >
        <ArrowLeft size={13} />
        <span>Back</span>
      </button>

    {/* Heading */}
    <div className="mb-6 text-center">
      <h1 className="mb-1 text-[34px] font-bold text-[#0C0E0D]">
        Welcome Back
      </h1>

      <p className="m-0 text-[16px] text-[#A1A1AA]">
        Enter your details to access your account.
      </p>
    </div>

    {/* Server error */}
    {serverError && (
      <div className="mb-4 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
        <p className="m-0 text-[12px] text-[#DC2626]">
          {serverError}
        </p>
      </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[16px] font-medium text-[#000000]">
          Email
        </label>

        <div className="relative">
          <IconPrefix icon={Mail} show={emailEmpty} />

          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            aria-invalid={!!errors.email}
            {...register('email')}
            className={`w-full rounded-[8px] border bg-[#F6F7F7]  border-[#B1B5B4] py-[11px] text-[16px] text-[#000000] outline-none transition-all placeholder:text[#000000] ${
              errors.email
                ? 'border-[#E24B4A]'
                : emailValid
                ? 'border-[#0F6E56]'
                : 'border-[#D1D5DB]'
            } ${emailEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[12px]'}`}
          />

          {emailValid && (
            <span className="absolute right-[10px] top-1/2 flex -translate-y-1/2 text-[#0F6E56]">
              <FaRegCircleCheck size={14} />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="m-0 text-[11px] text-[#DC2626]">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-[16px] font-medium text-[#111]">
          Password
        </label>

        <div className="relative">
          <IconPrefix icon={Lock} show={passwordEmpty} />

          <input
            id="password"
            type={showPw ? 'text' : 'password'}
            placeholder="Enter password"
            aria-invalid={!!errors.password}
            {...register('password')}
            className={`w-full rounded-[8px] border bg-[#F6F7F7]  border-[#B1B5B4] py-[11px] text-[16px] text-[#111] outline-none transition-all placeholder:text[#000000]  ${
              errors.password ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
            } ${passwordEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[40px]'}`}
          />

          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="absolute text-[#004C48] right-[10px] top-1/2 flex -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[18px]"
          >
            {showPw ? <Eye size={15} /> : <LuEyeClosed size={15} /> }
          </button>
        </div>

        {errors.password && (
          <p className="m-0 text-[11px] text-[#DC2626]">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember me + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-[6px] text-[14px] text-[#111]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-[12px] w-[12px] accent-[#111]"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-[14px] text-[#020303] no-underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-[8px] px-3 py-3 text-[14px] font-medium text-white transition-all ${
          isSubmitting
            ? 'cursor-not-allowed bg-[#0F4F4A] opacity-60'
            : 'cursor-pointer bg-[#0F4F4A]'
        }`}
      >
        {isSubmitting ? 'Signing in...' : 'Continue'}
      </button>
    </form>

    <div className="mt-4">
      <AuthOAuthButtons />
    </div>

    <p className="mt-4 text-center text-[18px] text-[#000000]">
      {"Don't Have an Account?"}{' '}
      <Link
        href="/register"
        className="font-semibold text-[#0F6E56] no-underline"
      >
        Sign Up
      </Link>
    </p>
  </div>
)
}

