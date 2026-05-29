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
      className={className ?? "m-0 text-[11px] text-red-600"}
    >
      {message}
    </p>
  );
}
