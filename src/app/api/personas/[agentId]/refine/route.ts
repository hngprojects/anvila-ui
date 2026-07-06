import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const body = await req.json().catch(() => null);
  const message =
    body && typeof body === "object" && "message" in body
      ? (body as Record<string, unknown>).message
      : null;

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ message: "Message is required" }, { status: 422 });
  }

  const result = await authFetch(req, `/api/v1/personas/${agentId}/refine`, {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message.trim() }),
    signal: req.signal,
  });

  if (!result.res) return unauthorized();

  if (!result.res.ok || !result.res.body) {
    const raw = await parseBackendJson(result.res);
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const res = new NextResponse(result.res.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });

  if (result.tokens) {
    return applyAuthCookies(res, result);
  }

  return res;
}
