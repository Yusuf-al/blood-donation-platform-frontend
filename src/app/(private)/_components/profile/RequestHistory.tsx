"use client";

import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { BloodRequest } from "../bloodRequest/blood-request-card";

//import { BloodRequest } from "@/types/profile";

interface RequestHistoryProps {
    requests?: BloodRequest[];
    onView?: (requestId: string) => void;
}

enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    MATCHING = "MATCHING",
    DONOR_ASSIGNED = "DONOR_ASSIGNED",
    FULFILLED = "FULFILLED",
    CANCELLED = "CANCELLED"
}

function StatusIcon({ status }: { status: string }) {
    if (status === "COMPLETED") {
        return (
            <CheckCircle2 className="h-4 w-4" />
        );
    }

    if (status === "CANCELLED") {
        return <XCircle className="h-4 w-4" />;
    }

    return null;
}

export function RequestHistory({
    requests,
    onView,

}: RequestHistoryProps) {

    const previousRequests = requests?.filter(
        (request: any) =>
            request.status === RequestStatus.CANCELLED ||
            request.status === RequestStatus.FULFILLED
    ) || [];

    return (
        <section className="rounded-2xl border bg-card p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Request History
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Your previous blood requests
                </p>
            </div>

            {!previousRequests.length ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    No request history found.
                </div>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b text-left text-sm text-muted-foreground">
                                <th className="px-4 py-3 font-medium">
                                    Request
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Blood
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Quantity
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Location
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Date
                                </th>
                                <th />
                            </tr>
                        </thead>

                        <tbody>
                            {previousRequests.map((request: any) => (
                                <tr
                                    key={request.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="px-4 py-4 text-sm font-medium">
                                        #{request.id}
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {request.bloodGroup}
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {request.
                                            requiredUnits
                                        } bag(s)
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {request.hospitalLocation
                                        }
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                            <StatusIcon status={request.status} />
                                            {request.status.replaceAll("_", " ")}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-sm text-muted-foreground">
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-4">
                                        {onView && (
                                            <button
                                                onClick={() =>
                                                    onView(request.id)
                                                }
                                                className="rounded-lg p-2 hover:bg-muted"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}