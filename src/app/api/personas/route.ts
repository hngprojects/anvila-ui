import { NextRequest, NextResponse } from "next/server";
import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";

export async function GET(req: NextRequest) {
  const rawPage = parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
  const rawSize = parseInt(req.nextUrl.searchParams.get("size") ?? "20", 10);

  if (isNaN(rawPage) || isNaN(rawSize)) {
    return NextResponse.json({ message: "Invalid pagination parameters" }, { status: 400 });
  }

  const page = Math.max(1, rawPage);
  const size = Math.min(Math.max(1, rawSize), 100);
  const result = await authFetch(req, `/api/v1/personas?page=${page}&size=${size}`);

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);

  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const res = NextResponse.json(raw, { status: 200 });
  return applyAuthCookies(res, result);
}
