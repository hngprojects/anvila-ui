import { NextRequest, NextResponse } from "next/server";

import { BACKEND_URL } from "@/lib/consts";
import {
  clearAuthCookies,
  getTokensFromRequest,
  setAuthCookies,
} from "@/lib/auth/cookies";
import { authApi, extractAuthTokens, type AuthTokens } from "@/lib/auth/api";

type TokenPair = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthFetchResult = {
  res: Response | null;
  accessToken: string | null;
  tokens?: AuthTokens;
  refreshed: boolean;
};

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ message }, { status });
}

export function applyAuthCookies(
  res: NextResponse,
  result: Pick<AuthFetchResult, "tokens">,
) {
  if (result.tokens) setAuthCookies(res, result.tokens);
  return res;
}

export async function authFetch(
  req: NextRequest,
  path: string,
  init: RequestInit = {},
): Promise<AuthFetchResult> {
  const tokens = getTokensFromRequest(req);
  const first = await fetchWithAccess(tokens.accessToken, path, init);

  if (first.res && first.res.status !== 401) {
    return first;
  }

  if (!tokens.refreshToken) return first;

  const refreshed = await refreshTokens(tokens.refreshToken);
  if (!refreshed) {
    return { res: first.res, accessToken: null, refreshed: false };
  }

  const retry = await fetchWithAccess(refreshed.access_token, path, init);

  return {
    ...retry,
    accessToken: refreshed.access_token,
    tokens: refreshed,
    refreshed: true,
  };
}

export async function getAccessTokenForStream(req: NextRequest, forceRefresh = false) {
  const tokens = getTokensFromRequest(req);
  if (tokens.accessToken && !forceRefresh) {
    return { accessToken: tokens.accessToken, tokens: null };
  }

  if (!tokens.refreshToken) return { accessToken: null, tokens: null };

  const refreshed = await refreshTokens(tokens.refreshToken);

  return {
    accessToken: refreshed?.access_token ?? null,
    tokens: refreshed,
  };
}

export async function parseBackendJson(res: Response) {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export function unauthorized() {
  const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  clearAuthCookies(res);
  return res;
}

export function getBackendMessage(raw: unknown, fallback = "Request failed") {
  if (!raw || typeof raw !== "object") return fallback;
  const data = raw as Record<string, unknown>;
  const detail = data.detail;
  const message = data.message;

  if (typeof detail === "string") return detail;
  if (typeof message === "string") return message;

  return fallback;
}

function buildHeaders(accessToken: string | null, headers?: HeadersInit) {
  const nextHeaders = new Headers(headers);

  if (accessToken) {
    nextHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return nextHeaders;
}

async function fetchWithAccess(
  accessToken: TokenPair["accessToken"],
  path: string,
  init: RequestInit,
): Promise<AuthFetchResult> {
  if (!accessToken) {
    return { res: null, accessToken: null, refreshed: false };
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: buildHeaders(accessToken, init.headers),
    cache: "no-store",
  });

  return { res, accessToken, refreshed: false };
}

async function refreshTokens(refreshToken: string) {
  const refreshResult = await authApi.refresh(refreshToken);
  if (!refreshResult.ok) return null;
  return extractAuthTokens(refreshResult.data);
}
