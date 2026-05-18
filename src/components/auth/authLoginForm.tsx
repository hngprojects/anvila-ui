'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Eye, EyeClosed, Mail, Lock, CircleCheck, type LucideIcon } from 'lucide-react'
import { AxiosError } from 'axios'
import { LoginSchema, type LoginInput } from '../schemas/auth'
import { useAuth } from '../hooks/useAuth'
import { AuthOAuthButtons } from './authOAthButtons'
import { Logo } from '@/components/icons'

// ---------- helpers ----------

const IconPrefix = ({ icon: Icon, show }: { icon: LucideIcon; show: boolean }) =>
  show ? (
    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
      <Icon size={15} />
    </span>
  ) : null

// ---------- component ----------

export const AuthLoginForm = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  })

  const email = watch('email')
  const password = watch('password')

  const emailEmpty = email.length === 0
  const passwordEmpty = password.length === 0
  const emailValid = !errors.email && LoginSchema.shape.email.safeParse(email).success

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
+          setServerError('Invalid email or password')
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
        <Logo />
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
        <h1 className="mb-1 text-[34px] font-bold text-[#0C0E0D]">Welcome Back</h1>
        <p className="m-0 text-[16px] text-[#A1A1AA]">
          Enter your details to access your account.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="mb-4 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
          <p className="m-0 text-[12px] text-[#DC2626]">{serverError}</p>
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
              {...register('email', {
                required: 'Email is required',
                validate: (v) => LoginSchema.shape.email.safeParse(v).success || 'Invalid email address',
              })}
              id="email"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[16px] text-[#000000] outline-none transition-all placeholder:text-[#000000] ${
                errors.email ? 'border-[#E24B4A]' : emailValid ? 'border-[#0F6E56]' : 'border-[#D1D5DB]'
              } ${emailEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[12px]'}`}
            />
            {emailValid && (
              <span className="absolute right-[10px] top-1/2 flex -translate-y-1/2 text-[#0F6E56]">
                <CircleCheck size={14} />
              </span>
            )}
          </div>
          {errors.email && (
            <p className="m-0 text-[11px] text-[#DC2626]">{errors.email.message}</p>
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
              {...register('password', { required: 'Password is required' })}
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              className={`w-full rounded-[8px] border bg-[#F6F7F7] border-[#B1B5B4] py-[11px] text-[16px] text-[#111] outline-none transition-all placeholder:text-[#000000] ${
                errors.password ? 'border-[#E24B4A]' : !passwordEmpty && !errors.password ? 'border-[#0F6E56]' : 'border-[#D1D5DB]'
              } ${passwordEmpty ? 'pl-[34px]' : 'pl-[12px] pr-[40px]'}`}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              className="absolute text-[#004C48] right-[10px] top-1/2 flex -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[18px]"
            >
              {showPw ? <Eye size={15} /> : <EyeClosed size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="m-0 text-[11px] text-[#DC2626]">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-[14px] text-[#020303] no-underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-[8px] px-3 py-3 text-[14px] font-medium text-white transition-all ${
            isSubmitting ? 'cursor-not-allowed bg-[#0F4F4A] opacity-60' : 'cursor-pointer bg-[#0F4F4A]'
          }`}
        >
          {isSubmitting ? 'Signing in...' : 'Continue'}
        </button>
      </form>

      {/* OR divider */}
      <div className="mt-4 flex items-center justify-center">
        <span className="text-[14px] font-bold text-[#111]">OR</span>
      </div>

      <div className="mt-3">
        <AuthOAuthButtons />
      </div>

      <p className="mt-4 text-center text-[18px] text-[#000000]">
        {"Don't Have an Account?"}{' '}
        <Link href="/register" className="font-semibold text-[#0F6E56] no-underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
