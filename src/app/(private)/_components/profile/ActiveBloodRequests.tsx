"use client";

import { useState } from "react";
import {
    Clock3,
    Droplets,
    Hospital,
    MapPin,
    Phone,
    UserRound,
    ArrowUpRight,
    CalendarClock,
} from "lucide-react";

import ActiveBloodRequestDetailsDialog, {
    ACTIVE_REQUEST_STATUSES,
    formatDate,
    formatStatus,
    getActiveAssignments,
    getAssignmentStatus,
    getRequestStatusClass,
    type RequestStatusAction,
} from "./active-blood-request-details-dialog";
import { IBloodRequest } from "@/types/dr.types";

interface ActiveBloodRequestsProps {
    requests?: IBloodRequest[];
    onView?: (requestId: string) => void;
    onUpdateStatus?: (
        requestId: string,
        status: RequestStatusAction
    ) => void | Promise<void>;
    isUpdating?: boolean;
    isRequester?: boolean;
}

const URGENT_LEVELS = ["HIGH", "CRITICAL", "EMERGENCY"];

export function ActiveBloodRequests({
    requests = [],
    onUpdateStatus,
    isUpdating = false,
    isRequester = true,
}: ActiveBloodRequestsProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedRequest =
        requests.find((request) => request.id === selectedId) ?? null;

    const activeRequests = requests.filter((request) =>
        ACTIVE_REQUEST_STATUSES.includes(request.status)
    );

    const handleView = (request: IBloodRequest) => {
        setSelectedId(request.id);
    };

    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <header className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100">
                            <Droplets className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                                Active Blood Requests
                            </h2>
                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                Monitor requests and track assigned donors.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {activeRequests.length}{" "}
                            {activeRequests.length === 1 ? "active request" : "active requests"}
                        </span>
                    </div>
                </header>

                <div className="p-4 sm:p-6">
                    {activeRequests.length === 0 ? (
                        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-12 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                                <Droplets className="h-7 w-7" aria-hidden="true" />
                            </div>
                            <p className="mt-4 text-sm font-semibold text-slate-800">
                                No active blood requests
                            </p>
                            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                                Requests that are currently in progress will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            {activeRequests.map((request) => {
                                const donors =
                                    request.status === "DONOR_ASSIGNED"
                                        ? getActiveAssignments(request.assignments)
                                        : [];
                                const isUrgent = URGENT_LEVELS.includes(
                                    request.urgency?.toUpperCase()
                                );

                                return (
                                    <article
                                        key={request.id}
                                        className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:border-rose-200 hover:shadow-md hover:shadow-slate-200/50"
                                    >
                                        <div className="flex-1 p-4 sm:p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-700">
                                                        <Droplets
                                                            className="mb-0.5 h-4 w-4 text-rose-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="text-sm font-bold leading-none">
                                                            {request.bloodGroup}
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-base font-semibold text-slate-900">
                                                            {request.requiredUnits}{" "}
                                                            {request.requiredUnits === 1 ? "unit" : "units"}{" "}
                                                            required
                                                        </p>
                                                        <p className="mt-1 break-all text-xs text-slate-500">
                                                            Request ID: {request.id}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex max-w-[45%] shrink-0 flex-col items-end gap-1.5">
                                                    {request.urgency && (
                                                        <span
                                                            className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${isUrgent
                                                                ? "bg-rose-50 text-rose-700 ring-rose-200"
                                                                : "bg-amber-50 text-amber-700 ring-amber-200"
                                                                }`}
                                                        >
                                                            {formatStatus(request.urgency)}
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${getRequestStatusClass(
                                                            request.status
                                                        )}`}
                                                    >
                                                        {formatStatus(request.status)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-2">
                                                <div className="flex min-w-0 items-start gap-2.5">
                                                    <MapPin
                                                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                                                        aria-hidden="true"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                            Location
                                                        </p>
                                                        <p className="mt-1 break-words text-sm font-medium text-slate-700">
                                                            {request.hospitalLocation || "Not provided"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex min-w-0 items-start gap-2.5">
                                                    <Hospital
                                                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                                                        aria-hidden="true"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                            Hospital
                                                        </p>
                                                        <p className="mt-1 break-words text-sm font-medium text-slate-700">
                                                            {request.hospitalName || "Not provided"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {donors.length > 0 && (
                                                <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/60 p-3.5">
                                                    <div className="mb-3 flex items-center justify-between gap-2">
                                                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-800">
                                                            <UserRound className="h-4 w-4" aria-hidden="true" />
                                                            Assigned donors
                                                        </p>
                                                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-sky-700 ring-1 ring-inset ring-sky-100">
                                                            {donors.length}
                                                        </span>
                                                    </div>

                                                    <ul className="divide-y divide-sky-100">
                                                        {donors.map((assignment) => {
                                                            const name =
                                                                assignment.donor?.name || "Unnamed donor";
                                                            const status = getAssignmentStatus(
                                                                assignment.status
                                                            );

                                                            return (
                                                                <li
                                                                    key={assignment.id}
                                                                    className="flex min-w-0 flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                                                >
                                                                    <div className="flex min-w-0 items-center gap-3">
                                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-sky-800 ring-1 ring-inset ring-sky-100">
                                                                            {name.charAt(0).toUpperCase()}
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                                                {name}
                                                                            </p>
                                                                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                                                                {assignment.donor?.phone && (
                                                                                    <span className="inline-flex items-center gap-1">
                                                                                        <Phone
                                                                                            className="h-3 w-3"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        {assignment.donor.phone}
                                                                                    </span>
                                                                                )}
                                                                                {assignment.donorProfile?.city && (
                                                                                    <span className="inline-flex items-center gap-1">
                                                                                        <MapPin
                                                                                            className="h-3 w-3"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        {assignment.donorProfile.city}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${status.className}`}
                                                                    >
                                                                        {status.label}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        <footer className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                            <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
                                                <CalendarClock
                                                    className="h-4 w-4 shrink-0 text-slate-400"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    Needed by{" "}
                                                    <span className="font-medium text-slate-700">
                                                        {formatDate(request.requiredAt, false)}
                                                    </span>
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleView(request)}
                                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                                            >
                                                View details
                                                <ArrowUpRight
                                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </footer>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <ActiveBloodRequestDetailsDialog
                request={selectedRequest}
                open={selectedRequest !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedId(null);
                }}
                isRequester={isRequester}
                onUpdateStatus={async (requestId, status) => {
                    await onUpdateStatus?.(requestId, status);
                }}
                isUpdating={isUpdating}
            />
        </>
    );
}

export default ActiveBloodRequests;
