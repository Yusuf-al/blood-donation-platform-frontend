"use client";

import {
    CalendarDays,
    Check,
    CheckCircle2,
    Crown,
    Droplets,
    Minus,
    ShieldCheck,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type UserSettings = {
    isPremiumUser: boolean;
};

type MonthlyUsage = {
    year: number;
    month: number; // 1 = January, 12 = December
    requestCount: number;
};

interface SettingsPageProps {
    user: UserSettings;
    usage?: MonthlyUsage;
    subscriptionStartDate?: string | Date | null;
    onUpgrade?: () => void;
}

const FREE_LIMIT = 3;
const PREMIUM_LIMIT = 10;

const comparison = [
    { feature: "Blood requests per month", free: "3", premium: "10" },
    { feature: "Donor contact number and address", free: false, premium: true },
    { feature: "Direct messages to donors", free: false, premium: true },
    { feature: "Fast Matching", free: false, premium: true },
    { feature: "Priority support", free: false, premium: true },
];

function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function CellValue({ value }: { value: string | boolean }) {
    if (typeof value === "string") {
        return <span className="font-semibold">{value}</span>;
    }
    return value ? (
        <>
            <Check className="mx-auto h-4 w-4 text-red-600" strokeWidth={3} aria-hidden="true" />
            <span className="sr-only">Included</span>
        </>
    ) : (
        <>
            <Minus className="mx-auto h-4 w-4 text-slate-300" aria-hidden="true" />
            <span className="sr-only">Not included</span>
        </>
    );
}

export default function SettingsPage({
    user,
    usage,
    subscriptionStartDate,
    onUpgrade,
}: SettingsPageProps) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Only use usage for the current calendar month.
    const currentUsage =
        usage?.year === currentYear && usage?.month === currentMonth
            ? usage.requestCount
            : 0;

    const isPremium = user.isPremiumUser;
    const monthlyLimit = isPremium ? PREMIUM_LIMIT : FREE_LIMIT;
    const remaining = Math.max(0, monthlyLimit - currentUsage);
    const progress = Math.min(100, (currentUsage / monthlyLimit) * 100);
    const isNearLimit = remaining > 0 && progress >= 80;

    const subscriptionEndDate = (() => {
        if (!isPremium || !subscriptionStartDate) return null;

        const start = new Date(subscriptionStartDate);
        if (Number.isNaN(start.getTime())) return null;

        const end = new Date(start);
        end.setFullYear(end.getFullYear() + 1);
        return end;
    })();

    const daysLeft = subscriptionEndDate
        ? Math.max(
            0,
            Math.ceil(
                (subscriptionEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            )
        )
        : null;

    const monthName = now.toLocaleString("en", { month: "long" });

    const barColor =
        remaining === 0 ? "bg-amber-500" : isNearLimit ? "bg-amber-500" : "bg-red-600";

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                {/* Page heading */}
                <header>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 sm:text-base">
                        Manage your request allowance and subscription.
                    </p>
                </header>

                {/* Membership */}
                <section
                    aria-labelledby="membership-title"
                    className={`overflow-hidden rounded-2xl shadow-sm ${isPremium
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-900"
                        }`}
                >
                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div className="flex items-start gap-4">
                            <div
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${isPremium
                                    ? "bg-amber-400/15 text-amber-300"
                                    : "bg-red-50 text-red-600"
                                    }`}
                            >
                                {isPremium ? (
                                    <Crown className="h-7 w-7" aria-hidden="true" />
                                ) : (
                                    <Droplets className="h-7 w-7" aria-hidden="true" />
                                )}
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 id="membership-title" className="text-xl font-bold">
                                        {isPremium ? "Premium membership" : "Free membership"}
                                    </h2>

                                    {isPremium && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                                            Active
                                        </span>
                                    )}
                                </div>

                                <p
                                    className={`mt-1.5 max-w-lg text-sm leading-6 ${isPremium ? "text-slate-300" : "text-slate-600"
                                        }`}
                                >
                                    {isPremium
                                        ? `You can create up to ${PREMIUM_LIMIT} blood requests every month.`
                                        : `You can create up to ${FREE_LIMIT} blood requests every month. Upgrade for a higher allowance and direct donor contact.`}
                                </p>
                            </div>
                        </div>

                        {!isPremium && (
                            <Button
                                type="button"
                                onClick={onUpgrade}
                                disabled={!onUpgrade}
                                className="h-11 shrink-0 gap-2 rounded-xl bg-red-600 px-5 font-semibold text-white hover:bg-red-700"
                            >
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                                Upgrade to Premium
                            </Button>
                        )}
                    </div>

                    {/* Details */}
                    <dl
                        className={`grid border-t sm:grid-cols-2 ${isPremium
                            ? "divide-y divide-white/10 border-white/10 sm:divide-x sm:divide-y-0"
                            : "divide-y divide-slate-100 border-slate-100 sm:divide-x sm:divide-y-0"
                            }`}
                    >
                        <div className="flex items-start gap-3 px-6 py-4 sm:px-8">
                            <CalendarDays
                                className={`mt-0.5 h-5 w-5 shrink-0 ${isPremium ? "text-slate-400" : "text-slate-400"
                                    }`}
                                aria-hidden="true"
                            />
                            <div>
                                <dt
                                    className={`text-xs ${isPremium ? "text-slate-400" : "text-slate-500"
                                        }`}
                                >
                                    Billing period
                                </dt>
                                <dd className="mt-0.5 text-sm font-semibold">
                                    {isPremium ? "1 year" : "Monthly allowance"}
                                </dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 px-6 py-4 sm:px-8">
                            <ShieldCheck
                                className="mt-0.5 h-5 w-5 shrink-0 text-slate-400"
                                aria-hidden="true"
                            />
                            <div>
                                <dt
                                    className={`text-xs ${isPremium ? "text-slate-400" : "text-slate-500"
                                        }`}
                                >
                                    {isPremium ? "Expires on" : "Plan"}
                                </dt>
                                <dd className="mt-0.5 text-sm font-semibold">
                                    {isPremium
                                        ? subscriptionEndDate
                                            ? `${formatDate(subscriptionEndDate)}${daysLeft !== null ? ` · ${daysLeft} days left` : ""
                                            }`
                                            : "Start date unavailable"
                                        : "Free"}
                                </dd>
                            </div>
                        </div>
                    </dl>
                </section>

                {/* Usage + comparison */}
                <div className="grid items-start gap-6 lg:grid-cols-2">
                    {/* Monthly usage */}
                    <section
                        aria-labelledby="usage-title"
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2
                                    id="usage-title"
                                    className="flex items-center gap-2 text-lg font-bold text-slate-900"
                                >
                                    <TrendingUp
                                        className="h-5 w-5 text-red-600"
                                        aria-hidden="true"
                                    />
                                    Monthly usage
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    {monthName} {currentYear}
                                </p>
                            </div>

                            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                {currentUsage} of {monthlyLimit} used
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-medium text-slate-500">
                                    Requests created
                                </p>
                                <p className="mt-1 text-3xl font-bold text-slate-900">
                                    {currentUsage}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-medium text-slate-500">
                                    Requests remaining
                                </p>
                                <p
                                    className={`mt-1 text-3xl font-bold ${remaining === 0 ? "text-amber-600" : "text-red-600"
                                        }`}
                                >
                                    {remaining}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                <span className="font-medium text-slate-700">
                                    Monthly allowance
                                </span>
                                <span className="text-slate-500">{Math.round(progress)}%</span>
                            </div>

                            <div
                                className="h-2.5 overflow-hidden rounded-full bg-slate-100"
                                role="progressbar"
                                aria-label="Monthly request usage"
                                aria-valuemin={0}
                                aria-valuemax={monthlyLimit}
                                aria-valuenow={Math.min(currentUsage, monthlyLimit)}
                            >
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                {remaining > 0
                                    ? `You can create ${remaining} more ${remaining === 1 ? "request" : "requests"
                                    } this month. Your allowance resets next month.`
                                    : "You have reached your monthly request limit. Your allowance resets next month."}
                            </p>
                        </div>
                    </section>

                    {/* Plan comparison */}
                    <section
                        aria-labelledby="plans-title"
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <h2 id="plans-title" className="text-lg font-bold text-slate-900">
                            Plan comparison
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            See what each plan includes.
                        </p>

                        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 text-xs text-slate-500">
                                        <th scope="col" className="px-4 py-3 text-left font-medium">
                                            Feature
                                        </th>
                                        <th
                                            scope="col"
                                            className={`w-20 px-2 py-3 text-center font-medium ${!isPremium ? "text-slate-900" : ""
                                                }`}
                                        >
                                            Free
                                        </th>
                                        <th
                                            scope="col"
                                            className={`w-20 px-2 py-3 text-center font-medium ${isPremium ? "text-red-600" : ""
                                                }`}
                                        >
                                            Premium
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {comparison.map((row) => (
                                        <tr key={row.feature}>
                                            <th
                                                scope="row"
                                                className="px-4 py-3 text-left font-medium text-slate-700"
                                            >
                                                {row.feature}
                                            </th>
                                            <td className="px-2 py-3 text-center text-slate-600">
                                                <CellValue value={row.free} />
                                            </td>
                                            <td className="bg-red-50/50 px-2 py-3 text-center text-red-600">
                                                <CellValue value={row.premium} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {!isPremium && (
                            <Button
                                type="button"
                                onClick={onUpgrade}
                                disabled={!onUpgrade}
                                className="mt-5 h-11 w-full gap-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                            >
                                <Crown className="h-4 w-4" aria-hidden="true" />
                                Upgrade your plan
                            </Button>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}