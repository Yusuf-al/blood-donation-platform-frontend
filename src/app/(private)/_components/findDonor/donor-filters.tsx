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


interface DonorFiltersProps {
    bloodGroup: string;
    city: string;
    availabilityStatus: string;
    onBloodGroupChange: (value: string) => void;
    onCityChange: (value: string) => void;
    onAvailabilityChange: (value: string) => void;
    onReset: () => void;
}

const bloodGroups = [
    {
        label: "A+",
        value: "A_POSITIVE",
    },
    {
        label: "A-",
        value: "A_NEGATIVE",
    },
    {
        label: "B+",
        value: "B_POSITIVE",
    },
    {
        label: "B-",
        value: "B_NEGATIVE",
    },
    {
        label: "AB+",
        value: "AB_POSITIVE",
    },
    {
        label: "AB-",
        value: "AB_NEGATIVE",
    },
    {
        label: "O+",
        value: "O_POSITIVE",
    },
    {
        label: "O-",
        value: "O_NEGATIVE",
    },
];
const cities = [
    "Khulna",
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Sylhet",
    "Barisal",
];

const availabilityOptions = [
    { value: "AVAILABLE", label: "Available" },
    { value: "UNAVAILABLE", label: "Unavailable" },
    { value: "TEMPORARILY_UNAVAILABLE", label: "Temporarily Unavailable" }
];

// w-full is needed: the shadcn trigger is only as wide as its content by default
const triggerClass =
    "h-11 w-full rounded-xl border-slate-200 bg-white text-sm text-slate-700 shadow-none focus:ring-2 focus:ring-red-100 data-[placeholder]:text-slate-400";

export default function DonorFilters() {

    const { getQuery, updateQuery, updateQueries } = useQueryFilter();

    const bloodGroup = getQuery("bloodGroup");
    const city = getQuery("city");
    const availabilityStatus = getQuery("availabilityStatus");

    const resetFilters = () => {
        updateQueries({
            searchTerm: null,
            bloodGroup: null,
            city: null,
            availabilityStatus: null,
            page: null,
        });
    };


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Select
                    value={bloodGroup || null}
                    onValueChange={(value) =>
                        updateQuery("bloodGroup", value)
                    }
                >
                    <SelectTrigger className="h-11">
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

                <Select value={city || null}
                    onValueChange={(value) => updateQuery("city", value)}
                >
                    <SelectTrigger className={triggerClass} aria-label="City">
                        <SelectValue className="p-2" placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                        {cities.map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={availabilityStatus || null}
                    onValueChange={(value) => updateQuery("availabilityStatus", value)}
                >
                    <SelectTrigger className={triggerClass} aria-label="Availability">
                        <SelectValue className="p-2" placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                        {availabilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="h-11 w-full gap-2 rounded-xl border-slate-200 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Reset filters
                </Button>
            </div>
        </div>
    );
}