"use client";

import { useMemo } from "react";
import { CheckCircle2, Droplets, Eye, History, MapPin, XCircle } from "lucide-react";

import type { IBloodRequest } from "@/types/dr.types";
import { formatDate } from "@/lib/formateDate";

interface RequestHistoryProps {
    requests?: IBloodRequest[];
    onView?: (requestId: string) => void;
}

enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    MATCHING = "MATCHING",
    DONOR_ASSIGNED = "DONOR_ASSIGNED",
    FULFILLED = "FULFILLED",
    CANCELLED = "CANCELLED",
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
    [RequestStatus.FULFILLED]: {
        label: "Fulfilled",
        className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    },
    [RequestStatus.CANCELLED]: {
        label: "Cancelled",
        className: "bg-slate-100 text-slate-600 ring-slate-200",
    },
};

function StatusBadge({ status }: { status: string }) {
    const style = STATUS_STYLES[status] ?? {
        label: status.replaceAll("_", " "),
        className: "bg-slate-100 text-slate-600 ring-slate-200",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style.className}`}
        >
            {status === RequestStatus.FULFILLED && (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {status === RequestStatus.CANCELLED && (
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {style.label}
        </span>
    );
}

function BloodGroupBadge({ group }: { group: string }) {
    return (
        <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-base font-black text-rose-700"
            aria-label={`Blood group ${group}`}
        >
            {group}
        </span>
    );
}



function ViewButton({ onClick, id }: { onClick: () => void; id: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`View request ${id}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
            <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
    );
}

export function RequestHistory({ requests, onView }: RequestHistoryProps) {
    const previousRequests = useMemo(
        () =>
            (requests ?? [])
                .filter(
                    (request) =>
                        request.status === RequestStatus.CANCELLED ||
                        request.status === RequestStatus.FULFILLED
                )
                .sort(
                    (a, b) =>
                        new Date(b.requiredAt as unknown as string).getTime() -
                        new Date(a.requiredAt as unknown as string).getTime()
                ),
        [requests]
    );

    const fulfilledCount = previousRequests.filter(
        (request) => request.status === RequestStatus.FULFILLED
    ).length;
    const cancelledCount = previousRequests.length - fulfilledCount;

    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <header className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <History className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                            Request history
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Your fulfilled and cancelled blood requests.
                        </p>
                    </div>
                </div>

                {previousRequests.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {fulfilledCount} fulfilled
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 ring-1 ring-inset ring-slate-200">
                            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            {cancelledCount} cancelled
                        </span>
                    </div>
                )}
            </header>

            {previousRequests.length === 0 ? (
                <div className="flex flex-col items-center px-5 py-14 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-8 ring-slate-50">
                        <History className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-slate-800">
                        No request history yet
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
                        Requests you fulfil or cancel will be listed here.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold text-slate-500">
                                    <th scope="col" className="px-7 py-3">Blood group</th>
                                    <th scope="col" className="px-4 py-3">Hospital</th>
                                    <th scope="col" className="px-4 py-3">Units</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3">Requested on</th>
                                    <th scope="col" className="px-7 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {previousRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="transition-colors hover:bg-slate-50/70"
                                    >
                                        <td className="px-7 py-4">
                                            <div className="flex items-center gap-3">
                                                <p>{request.bloodGroup} </p>
                                                <span
                                                    className="text-xs text-slate-400"
                                                    title={request.id}
                                                >
                                                    #{request.id.slice(-6)}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="max-w-[260px] px-4 py-4">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {request.hospitalName || "Not provided"}
                                            </p>
                                            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                                                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                                                <span className="truncate">
                                                    {request.hospitalLocation || "Not provided"}
                                                </span>
                                            </p>
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium text-slate-700">
                                            {request.requiredUnits}{" "}
                                            {request.requiredUnits === 1 ? "bag" : "bags"}
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge status={request.status} />
                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-500">
                                            {formatDate(request.requiredAt)}
                                        </td>

                                        <td className="px-7 py-4 text-right">
                                            {onView && (
                                                <ViewButton
                                                    id={request.id}
                                                    onClick={() => onView(request.id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile list */}
                    <ul className="divide-y divide-slate-100 md:hidden">
                        {previousRequests.map((request) => (
                            <li key={request.id} className="flex items-start gap-3 px-4 py-4">
                                <BloodGroupBadge group={request.bloodGroup} />

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {request.hospitalName || "Not provided"}
                                        </p>
                                        <StatusBadge status={request.status} />
                                    </div>

                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                                        <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                                        <span className="truncate">
                                            {request.hospitalLocation || "Not provided"}
                                        </span>
                                    </p>

                                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Droplets className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                                            {request.requiredUnits}{" "}
                                            {request.requiredUnits === 1 ? "bag" : "bags"}
                                            <span aria-hidden="true">•</span>
                                            {formatDate(request.requiredAt)}
                                        </span>

                                        {onView && (
                                            <ViewButton
                                                id={request.id}
                                                onClick={() => onView(request.id)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
}

export default RequestHistory;