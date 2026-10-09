"use client";

import { RotateCcw } from "lucide-react";

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

    {
        value: "PENDING",
        label: "Pending",
    },
    {
        value: "APPROVED",
        label: "Approved",
    },
    {
        value: "MATCHING",
        label: "Matching",
    },
    {
        value: "DONOR_ASSIGNED",
        label: "Donor Assigned",
    },
    {
        value: "FULFILLED",
        label: "Fulfilled",
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
    },
];

const urgencyOptions = [

    {
        value: "NORMAL",
        label: "Normal",
    },
    {
        value: "URGENT",
        label: "Urgent",
    },
    {
        value: "CRITICAL",
        label: "Critical",
    },
];

const bloodGroups = [
    { label: "A+", value: "A_POSITIVE" },
    { label: "A-", value: "A_NEGATIVE" },
    { label: "B+", value: "B_POSITIVE" },
    { label: "B-", value: "B_NEGATIVE" },
    { label: "AB+", value: "AB_POSITIVE" },
    { label: "AB-", value: "AB_NEGATIVE" },
    { label: "O+", value: "O_POSITIVE" },
    { label: "O-", value: "O_NEGATIVE" },
];

export default function BloodRequestsFilter() {
    const {
        getQuery,
        updateQuery,
        updateQueries,
    } = useQueryFilter();

    const urgency = getQuery("urgency");
    const bloodGroup = getQuery("bloodGroup");
    const status = getQuery("status");

    const resetFilters = () => {
        updateQueries({
            urgency: null,
            status: null,
            bloodGroup: null,
            page: null,
        });
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-xs">
                    <Select
                        value={urgency || null}
                        onValueChange={(value) =>
                            updateQuery("urgency", value)
                        }
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Filter by urgency" />
                        </SelectTrigger>

                        <SelectContent>
                            {urgencyOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full sm:max-w-xs">
                    <Select
                        value={bloodGroup || null}
                        onValueChange={(value) =>
                            updateQuery("bloodGroup", value)
                        }
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Filter by Blood Group" />
                        </SelectTrigger>

                        <SelectContent>
                            {bloodGroups.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full sm:max-w-xs">
                    <Select
                        value={status || null}
                        onValueChange={(value) =>
                            updateQuery("status", value)
                        }
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Filter by Status" />
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
                </div>


                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="h-10 gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}