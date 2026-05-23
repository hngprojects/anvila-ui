import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_KEY = "at";
const REFRESH_TOKEN_KEY = "rt";

const ACCESS_MAX_AGE = 60 * 15;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7;

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthCookies(
  res: NextResponse,
  tokens: { access_token: string; refresh_token?: string },
) {
  res.cookies.set(ACCESS_TOKEN_KEY, tokens.access_token, {
    ...COOKIE_BASE,
    maxAge: ACCESS_MAX_AGE,
  });
  if (tokens.refresh_token) {
    res.cookies.set(REFRESH_TOKEN_KEY, tokens.refresh_token, {
      ...COOKIE_BASE,
      maxAge: REFRESH_MAX_AGE,
    });
  }
  return res;
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.set(ACCESS_TOKEN_KEY, "", { ...COOKIE_BASE, maxAge: 0 });
  res.cookies.set(REFRESH_TOKEN_KEY, "", { ...COOKIE_BASE, maxAge: 0 });
  return res;
}

export function getTokensFromRequest(req: {
  cookies: { get: (k: string) => { value: string } | undefined };
}) {
  return {
    accessToken: req.cookies.get(ACCESS_TOKEN_KEY)?.value ?? null,
    refreshToken: req.cookies.get(REFRESH_TOKEN_KEY)?.value ?? null,
  };
}

export async function getServerTokens() {
  const jar = await cookies();
  return {
    accessToken: jar.get(ACCESS_TOKEN_KEY)?.value ?? null,
    refreshToken: jar.get(REFRESH_TOKEN_KEY)?.value ?? null,
  };
}
