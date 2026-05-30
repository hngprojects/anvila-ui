import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";
import { normalizePersona } from "@/lib/personas";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const result = await authFetch(req, `/api/v1/personas/${agentId}`);

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const record =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const res = NextResponse.json({ data: normalizePersona(record.data) });

  return applyAuthCookies(res, result);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const result = await authFetch(req, `/api/v1/personas/${agentId}`, {
    method: "DELETE",
  });
  if (!result.res) return unauthorized();
  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }
  const res = NextResponse.json({ success: true }, { status: 200 });
  return applyAuthCookies(res, result);
}
