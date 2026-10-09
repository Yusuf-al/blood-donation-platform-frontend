
"use client";
import { formatDate } from "@/lib/formateDate";
import { formatAmount } from "@/lib/utils";
import { IPayment } from "@/types/payments.types";
import {
    CalendarDays,
    CreditCard,
    ReceiptText,
    UserRound,
} from "lucide-react";



interface PaymentListProps {
    payments: IPayment[];
}



function getStatusStyle(status: string) {
    switch (status.toUpperCase()) {
        case "PAID":
            return "bg-green-50 text-green-700 ring-green-600/20";
        case "PENDING":
            return "bg-amber-50 text-amber-700 ring-amber-600/20";
        case "FAILED":
        case "CANCELLED":
            return "bg-red-50 text-red-700 ring-red-600/20";
        case "REFUNDED":
            return "bg-purple-50 text-purple-700 ring-purple-600/20";
        default:
            return "bg-slate-100 text-slate-700 ring-slate-500/20";
    }
}

function getProviderLabel(provider: string) {
    switch (provider) {
        case "BKASH":
            return "bKash";
        case "SSLCOMMERZ":
            return "SSLCommerz";
        case "STRIPE":
            return "Stripe";
        default:
            return provider.replaceAll("_", " ");
    }
}

function getMethodLabel(method: string) {
    switch (method) {
        case "CARD":
            return "Card";
        case "MOBILE_BANKING":
            return "Mobile Banking";
        case "BANK_TRANSFER":
            return "Bank Transfer";
        default:
            return method.replaceAll("_", " ");
    }
}

export default function PaymentList({ payments }: PaymentListProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-slate-900">
                        Payment Transactions
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review payment details and transaction statuses.
                    </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {payments.length} records
                </span>
            </div>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <CreditCard className="h-7 w-7 text-slate-400" />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                        No payments found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        No transactions match the selected filters.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1150px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">User</th>
                                <th className="px-5 py-4 font-semibold">Amount</th>
                                <th className="px-5 py-4 font-semibold">Provider</th>
                                <th className="px-5 py-4 font-semibold">Method</th>
                                <th className="px-5 py-4 font-semibold">Transaction ID</th>
                                <th className="px-5 py-4 font-semibold">Paid At</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {payments.map((payment, index) => (
                                <tr
                                    key={`${payment.transactionId ?? payment.user.email} -${payment.paidAt} -${index}`}
                                    className="transition-colors hover:bg-slate-50/80"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {payment.user.imageUrl ? (
                                                <img
                                                    src={payment.user.imageUrl}
                                                    alt={payment.user.name}
                                                    className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                                                    <UserRound className="h-5 w-5 text-slate-500" />
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-900">
                                                    {payment.user.name}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {payment.user.email}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {payment.user.phone || "No phone"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                                        {formatAmount(payment.amount)}
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4">
                                        <span className="inline-flex items-center gap-2 text-slate-700">
                                            <CreditCard className="h-4 w-4 text-slate-400" />
                                            {getProviderLabel(payment.provider)}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                        {getMethodLabel(payment.paymentMethod)}
                                    </td>

                                    <td className="max-w-52 px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <ReceiptText className="h-4 w-4 shrink-0 text-slate-400" />
                                            <span
                                                className="truncate font-mono text-xs text-slate-600"
                                                title={payment.transactionId ?? ""}
                                            >
                                                {payment.transactionId || "—"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-slate-400" />
                                            {formatDate(payment.paidAt)}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline - flex whitespace - nowrap rounded - full px - 2.5 py - 1 text - xs font - semibold ring - 1 ring - inset ${getStatusStyle(payment.status)}`}
                                        >
                                            {payment.status.replaceAll("_", " ")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {payments.length > 0 && (
                <div className="border-t border-slate-200 px-5 py-3">
                    <p className="text-xs text-slate-500">
                        Showing {payments.length} payment{" "}
                        {payments.length === 1 ? "record" : "records"}
                    </p>
                </div>
            )}
        </div>
    );
}

