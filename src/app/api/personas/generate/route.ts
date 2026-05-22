import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";
import { normalizeGenerateResponse } from "@/lib/personas";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const prompt = formData.get("prompt");
  const file = formData.get("file");

  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ message: "Prompt is required" }, { status: 422 });
  }

  if (file instanceof File) {
    const allowed = new Set([
      "text/plain",
      "text/markdown",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    const nameAllowed = /\.(txt|md|pdf|docx)$/i.test(file.name);

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File must be 5MB or smaller" },
        { status: 422 },
      );
    }

    if (!allowed.has(file.type) && !nameAllowed) {
      return NextResponse.json(
        { message: "Only txt, md, pdf, and docx files are supported" },
        { status: 422 },
      );
    }
  }

  const backendForm = new FormData();
  backendForm.set("prompt", prompt.trim());
  if (file instanceof File && file.size > 0) backendForm.set("file", file);

  const result = await authFetch(req, "/api/v1/personas/generate", {
    method: "POST",
    body: backendForm,
  });

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const message = result.res.status === 403
      ? "You have exhausted your free generation quota. Upgrade to continue creating agents."
      : getBackendMessage(raw);
    const res = NextResponse.json(
      { message },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const res = NextResponse.json(
    { data: normalizeGenerateResponse(raw) },
    { status: 200 },
  );

  return applyAuthCookies(res, result);
}
