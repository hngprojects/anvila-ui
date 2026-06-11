import { NextRequest, NextResponse } from "next/server";
import { authApi } from "@/lib/auth/api";
import { ResetPasswordSchema } from "@/schemas/auth";
import { handleApiRoute } from "@/lib/api/route-handler";

export async function POST(req: NextRequest) {
  try {
    return await handleApiRoute(
      req,
      ResetPasswordSchema,
      authApi.resetPassword,
    );
  } catch (error) {
    console.error("[reset-password] Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
