import { z } from 'zod'

// Enum
export const UserPlanSchema = z.enum(['free', 'pro', 'enterprise'])
export const UserProviderSchema = z.enum(['email', 'github', 'google'])

export const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    display_name: z.string().max(100).optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be at most 128 characters')
      .regex(/[A-Z]/, 'At least one uppercase letter')
      .regex(/[a-z]/, 'At least one lowercase letter')
      .regex(/[0-9]/, 'At least one digit'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Responses
export const AccessTokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().default('bearer'),
})

export const MessageResponseSchema = z.object({
  message: z.string(),
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  display_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  provider: UserProviderSchema,
  email_verified: z.boolean(),
  is_active: z.boolean(),
  plan: UserPlanSchema,
  github_username: z.string().nullable(),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be at most 128 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
       .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Inferred types
export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type AccessTokenResponse = z.infer<typeof AccessTokenResponseSchema>
export type MessageResponse = z.infer<typeof MessageResponseSchema>
export type User = z.infer<typeof UserSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
