"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQueryFilter } from "@/hooks/query.hook";

const urgencyOptions = [
    { label: "All", value: "all", dot: "bg-slate-400" },
    { label: "Normal", value: "NORMAL", dot: "bg-green-500" },
    { label: "Urgent", value: "URGENT", dot: "bg-amber-500" },
    { label: "Critical", value: "CRITICAL", dot: "bg-red-600" },
];

export default function BloodRequestFilters() {
    const { getQuery, updateQueries } = useQueryFilter();

    const urgency = getQuery("urgency");

    const activeUrgency = urgency || "all";
    const hasFilters = Boolean(urgency);

    const resetFilters = () => {
        updateQueries({
            urgency: null,
            page: null,
        });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
                {/* Urgency buttons */}
                <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-sm font-medium text-slate-700">Urgency</p>

                    <div
                        role="group"
                        aria-label="Filter by urgency"
                        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                    >
                        {urgencyOptions.map((option) => {
                            const selected = activeUrgency === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() =>
                                        updateQueries({
                                            urgency: option.value === "all" ? null : option.value,
                                            page: null,
                                        })
                                    }
                                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${selected
                                        ? "border-red-600 bg-red-600 text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                        }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${selected ? "bg-white" : option.dot
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Blood group + reset */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:shrink-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetFilters}
                        disabled={!hasFilters}
                        className="h-11 gap-2 rounded-xl border-slate-200"
                    >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        Reset filters
                    </Button>
                </div>
            </div>
        </div>
    );
}