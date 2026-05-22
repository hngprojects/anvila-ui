import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";
import { normalizeSessions } from "@/lib/personas";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor");
  const size = req.nextUrl.searchParams.get("size") ?? "5";
  const search = new URLSearchParams({ size });

  if (cursor) search.set("cursor", cursor);

  const result = await authFetch(
    req,
    `/api/v1/chat/sessions?${search.toString()}`,
  );

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const res = NextResponse.json(normalizeSessions(raw));

  return applyAuthCookies(res, result);
}
