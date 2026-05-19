import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { BACKEND_URL } from "@/lib/consts";
import { emailRegex } from "@/schemas/auth";

const Schema = z.object({
  full_name: z.string().min(1),
  email: z
    .string()
    .regex(emailRegex, { message: "Please enter a valid email" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 },
      );
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/leads/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.detail ?? data.message ?? "Failed to join waitlist" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
