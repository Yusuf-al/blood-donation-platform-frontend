"use client";

import { Search, RotateCcw, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useQueryFilter } from "@/hooks/query.hook";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

type FilterConfig = {
    key: "role" | "status" | "isVerified" | "isPremiumUser";
    placeholder: string;
    allLabel: string;
    prefix?: string;
    options: Option[];
};

const ALL = "__all__";

const booleanOptions: Option[] = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
];

const filters: FilterConfig[] = [
    {
        key: "role",
        placeholder: "Role",
        allLabel: "All roles",
        options: [
            { value: "ADMIN", label: "Admin" },
            { value: "DONOR", label: "Donor" },
            { value: "REQUESTER", label: "Requester" },
        ],
    },
    {
        key: "status",
        placeholder: "Status",
        allLabel: "All statuses",
        options: [
            { value: "ACTIVE", label: "Active" },
            { value: "BLOCKED", label: "Blocked" },
            { value: "SUSPENDED", label: "Suspended" },
        ],
    },
    {
        key: "isVerified",
        placeholder: "Verification",
        allLabel: "Any verification",
        prefix: "Verified: ",
        options: booleanOptions,
    },
    {
        key: "isPremiumUser",
        placeholder: "Plan",
        allLabel: "Any plan",
        prefix: "Premium: ",
        options: booleanOptions,
    },
];

export default function UsersFilter() {
    const { getQuery, updateQueries } = useQueryFilter();

    const searchTerm: string = getQuery("searchTerm") ?? "";

    // Changing any filter also sends the table back to page 1.
    const setFilter = (key: string, value: string | null) =>
        updateQueries({ [key]: value || null, page: null });

    const activeFilters = filters
        .map((filter) => {
            const value = getQuery(filter.key);
            const option = filter.options.find((o) => o.value === value);
            return option
                ? { filter, label: `${filter.prefix ?? ""}${option.label}` }
                : null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    const activeCount = activeFilters.length + (searchTerm ? 1 : 0);

    const resetFilters = () => {
        updateQueries({
            searchTerm: null,
            role: null,
            status: null,
            isVerified: null,
            isPremiumUser: null,
            page: null,
        });
    };

    return (
        <section
            aria-label="Filter users"
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                    <h2 className="text-sm font-semibold text-slate-900">
                        Filters
                    </h2>

                    {activeCount > 0 && (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs font-medium text-white">
                            {activeCount}
                        </span>
                    )}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    disabled={activeCount === 0}
                    className="h-8 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Reset
                </Button>
            </div>

            {/* Controls */}
            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
                <div className="relative sm:col-span-2 lg:col-span-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                        value={searchTerm}
                        onChange={(event) =>
                            setFilter("searchTerm", event.target.value)
                        }
                        placeholder="Search by name or email"
                        aria-label="Search users"
                        className={cn(
                            "bg-white pl-9 pr-9",
                            searchTerm && "border-slate-400"
                        )}
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setFilter("searchTerm", null)}
                            aria-label="Clear search"
                            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {filters.map((filter) => {
                    const value: string | undefined =
                        getQuery(filter.key) || undefined;
                    const selected = filter.options.find(
                        (o) => o.value === value
                    );

                    return (
                        <Select
                            key={filter.key}
                            value={selected ? selected.value : ALL}
                            onValueChange={(next) =>
                                setFilter(
                                    filter.key,
                                    next === ALL ? null : next
                                )
                            }
                        >
                            <SelectTrigger
                                aria-label={filter.placeholder}
                                className={cn(
                                    "w-full bg-white",
                                    selected
                                        ? "border-slate-400 bg-slate-50 font-medium text-slate-900"
                                        : "text-slate-500"
                                )}
                            >
                                <SelectValue>
                                    {selected
                                        ? `${filter.prefix ?? ""}${selected.label}`
                                        : filter.placeholder}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={ALL}>
                                    {filter.allLabel}
                                </SelectItem>

                                {filter.options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                })}
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-3">
                    <span className="text-xs text-slate-500">Applied:</span>

                    {activeFilters.map(({ filter, label }) => (
                        <span
                            key={filter.key}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 py-1 pl-2.5 pr-1 text-xs font-medium text-slate-700"
                        >
                            {label}
                            <button
                                type="button"
                                onClick={() => setFilter(filter.key, null)}
                                aria-label={`Remove ${label} filter`}
                                className="flex h-4 w-4 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}