"use client";

import { useState } from "react";
import { Todo } from "@features/todos";
import { Card } from "@components/ui/card";
import { Circle, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@components/ui/dialog";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDoubleClick = () => {
    onEdit();
  };

  return (
    <Card
      className={`flex flex-row items-center gap-3 p-4 rounded-xl-main  bg-white/90 dark:bg-gray-800/90 border dark:border-[#4eb7a0] `}
    >
      <Button
        onClick={handleToggle}
        disabled={todo.completed}
        variant="ghost"
        size="icon"
        className={`flex w-3 h-3 items-center cursor-pointer ${
          todo.completed ? "bg-[#4eb7a0]" : ""
        } rounded-full`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <Circle className="w-3 h-3 text-[#4eb7a0]" />
      </Button>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <span className={`text-base font-medium text-gray-900 dark:text-white`}>
          {todo.title}
        </span>
      </div>

      {!todo.completed ? (
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDoubleClick}
            className="p-2 rounded-full bg-[#3ca5c0]"
            aria-label="Edit todo"
            variant="ghost"
            size="icon"
          >
            <Pencil className="w-4 h-4 text-white" />
          </Button>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                onClick={handleDelete}
                className="p-2 rounded-full bg-red-500"
                aria-label="Delete todo"
                variant="ghost"
                size="icon"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this task?</DialogTitle>
              </DialogHeader>
              <div>Are you sure you want to delete &quot;{todo.title}&quot;?</div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    onDelete(todo.id);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-main">
          {format(new Date(todo.date), "MMM d")}
        </div>
      )}
    </Card>
  );
}
