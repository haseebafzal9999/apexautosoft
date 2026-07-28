"use client";

import { getProjectCategories, CATEGORY_LABELS } from "@/lib/projects";

interface ProjectFiltersProps {
  active: string;
  onChange: (category: string) => void;
}

export default function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  const categories = ["All", ...getProjectCategories()];

  return (
    <div className="overflow-x-auto pb-2 -mb-2 scrollbar-none">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={active === cat}
            className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase whitespace-nowrap border transition-colors duration-300 ${
              active === cat
                ? "bg-brand-dark text-brand-light border-brand-dark"
                : "bg-transparent text-brand-muted border-brand-muted/20 hover:border-brand-dark hover:text-brand-dark"
            }`}
          >
            {cat === "All" ? "ALL" : CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>
    </div>
  );
}
