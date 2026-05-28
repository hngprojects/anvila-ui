interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 -mx-6 px-6 sm:-mx-10 sm:px-10 xl:-mx-20 xl:px-20">
      <div className="border-b border-copy-muted/20">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Filter agents by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-label={`Filter by ${cat}`}
              className="relative shrink-0 cursor-pointer border-none bg-none px-4 pb-3 transition-colors"
            >
              <span
                className={
                  activeCategory === cat
                    ? "font-medium text-sm text-logo"
                    : "font-normal text-sm text-copy-muted"
                }
              >
                {cat}
              </span>
              {activeCategory === cat && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
