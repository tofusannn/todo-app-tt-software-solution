"use client";

interface TodoFiltersProps {
  filter: "all" | "active" | "completed";
  searchTerm: string;
  onSearchChange: (term: string) => void;
  todoCount: number;
  totalCount: number;
}

export function TodoFilters({
  filter,
  searchTerm,
  onSearchChange,
  todoCount,
  totalCount,
}: TodoFiltersProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="w-full pl-11 px-4 py-3 rounded-xl-main border-0 bg-[#e0faf5] text-[#198b76] focus-ring text-base-main font-main"
        />
        <svg
          className="absolute left-4 top-4 w-5 h-5 text-[#198b76]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {(searchTerm || filter !== "all") && (
        <div className="text-xs-main text-[#198b76] text-center font-main">
          Showing {todoCount} of {totalCount} todos
        </div>
      )}
    </div>
  );
}
