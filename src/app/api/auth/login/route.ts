import { NextRequest, NextResponse } from "next/server";
import { authApi } from "@/lib/auth/api";
import { setAuthCookies } from "@/lib/auth/cookies";
import { LoginSchema } from "@/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 },
      );
    }

    const result = await authApi.login(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    const { user, tokens } = result.data.data;

    const res = NextResponse.json({ user }, { status: 200 });
    setAuthCookies(res, tokens);

    return res;
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
