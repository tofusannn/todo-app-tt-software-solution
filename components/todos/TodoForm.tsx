"use client";

import { useState, useEffect } from "react";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { DatePicker } from "@components/common/DatePicker";
import { Button } from "@components/ui/button";

interface TodoFormProps {
  onSubmit: (title: string, date: string) => void;
  onCancel: () => void;
  placeholder?: string;
  initialValue?: string;
  initialDate?: string;
}

export function TodoForm({
  onSubmit,
  onCancel,
  placeholder = "What needs to be done?",
  initialValue = "",
  initialDate,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialValue);
  const today = new Date();
  const yyyyMM = today.toISOString().slice(0, 7);
  const minDate = today.toISOString().slice(0, 10);
  const maxDate =
    yyyyMM +
    "-" +
    String(
      new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    ).padStart(2, "0");
  const [date, setDate] = useState(initialDate || minDate);

  useEffect(() => {
    setTitle(initialValue);
    if (initialDate) setDate(initialDate);
  }, [initialValue, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onSubmit(trimmedTitle, date);
      setTitle("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="todo-title" className="px-1">
            Title
          </Label>
          <Input
            id="todo-title"
            type="text"
            value={title}
            autoFocus
            placeholder={placeholder}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <DatePicker
          title="Date"
          value={date}
          onChange={setDate}
          min={minDate}
          max={maxDate}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
