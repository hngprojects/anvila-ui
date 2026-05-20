import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/consts";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Missing verification token" },
        { status: 400 },
      );
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.detail ?? data.message ?? "Verification failed" },
        { status: res.status },
      );
    }

    return NextResponse.json(
      { success: true, user: data.data ?? data.user ?? data },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
