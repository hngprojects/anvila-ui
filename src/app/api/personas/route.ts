import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";

const QuerySchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  size: z.coerce.number().int().min(1).max(100).catch(20),
  status: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  const { page, size, status } = QuerySchema.parse({
    page: req.nextUrl.searchParams.get("page"),
    size: req.nextUrl.searchParams.get("size"),
    status: req.nextUrl.searchParams.get("status") ?? undefined,
  });
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (status) params.set("status", status);

  const result = await authFetch(req, `/api/v1/personas?${params.toString()}`);

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
