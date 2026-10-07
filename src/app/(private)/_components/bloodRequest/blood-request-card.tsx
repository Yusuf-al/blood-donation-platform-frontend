"use client";

import {
    Clock,
    ThumbsUp,
    Search,
    UserCheck,
    CheckCircle2,
    XCircle,
    LucideIcon,
    CalendarClock,
    Droplets,
    Hospital,
    UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export interface BloodRequest {
    id: string;
    bloodGroup: string;
    requiredUnits: number;
    hospitalName: string;
    hospitalLocation: string;
    contactPhone: string;
    urgency: "NORMAL" | "URGENT" | "CRITICAL";
    requiredAt: string;
    description?: string | null;
    status?: string,

    requester?: {
        id: string;
        name: string;
        imageUrl?: string | null;
    }
}
type StatusConfig = {
    classes: string;
    icon: LucideIcon;
};
const statusConfig: Record<string, StatusConfig> = {
    PENDING: {
        classes: "bg-yellow-50 text-yellow-700",
        icon: Clock,
    },
    APPROVED: {
        classes: "bg-blue-50 text-blue-700",
        icon: ThumbsUp,
    },
    MATCHING: {
        classes: "bg-purple-50 text-purple-700",
        icon: Search,
    },
    DONOR_ASSIGNED: {
        classes: "bg-teal-50 text-teal-700",
        icon: UserCheck,
    },
    FULFILLED: {
        classes: "bg-green-50 text-green-700",
        icon: CheckCircle2,
    },
    CANCELLED: {
        classes: "bg-red-50 text-red-700",
        icon: XCircle,
    },
};
interface BloodRequestCardProps {
    request: BloodRequest;
    onViewDetails: (request: BloodRequest) => void;
    onAccept: (requestId: string) => void;
    isAccepting?: boolean;
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

function getUrgencyStyle(urgency: BloodRequest["urgency"]) {
    switch (urgency) {
        case "CRITICAL":
            return {
                label: "Critical",
                className: "bg-red-50 text-red-700 border-red-200",
            };

        case "URGENT":
            return {
                label: "Urgent",
                className: "bg-amber-50 text-amber-700 border-amber-200",
            };

        default:
            return {
                label: "Normal",
                className: "bg-green-50 text-green-700 border-green-200",
            };
    }
}

function formatRequiredAt(value: string) {
    return new Date(value).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export default function BloodRequestCard({
    request,
    onViewDetails,
    onAccept,
    isAccepting = false,
}: BloodRequestCardProps) {

    const urgency = getUrgencyStyle(request.urgency);
    const currentStatus = request.status!;
    const config = statusConfig[currentStatus] || statusConfig.PENDING;
    const IconComponent = config.icon;

    return (
        <article
            className={`rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${request.urgency === "CRITICAL" ? "border-red-200" : "border-slate-200"
                }`}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                        <Droplets className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-red-600">
                                {formatBloodGroup(request.bloodGroup)}
                            </h3>

                            <span className="text-sm text-slate-500">
                                × {request.requiredUnits}{" "}
                                {request.requiredUnits === 1 ? "unit" : "units"}
                            </span>
                        </div>

                        <p className="mt-0.5 text-xs text-slate-500">Blood request</p>
                    </div>
                </div>

                <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${urgency.className}`}
                >
                    {urgency.label}
                </span>
            </div>

            {/* Information */}
            <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                    <Hospital
                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                        aria-hidden="true"
                    />

                    <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">
                            {request.hospitalName}
                        </p>
                        <p className="text-xs text-slate-500">{request.hospitalLocation}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CalendarClock
                        className="h-4 w-4 shrink-0 text-slate-400"
                        aria-hidden="true"
                    />

                    <p className="text-sm text-slate-600">
                        Needed{" "}
                        <span className="font-medium text-slate-800">
                            {formatRequiredAt(request.requiredAt)}
                        </span>
                    </p>
                </div>

                {request.requester && (
                    <div className="flex items-center gap-3">
                        <UserRound
                            className="h-4 w-4 shrink-0 text-slate-400"
                            aria-hidden="true"
                        />

                        <p className="text-sm text-slate-600">
                            Requested by{" "}
                            <span className="font-medium text-slate-800">
                                {request.requester.name}
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* Eligibility */}
            <div className="mt-5 flex justify-between gap-2">

                <div className="mt-5">
                    <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        You are eligible to donate for this request.
                    </div>
                </div>
                <div className="mt-5">
                    <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium ${config.classes}`}>
                        <IconComponent className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {request.status}
                    </div>
                </div>
            </div>

            {/* Actions */}

            <div className="mt-5 flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={request.status !== "APPROVED" && request.status !== "DONOR_ASSIGNED"}
                    onClick={() => onViewDetails(request)}
                    className="h-10 flex-1 rounded-xl border-slate-200"
                >
                    View details
                </Button>

                <Button
                    type="button"
                    disabled={request.status !== "APPROVED" && request.status !== "DONOR_ASSIGNED"}
                    onClick={() => onAccept(request.id)}
                    className="h-10 flex-1 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed"
                >
                    {isAccepting ? "Accepting..." : "Accept request"}
                </Button>
            </div>
        </article>
    );
}