"use client";

import { useState } from "react";
import { Todo } from "../../features/todos";
import { TodoForm } from "./TodoForm";
import { Card } from "../ui/card";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
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
    <Card className={`flex items-center gap-3 p-4 rounded-xl-main shadow-card bg-white/90 dark:bg-gray-800/90 transition-main border-0 ${todo.completed ? 'opacity-60' : ''}`}>
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-main focus-ring ${todo.completed ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-white" />
        ) : (
          <Circle className="w-6 h-6 text-gray-300 dark:text-gray-500" />
        )}
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <span
          onDoubleClick={handleDoubleClick}
          className={`truncate text-base-main font-title transition-main ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {todo.title}
        </span>
        {/* Optional: show time or tag here if available */}
        <span className="text-xs-main text-gray-400 font-main transition-main">11:00 - 12:00</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDoubleClick}
          className="p-1 accent-cyan rounded-full shadow-card transition-main focus-ring"
          aria-label="Edit todo"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-400 hover:text-red-500 rounded-full shadow-card transition-main focus-ring"
          aria-label="Delete todo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
}
