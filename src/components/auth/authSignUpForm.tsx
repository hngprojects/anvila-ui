'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowLeft, Check, X, User, Mail, Lock , type LucideIcon} from 'lucide-react'
import { AxiosError } from 'axios'
import { RegisterSchema,type RegisterInput } from '../schemas/auth'
import { useAuth } from '../hooks/useAuth'
import { parseApiError } from '../lib/api/error'
import { AuthOAuthButtons } from './authOAthButtons'
import { LuEyeClosed } from "react-icons/lu";

// Prefix icon — shown only when field is empty
const IconPrefix = ({ icon: Icon, show }: { icon: LucideIcon; show: boolean }) =>
  show ? (
    <span style={{
      position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
      color: '#9CA3AF', display: 'flex', alignItems: 'center', pointerEvents: 'none',
    }}>
      <Icon size={15} />
    </span>
  ) : null

const AnvilaLogo = () => (
  <div className=" flex items-center justify-center gap-2">
    
    {/* Logo container */}
    <div className="flex h-[35.97px] w-[35.97px] items-center justify-center rounded-full bg-[#005F5A] shadow-sm">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="22" fill="#005F5A"/>
    <path d="M25.5 17.5C25.5 19.433 23.933 21 22 21C20.067 21 18.5 19.433 18.5 17.5C18.5 15.567 20.067 14 22 14C23.933 14 25.5 15.567 25.5 17.5Z" fill="#F6F7F7"/>
    <path d="M28 26.5C28 28.433 25.3137 30 22 30C18.6863 30 16 28.433 16 26.5C16 24.567 18.6863 23 22 23C25.3137 23 28 24.567 28 26.5Z" fill="#F6F7F7"/>
    <path d="M17.122 15C17.2995 15 17.4728 15.0174 17.6401 15.0506C17.2325 15.7745 17 16.6101 17 17.5C17 18.3683 17.2213 19.1848 17.6106 19.8964C17.4524 19.9258 17.2891 19.9413 17.122 19.9413C15.7076 
    <path d="M15.4473 28.986C14.8794 28.3071 14.5 27.474 14.5 26.5C14.5 25.5558 14.8566 24.744 15.3958 24.0767C13.4911 24.2245 12 25.2662 12 26.5294C12 27.8044 13.5173 28.8538 15.4473 28.986Z" fill="#
    <path d="M26.9999 17.5C26.9999 18.3683 26.7786 19.1848 26.3893 19.8964C26.5475 19.9258 26.7108 19.9413 26.8779 19.9413C28.2923 19.9413 29.4389 18.8351 29.4389 17.4706C29.4389 16.1061 28.2923 15 26
    <path d="M28.5526 28.986C30.4826 28.8538 31.9999 27.8044 31.9999 26.5294C31.9999 25.2662 30.5088 24.2245 28.6041 24.0767C29.1433 24.744 29.4999 25.5558 29.4999 26.5C29.4999 27.474 29.1205 28.3071 
  </svg>
    </div>

  </div>
)

