"use client";

import { useState } from "react";

import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock,
    Droplets,
    Hospital,
    Loader2,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import { BloodDonationAssignment, IBloodRequest } from "@/types/dr.types";

/* -------------------------------------------------------------------------- */
/* Shared helpers (also imported by the list component)                        */
/* -------------------------------------------------------------------------- */

export type RequestStatus = IBloodRequest["status"];
export type RequestStatusAction = "FULFILLED" | "CANCELLED";

export const ACTIVE_REQUEST_STATUSES: RequestStatus[] = [
    "PENDING",
    "APPROVED",
    "MATCHING",
    "DONOR_ASSIGNED",
];

export function formatStatus(value?: string | null) {
    return value ? value.replaceAll("_", " ") : "";
}

export function formatDate(
    value?: string | Date | null,
    withTime = true
) {
    if (!value) return "Not provided";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not available";

    return date.toLocaleString(
        undefined,
        withTime
            ? { dateStyle: "medium", timeStyle: "short" }
            : { dateStyle: "medium" }
    );
}

export function getRequestStatusClass(status?: string) {
    switch (status) {
        case "PENDING":
            return "bg-amber-50 text-amber-700 ring-amber-200";
        case "APPROVED":
            return "bg-green-50 text-green-700 ring-green-200";
        case "MATCHING":
            return "bg-purple-50 text-purple-700 ring-purple-200";
        case "DONOR_ASSIGNED":
            return "bg-blue-50 text-blue-700 ring-blue-200";
        case "FULFILLED":
            return "bg-emerald-50 text-emerald-700 ring-emerald-200";
        case "CANCELLED":
            return "bg-red-50 text-red-700 ring-red-200";
        default:
            return "bg-slate-100 text-slate-700 ring-slate-200";
    }
}

export function getAssignmentStatus(status?: string) {
    switch (status) {
        case "CREATED":
            return {
                label: "Awaiting response",
                className: "bg-amber-50 text-amber-700 ring-amber-200",
            };
        case "ACCEPTED":
            return {
                label: "Accepted",
                className: "bg-green-50 text-green-700 ring-green-200",
            };
        case "COMPLETED":
            return {
                label: "Completed",
                className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
            };
        case "REJECTED":
            return {
                label: "Declined",
                className: "bg-red-50 text-red-700 ring-red-200",
            };
        default:
            return {
                label: formatStatus(status) || "Unknown",
                className: "bg-slate-100 text-slate-700 ring-slate-200",
            };
    }
}

/** Assignments whose donor is still part of the request (declined ones are excluded). */
export function getActiveAssignments(
    assignments?: BloodDonationAssignment[] | null
) {
    return (assignments ?? []).filter(
        (assignment) => assignment.status !== "REJECTED"
    );
}

/* -------------------------------------------------------------------------- */
/* Small UI pieces                                                             */
/* -------------------------------------------------------------------------- */

function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value?: string | number | null;
}) {
    const text =
        value === null || value === undefined || value === ""
            ? "Not provided"
            : String(value);

    return (
        <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="shrink-0 rounded-md bg-red-50 p-1.5">
                <Icon className="h-3.5 w-3.5 text-red-600" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] leading-tight text-slate-500">
                    {label}
                </p>
                <p
                    title={text}
                    className="truncate text-sm font-medium leading-snug text-slate-800"
                >
                    {text}
                </p>
            </div>
        </div>
    );
}

function DonorDetail({
    icon: Icon,
    children,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
            <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <div className="min-w-0 truncate">{children}</div>
        </div>
    );
}

