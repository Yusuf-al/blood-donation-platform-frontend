"use client";

import { useState } from "react";
import {
    AlertCircle,
    ArrowUpRight,
    CalendarClock,
    Clock3,
    Droplets,
    Hospital,
    MapPin,
    Phone,
    UserRound,
    LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import type { IBloodRequest } from "@/types/dr.types";
import { BloodRequestStatusUpdateApi } from "@/api/br.api";

import ActiveBloodRequestDetailsDialog, {
    ACTIVE_REQUEST_STATUSES,
    formatDate,
    formatStatus,
    getActiveAssignments,
    getAssignmentStatus,
    getRequestStatusClass,
    type RequestStatusAction,
} from "./active-blood-request-details-dialog";

interface ActiveBloodRequestsProps {
    requests?: IBloodRequest[];
    onView?: (requestId: string) => void;
    onUpdateStatus?: (
        requestId: string,
        status: RequestStatusAction
    ) => void | Promise<void>;
    refetch?: () => void | Promise<unknown>;
    isUpdating?: boolean;
    isRequester?: boolean;
}

const URGENT_LEVELS = ["HIGH", "CRITICAL", "EMERGENCY"];

/** Short relative label such as "5h left" or "2d left". Returns null if the date is unusable. */
function getTimeLeft(value: unknown): { label: string; overdue: boolean; soon: boolean } | null {
    if (!value) return null;

    const target = new Date(value as string);
    if (Number.isNaN(target.getTime())) return null;

    const diff = target.getTime() - Date.now();
    const hours = Math.floor(Math.abs(diff) / 36e5);

    if (diff < 0) {
        return { label: "Overdue", overdue: true, soon: false };
    }

    if (hours < 1) {
        return { label: "Under 1h left", overdue: false, soon: true };
    }

    if (hours < 24) {
        return { label: `${hours}h left`, overdue: false, soon: true };
    }

    return { label: `${Math.floor(hours / 24)}d left`, overdue: false, soon: false };
}

export function ActiveBloodRequests({
    requests = [],
    onUpdateStatus,
    refetch,
    isUpdating = false,
    isRequester = true,
}: ActiveBloodRequestsProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [localUpdating, setLocalUpdating] = useState(false);

    const selectedRequest =
        requests.find((request) => request.id === selectedId) ?? null;

    const activeRequests = requests.filter((request) =>
        ACTIVE_REQUEST_STATUSES.includes(request.status)
    );

    const urgentCount = activeRequests.filter((request) =>
        URGENT_LEVELS.includes(request.urgency?.toUpperCase() ?? "")
    ).length;

    const updating = isUpdating || localUpdating;

    const handleView = (request: IBloodRequest) => {
        setSelectedId(request.id);
    };

    const handleUpdateStatus = async (
        requestId: string,
        status: RequestStatusAction
    ) => {
        if (updating) return;

        setLocalUpdating(true);

        try {
            if (onUpdateStatus) {
                await onUpdateStatus(requestId, status);
            } else {
                await BloodRequestStatusUpdateApi(requestId, { status });
            }

            toast.success(
                status === "FULFILLED"
                    ? "Blood request marked as fulfilled."
                    : "Blood request cancelled successfully."
            );

            await refetch?.();
            setSelectedId(null);
        } catch (error) {
            console.error("Failed to update blood request status:", error);

            toast.error(
                status === "FULFILLED"
                    ? "Failed to mark the request as fulfilled."
                    : "Failed to cancel the blood request."
            );
        } finally {
            setLocalUpdating(false);
        }
    };

    return (
        <>
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <header className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-rose-50/70 via-white to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-600/25">
                            <Droplets className="h-6 w-6" aria-hidden="true" />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                                Active blood requests
                            </h2>
                            <p className="mt-0.5 text-sm text-slate-500">
                                Track your requests and the donors assigned to them.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {urgentCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
                                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                {urgentCount} urgent
                            </span>
                        )}

                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            {activeRequests.length}{" "}
                            {activeRequests.length === 1 ? "active request" : "active requests"}
                        </span>
                    </div>
                </header>

                <div className="bg-slate-50/50 p-4 sm:p-6">
                    {activeRequests.length === 0 ? (
                        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-8 ring-rose-50/60">
                                <Droplets className="h-7 w-7" aria-hidden="true" />
                            </div>

                            <h3 className="mt-5 text-base font-semibold text-slate-800">
                                No active blood requests
                            </h3>

                            <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
                                Requests that are in progress will show up here, along with any
                                donors assigned to them.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                            {activeRequests.map((request) => {
                                const donors =
                                    request.status === "DONOR_ASSIGNED"
                                        ? getActiveAssignments(request.assignments)
                                        : [];

                                const isUrgent = URGENT_LEVELS.includes(
                                    request.urgency?.toUpperCase() ?? ""
                                );

                                const timeLeft = getTimeLeft(request.requiredAt);

                                return (
                                    <article
                                        key={request.id}
                                        className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow duration-200 hover:shadow-md ${isUrgent ? "border-rose-200" : "border-slate-200"
                                            }`}
                                    >
                                        {/* Urgency accent */}
                                        <span
                                            aria-hidden="true"
                                            className={`absolute inset-y-0 left-0 w-1 ${isUrgent ? "bg-rose-500" : "bg-amber-400"
                                                }`}
                                        />

                                        <div className="flex-1 p-4 pl-5 sm:p-5 sm:pl-6">
                                            {/* Blood group and statuses */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex min-w-0 items-center gap-4">
                                                    <div
                                                        className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-rose-200 bg-rose-50"
                                                        aria-label={`Blood group ${request.bloodGroup}`}
                                                    >
                                                        <Droplets className="h-4 w-4 text-rose-500" aria-hidden="true" />

                                                    </div>

                                                    <div className="min-w-0  ">
                                                        <h3 className="text-lg font-bold leading-tight text-slate-900">
                                                            <p className="text-2xl font-black leading-none tracking-tight text-rose-700">
                                                                {request.bloodGroup}
                                                            </p>
                                                            {request.requiredUnits}{" "}
                                                            {request.requiredUnits === 1 ? "unit" : "units"} needed
                                                        </h3>

                                                        <p
                                                            className="mt-1 truncate text-xs text-slate-400"
                                                            title={request.id}
                                                        >
                                                            Request {request.id}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                                                    {request.urgency && (
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${isUrgent
                                                                ? "bg-rose-50 text-rose-700 ring-rose-200"
                                                                : "bg-amber-50 text-amber-700 ring-amber-200"
                                                                }`}
                                                        >
                                                            {isUrgent && (
                                                                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                                                            )}
                                                            {formatStatus(request.urgency)}
                                                        </span>
                                                    )}

                                                    <span
                                                        className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-center text-[11px] font-semibold ring-1 ring-inset ${getRequestStatusClass(
                                                            request.status
                                                        )}`}
                                                    >
                                                        {formatStatus(request.status)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hospital details */}
                                            <dl className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
                                                <div className="flex min-w-0 items-start gap-3">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
                                                        <Hospital className="h-4 w-4" aria-hidden="true" />
                                                    </span>

                                                    <div className="min-w-0">
                                                        <dt className="text-xs font-medium text-slate-400">
                                                            Hospital
                                                        </dt>
                                                        <dd className="mt-0.5 break-words text-sm font-semibold text-slate-800">
                                                            {request.hospitalName || "Not provided"}
                                                        </dd>
                                                    </div>
                                                </div>

                                                <div className="flex min-w-0 items-start gap-3">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
                                                        <MapPin className="h-4 w-4" aria-hidden="true" />
                                                    </span>

                                                    <div className="min-w-0">
                                                        <dt className="text-xs font-medium text-slate-400">
                                                            Location
                                                        </dt>
                                                        <dd className="mt-0.5 break-words text-sm font-semibold text-slate-800">
                                                            {request.hospitalLocation || "Not provided"}
                                                        </dd>
                                                    </div>
                                                </div>
                                            </dl>

                                            {/* Assigned donors */}
                                            {donors.length > 0 && (
                                                <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                                                    <div className="mb-3 flex items-center justify-between gap-2">
                                                        <h4 className="flex items-center gap-2 text-sm font-semibold text-sky-900">
                                                            <UserRound className="h-4 w-4" aria-hidden="true" />
                                                            Assigned donors
                                                        </h4>

                                                        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-sky-700 ring-1 ring-inset ring-sky-100">
                                                            {donors.length}
                                                        </span>
                                                    </div>

                                                    <ul className="divide-y divide-sky-100">
                                                        {donors.map((assignment) => {
                                                            const name =
                                                                assignment.donor?.name || "Unnamed donor";

                                                            const assignmentStatus = getAssignmentStatus(
                                                                assignment.status
                                                            );

                                                            return (
                                                                <li
                                                                    key={assignment.id}
                                                                    className="flex min-w-0 flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                                                >
                                                                    <div className="flex min-w-0 items-center gap-3">
                                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                                                                            {name.charAt(0).toUpperCase()}
                                                                        </div>

                                                                        <div className="min-w-0">
                                                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                                                {name}
                                                                            </p>

                                                                            <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                                                                {assignment.donor?.phone && (
                                                                                    <a
                                                                                        href={`tel:${assignment.donor.phone}`}
                                                                                        className="inline-flex items-center gap-1 rounded hover:text-sky-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                                                                    >
                                                                                        <Phone className="h-3 w-3" aria-hidden="true" />
                                                                                        {assignment.donor.phone}
                                                                                    </a>
                                                                                )}

                                                                                {assignment.donorProfile?.city && (
                                                                                    <span className="inline-flex items-center gap-1">
                                                                                        <MapPin className="h-3 w-3" aria-hidden="true" />
                                                                                        {assignment.donorProfile.city}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <span
                                                                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${assignmentStatus.className}`}
                                                                    >
                                                                        {assignmentStatus.label}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}

                                            {request.status === "DONOR_ASSIGNED" &&
                                                donors.length === 0 && (
                                                    <div
                                                        className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5"
                                                        role="note"
                                                    >
                                                        <Clock3
                                                            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                                                            aria-hidden="true"
                                                        />
                                                        <p className="text-xs leading-5 text-amber-800">
                                                            A donor has been assigned, but their details aren't
                                                            available yet.
                                                        </p>
                                                    </div>
                                                )}
                                        </div>

                                        {/* Card footer */}
                                        <footer className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-3.5 pl-5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pl-6">
                                            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
                                                <span className="inline-flex items-center gap-2">
                                                    <CalendarClock
                                                        className="h-4 w-4 shrink-0 text-slate-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span>
                                                        Needed by{" "}
                                                        <span className="font-semibold text-slate-800">
                                                            {formatDate(request.requiredAt, false)}
                                                        </span>
                                                    </span>
                                                </span>

                                                {timeLeft && (
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${timeLeft.overdue
                                                            ? "bg-rose-100 text-rose-700"
                                                            : timeLeft.soon
                                                                ? "bg-amber-100 text-amber-800"
                                                                : "bg-slate-200/70 text-slate-600"
                                                            }`}
                                                    >
                                                        {timeLeft.label}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleView(request)}
                                                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                            >
                                                View details
                                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </footer>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Request details dialog */}
            <ActiveBloodRequestDetailsDialog
                request={selectedRequest}
                open={selectedRequest !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedId(null);
                }}
                isRequester={isRequester}
                onUpdateStatus={handleUpdateStatus}
                isUpdating={updating}
            />

            {/* Screen-reader announcement while a status update is running */}
            {updating && (
                <span className="sr-only" role="status" aria-live="polite">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Updating blood request
                </span>
            )}
        </>
    );
}

export default ActiveBloodRequests;