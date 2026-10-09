
"use client";

import { BloodDonationAssignment } from "@/types/user.types";
import {
    CalendarClock,
    CheckCircle2,
    Clock,
    Droplets,
    Hospital,
    MapPin,
    Phone,
    UserRound,
    MailIcon,

} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AssignedDonationDetailsDialogProps {
    assignment: BloodDonationAssignment | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAccept: (assignmentId: string) => void;
    isAccepting?: boolean;
}

function formatDate(value?: string | null) {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleString("en-BD", {
            dateStyle: "medium",
            timeStyle: "short",
        });
}

export default function AssignedDonationDetailsDialog({
    assignment,
    open,
    onOpenChange,
    onAccept,
    isAccepting = false,
}: AssignedDonationDetailsDialogProps) {
    if (!assignment) return null;
    const request = assignment.request;
    const canAccept = assignment.status === "CREATED";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Donation request details
                    </DialogTitle>
                    <DialogDescription>
                        Review the blood donation information before responding.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-xl bg-red-50 p-5 text-center">
                    <Droplets className="mx-auto h-8 w-8 text-red-600" />
                    <p className="mt-2 text-3xl font-bold text-red-700">
                        {request.bloodGroup}
                    </p>
                    <p className="mt-1 text-sm text-red-700">
                        {request.requiredUnits}{" "}
                        {request.requiredUnits === 1 ? "unit" : "units"} required
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Info
                        icon={Hospital}
                        label="Hospital"
                        value={request.hospitalName}
                    />
                    <Info
                        icon={MapPin}
                        label="Hospital location"
                        value={request.hospitalLocation}
                    />
                    <Info
                        icon={Phone}
                        label="Contact phone"
                        value={request.contactPhone}
                    />
                    <Info
                        icon={CalendarClock}
                        label="Required at"
                        value={formatDate(request.requiredAt)}
                    />
                    <Info
                        icon={Clock}
                        label="Assigned at"
                        value={formatDate(assignment.assignedAt)}
                    />
                    {request.requester?.name && (
                        <>
                            <Info
                                icon={UserRound}
                                label="Requested by"
                                value={request.requester.name}
                            />
                            <Info
                                icon={MailIcon}
                                label="Email"
                                value={request.requester.email}
                            />
                            <Info
                                icon={Phone}
                                label="Phone"
                                value={request.requester.phone}
                            />
                        </>
                    )}
                </div>

                {request.description && (
                    <div className="rounded-xl border p-4">
                        <p className="mb-1 text-sm font-semibold">
                            Additional information
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                            {request.description}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 border-t pt-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                        {assignment.status.replaceAll("_", " ")}
                    </span>

                    {canAccept && (
                        <Button
                            type="button"
                            disabled={isAccepting}
                            onClick={() => onAccept(assignment.id)}
                            className="gap-2 bg-red-600 text-white hover:bg-red-700"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            {isAccepting ? "Accepting..." : "Accept request"}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value?: string | null;
}) {
    return (
        <div className="flex min-w-0 gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="break-words text-sm font-medium">
                    {value || "—"}
                </p>
            </div>
        </div>
    );
}