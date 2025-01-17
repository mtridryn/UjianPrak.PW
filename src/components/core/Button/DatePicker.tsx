"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  selectedDate: string | null;
  onDateChange: (date: string | null) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    if (selectedDate) {
      setDate(new Date(selectedDate));
    } else {
      setDate(undefined);
    }
  }, [selectedDate]);

  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      onDateChange(format(day, "yyyy-MM-dd"));
    } else {
      setDate(undefined);
      onDateChange(null);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
