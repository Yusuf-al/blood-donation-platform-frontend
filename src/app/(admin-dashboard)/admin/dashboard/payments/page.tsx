
"use client";

import { CreditCard, Loader2 } from "lucide-react";

import { useQueryFilter } from "@/hooks/query.hook";

import PaymentFilters from "../_components/payments/payment-filters";
import PaymentList from "../_components/payments/payment-list";
import { usePayments } from "@/hooks/admin.hook";
import { IPayment } from "@/types/payments.types";
import Pagination from "@/components/shared/pagination";



export default function PaymentsPage() {
    const { getQuery } = useQueryFilter();

    const provider = getQuery("provider");
    const status = getQuery("status");
    const paymentMethod = getQuery("paymentMethod");
    const page = Number(getQuery("page")) || 1;

    const {
        data,
        isPending,
        isError,
        error,
    } = usePayments({
        provider: provider || undefined,
        status: status || undefined,
        paymentMethod: paymentMethod || undefined,
        page,
        limit: 10,
    });

    // Adjust this path to match your API response structure.
    const payments: IPayment[] = data?.data?.data ?? [];

    const meta = data?.data?.meta;

    const totalPages =
        meta?.totalPage ??
        meta?.totalPages ??
        1;

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <CreditCard className="h-6 w-6 text-red-600" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Payments
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Monitor transactions, payment providers, and payment statuses.
                    </p>
                </div>
            </div>

            <PaymentFilters />

            {isPending ? (
                <div className="flex min-h-64 items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                    <span className="text-sm text-slate-500">
                        Loading payments...
                    </span>
                </div>
            ) : isError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <p className="font-semibold text-red-700">
                        Failed to load payments
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                        {error instanceof Error
                            ? error.message
                            : "Please try again later."}
                    </p>
                </div>
            ) : (
                <>
                    <PaymentList payments={payments} />
                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </>

            )}
        </div>
    );
}