function DonorCard({
    assignment,
    wide,
}: {
    assignment: BloodDonationAssignment;
    /** true when the card spans the full width (single donor) */
    wide: boolean;
}) {
    const donor = assignment.donor;
    const profile = assignment.donorProfile;
    const status = getAssignmentStatus(assignment.status);

    const name = donor?.name || "Unnamed donor";
    const location = [profile?.address, profile?.city]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                        {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {name}
                        </p>
                        <p className="text-xs text-slate-500">
                            Assigned {formatDate(assignment.assignedAt, false)}
                        </p>
                    </div>
                </div>

                <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                >
                    {status.label}
                </span>
            </div>

            <div
                className={`mt-3 grid gap-1.5 rounded-lg bg-slate-50 px-3 py-2 ${wide ? "sm:grid-cols-2" : ""
                    }`}
            >
                <DonorDetail icon={Phone}>
                    {donor?.phone ? (
                        <a
                            href={`tel:${donor.phone}`}
                            className="font-medium text-slate-800 hover:underline"
                        >
                            {donor.phone}
                        </a>
                    ) : (
                        "Not provided"
                    )}
                </DonorDetail>

                <DonorDetail icon={Mail}>
                    {donor?.email ? (
                        <a
                            href={`mailto:${donor.email}`}
                            title={donor.email}
                            className="font-medium text-slate-800 hover:underline"
                        >
                            {donor.email}
                        </a>
                    ) : (
                        "Not provided"
                    )}
                </DonorDetail>

                <DonorDetail icon={MapPin}>
                    <span title={location}>
                        {location || "Location not provided"}
                    </span>
                </DonorDetail>

                <DonorDetail icon={Droplets}>
                    Blood group:{" "}
                    <span className="font-medium text-slate-800">
                        {profile?.bloodGroup || "Not provided"}
                    </span>
                </DonorDetail>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Dialog                                                                      */
/* -------------------------------------------------------------------------- */

interface ActiveBloodRequestDetailsDialogProps {
    request: IBloodRequest | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isRequester: boolean;
    onUpdateStatus: (
        requestId: string,
        status: RequestStatusAction
    ) => void | Promise<void>;
    isUpdating?: boolean;
}

const CONFIRM_COPY: Record<
    RequestStatusAction,
    { title: string; description: string; confirmText: string }
> = {
    FULFILLED: {
        title: "Mark request as fulfilled?",
        description:
            "Confirm that the blood donation for this request has been completed.",
        confirmText: "Mark Fulfilled",
    },
    CANCELLED: {
        title: "Cancel this request?",
        description:
            "This will cancel your blood request. This action cannot be undone.",
        confirmText: "Cancel Request",
    },
};

export default function ActiveBloodRequestDetailsDialog({
    request,
    open,
    onOpenChange,
    isRequester,
    onUpdateStatus,
    isUpdating = false,
}: ActiveBloodRequestDetailsDialogProps) {
    const [confirmAction, setConfirmAction] =
        useState<RequestStatusAction | null>(null);
    const [pendingAction, setPendingAction] =
        useState<RequestStatusAction | null>(null);

    if (!request) return null;

    const assignments = request.assignments ?? [];
    const declinedCount = assignments.filter(
        (assignment) => assignment.status === "REJECTED"
    ).length;
    const activeAssignments = getActiveAssignments(assignments);

    const isBusy = isUpdating || pendingAction !== null;
    const canUpdateStatus =
        isRequester && ACTIVE_REQUEST_STATUSES.includes(request.status);

    const handleConfirm = async () => {
        if (!confirmAction) return;

        try {
            setPendingAction(confirmAction);
            await onUpdateStatus(request.id, confirmAction);
            setConfirmAction(null);
            onOpenChange(false);
        } catch {
            // The parent is responsible for surfacing the error (e.g. a toast).
        } finally {
            setPendingAction(null);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                {/*
                  Wider + compact so everything fits without a scrollbar on
                  tablet/desktop. Scrolling is kept only on very small screens,
                  where the content physically cannot fit.
                */}
                <DialogContent className="max-h-[calc(100dvh-1.5rem)] gap-0 overflow-y-auto p-0 sm:max-w-3xl sm:overflow-visible">
                    {/* Header */}
                    <div className="rounded-t-lg border-b bg-gradient-to-r from-red-50 to-white px-5 py-4 sm:px-6">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="shrink-0 rounded-xl bg-red-100 p-2.5">
                                    <Droplets className="h-5 w-5 text-red-600" />
                                </div>

                                <div className="min-w-0 flex-1 pr-6">
                                    <DialogTitle className="text-lg font-bold leading-tight text-slate-900">
                                        Blood Request Details
                                    </DialogTitle>

                                    <DialogDescription className="mt-0.5 truncate text-xs">
                                        Request ID: {request.id}
                                    </DialogDescription>
                                </div>

                                <div className="hidden shrink-0 flex-wrap items-center justify-end gap-2 sm:flex">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getRequestStatusClass(
                                            request.status
                                        )}`}
                                    >
                                        {formatStatus(request.status)}
                                    </span>

                                    {request.urgency && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                                            <AlertCircle className="h-3 w-3" />
                                            {formatStatus(request.urgency)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Badges drop below the title on mobile */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-2 sm:hidden">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getRequestStatusClass(
                                        request.status
                                    )}`}
                                >
                                    {formatStatus(request.status)}
                                </span>

                                {request.urgency && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                                        <AlertCircle className="h-3 w-3" />
                                        {formatStatus(request.urgency)}
                                    </span>
                                )}
                            </div>
                        </DialogHeader>
                    </div>

                    {/* Body */}
                    <div className="space-y-4 px-5 py-4 sm:px-6">
                        {/* Request information */}
                        <section>
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">
                                Request Information
                            </h3>

                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    icon={Droplets}
                                    label="Blood Group"
                                    value={request.bloodGroup}
                                />

                                <InfoItem
                                    icon={Droplets}
                                    label="Required Units"
                                    value={`${request.requiredUnits} bag(s)`}
                                />

                                <InfoItem
                                    icon={Clock}
                                    label="Required At"
                                    value={formatDate(request.requiredAt)}
                                />

                                <InfoItem
                                    icon={Hospital}
                                    label="Hospital"
                                    value={request.hospitalName}
                                />

                                <InfoItem
                                    icon={MapPin}
                                    label="Hospital Location"
                                    value={request.hospitalLocation}
                                />

                                <InfoItem
                                    icon={Phone}
                                    label="Contact Phone"
                                    value={request.contactPhone}
                                />

                                {request.verifiedAt && (
                                    <InfoItem
                                        icon={ShieldCheck}
                                        label="Verified At"
                                        value={formatDate(request.verifiedAt)}
                                    />
                                )}

                                {request.fulfilledAt && (
                                    <InfoItem
                                        icon={CalendarDays}
                                        label="Fulfilled At"
                                        value={formatDate(request.fulfilledAt)}
                                    />
                                )}
                            </div>

                            {request.description && (
                                <div className="mt-2 rounded-lg border border-slate-200 px-3 py-2">
                                    <p className="text-[11px] leading-tight text-slate-500">
                                        Description
                                    </p>
                                    <p
                                        title={request.description}
                                        className="mt-0.5 line-clamp-2 whitespace-pre-wrap text-sm text-slate-700"
                                    >
                                        {request.description}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Assigned donor(s) */}
                        <section>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                    <UserRound className="h-4 w-4 text-red-600" />
                                    Assigned Donor
                                    {activeAssignments.length > 1 ? "s" : ""}
                                </h3>

                                {declinedCount > 0 && (
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                        {declinedCount} declined
                                    </span>
                                )}
                            </div>

                            {activeAssignments.length === 0 ? (
                                <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-3">
                                    <Droplets className="h-6 w-6 shrink-0 text-slate-300" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            No donor assigned yet
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Donor details will appear here once
                                            a donor is assigned.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-3 ${activeAssignments.length > 1
                                        ? "md:grid-cols-2"
                                        : ""
                                        }`}
                                >
                                    {activeAssignments.map((assignment) => (
                                        <DonorCard
                                            key={assignment.id}
                                            assignment={assignment}
                                            wide={activeAssignments.length === 1}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Footer */}
                    {canUpdateStatus && (
                        <DialogFooter className="flex flex-col gap-2 rounded-b-lg border-t bg-slate-50 px-5 py-3 sm:flex-row sm:px-6">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isBusy}
                                onClick={() => onOpenChange(false)}
                            >
                                Close
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={isBusy}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => setConfirmAction("CANCELLED")}
                            >
                                {pendingAction === "CANCELLED" ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <XCircle className="mr-2 h-4 w-4" />
                                )}
                                Cancel Request
                            </Button>

                            <Button
                                type="button"
                                disabled={isBusy}
                                className="bg-green-600 text-white hover:bg-green-700"
                                onClick={() => setConfirmAction("FULFILLED")}
                            >
                                {pendingAction === "FULFILLED" ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                )}
                                Mark Fulfilled
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>

            <ConfirmationDialog
                open={confirmAction !== null}
                onOpenChange={(next) => {
                    if (!next && !isBusy) setConfirmAction(null);
                }}
                title={confirmAction ? CONFIRM_COPY[confirmAction].title : ""}
                description={
                    confirmAction ? CONFIRM_COPY[confirmAction].description : ""
                }
                confirmText={
                    confirmAction ? CONFIRM_COPY[confirmAction].confirmText : ""
                }
                cancelText="Go back"
                variant="default"
                loading={isBusy}
                onConfirm={handleConfirm}
            />
        </>
    );
}