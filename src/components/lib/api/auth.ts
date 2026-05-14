import { publicClient, authClient } from '@/components/lib/axios'
import {
  AccessTokenResponseSchema,
  MessageResponseSchema,
  UserSchema,
  LoginInput,
  RegisterInput,
  AccessTokenResponse,
  MessageResponse,
  User,
} from '@/components/schemas/auth'

// ---------------------------------------------------------------------------
// Register
//
// Usage:
//   const { register } = useAuth();
//   await register({ email: "user@example.com", password: "secret123" });
//   // Returns { message: "Account created. Check your email..." }
//   // Redirect to a "check your inbox" page — user is NOT logged in yet
// ---------------------------------------------------------------------------
export async function register(data: RegisterInput): Promise<MessageResponse> {
  const res = await publicClient.post('/auth/register', data)
  return MessageResponseSchema.parse(res.data)
}

// ---------------------------------------------------------------------------
// Login — backend sets refresh_token HttpOnly cookie,
// return the access token for the store.
//
// Don't call this directly in components — use useAuth().login() instead,
// which also fetches /me and populates the user in the store.
//
// Usage (via hook):
//   const { login } = useAuth();
//   const user = await login({ email: "user@example.com", password: "secret123" });
//   router.push("/dashboard");
// ---------------------------------------------------------------------------
export async function login(data: LoginInput): Promise<AccessTokenResponse> {
  const res = await publicClient.post('/auth/login', data)
  return AccessTokenResponseSchema.parse(res.data)
}

// ---------------------------------------------------------------------------
// Refresh — backend rotates the refresh_token cookie and returns a new access
// token. Called automatically by the axios interceptor on 401 — you should
// rarely need to call this directly.
//
// The one place you do call it directly is in useAuth's hydration effect to
// restore the session after a hard reload.
// ---------------------------------------------------------------------------
export async function refresh(): Promise<AccessTokenResponse> {
  const res = await publicClient.post('/auth/refresh')
  return AccessTokenResponseSchema.parse(res.data)
}

// ---------------------------------------------------------------------------
// Logout — revokes the refresh token on the backend and clears the cookie.
//
// Don't call this directly — use useAuth().logout() which also clears the
// Zustand store regardless of whether the request succeeds.
//
// Usage (via hook):
//   const { logout } = useAuth();
//   await logout();
//   router.push("/login");
// ---------------------------------------------------------------------------
export async function logout(): Promise<MessageResponse> {
  const res = await publicClient.post('/auth/logout')
  return MessageResponseSchema.parse(res.data)
}

// ---------------------------------------------------------------------------
// Me — fetch the current authenticated user.
//
// Called automatically after login and after a silent refresh on mount.
// You can call it directly if you need to re-fetch fresh user data
// (e.g. after a profile update).
//
// Usage:
//   const user = await getMe();
// ---------------------------------------------------------------------------
export async function getMe(): Promise<User> {
  const res = await authClient.get('/auth/me')
  return UserSchema.parse(res.data)
}

// ---------------------------------------------------------------------------
// Verify email — call this on the /verify-email callback page.
// The token comes from the URL search param the backend put in the email link.
//
// Usage (in your verify-email page):
//   const token = searchParams.get("token");
//   const { message } = await verifyEmail(token);
//
// app/verify-email/page.tsx example:
//   const result = await verifyEmail(token);
//   // show result.message to the user, then redirect to /login
// ---------------------------------------------------------------------------
export async function verifyEmail(token: string): Promise<MessageResponse> {
  const res = await publicClient.get('/auth/verify-email', {
    params: { token },
  })
  return MessageResponseSchema.parse(res.data)
}
