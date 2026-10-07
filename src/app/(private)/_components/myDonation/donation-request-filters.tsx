"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQueryFilter } from "@/hooks/query.hook";

const statusOptions = [
    { label: "All", value: "all", dot: "bg-slate-400" },
    { label: "Awaiting response", value: "DONOR_ASSIGNED", dot: "bg-blue-500" },
    { label: "Accepted", value: "ACCEPTED", dot: "bg-green-500" },
    { label: "Completed", value: "COMPLETED", dot: "bg-emerald-600" },
    { label: "Rejected", value: "REJECTED", dot: "bg-slate-500" },
];

export default function DonationRequestFilters() {
    const { getQuery, updateQueries } = useQueryFilter();

    const status = getQuery("status");

    // No status in the URL means "All"
    const activeStatus = status || "all";

    const resetFilters = () => {
        updateQueries({
            status: null,
            page: null,
        });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                    <p className="mb-1.5 text-sm font-medium text-slate-700">Status</p>

                    <div
                        role="group"
                        aria-label="Filter by request status"
                        className="flex flex-wrap gap-2"
                    >
                        {statusOptions.map((option) => {
                            const selected = activeStatus === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() =>
                                        updateQueries({
                                            status: option.value === "all" ? null : option.value,
                                            page: null,
                                        })
                                    }
                                    className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${selected
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

                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    disabled={!status}
                    className="h-11 gap-2 rounded-xl border-slate-200 lg:shrink-0"
                >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Reset filters
                </Button>
            </div>
        </div>
    );
}