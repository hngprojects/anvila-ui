'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeClosed, ArrowLeft, Check, X, User, Mail, Lock, type LucideIcon } from 'lucide-react'
import { AxiosError } from 'axios'
import { RegisterSchema, type RegisterInput } from '../schemas/auth'
import { useAuth } from '../hooks/useAuth'
import { parseApiError } from '../lib/api/error'
import { AuthOAuthButtons } from './authOAthButtons'

// ---------- helpers ----------

const IconPrefix = ({ icon: Icon, show }: { icon: LucideIcon; show: boolean }) =>
  show ? (
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
      <Icon size={15} />
    </span>
  ) : null

const AnvilaLogo = () => (
  <div className="flex items-center justify-center gap-2">
    <div className="flex h-[35.97px] w-[35.97px] items-center justify-center ">
      <Image src="/images/Logo.png" alt="Logo" width={200} height={200} />
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
      : <X size={9} color="#E24B4A" strokeWidth={3} />}
  </div>
)

type FieldErrors = Partial<Record<keyof RegisterInput, string>>

function validate(data: RegisterInput): FieldErrors {
  const result = RegisterSchema.safeParse(data)
  if (result.success) return {}
  const errs: FieldErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof RegisterInput
    if (!errs[key]) errs[key] = issue.message
  }
  return errs
}

// ---------- component ----------

export const AuthSignUpForm = () => {
  const router = useRouter()
  const { register: registerUser } = useAuth()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwTouched, setPwTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const [errors, setErrors] = useState<FieldErrors>({})
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nameEmpty = displayName.length === 0
  const emailEmpty = email.length === 0
  const pwEmpty = password.length === 0
  const cpwEmpty = confirmPassword.length === 0

  const score = PW_RULES.filter((r) => r.test(password)).length
  const allPassing = score === 4
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][score]
  const strengthColor =
    score <= 1 ? '#E24B4A' : score === 2 ? '#EF9F27' : score === 3 ? '#EF9F27' : '#0F6E56'
  const showPwRules = pwTouched && password.length > 0 && !submitted

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreed) {
      setBannerError('You must agree to the Terms & Conditions.')
      return
    }

    const data: RegisterInput = {
      display_name: displayName,
      email,
      password,
      confirmPassword,
    }

    const fieldErrors = validate(data)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setBannerError('Please fix the errors below.')
      return
    }

    setErrors({})
    setBannerError(null)
    setSubmitted(true)
    setIsSubmitting(true)

    try {
      await registerUser(data)
      router.replace(`/confirm-email?email=${encodeURIComponent(data.email)}`)
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 422) {
        const detail = err.response.data?.detail
        if (Array.isArray(detail)) {
          const fieldErrs: FieldErrors = {}
          detail.forEach((d: { loc: string[]; msg: string }) => {
            const field = d.loc.at(-1) as keyof RegisterInput | undefined
            if (field && !fieldErrs[field]) {
              fieldErrs[field] = d.msg.replace(/^Value error,\s*/i, '')
            }
          })
          setErrors(fieldErrs)
          setBannerError('Please fix the errors below.')
          return
        }
      }
      setBannerError(parseApiError(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex w-full max-w-[520px] flex-col rounded-2xl border-[#E6E6E6] bg-[#F6F7F7] px-6 py-6 sm:px-8 sm:py-8">

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
          <h1 className="mb-1 text-[32px] font-bold text-[#0C0E0D]">Create account</h1>
          <p className="m-0 text-[16px] text-[#A1A1AA]">Enter your details to create an account</p>
        </div>

        {bannerError && (
          <div className="mb-3 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
            <p className="m-0 text-[12px] text-[#DC2626]">{bannerError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-[#111928]">Full name</label>
            <div className="relative">
              <IconPrefix icon={User} show={nameEmpty} />
              <input
                id="display_name"
                type="text"
                placeholder="Enter full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                  errors.display_name ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
                } ${nameEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[12px]'}`}
              />
            </div>
            {errors.display_name && (
              <p className="m-0 text-[11px] text-[#DC2626]">{errors.display_name}</p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                  errors.email ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
                } ${emailEmpty ? 'pl-[34px]' : 'pl-[12px]'}`}
              />
            </div>
            {errors.email && (
              <p className="m-0 text-[11px] text-[#DC2626]">{errors.email}</p>
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
                value={password}
                onFocus={() => setPwTouched(true)}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (submitted) setSubmitted(false)
                }}
                className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none transition-all ${
                  errors.password ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
                } ${pwEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[80px]'}`}
              />
              <div className="absolute right-[10px] top-1/2 flex -translate-y-1/2 items-center gap-[6px]">
                {showPw && !pwEmpty && (
                  <div className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] ${
                    allPassing ? 'border-[#0F6E56] bg-[#0F6E56]' : 'border-[#E24B4A]'
                  }`}>
                    {allPassing ? <Check size={10} color="#fff" /> : <X size={10} color="#E24B4A" />}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="border-0 bg-transparent text-[#9CA3AF]"
                >
                  {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
                </button>
              </div>
            </div>

            {showPwRules && (
              <div className="mt-1 flex flex-col gap-[6px]">
                <div className="flex items-center gap-[6px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-[4px] flex-1 rounded-[2px]"
                      style={{ background: score >= i ? strengthColor : '#E5E7EB' }}
                    />
                  ))}
                  <span className="min-w-[40px] text-right text-[11px]" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
                {PW_RULES.map((rule) => {
                  const passing = rule.test(password)
                  return (
                    <div key={rule.label} className="flex items-center gap-[6px]">
                      <RoundTick passing={passing} />
                      <span className="text-[12px]" style={{ color: passing ? '#0F6E56' : '#E24B4A' }}>
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
            <label className="text-[16px] font-medium text-[#111]">Confirm password</label>
            <div className="relative">
              <IconPrefix icon={Lock} show={cpwEmpty} />
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[14px] text-[#111] outline-none ${
                  errors.confirmPassword ? 'border-[#E24B4A]' : 'border-[#D1D5DB]'
                } ${cpwEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[40px]'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-[10px] top-1/2 -translate-y-1/2 border-0 bg-transparent text-[#9CA3AF]"
              >
                {showConfirm ? <Eye size={15} /> : <EyeClosed size={15} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="m-0 text-[11px] text-[#DC2626]">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-center gap-2 text-[12px] font-normal text-[#111]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-[14px] w-[14px] accent-[#111]"
            />
            <span className="text-[12px]">
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
              isSubmitting ? 'cursor-not-allowed bg-[#0F4F4A] opacity-60' : 'bg-[#0F4F4A]'
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
