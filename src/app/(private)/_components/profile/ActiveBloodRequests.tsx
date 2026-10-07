"use client";

import { BloodRequest } from "@/types/user.types";
import { Clock, Droplets, HospitalIcon, MapPin } from "lucide-react";

enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    MATCHING = "MATCHING",
    DONOR_ASSIGNED = "DONOR_ASSIGNED",
    FULFILLED = "FULFILLED",
    CANCELLED = "CANCELLED"
}

interface ActiveBloodRequestsProps {
    requests?: BloodRequest[];
    onView?: (requestId: string) => void;
}

function getStatusClass(status: string) {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-700";

        case "DONOR_ASSIGNED":
            return "bg-blue-100 text-blue-700";

        case "APPROVED":
            return "bg-green-100 text-green-700";

        case "MATCHING":
            return "bg-purple-100 text-purple-700";

        default:
            return "bg-muted text-muted-foreground";
    }
}

export function ActiveBloodRequests({
    requests,
    onView,
}: ActiveBloodRequestsProps) {

    const activeRequests = requests?.filter(
        (request: any) =>
            request.status === RequestStatus.PENDING ||
            request.status === RequestStatus.APPROVED ||
            request.status === RequestStatus.DONOR_ASSIGNED ||
            request.status === RequestStatus.MATCHING
    ) || [];

    if (!activeRequests.length) {
        return (
            <section className="rounded-2xl border bg-card p-6">
                <h2 className="text-lg font-semibold">
                    Active Blood Requests
                </h2>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    You don't have any active blood requests.
                </p>
            </section>
        );
    }

    return (
        <section className="rounded-2xl border bg-card p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Active Blood Requests
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Requests waiting for donation completion
                </p>
            </div>

            <div className="mt-6 space-y-4">
                {activeRequests.map((request: any) => (
                    <div
                        key={request.id}
                        className="rounded-xl border p-4"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-lg bg-primary/10 p-2">
                                        <Droplets className="h-4 w-4 text-primary" />
                                    </span>

                                    <div>
                                        <p className="font-semibold">
                                            {request.bloodGroup}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Request #{request.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span>{request.requiredUnits} bag(s)</span>

                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {request.hospitalLocation}
                                    </span>

                                    {request.hospitalName && (
                                        <span className="flex items-center gap-1">
                                            <HospitalIcon className="h-4 w-4" />
                                            {request.hospitalName}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                    request.status
                                )}`}
                            >
                                {request.status.replaceAll("_", " ")}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {new Date(
                                    request.createdAt
                                ).toLocaleDateString()}
                            </span>

                            {onView && (
                                <button
                                    onClick={() => onView(request.id)}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    View Request
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}