
"use client";

import { updateAssignmentsApi } from "@/api/donor.api";
import { BloodDonationAssignment } from "@/types/user.types";
import {
    CalendarDays,
    CheckCircle2,
    Clock,
    Droplets,
    Eye,
    Hospital,
    MapPin,
    Package,
    Phone,
    XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import AssignedDonationDetailsDialog from "./assigned-donation-details-dialog";
import { formatDate } from "@/lib/formateDate";

enum AssignmentStatus {
    ACCEPTED = "ACCEPTED",
    COMPLETED = "COMPLETED",
    CREATED = "CREATED",
    REJECTED = "REJECTED",
}

interface AssignedDonationRequestsProps {
    assignments?: BloodDonationAssignment[];
    onView?: (assignmentId: string) => void;
}

const statusStyles: Record<AssignmentStatus, string> = {
    CREATED: "bg-amber-50 text-amber-700 ring-amber-600/20",
    ACCEPTED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    COMPLETED: "bg-blue-50 text-blue-700 ring-blue-600/20",
    REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
};



export function AssignedDonationRequests({
    assignments = [],
    onView,
}: AssignedDonationRequestsProps) {
    const [selectedAssignment, setSelectedAssignment] =
        useState<BloodDonationAssignment | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

    // Keep the UI updated after successful API operations.
    const [statusOverrides, setStatusOverrides] = useState<
        Record<string, AssignmentStatus>
    >({});

    const getStatus = (assignment: BloodDonationAssignment) =>
        statusOverrides[assignment.id] ??
        (assignment.status as AssignmentStatus);

    const activeAssignments = assignments.filter((assignment) => {
        const status = getStatus(assignment);

        return (
            status === AssignmentStatus.CREATED ||
            status === AssignmentStatus.ACCEPTED
        );
    });

    const handleView = (assignment: BloodDonationAssignment) => {
        setSelectedAssignment(assignment);
        setDialogOpen(true);
    };

    const handleReject = (assignment: BloodDonationAssignment) => {
        setSelectedAssignment(assignment);
        setRejectDialogOpen(true);
    };

    const handleRejectConfirm = async () => {
        if (!selectedAssignment || isProcessing) return;

        try {
            setIsProcessing(true);

            await updateAssignmentsApi(selectedAssignment.id, {
                status: AssignmentStatus.REJECTED,
            });

            setStatusOverrides((previous) => ({
                ...previous,
                [selectedAssignment.id]: AssignmentStatus.REJECTED,
            }));

            toast.success("Donation request rejected successfully.");

            setRejectDialogOpen(false);
            setSelectedAssignment(null);
        } catch (error) {
            console.error("Failed to reject donation request:", error);
            toast.error("Unable to reject the request. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAccepting = async (assignmentId: string) => {
        if (isProcessing) return;

        try {
            setIsProcessing(true);

            await updateAssignmentsApi(assignmentId, {
                status: AssignmentStatus.ACCEPTED,
            });

            setStatusOverrides((previous) => ({
                ...previous,
                [assignmentId]: AssignmentStatus.ACCEPTED,
            }));

            setSelectedAssignment((previous) =>
                previous?.id === assignmentId
                    ? {
                        ...previous,
                        status: AssignmentStatus.ACCEPTED,
                    }
                    : previous,
            );

            toast.success("Donation request accepted successfully.");
        } catch (error) {
            console.error("Failed to accept donation request:", error);
            toast.error("Unable to accept the request. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Droplets className="h-6 w-6" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold tracking-tight">
                            My Donation Requests
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your assigned blood donation requests.
                        </p>
                    </div>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {activeAssignments.length} active
                </span>
            </div>

            {/* Assignment list */}
            <div className="p-4 sm:p-6">
                {activeAssignments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-5 py-14 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                            <Droplets className="h-7 w-7 text-muted-foreground" />
                        </div>

                        <h3 className="font-semibold">No active assignments</h3>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            You don&apos;t have any pending or accepted donation requests
                            right now.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeAssignments.map((assignment) => {
                            const status = getStatus(assignment);

                            return (
                                <article
                                    key={assignment.id}
                                    className="rounded-xl border bg-background p-4 transition-shadow hover:shadow-md sm:p-5"
                                >
                                    {/* Request heading */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                                <Droplets className="h-6 w-6" />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="text-base font-bold">
                                                    {assignment.request.bloodGroup.replaceAll(
                                                        "_",
                                                        " ",
                                                    )}
                                                </h3>
                                                <p className="mt-1 break-all text-xs text-muted-foreground">
                                                    Request ID: {assignment.requestId}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] ??
                                                "bg-muted text-muted-foreground ring-border"
                                                }`}
                                        >
                                            {status.replaceAll("_", " ")}
                                        </span>
                                    </div>

                                    {/* Request details */}
                                    <div className="mt-5 grid gap-4 border-t pt-4 sm:grid-cols-2">
                                        <div className="flex min-w-0 items-start gap-3">
                                            <Hospital className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Hospital
                                                </p>
                                                <p className="mt-1 break-words text-sm font-medium">
                                                    {assignment.request.hospitalName || "Not specified"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex min-w-0 items-start gap-3">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Location
                                                </p>
                                                <p className="mt-1 break-words text-sm font-medium">
                                                    {assignment.request.hospitalLocation ||
                                                        "Not specified"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Package className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Required units
                                                </p>
                                                <p className="mt-1 text-sm font-medium">
                                                    {assignment.request.requiredUnits}{" "}
                                                    {assignment.request.requiredUnits === 1
                                                        ? "bag"
                                                        : "bags"}
                                                </p>
                                            </div>
                                        </div>

                                        {assignment.request.contactPhone && (
                                            <div className="flex items-start gap-3">
                                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Contact phone
                                                    </p>
                                                    <a
                                                        href={`tel:${assignment.request.contactPhone}`}
                                                        className="mt-1 block text-sm font-medium hover:text-primary hover:underline"
                                                    >
                                                        {assignment.request.contactPhone}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer and actions */}
                                    <div className="mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <CalendarDays className="h-4 w-4 shrink-0" />
                                            <span>
                                                Assigned {formatDate(assignment.assignedAt)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            {onView && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleView(assignment)}
                                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Request
                                                </button>
                                            )}

                                            {status === AssignmentStatus.CREATED && (
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() => handleReject(assignment)}
                                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                    Reject
                                                </button>
                                            )}

                                            {status === AssignmentStatus.ACCEPTED && (
                                                <span className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Accepted
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Details dialog */}
            <AssignedDonationDetailsDialog
                assignment={selectedAssignment}
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);

                    if (!open) {
                        setSelectedAssignment(null);
                    }
                }}
                onAccept={handleAccepting}
                isAccepting={isProcessing}
            />

            {/* Reject confirmation */}
            <ConfirmationDialog
                open={rejectDialogOpen}
                onOpenChange={(open) => {
                    if (isProcessing) return;

                    setRejectDialogOpen(open);

                    if (!open) setSelectedAssignment(null);
                }}
                title="Reject donation request?"
                description="Are you sure you want to reject this assignment? This action will update its status."
                confirmText="Reject request"
                cancelText="Keep request"
                variant="default"
                loading={isProcessing}
                onConfirm={handleRejectConfirm}
            />
        </section>
    );
}