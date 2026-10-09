
"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryFilter } from "@/hooks/query.hook";

const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "ACTIVE" },
    { label: "Pending", value: "PENDING" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export default function SubscriptionFilters() {
    const { getQuery, updateQuery, updateQueries } =
        useQueryFilter();

    const status = getQuery("status") || "all";

    const resetFilters = () => {
        updateQueries({
            status: null,
            page: null,
        });
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                    <SlidersHorizontal className="h-4 w-4 text-red-600" />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                        Filter Subscriptions
                    </h2>
                    <p className="text-xs text-slate-500">
                        Narrow results by subscription status.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        updateQueries({
                            status: value === "all" ? null : value,
                            page: null,
                        });
                    }}
                >
                    <SelectTrigger className="w-full sm:w-52">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}

