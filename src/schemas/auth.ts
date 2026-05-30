import { z } from "zod";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LoginSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: "Please enter a valid email" }),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z
  .object({
    display_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .regex(emailRegex, { message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreed: z.boolean().refine((v) => v === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().regex(emailRegex, { message: "Please enter a valid email" }),
  display_name: z.string(),
  email_verified: z.boolean(),
  is_active: z.boolean(),
  created_at: z.string(),
  plan: z.string().optional(),
});

export const TokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
});

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    user: UserSchema,
    tokens: TokensSchema,
  }),
});

export const OttExchangeResponseSchema = AuthResponseSchema;

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type AuthUser = z.infer<typeof UserSchema>;
export type AuthTokens = z.infer<typeof TokensSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
