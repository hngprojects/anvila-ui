import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type ApiResult<T> = {
  ok: boolean;
  message?: string;
  status?: number;
  data?: T;
};

export async function handleApiRoute<T, TResponse>(
  req: NextRequest,
  schema: z.ZodSchema<T>,
  action: (data: T) => Promise<ApiResult<TResponse>>,
) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 },
      );
    }
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 },
      );
    }

    const result = await action(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status ?? 400 },
      );
    }

    return NextResponse.json(
      { message: result?.message ?? "Success" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
