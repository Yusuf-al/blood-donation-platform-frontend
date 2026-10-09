"use client";

import {
    CalendarClock,
    CheckCircle2,
    Clock3,
    Hospital,
    MapPin,
    Phone,
    UserRound,
    XCircle,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { DonationAssignmentStatus } from "./donation-request-card";
import { BloodDonationAssignment } from "@/types/assignment.types";

interface DonationRequestDetailsDialogProps {
    assignment: BloodDonationAssignment | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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

function formatDate(value?: string) {
    if (!value) return "—";

    return new Date(value).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });
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

export default function DonationRequestDetailsDialog({
    assignment,
    open,
    onOpenChange,
    onAccept,
    onReject,
    onComplete,
    isAccepting = false,
    isRejecting = false,
    isCompleting = false,
}: DonationRequestDetailsDialogProps) {
    if (!assignment) return null;

    const status =
        STATUS_STYLES[assignment.status as DonationAssignmentStatus] ?? {
            label: assignment.status
                ? assignment.status.replaceAll("_", " ")
                : "Unknown",
            className: "bg-slate-100 text-slate-600",
            icon: Clock3,
        };
    const StatusIcon = status.icon;
    const request = assignment.request

    const timeline = [
        { label: "Assigned", value: assignment.assignedAt },
        { label: "Responded", value: assignment.respondedAt },
        { label: "Completed", value: request.fulfilledAt },
    ].filter((item) => item.value);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Wide and compact so everything fits without scrolling on normal screens.
          max-h/overflow stays only as a safety net for very small screens. */}
            <DialogContent className="max-h-[92vh] gap-4 overflow-y-auto rounded-2xl p-5 sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Donation request details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Full details of this donation request, including hospital, timing,
                        contact information and progress.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
                    {/* Left: blood, status, timeline */}
                    <div className="space-y-3">
                        <div className="rounded-xl bg-red-50 px-4 py-5 text-center">
                            <p className="text-xs font-medium text-red-600">Blood required</p>
                            <p className="mt-1 text-4xl font-bold text-red-700">
                                {formatBloodGroup(request.bloodGroup)}
                            </p>
                            <p className="mt-1 text-sm text-red-700">
                                {request.requiredUnits}{" "}
                                {request.requiredUnits === 1 ? "unit" : "units"}
                            </p>
                        </div>

                        <div
                            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 ${status.className}`}
                        >
                            <StatusIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="text-xs font-semibold">{status.label}</span>
                        </div>

                        {timeline.length > 0 && (
                            <dl className="space-y-2 rounded-xl border border-slate-200 p-3">
                                {timeline.map((item) => (
                                    <div key={item.label}>
                                        <dt className="text-xs text-slate-400">{item.label}</dt>
                                        <dd className="text-xs font-medium text-slate-700">
                                            {formatDate(item.value)}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>

                    {/* Right: details */}
                    <div className="space-y-4">
                        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                            <InfoRow icon={Hospital} label="Hospital">
                                <span className="font-medium text-slate-800">
                                    {request.hospitalName}
                                </span>
                            </InfoRow>

                            <InfoRow icon={MapPin} label="Address">
                                {request.hospitalLocation}
                            </InfoRow>

                            <InfoRow icon={CalendarClock} label="Required at">
                                {formatDate(request.requiredAt)}
                            </InfoRow>

                            <InfoRow icon={Phone} label="Contact phone">
                                <a
                                    href={`tel:${request.contactPhone}`}
                                    className="font-medium text-slate-800 hover:text-red-600"
                                >
                                    {request.contactPhone}
                                </a>
                            </InfoRow>

                            {request.requester && (
                                <InfoRow icon={UserRound} label="Requested by">
                                    {request.requester.name}
                                </InfoRow>
                            )}
                        </div>

                        {request.description && (
                            <div>
                                <p className="mb-1.5 text-xs text-slate-400">
                                    Additional information
                                </p>
                                <p className="max-h-24 overflow-y-auto rounded-xl bg-slate-50 p-3 text-sm leading-5 text-slate-600">
                                    {request.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {request.status === "DONOR_ASSIGNED" && (
                    <div className="flex gap-3 border-t border-slate-100 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isRejecting || isAccepting}
                            onClick={() => onReject(request.id)}
                            className="h-11 flex-1 gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <XCircle className="h-4 w-4" aria-hidden="true" />
                            {isRejecting ? "Rejecting..." : "Reject"}
                        </Button>

                        <Button
                            type="button"
                            disabled={isAccepting || isRejecting}
                            onClick={() => onAccept(request.id)}
                            className="h-11 flex-1 gap-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                        >
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            {isAccepting ? "Accepting..." : "Accept request"}
                        </Button>
                    </div>
                )}

                {request.status === "ACCEPTED" && (
                    <div className="border-t border-slate-100 pt-4">
                        <Button
                            type="button"
                            disabled={isCompleting}
                            onClick={() => onComplete(request.id)}
                            className="h-11 w-full gap-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                        >
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            {isCompleting ? "Completing..." : "Mark donation as completed"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}