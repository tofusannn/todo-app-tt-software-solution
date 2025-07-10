'use client';

import { useState } from 'react';
import { Todo } from '../features/todos/types';
import { TodoForm } from './TodoForm';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  const handleUpdate = (title: string) => {
    onUpdate(todo.id, title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <TodoForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        initialValue={todo.title}
        isEditing={true}
      />
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
          todo.completed
            ? 'bg-blue-600 border-blue-600'
            : 'border-gray-300 dark:border-gray-500'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Todo title */}
      <span
        onDoubleClick={handleDoubleClick}
        className={`flex-1 cursor-pointer ${
          todo.completed
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {todo.title}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDoubleClick}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Edit todo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Delete todo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
} 