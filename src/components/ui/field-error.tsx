import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  id: string;
  message?: string;
  className?: string;
}

export function FieldError({ id, message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="assertive"
      className={className ?? "m-0 flex items-center gap-1 text-[11px] text-red-600"}
    >
      <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
      {message}
    </p>
  );
}