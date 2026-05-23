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

  try {
    const res = await fetch(backendUrl, { cache: "no-store" });
    const raw = await res.json().catch(() => null);

    if (!res.ok || !raw) {
      return NextResponse.json({ data: emptyExploreResult(page, size) }, { status: 200 });
    }

    return NextResponse.json({ data: normalizeExplore(raw) }, { status: 200 });
  } catch {
    return NextResponse.json({ data: emptyExploreResult(page, size) }, { status: 200 });
  }
}

function emptyExploreResult(page: string, size: string) {
  return {
    personas: [],
    categories: [],
    meta: {
      page: Number(page) || 1,
      size: Number(size) || 12,
      total: 0,
      pages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
}
