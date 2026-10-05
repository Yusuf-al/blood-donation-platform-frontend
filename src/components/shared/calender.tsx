
"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { format, parse, isValid } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DatePickerProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

export function DatePicker({
    value = "",
    onChange,
    placeholder = "Select date",
    disabled = false,
    minDate,
    maxDate,
    className,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");


    const stringToDate = React.useCallback((dateString: string) => {
        if (!dateString) return undefined;

        const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());

        return isValid(parsedDate) ? parsedDate : undefined;
    }, []);


    React.useEffect(() => {
        if (!value) {
            setInputValue("");
            return;
        }

        const date = stringToDate(value);

        if (date) {
            setInputValue(format(date, "dd/MM/yyyy"));
        }
    }, [value, stringToDate]);


    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = event.target.value;
        setInputValue(input);
        if (input.length !== 10) return;
        const parsedDate = parse(input, "dd/MM/yyyy", new Date());
        if (!isValid(parsedDate)) return;
        const formattedValue = format(parsedDate, "yyyy-MM-dd");
        onChange(formattedValue);
    };


    const handleDateSelect = (date: Date | undefined) => {
        if (!date) {
            onChange("");
            setInputValue("");
            return;
        }

        const formattedValue = format(date, "yyyy-MM-dd");

        onChange(formattedValue);
        setInputValue(format(date, "dd/MM/yyyy"));

        setOpen(false);
    };

    const selectedDate = stringToDate(value);

    return (
        <div className={cn("flex w-full items-center gap-2", className)}>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                disabled={disabled}
                className="h-11"
                inputMode="numeric"
                maxLength={10}
            />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    type="button"
                    disabled={disabled}
                    aria-label={placeholder}
                    className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
                        "border border-input bg-background",
                        "text-muted-foreground shadow-xs",
                        "transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "disabled:pointer-events-none disabled:opacity-50"
                    )}
                >
                    <CalendarDays className="h-4 w-4" />
                </PopoverTrigger>

                <PopoverContent align="end" className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                            if (minDate && date < minDate) return true;
                            if (maxDate && date > maxDate) return true;

                            return false;
                        }}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

