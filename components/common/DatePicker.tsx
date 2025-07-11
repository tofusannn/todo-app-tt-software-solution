"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";

interface DatePickerProps {
  title?: string;
  value: string; // yyyy-MM-dd
  onChange: (date: string) => void;
  min?: string; // yyyy-MM-dd
  max?: string; // yyyy-MM-dd
}

export function DatePicker({ title = "Date", value, onChange, min, max }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const date = value ? parseISO(value) : undefined;
  const fromDate = min ? parseISO(min) : undefined;
  const toDate = max ? parseISO(max) : undefined;
  // disable วันนอก min/max
  const disabled = React.useMemo(() => {
    const arr = [];
    if (fromDate) arr.push((d: Date) => d < fromDate);
    if (toDate) arr.push((d: Date) => d > toDate);
    return arr.length ? arr : undefined;
  }, [fromDate, toDate]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">{title}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? format(date, "MMM d, yyyy") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            disabled={disabled}
            onSelect={(d) => {
              if (d) onChange(format(d, "yyyy-MM-dd"));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
