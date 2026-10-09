
"use client";

import {
    CalendarClock,
    CalendarDays,
    Clock10,
    CreditCard,
    ReceiptText,
    UserRound,
    WalletCards,
} from "lucide-react";


import { formatDate } from "@/lib/formateDate";
import { calculateRemainingDays, formatAmount } from "@/lib/utils";
import { ISubscription } from "@/types/subscription.types";

interface SubscriptionListProps {
    subscriptions: ISubscription[];
}

function getStatusStyle(status: string) {
    switch (status.toUpperCase()) {
        case "ACTIVE":
            return "bg-green-50 text-green-700 ring-green-600/20";
        case "PENDING":
            return "bg-amber-50 text-amber-700 ring-amber-600/20";
        case "EXPIRED":
        case "CANCELLED":
            return "bg-red-50 text-red-700 ring-red-600/20";
        default:
            return "bg-slate-100 text-slate-700 ring-slate-500/20";
    }
}

export default function SubscriptionList({
    subscriptions,
}: SubscriptionListProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-slate-900">
                        All Subscriptions
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review subscription users, validity, and payments.
                    </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {subscriptions.length} records
                </span>
            </div>

            {subscriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <CreditCard className="h-7 w-7 text-slate-400" />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                        No subscriptions found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Subscription records matching your filter will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">User</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                                <th className="px-5 py-4 font-semibold">Started</th>
                                <th className="px-5 py-4 font-semibold">Expires</th>
                                <th className="px-5 py-4 font-semibold">Day Remains</th>
                                <th className="px-5 py-4 font-semibold">Payment</th>
                                <th className="px-5 py-4 font-semibold">Method / Provider</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {subscriptions.map((subscription, index) => {

                                return (
                                    <tr
                                        key={`${subscription.user.email} -${subscription.startedAt} -${index}`}
                                        className="transition-colors hover:bg-slate-50/80"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {subscription.user.imageUrl ? (
                                                    <img
                                                        src={subscription.user.imageUrl}
                                                        alt={subscription.user.name}
                                                        className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                                                        <UserRound className="h-5 w-5 text-slate-500" />
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-slate-900">
                                                        {subscription.user.name}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {subscription.user.email}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {subscription.user.phone || "No phone"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline - flex rounded - full px - 2.5 py - 1 text - xs font - semibold ring - 1 ring - inset ${getStatusStyle(subscription.status)}`}
                                            >
                                                {subscription.status.replaceAll("_", " ")}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <CalendarDays className="h-4 w-4 text-slate-400" />
                                                {formatDate(subscription.startedAt)}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <CalendarDays className="h-4 w-4 text-slate-400" />
                                                {formatDate(subscription.expiresAt)}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <CalendarClock className="h-4 w-4 text-slate-400" />
                                                {calculateRemainingDays(subscription.startedAt, subscription.expiresAt)} days
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            {subscription?.payments ? (
                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {formatAmount(subscription?.payments?.amount)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Paid: {formatDate(subscription?.payments?.paidAt)}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400">
                                                    No payment
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {subscription?.payments ? (
                                                <div className="flex items-start gap-2">
                                                    <div>
                                                        <p className="flex items-center gap-2 font-medium text-slate-700">
                                                            {subscription?.payments?.paymentMethod === "MOBILE_BANKING" ? (
                                                                <WalletCards className="h-4 w-4 text-slate-400" />
                                                            ) : subscription?.payments?.paymentMethod === "CARD" ? (
                                                                <CreditCard className="h-4 w-4 text-slate-400" />
                                                            ) : null}

                                                            {subscription?.payments?.paymentMethod}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {subscription?.payments?.provider}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {subscriptions.length > 0 && (
                <div className="border-t border-slate-200 px-5 py-3">
                    <p className="text-xs text-slate-500">
                        Showing {subscriptions.length} subscription{" "}
                        {subscriptions.length === 1 ? "record" : "records"}
                    </p>
                </div>
            )}
        </div>
    );
}

