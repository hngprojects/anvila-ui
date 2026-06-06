import { BACKEND_URL } from "@/lib/consts";

export async function startGithubConnect() {
  window.location.href = `${BACKEND_URL}/api/v1/auth/github/connect`;
}
