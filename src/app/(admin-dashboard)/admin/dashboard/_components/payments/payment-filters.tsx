
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

const providerOptions = [
    { label: "All Providers", value: "all" },
    { label: "bKash", value: "BKASH" },
    { label: "SSLCommerz", value: "SSLCOMMERZ" },
    { label: "Stripe", value: "STRIPE" },
];

const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Pending", value: "PENDING" },
    { label: "Paid", value: "PAID" },
    { label: "Failed", value: "FAILED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Refunded", value: "REFUNDED" },
];

const methodOptions = [
    { label: "All Methods", value: "all" },
    { label: "Card", value: "CARD" },
    { label: "Mobile Banking", value: "MOBILE_BANKING" },
    { label: "Bank Transfer", value: "BANK_TRANSFER" },
];

export default function PaymentFilters() {
    const { getQuery, updateQueries } = useQueryFilter();

    const provider = getQuery("provider") || "all";
    const status = getQuery("status") || "all";
    const paymentMethod = getQuery("paymentMethod") || "all";

    const handleFilterChange = (
        key: "provider" | "status" | "paymentMethod",
        value: string | null
    ) => {
        updateQueries({
            [key]: value === "all" ? null : value,
            page: null,
        });
    };

    const resetFilters = () => {
        updateQueries({
            provider: null,
            status: null,
            paymentMethod: null,
            page: null,
        });
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                    <SlidersHorizontal className="h-4 w-4 text-red-600" />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                        Filter Payments
                    </h2>
                    <p className="text-xs text-slate-500">
                        Filter transactions by provider, status, or payment method.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Select
                    value={provider}
                    onValueChange={(value) =>
                        handleFilterChange("provider", value)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Payment provider" />
                    </SelectTrigger>
                    <SelectContent>
                        {providerOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={status}
                    onValueChange={(value) =>
                        handleFilterChange("status", value)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Payment status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={paymentMethod}
                    onValueChange={(value) =>
                        handleFilterChange("paymentMethod", value)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        {methodOptions.map((option) => (
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
                    className="gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}

