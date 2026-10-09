
"use client";

import { Loader2, CreditCard } from "lucide-react";



import type { ISubscription } from "@/types/subscription.types";
import { useQueryFilter } from "@/hooks/query.hook";
import { useSubscription } from "@/hooks/admin.hook";
import SubscriptionFilters from "../_components/subscriptions/subscription-filters";
import SubscriptionList from "../_components/subscriptions/subscription-list";

export default function SubscriptionsPage() {
    const { getQuery } = useQueryFilter();

    const status = getQuery("status");
    const page = Number(getQuery("page")) || 1;

    const {
        data,
        isPending,
        isError,
        error,
    } = useSubscription({
        status: status || undefined,
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    // Adjust this path to match your API response.
    const subscriptions: ISubscription[] = data?.data?.data ?? [];

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <CreditCard className="h-6 w-6 text-red-600" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Subscriptions
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage premium subscriptions, validity periods, and payments.
                    </p>
                </div>
            </div>

            <SubscriptionFilters />

            {isPending ? (
                <div className="flex min-h-64 items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                    <span className="text-sm text-slate-500">
                        Loading subscriptions...
                    </span>
                </div>
            ) : isError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <p className="font-semibold text-red-700">
                        Failed to load subscriptions
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                        {error instanceof Error
                            ? error.message
                            : "Please try again later."}
                    </p>
                </div>
            ) : (
                <SubscriptionList subscriptions={subscriptions} />
            )}
        </div>
    );
}

