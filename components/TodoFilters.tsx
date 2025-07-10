'use client';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onSearchChange: (term: string) => void;
  todoCount: number;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export function TodoFilters({ 
  filter, 
  searchTerm, 
  onFilterChange, 
  onSearchChange, 
  todoCount, 
  totalCount,
  activeCount,
  completedCount
}: TodoFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Results count */}
      {(searchTerm || filter !== 'all') && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {todoCount} of {totalCount} todos
        </div>
      )}
    </div>
  );
} 