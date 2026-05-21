
import { SUPPORT_EMAIL } from "../../constants/support";

export function buildMailtoUrl(
  subject: string,
  body: string,
  errorCode?: string
): string {
  const fullBody = errorCode ? `${body}\n- Error code seen: ${errorCode}` : body;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
}