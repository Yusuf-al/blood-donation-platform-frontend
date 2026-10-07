"use client";

import {
    CalendarClock,
    Hospital,
    MapPin,
    Phone,
    UserRound,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { BloodRequest } from "./blood-request-card";

interface BloodRequestDetailsDialogProps {
    request: BloodRequest | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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

function formatDate(value: string) {
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

export default function BloodRequestDetailsDialog({
    request,
    open,
    onOpenChange,
    onAccept,
    isAccepting = false,
}: BloodRequestDetailsDialogProps) {
    if (!request) return null;


    const bloodGroup = formatBloodGroup(request.bloodGroup);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Compact + wide, so everything fits without scrolling on normal screens.
          max-h/overflow stays only as a safety net for very small screens. */}
            <DialogContent className="max-h-[92vh] gap-4 overflow-y-auto rounded-2xl p-5 sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Blood request details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Full details of this blood request, including hospital, timing and
                        contact information.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
                    {/* Left: blood + eligibility */}
                    <div className="space-y-3">
                        <div className="rounded-xl bg-red-50 px-4 py-5 text-center">
                            <p className="text-xs font-medium text-red-600">Blood required</p>
                            <p className="mt-1 text-4xl font-bold text-red-700">
                                {bloodGroup}
                            </p>
                            <p className="mt-1 text-sm text-red-700">
                                {request.requiredUnits}{" "}
                                {request.requiredUnits === 1 ? "unit" : "units"}
                            </p>
                        </div>


                        <div
                            className={`rounded-xl p-3  "bg-green-50" : "bg-slate-50"
                                    `}
                        >
                            <p
                                className={`text-xs font-semibold leading-5  "text-green-700" : "text-slate-700"
                                        `}
                            >

                                ? "You are eligible to accept this request."

                            </p>
                        </div>

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

                <Button
                    type="button"
                    disabled={isAccepting || (request.status !== "APPROVED" && request.status !== "DONOR_ASSIGNED")}
                    onClick={() => onAccept(request.id)}
                    className="h-11 w-full rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed"
                >
                    {isAccepting ? "Accepting request..." : "Accept blood request"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}