import { NextRequest, NextResponse } from "next/server";

import {
  applyAuthCookies,
  authFetch,
  getBackendMessage,
  parseBackendJson,
  unauthorized,
} from "@/lib/auth/proxy";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const result = await authFetch(req, `/api/v1/personas/${agentId}/publish`, {
    method: "POST",
  });

  if (!result.res) return unauthorized();

  const raw = await parseBackendJson(result.res);
  if (!result.res.ok) {
    const res = NextResponse.json(
      { message: getBackendMessage(raw) },
      { status: result.res.status },
    );
    return applyAuthCookies(res, result);
  }

  const record = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const data = record.data && typeof record.data === "object"
    ? record.data as Record<string, unknown>
    : {};

  const res = NextResponse.json({
    data: {
      agentId: typeof data.persona_id === "string" ? data.persona_id : agentId,
      status: typeof data.status === "string" ? data.status : "published",
      publishedAt: typeof data.published_at === "string" ? data.published_at : "",
      githubRepoUrl: typeof data.github_repo_url === "string" ? data.github_repo_url : "",
      githubCloneUrl: typeof data.github_clone_url === "string" ? data.github_clone_url : "",
      githubZipUrl: typeof data.github_zip_url === "string" ? data.github_zip_url : "",
    },
  });

  return applyAuthCookies(res, result);
}
