import { NextRequest, NextResponse } from "next/server";
import { authApi } from "@/lib/auth/api";
import { ResetPasswordSchema } from "@/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ResetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 },
      );
    }

    const result = await authApi.resetPassword(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ message: result.data.message }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
