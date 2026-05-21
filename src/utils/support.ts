
import { SUPPORT_EMAIL } from "../constants/support";

export function buildMailtoUrl(
  subject: string,
  body: string,
  errorCode?: string
): string {
  const fullBody = errorCode
    ? (body.includes("- Error code:")
        ? body.replace("- Error code:", `- Error code: ${errorCode}`)
        : `${body}\n- Error code: ${errorCode}`)
    : body;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
}