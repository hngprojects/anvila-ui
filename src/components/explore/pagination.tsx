import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  pages,
  hasNext,
  hasPrev,
  onPage,
}: {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPage: (page: number) => void;
}) {
  return (
    <nav
      aria-label="Agent list pagination"
      className="mt-10 flex items-center justify-center gap-3"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPage(page - 1)}
        disabled={!hasPrev}
        aria-label="Go to previous page"
        className="border-[0.5px] border-copy-muted/20 bg-white hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 disabled:text-copy-muted disabled:bg-white text-sm font-medium"
        style={{ color: hasPrev ? "#595959" : undefined }}
      >
        Previous
      </Button>
      <span
        className="text-sm"
        style={{ color: "#595959" }}
        aria-live="polite"
        aria-atomic="true"
      >
        Page {page} of {Math.max(pages, 1)}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPage(page + 1)}
        disabled={!hasNext}
        aria-label="Go to next page"
        className="border-[0.5px] border-copy-muted/20 bg-white hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 disabled:text-copy-muted disabled:bg-white text-sm font-medium"
        style={{ color: hasNext ? "#595959" : undefined }}
      >
        Next
      </Button>
    </nav>
  );
}
 
