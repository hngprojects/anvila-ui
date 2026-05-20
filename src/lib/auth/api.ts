import { BACKEND_URL } from "@/lib/consts";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; status: number }

async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    })

    const json = await res.json()

    if (!res.ok) {
      return {
        ok: false,
        message: json?.detail ?? json?.message ?? 'Something went wrong',
        status: res.status,
      }
    }

    return { ok: true, data: json as T }
  } catch {
    return { ok: false, message: 'Network error — could not reach server', status: 503 }
  }
}

export interface FastApiAuthResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      email: string
      display_name: string
      email_verified: boolean
      is_active: boolean
      created_at: string
    }
    tokens: {
      access_token: string
      refresh_token: string
      token_type: string
    }
  }
}

export interface FastApiRegisterResponse {
  success: boolean
  message: string
  data?: { email?: string }
}

export interface FastApiOAuthUrlResponse {
  success: boolean
  data: { redirect_url: string }
}

export interface FastApiResendResponse {
  success: boolean
  message: string
}

//forgot password, reset password, similar response structure
export interface FastApiForgotResetPasswordResponse {
  success: boolean;
  message: string;
  data: null;
  meta: Record<string, any>;
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    apiFetch<FastApiAuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  register: (body: { display_name: string; email: string; password: string }) =>
    apiFetch<FastApiRegisterResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  exchangeOtt: (ott: string) =>
    apiFetch<FastApiAuthResponse>('/api/v1/auth/token/exchange', {
      method: 'POST',
      body: JSON.stringify({ ott }),
    }),

  refresh: (refresh_token: string) =>
    apiFetch<FastApiAuthResponse>('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token }),
    }),

  resendVerification: (email: string) =>
    apiFetch<FastApiResendResponse>('/api/v1/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  getOAuthUrl: (provider: 'google' | 'github') =>
    apiFetch<FastApiOAuthUrlResponse>(`/api/v1/auth/${provider}`),

  //forgot password, reset password
  forgotPassword: (body: { email: string }) =>
    apiFetch<FastApiForgotResetPasswordResponse>('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  resetPassword: (body: { token: string; new_password: string }) =>
    apiFetch<FastApiForgotResetPasswordResponse>('/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}