const PW_RULES = [
  { label: 'At least 1 uppercase', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'At least 1 number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'At least 1 special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
]

const RoundTick = ({ passing }: { passing: boolean }) => (
  <div style={{
    width: '16px', height: '16px', borderRadius: '50%',
    border: `1.5px solid ${passing ? '#0F6E56' : '#E24B4A'}`,
    background: passing ? '#0F6E56' : 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.2s ease',
  }}>
    {passing
      ? <Check size={9} color="#fff" strokeWidth={3} />
      : <X size={9} color="#E24B4A" strokeWidth={3} />
    }
  </div>
)

export const AuthSignUpForm = () => {
  const router = useRouter()
  const { register: registerUser } = useAuth()

  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwValue, setPwValue] = useState('')
  const [pwTouched, setPwTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [agreed, setAgreed] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  })

  const emailValue = watch('email', '')
  const nameValue = watch('display_name', '')
  const confirmValue = watch('confirmPassword', '')

  const nameEmpty = !nameValue || nameValue.length === 0
  const emailEmpty = !emailValue || emailValue.length === 0
  const pwEmpty = pwValue.length === 0
  const cpwEmpty = !confirmValue || confirmValue.length === 0

  const score = PW_RULES.filter((r) => r.test(pwValue)).length
  const allPassing = score === 4
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][score]
  const strengthColor = score <= 1 ? '#E24B4A' : score === 2 ? '#EF9F27' : score === 3 ? '#EF9F27' : '#0F6E56'
  const showPwRules = pwTouched && pwValue.length > 0 && !submitted

  const onSubmit = async (data: RegisterInput) => {
    if (!agreed) { setBannerError('You must agree to the Terms & Conditions.'); return }
    setBannerError(null)
    setSubmitted(true)
    try {
      await registerUser(data)
      router.replace(`/confirm-email?email=${encodeURIComponent(data.email)}`)
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 422) {
        const detail = err.response.data?.detail
        if (Array.isArray(detail)) {
          detail.forEach((d: { loc: string[]; msg: string }) => {
            const field = d.loc.at(-1) as keyof RegisterInput | undefined
            if (field) setError(field, { message: d.msg.replace(/^Value error,\s*/i, '') })
          })
          setBannerError('Please fix the errors below.')
          return
        }
      }
      setBannerError(parseApiError(err))
    }
  }


  return (
  <>
   <div className="flex w-full max-w-[520px] flex-col rounded-2xl  border-[#E6E6E6] bg-[#F6F7F7] px-6 py-6 sm:px-8 sm:py-8">

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

      {/* Header */}
      <div className="mb-5 mt-1 text-center">
        <h1 className="mb-1 text-[32px] font-bold text-[#0C0E0D]">
          Create account
        </h1>
        <p className="m-0 text-[16px] text-[#A1A1AA]">
          Enter your details to create an account
        </p>
      </div>

      {bannerError && (
        <div className="mb-3 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
          <p className="m-0 text-[12px] text-[#DC2626]">{bannerError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[14px]">

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[16px] font-medium text-[#111928]">Full name</label>

          <div className="relative">
            <IconPrefix icon={User} show={nameEmpty} />
            <input
              id="display_name"
              type="text"
              placeholder="Enter full name"
              {...register('display_name')}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                errors.display_name ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
              } ${nameEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[12px]'}`}
            />
          </div>

          {errors.display_name && (
            <p className="m-0 text-[11px] text-[#DC2626]">
              {errors.display_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-[16px] font-medium text-[#111]">Email</label>

          <div className="relative">
            <IconPrefix icon={Mail} show={emailEmpty} />
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register('email')}
              className={`w-full rounded-[8px] border bg-[#F6F7F7]  border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                errors.email ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
              } ${emailEmpty ? 'pl-[34px]' : 'pl-[12px]'}`}
            />
          </div>

          {errors.email && (
            <p className="m-0 text-[11px] text-[#DC2626]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-[16px] font-medium text-[#111]">Password</label>

          <div className="relative">
            <IconPrefix icon={Lock} show={pwEmpty} />

            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Enter password"
              {...register('password', {
                onChange: (e) => {
                  setPwValue(e.target.value)
                  if (submitted) setSubmitted(false)
                },
              })}
              onFocus={() => setPwTouched(true)}
              className={`w-full rounded-[8px] border bg-[#F6F7F7]  border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                errors.password ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
              } ${pwEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[80px]'}`}
            />

            <div className="absolute right-[10px] top-1/2 flex -translate-y-1/2 items-center gap-[6px]">
              {showPw && !pwEmpty && (
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] ${
                    allPassing
                      ? 'border-[#0F6E56] bg-[#0F6E56]'
                      : 'border-[#E24B4A]'
                  }`}
                >
                  {allPassing ? (
                    <Check size={10} color="#fff" />
                  ) : (
                    <X size={10} color="#E24B4A" />
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="border-0 bg-transparent text-[#9CA3AF]"
              >
                {showPw ? <Eye size={15} /> : <LuEyeClosed size={15} />}
              </button>
            </div>
          </div>

          {/* password rules stays same */}
          {showPwRules && (
            <div className="mt-1 flex flex-col gap-[6px]">
              <div className="flex items-center gap-[6px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-[4px] flex-1 rounded-[2px]"
                    style={{
                      background: score >= i ? strengthColor : '#E5E7EB',
                    }}
                  />
                ))}

                <span
                  className="min-w-[40px] text-right text-[11px]"
                  style={{ color: strengthColor }}
                >
                  {strengthLabel}
                </span>
              </div>

              {PW_RULES.map((rule) => {
                const passing = rule.test(pwValue)
                return (
                  <div key={rule.label} className="flex items-center gap-[6px]">
                    <RoundTick passing={passing} />
                    <span
                      className="text-[12px]"
                      style={{
                        color: passing ? '#0F6E56' : '#E24B4A',
                      }}
                    >
                      {rule.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-[16px] font-medium text-[#111]">
            Confirm password
          </label>

          <div className="relative">
            <IconPrefix icon={Lock} show={cpwEmpty} />

            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className={`w-full rounded-[8px] border bg-[#F6F7F7]  border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none ${
                errors.confirmPassword
                  ? 'border-[#E24B4A]'
                  : 'border-[#D1D5DB]'
              } ${cpwEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[40px]'}`}
            />

            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-[10px] top-1/2 -translate-y-1/2 border-0 bg-transparent text-[#9CA3AF]"
            >
              {showConfirm ? <Eye size={15} /> : <LuEyeClosed size={15} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-center gap-2 text-[12px] font-normal text-[#111]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-[14px] w-[14px] accent-[#111]"
          />

          <span className='text-[12px]'>
            I agree to{' '}
            <Link href="/terms" className="text-[#0F6E56] text-[12px] underline">
              Terms & Conditions
            </Link>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-[8px] py-3 text-[14px] font-medium text-white ${
            isSubmitting
              ? 'cursor-not-allowed bg-[#0F4F4A] opacity-60'
              : 'bg-[#0F4F4A]'
          }`}
        >
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      <p className="mt-3 text-center text-[18px] text-[#111]">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#0F6E56]">
          Sign In
        </Link>
      </p>
    </div>
  </>
)
  
}
