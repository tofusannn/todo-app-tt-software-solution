"use client";

import { useState } from "react";
import { Todo } from "../features/todos/types";
import { TodoForm } from "./todos/TodoForm";
import { Card } from "./ui/card";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

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
    <Card className="flex flex-row items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className="flex-shrink-0 w-5 h-5 rounded transition-colors flex items-center justify-center"
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <Circle className="w-5 h-5 text-[#f08e26]" />
        ) : (
          <Circle className="w-5 h-5 text-[#4eb7a0]" />
        )}
      </button>

      {/* Todo title */}
      <span
        onDoubleClick={handleDoubleClick}
        className={`flex-1 cursor-pointer ${
          todo.completed
            ? "line-through text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-white"
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
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
