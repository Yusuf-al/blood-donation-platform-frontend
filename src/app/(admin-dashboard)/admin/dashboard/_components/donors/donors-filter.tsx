"use client";

import { RotateCcw, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useQueryFilter } from "@/hooks/query.hook";

export const bloodGroups = [
    { label: "A+", value: "A_POSITIVE" },
    { label: "A-", value: "A_NEGATIVE" },
    { label: "B+", value: "B_POSITIVE" },
    { label: "B-", value: "B_NEGATIVE" },
    { label: "AB+", value: "AB_POSITIVE" },
    { label: "AB-", value: "AB_NEGATIVE" },
    { label: "O+", value: "O_POSITIVE" },
    { label: "O-", value: "O_NEGATIVE" },
];

const availabilityOptions = [
    {
        label: "Available",
        value: "AVAILABLE",
    },
    {
        label: "Unavailable",
        value: "UNAVAILABLE",
    },
    {
        label: "Temporarily Unavailable",
        value: "TEMPORARILY_UNAVAILABLE",
    },
];

export default function DonorsFilter() {
    const {
        getQuery,
        updateQuery,
        updateQueries,
    } = useQueryFilter();

    const searchTerm = getQuery("searchTerm");
    const bloodGroup = getQuery("bloodGroup");
    const availabilityStatus =
        getQuery("availabilityStatus");
    const eligibilityVerified =
        getQuery("eligibilityVerified");

    const resetFilters = () => {
        updateQueries({
            searchTerm: null,
            bloodGroup: null,
            availabilityStatus: null,
            eligibilityVerified: null,
            page: null,
        });
    };

    const hasFilters =
        searchTerm ||
        bloodGroup ||
        availabilityStatus ||
        eligibilityVerified;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                        value={searchTerm}
                        onChange={(event) =>
                            updateQuery(
                                "searchTerm",
                                event.target.value
                            )
                        }
                        placeholder="Search donor by name, email or city..."
                        className="h-10 pl-9"
                    />
                </div>

                {/* Blood Group */}
                <Select
                    value={bloodGroup || null}
                    onValueChange={(value) =>
                        updateQuery("bloodGroup", value)
                    }
                >
                    <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Blood Group" />
                    </SelectTrigger>

                    <SelectContent>
                        {bloodGroups.map((group) => (
                            <SelectItem
                                key={group.value}
                                value={group.value}
                            >
                                {group.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Availability */}
                <Select
                    value={availabilityStatus || null}
                    onValueChange={(value) =>
                        updateQuery(
                            "availabilityStatus",
                            value
                        )
                    }
                >
                    <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Availability" />
                    </SelectTrigger>

                    <SelectContent>
                        {availabilityOptions.map(
                            (option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>

                {/* Eligibility */}
                <Select
                    value={eligibilityVerified || null}
                    onValueChange={(value) =>
                        updateQuery(
                            "eligibilityVerified",
                            value
                        )
                    }
                >
                    <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Eligibility" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="true">
                            Verified
                        </SelectItem>

                        <SelectItem value="false">
                            Not Verified
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    disabled={!hasFilters}
                    className="h-10 gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}