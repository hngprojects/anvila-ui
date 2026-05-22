import { NextRequest, NextResponse } from "next/server";

import { BACKEND_URL } from "@/lib/consts";
import { normalizeExplore } from "@/lib/explore";

export async function GET(req: NextRequest) {
  const backendUrl = new URL("/api/v1/explore", BACKEND_URL);
  const search = req.nextUrl.searchParams.get("search");
  const category = req.nextUrl.searchParams.get("category");
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const size = req.nextUrl.searchParams.get("size") ?? "12";

  if (search) backendUrl.searchParams.set("search", search);
  if (category) backendUrl.searchParams.set("category", category);
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("size", size);

  const res = await fetch(backendUrl, { cache: "no-store" });
  const raw = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: res.status },
    );
  }

  return NextResponse.json({ data: normalizeExplore(raw) });
}

function getBackendMessage(raw: unknown) {
  if (!raw || typeof raw !== "object") return "Could not load agents";
  const record = raw as Record<string, unknown>;
  return typeof record.message === "string" ? record.message : "Could not load agents";
}
