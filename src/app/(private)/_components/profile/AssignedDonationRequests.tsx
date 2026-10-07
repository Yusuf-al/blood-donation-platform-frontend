"use client";

import { BloodDonationAssignment } from "@/types/user.types";
import {
    Clock,
    Droplets,
    Hospital,
    MapPin,
} from "lucide-react";

enum AssignmentStatus {
    ACCEPTED = "ACCEPTED",
    COMPLETED = "COMPLETED",
    DONOR_ASSIGNED = "DONOR_ASSIGNED",
    REJECTED = "REJECTED"
}

interface AssignedDonationRequestsProps {
    assignments?: BloodDonationAssignment[];
    onView?: (requestId: string) => void;
}

export function AssignedDonationRequests({
    assignments,
    onView,
}: AssignedDonationRequestsProps) {

    const assignedDonation = assignments?.filter(
        (assignment: any) =>
            assignment.status === AssignmentStatus.DONOR_ASSIGNED ||
            assignment.status === AssignmentStatus.ACCEPTED
    ) || [];
    return (
        <section className="rounded-2xl border bg-card p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Donation Requests Assigned to Me
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Blood requests where you are assigned as the donor
                </p>
            </div>

            {!assignedDonation.length ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    No active donation assignments.
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {assignedDonation.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="rounded-xl border p-5"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-primary/10 p-3">
                                            <Droplets className="h-5 w-5 text-primary" />
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {assignment.request.bloodGroup}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                Request #{assignment.requestId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {assignment.request.
                                                hospitalLocation
                                            }
                                        </div>

                                        <div>
                                            Quantity:{" "}
                                            <strong>
                                                {assignment.request.requiredUnits
                                                } bag(s)
                                            </strong>
                                        </div>

                                        {assignment.request.hospitalName && (
                                            <div className="flex items-center gap-2">
                                                <Hospital className="h-4 w-4 text-muted-foreground" />
                                                {assignment.request.hospitalName}
                                            </div>
                                        )}

                                        {assignment.request.
                                            contactPhone && (
                                                <div>

                                                    <strong>
                                                        {assignment.request.
                                                            contactPhone}
                                                    </strong>
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                    {assignment.status}
                                </span>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t pt-4">
                                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />

                                    Assigned
                                    {new Date(
                                        assignment.assignedAt
                                    ).toLocaleDateString()}
                                </span>

                                {onView && (
                                    <button
                                        onClick={() =>
                                            onView(assignment.requestId)
                                        }
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        View Request
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}