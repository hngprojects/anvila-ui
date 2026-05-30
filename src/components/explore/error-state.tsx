import { Button } from "@/components/ui/button";

export function ExploreErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-xl border border-copy-muted/20 bg-white px-6 py-12 text-center"
    >
      <h2 className="text-2xl font-medium text-logo">Something went wrong</h2>
      <p
        className="mt-3 max-w-md text-sm leading-6"
        style={{ color: "#595959" }}
      >
        {message}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-6 border-[0.5px] border-copy-muted/20 bg-white hover:bg-background text-sm font-medium"
        style={{ color: "#595959" }}
      >
        Try again
      </Button>
    </div>
  );
}
