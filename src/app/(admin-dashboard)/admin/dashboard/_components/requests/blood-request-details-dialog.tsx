"use client";

import {
    CalendarClock,
    CheckCircle2,
    Droplets,
    Hospital,
    Loader2,
    Mail,
    MapPin,
    Phone,
    UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BloodRequestStatus, IBloodRequest } from "@/types/dr.types";
import { IDonorProfile } from "@/types/donor.types";
import { formatDate } from "@/lib/formateDate";

interface BloodRequestDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: IBloodRequest | null;
    donors: IDonorProfile[];
    selectedDonorId: string | null;
    onDonorChange: (donorId: string) => void;
    selectedStatus: BloodRequestStatus | null;
    onStatusChange: (status: BloodRequestStatus) => void;
    onStatusUpdate: () => void;
    onAssign: () => void;
    loading?: boolean;
    statusLoading?: boolean;
}

const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "MATCHING", label: "Matching" },
    { value: "DONOR_ASSIGNED", label: "Donor Assigned" },
    { value: "FULFILLED", label: "Fulfilled" },
    { value: "CANCELLED", label: "Cancelled" },
] as const;

/** One compact line: icon, label, value */
function InfoRow({
    icon,
    label,
    children,
}: {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex items-center gap-3 py-2">
            <span className="text-slate-400">{icon}</span>
            <span className="w-16 shrink-0 text-xs text-slate-400">{label}</span>
            <span className="min-w-0 flex-1 truncate text-right text-sm font-medium text-slate-700 sm:text-left">
                {children}
            </span>
        </div>
    );
}

export default function BloodRequestDetailsDialog({
    open,
    onOpenChange,
    request,
    donors,
    selectedDonorId,
    selectedStatus,
    onStatusChange,
    onStatusUpdate,
    onDonorChange,
    onAssign,
    loading = false,
    statusLoading = false,
}: BloodRequestDetailsDialogProps) {
    if (!request) return null;

    const statusChanged =
        !!selectedStatus && selectedStatus !== request.status;

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!loading) onOpenChange(value);
            }}
        >
            {/* Wider + two columns so everything fits the viewport on md+.
                On small phones it falls back to scrolling instead of clipping. */}
            <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl md:max-h-none md:overflow-visible">
                <DialogHeader>
                    <DialogTitle>Blood Request Details</DialogTitle>
                    <DialogDescription>
                        Review this request and assign a compatible donor.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* LEFT: request information */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                    <Droplets className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-red-600">
                                        Blood requirement
                                    </p>
                                    <p className="text-xl font-bold leading-tight text-slate-900">
                                        {request.bloodGroup}
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700">
                                {request.requiredUnits} unit
                                {request.requiredUnits !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 px-4">
                            <InfoRow icon={<UserRound className="h-4 w-4" />} label="Requester">
                                {request.requester.name}
                            </InfoRow>
                            <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                                {request.requester.email}
                            </InfoRow>
                            <InfoRow icon={<Hospital className="h-4 w-4" />} label="Hospital">
                                {request.hospitalName}
                            </InfoRow>
                            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location">
                                {request.hospitalLocation}
                            </InfoRow>
                            <InfoRow icon={<Phone className="h-4 w-4" />} label="Contact">
                                {request.contactPhone}
                            </InfoRow>
                            <InfoRow icon={<CalendarClock className="h-4 w-4" />} label="Needed by">
                                {formatDate(request.requiredAt)}
                            </InfoRow>
                        </div>
                    </div>

                    {/* RIGHT: actions */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Request status</Label>
                            <Select
                                value={selectedStatus ?? request.status}
                                onValueChange={(value) =>
                                    onStatusChange(value as BloodRequestStatus)
                                }
                                disabled={statusLoading}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select request status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {statusChanged && (
                                <p className="text-xs text-slate-500">
                                    Will change from{" "}
                                    <span className="font-medium">
                                        {request.status.replaceAll("_", " ")}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {selectedStatus!.replaceAll("_", " ")}
                                    </span>
                                    .
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Assign donor</Label>

                            {donors.length === 0 ? (
                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                                    <p className="text-sm font-semibold text-amber-800">
                                        No compatible donors available
                                    </p>
                                    <p className="mt-1 text-xs text-amber-700">
                                        No eligible donors match this blood requirement right now.
                                    </p>
                                </div>
                            ) : (
                                <Select
                                    value={selectedDonorId ?? ""}
                                    onValueChange={(value) => {
                                        if (value) onDonorChange(value);
                                    }}
                                >
                                    <SelectTrigger className="h-11 w-full">
                                        <SelectValue placeholder="Select a donor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {donors
                                            .filter((donor) => donor.bloodGroup === request.bloodGroup)
                                            .map((donor) => (
                                                <SelectItem key={donor.id} value={donor.id}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{donor.user.name}</span>
                                                        <span className="text-xs text-slate-400">
                                                            {donor.bloodGroup} · {donor.city}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {selectedDonorId && (
                                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Compatible donor selected
                                </div>
                            )}

                            <p className="text-xs text-slate-500">
                                Only compatible donors should be assigned to this request.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading || statusLoading}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={!statusChanged || statusLoading}
                        onClick={onStatusUpdate}
                    >
                        {statusLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {statusLoading ? "Updating..." : "Update Status"}
                    </Button>

                    <Button
                        type="button"
                        disabled={
                            !selectedDonorId ||
                            loading ||
                            statusLoading ||
                            donors.length === 0
                        }
                        onClick={onAssign}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Assigning..." : "Assign Donor"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}