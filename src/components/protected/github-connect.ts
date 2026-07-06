import { getGithubConnectUrl } from "@/components/protected/generator/api";

export async function startGithubConnect() {
  const redirectUrl = await getGithubConnectUrl();
  if (!redirectUrl) throw new Error("Could not start GitHub connection.");
  window.location.href = redirectUrl;
}
