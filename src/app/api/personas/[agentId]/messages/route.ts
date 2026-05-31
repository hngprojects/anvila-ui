import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";
import { normalizeMessages } from "@/lib/personas";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const cursor = req.nextUrl.searchParams.get("cursor");
  const size = req.nextUrl.searchParams.get("size") ?? "50";
  const search = new URLSearchParams({ size });

  if (cursor) search.set("cursor", cursor);

  const result = await authFetch(
    req,
    `/api/v1/personas/${agentId}/messages?${search.toString()}`,
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

  const res = NextResponse.json(normalizeMessages(raw));

  return applyAuthCookies(res, result);
}
