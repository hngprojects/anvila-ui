import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";

export async function GET(req: NextRequest) {
  const result = await authFetch(req, "/api/v1/auth/github/connect", {
    headers: { Accept: "application/json" },
  });

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw, "Could not start GitHub connection") },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const data = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const redirectUrl = typeof data.url === "string" ? data.url : "";

  const res = NextResponse.json({ data: { redirectUrl } });
  return applyAuthCookies(res, result);
}
