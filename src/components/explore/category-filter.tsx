import { CategoryFilterProps } from "@/types";

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 -mx-6 px-6 sm:-mx-8 sm:px-8">
      <div className="border-b border-zinc-200">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="relative shrink-0 cursor-pointer border-none bg-transparent px-4 pb-3 pt-1 transition-colors"
            >
              <span
                className={
                  activeCategory === cat
                    ? "text-sm font-semibold text-zinc-900"
                    : "text-sm font-normal text-zinc-500 hover:text-zinc-700"
                }
              >
                {cat}
              </span>
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-teal-brand" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
