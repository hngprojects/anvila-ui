import { NextRequest, NextResponse } from "next/server";

import { BACKEND_URL } from "@/lib/consts";
import { getAccessTokenForStream } from "@/lib/auth/proxy";
import { clearAuthCookies, setAuthCookies } from "@/lib/auth/cookies";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  let { accessToken, tokens } = await getAccessTokenForStream(req);

  if (!accessToken) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    clearAuthCookies(res);
    return res;
  }

  let backendRes = await openStream(agentId, accessToken, req.signal);

  if (backendRes.status === 401) {
    const refreshed = await getAccessTokenForStream(req, true);
    accessToken = refreshed.accessToken;
    tokens = refreshed.tokens;

    if (accessToken) {
      backendRes = await openStream(agentId, accessToken, req.signal);
    }
  }

  if (!backendRes.ok || !backendRes.body) {
    const text = await backendRes.text().catch(() => "");
    const res = NextResponse.json(
      { message: text || "Could not connect to persona stream" },
      { status: backendRes.status || 502 },
    );
    if (tokens) setAuthCookies(res, tokens);
    return res;
  }

  const res = new NextResponse(backendRes.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });

  if (tokens) setAuthCookies(res, tokens);
  return res;
}

async function openStream(
  agentId: string,
  accessToken: string,
  signal: AbortSignal,
) {
  const backendUrl = new URL(`/api/v1/personas/${agentId}/stream`, BACKEND_URL);
  backendUrl.searchParams.set("token", accessToken);

  return fetch(backendUrl, {
    headers: { Accept: "text/event-stream" },
    cache: "no-store",
    signal,
  });
}
