
"use client";

import { useDonationRecords } from "@/hooks/assign.hook";
import { IDonationHistory } from "@/types/assignment.types";
import {
    CalendarDays,
    Droplets,
    HeartHandshake,
    Loader2,
    UserRound,
} from "lucide-react";

function formatDate(date: string | null | undefined) {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return new Intl.DateTimeFormat("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(parsedDate);
}

function getStatusStyle(status: string) {
    switch (status.toUpperCase()) {
        case "COMPLETED":
            return "bg-green-50 text-green-700 ring-green-600/20";
        case "SCHEDULED":
            return "bg-blue-50 text-blue-700 ring-blue-600/20";
        case "VERIFIED":
            return "bg-green-100 text-green-700 ring-green-600/20";
        case "CANCELLED":
            return "bg-red-50 text-red-700 ring-red-600/20";
        default:
            return "bg-slate-100 text-slate-700 ring-slate-500/20";
    }
}




function DonationPage() {
    const { data: records, isPending, isError, error } =
        useDonationRecords();

    // Adjust this path if your API returns a different response shape.
    const donations: IDonationHistory[] = records?.data ?? [];

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                <p className="text-sm text-slate-500">
                    Loading donation records...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="font-semibold text-red-700">
                    Failed to load donation records
                </p>
                <p className="mt-1 text-sm text-red-600">
                    {error instanceof Error
                        ? error.message
                        : "Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <HeartHandshake className="h-6 w-6 text-red-600" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Donation History
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View recorded donations and their associated donor assignments.
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
                        <Droplets className="h-5 w-5 text-red-600" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Total donation records
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                            {donations.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Donations table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                    <h2 className="font-semibold text-slate-900">
                        All Donations
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Donation records with requester and donor information.
                    </p>
                </div>

                {donations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Droplets className="h-7 w-7 text-slate-400" />
                        </div>
                        <h3 className="mt-4 font-semibold text-slate-900">
                            No donation records found
                        </h3>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                            Donation records will appear here when they are available.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1150px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Donation</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 font-semibold">Blood Group</th>
                                    <th className="px-5 py-4 font-semibold">Donor</th>
                                    <th className="px-5 py-4 font-semibold">Requester</th>
                                    <th className="px-5 py-4 font-semibold">Assigned At</th>
                                    <th className="px-5 py-4 font-semibold">Responded At</th>
                                    <th className="px-5 py-4 font-semibold">Notes</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {donations.map((donation, index) => {
                                    const assignment = donation.assignment;

                                    return (
                                        <tr
                                            key={`${assignment.id}-${donation.donatedAt}-${index}`}
                                            className="transition-colors hover:bg-slate-50/80"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                                                        <CalendarDays className="h-4 w-4 text-red-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">
                                                            {formatDate(donation.donatedAt)}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            Created {formatDate(assignment.request.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(donation.status)}`}
                                                >
                                                    {donation.status.replaceAll("_", " ")}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex h-9 min-w-12 items-center justify-center rounded-lg bg-red-50 px-3 font-bold text-red-700">
                                                    {assignment.request.bloodGroup}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {assignment.donor.imageUrl ? (
                                                        <img
                                                            src={assignment.donor.imageUrl}
                                                            alt={assignment.donor.name}
                                                            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                                                            <UserRound className="h-4 w-4 text-slate-500" />
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-slate-800">
                                                        {assignment.donor.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {assignment.request.requester.imageUrl ? (
                                                        <img
                                                            src={assignment.request.requester.imageUrl}
                                                            alt={assignment.request.requester.name}
                                                            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                                                            <UserRound className="h-4 w-4 text-slate-500" />
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-slate-800">
                                                        {assignment.request.requester.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                {formatDate(assignment.assignedAt)}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                {formatDate(assignment.respondedAt)}
                                            </td>

                                            <td className="max-w-52 px-5 py-4">
                                                <p
                                                    className="truncate text-slate-600"
                                                    title={donation.notes ?? ""}
                                                >
                                                    {donation.notes || "—"}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {donations.length > 0 && (
                    <div className="border-t border-slate-200 px-5 py-3">
                        <p className="text-xs text-slate-500">
                            Showing {donations.length} donation{" "}
                            {donations.length === 1 ? "record" : "records"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DonationPage;

