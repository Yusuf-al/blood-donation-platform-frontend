"use client";

import {
    CalendarClock,
    CheckCircle2,
    Clock3,
    Hospital,
    UserRound,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BloodDonationAssignment, RequestDetails } from "@/types/assignment.types";

export type DonationAssignmentStatus =
    | "DONOR_ASSIGNED"
    | "ACCEPTED"
    | "REJECTED"
    | "COMPLETED";


interface DonationRequestCardProps {
    request: BloodDonationAssignment;
    onViewDetails: (request: BloodDonationAssignment) => void;
    onAccept: (requestId: string) => void;
    onReject: (requestId: string) => void;
    onComplete: (requestId: string) => void;
    isAccepting?: boolean;
    isRejecting?: boolean;
    isCompleting?: boolean;
}

const BLOOD_GROUP_LABELS: Record<string, string> = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-",
};

function formatBloodGroup(value: string) {
    return BLOOD_GROUP_LABELS[value] ?? value;
}

const STATUS_STYLES: Record<
    DonationAssignmentStatus,
    { label: string; className: string; icon: typeof Clock3 }
> = {
    DONOR_ASSIGNED: {
        label: "Awaiting your response",
        className: "bg-blue-50 text-blue-700",
        icon: Clock3,
    },
    ACCEPTED: {
        label: "Accepted",
        className: "bg-green-50 text-green-700",
        icon: CheckCircle2,
    },
    REJECTED: {
        label: "Rejected",
        className: "bg-slate-100 text-slate-600",
        icon: XCircle,
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-emerald-50 text-emerald-700",
        icon: CheckCircle2,
    },
};

const URGENCY_STYLES: Record<
    RequestDetails["urgency"],
    { label: string; badge: string; dot: string }
> = {
    CRITICAL: {
        label: "Critical",
        badge: "border-red-200 bg-red-50 text-red-700",
        dot: "bg-red-600",
    },
    URGENT: {
        label: "Urgent",
        badge: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
    },
    NORMAL: {
        label: "Normal",
        badge: "border-green-200 bg-green-50 text-green-700",
        dot: "bg-green-500",
    },
};

function formatDate(value?: string) {
    if (!value) return "—";

    return new Date(value).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

// Shows when the status last changed, if the API provides it
function getStatusTime(request: BloodDonationAssignment) {
    if (request.status === "COMPLETED") return request.request.fulfilledAt
        ;
    if (request.status === "ACCEPTED" || request.status === "REJECTED") {
        return request.respondedAt;
    }
    return request.assignedAt;
}

function InfoRow({
    icon: Icon,
    label,
    children,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <Icon
                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                aria-hidden="true"
            />
            <div className="min-w-0">
                <p className="text-xs text-slate-400">{label}</p>
                <div className="text-sm text-slate-700">{children}</div>
            </div>
        </div>
    );
}

export default function DonationRequestCard({
    request,
    onViewDetails,
    onAccept,
    onReject,
    onComplete,
    isAccepting = false,
    isRejecting = false,
    isCompleting = false,
}: DonationRequestCardProps) {

    const status = STATUS_STYLES[request.status];
    const StatusIcon = status.icon;
    const urgency = URGENCY_STYLES[request?.request?.urgency] ?? URGENCY_STYLES.NORMAL;
    const statusTime = getStatusTime(request);

    const bloodRequest = request.request
    const requester = request?.request?.requester


    return (
        <article
            className={`flex flex-col rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${bloodRequest?.urgency === "CRITICAL" ? "border-red-200" : "border-slate-200"
                }`}
        >
            <div className="flex-1 p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl font-bold text-red-600">
                            {formatBloodGroup(bloodRequest.bloodGroup)}
                        </div>

                        <div>
                            <p className="text-base font-semibold text-slate-900">
                                {bloodRequest.requiredUnits}{" "}
                                {bloodRequest.requiredUnits === 1 ? "unit" : "units"} needed
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">Donation request</p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${urgency.badge}`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${urgency.dot}`}
                            aria-hidden="true"
                        />
                        {urgency.label}
                    </span>
                </div>

                {/* Status */}
                <div
                    className={`mt-4 flex items-center justify-between gap-3 rounded-xl px-3 py-2 ${status.className}`}
                >
                    <span className="flex items-center gap-2 text-xs font-semibold">
                        <StatusIcon className="h-4 w-4" aria-hidden="true" />
                        {status.label}
                    </span>

                    {statusTime && (
                        <span className="text-xs opacity-80">{formatDate(statusTime)}</span>
                    )}
                </div>

                {/* Details */}
                <div className="mt-5 space-y-3.5">
                    <InfoRow icon={Hospital} label="Hospital">
                        <p className="font-medium text-slate-800">{bloodRequest.hospitalName}</p>
                        <p className="text-xs text-slate-500">{bloodRequest.hospitalLocation}</p>
                    </InfoRow>

                    <InfoRow icon={CalendarClock} label="Required by">
                        <span className="font-medium text-slate-800">
                            {formatDate(bloodRequest.requiredAt)}
                        </span>
                    </InfoRow>

                    {requester && (
                        <InfoRow icon={UserRound} label="Requested by">
                            <span className="font-medium text-slate-800">
                                {requester.name}
                            </span>
                        </InfoRow>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 p-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => onViewDetails(request)}
                    className="h-10 flex-1 rounded-xl border-slate-200 text-slate-700"
                >
                    View details
                </Button>

                {request.status === "DONOR_ASSIGNED" && (
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isRejecting || isAccepting}
                            onClick={() => onReject(request.id)}
                            className="h-10 rounded-xl border-red-200 px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            {isRejecting ? "Rejecting..." : "Reject"}
                        </Button>

                        <Button
                            type="button"
                            disabled={isAccepting || isRejecting}
                            onClick={() => onAccept(request.id)}
                            className="h-10 rounded-xl bg-red-600 px-5 text-white hover:bg-red-700"
                        >
                            {isAccepting ? "Accepting..." : "Accept"}
                        </Button>
                    </>
                )}

                {request.status === "ACCEPTED" && (
                    <Button
                        type="button"
                        disabled={isCompleting}
                        onClick={() => onComplete(request.id)}
                        className="h-10 rounded-xl bg-green-600 px-5 text-white hover:bg-green-700"
                    >
                        {isCompleting ? "Completing..." : "Mark as completed"}
                    </Button>
                )}
            </div>
        </article>
    );
}