'use client';

import { useState, useEffect } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => void;
  onCancel: () => void;
  placeholder?: string;
  initialValue?: string;
  isEditing?: boolean;
}

export function TodoForm({ onSubmit, onCancel, placeholder = "What needs to be done?", initialValue = "", isEditing = false }: TodoFormProps) {
  const [title, setTitle] = useState(initialValue);

  useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onSubmit(trimmedTitle);
      setTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-xl-main border-0 shadow-card bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus-ring text-base-main font-main transition-main"
          autoFocus
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="accent-cyan rounded-full w-12 h-12 flex items-center justify-center shadow-card disabled:opacity-50 disabled:cursor-not-allowed transition-main text-lg font-title focus-ring"
        >
          {isEditing ? '✓' : '+'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-card transition-main text-lg font-title focus-ring"
        >
          ×
        </button>
      </div>
    </form>
  );
} 