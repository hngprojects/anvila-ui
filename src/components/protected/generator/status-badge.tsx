import { CheckCircle2 } from "lucide-react";

export function StatusBadge({ status }: { status?: string }) {
  const label = status || "loading";
  const generated = label === "generated" || label === "published";
  const failed = label === "failed";

  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium sm:inline-flex ${
        generated
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : failed
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {generated && <CheckCircle2 size={13} />}
      {label.replace(/_/g, " ")}
    </span>
  );
}
