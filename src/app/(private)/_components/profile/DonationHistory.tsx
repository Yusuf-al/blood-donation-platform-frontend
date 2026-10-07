"use client";

import { BloodDonationAssignment } from "@/types/user.types";
import { previousDay } from "date-fns";
import { CheckCircle2, Eye } from "lucide-react";
import { escapeApplescriptStringFragment } from "next/dist/next-devtools/server/launch-editor";

//import { DonationHistory as DonationHistoryType } from "@/types/profile";

interface DonationHistoryProps {
    donations?: BloodDonationAssignment[];
    onView?: (requestId: string) => void;
}

enum AssignmentStatus {
    ACCEPTED = "ACCEPTED",
    COMPLETED = "COMPLETED",
    DONOR_ASSIGNED = "DONOR_ASSIGNED",
    REJECTED = "REJECTED",

}

export function DonationHistory({
    donations,
    onView,
}: DonationHistoryProps) {


    const previousDonation = donations?.filter(
        (assignment) =>
            assignment.status === AssignmentStatus.COMPLETED ||
            assignment.status === AssignmentStatus.REJECTED


    ) || [];

    return (
        <section className="rounded-2xl border bg-card p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Donation History
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Your completed blood donations
                </p>
            </div>

            {!previousDonation.length ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    You haven't completed any donations yet.
                </div>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[650px]">
                        <thead>
                            <tr className="border-b text-left text-sm text-muted-foreground">
                                <th className="px-4 py-3 font-medium">
                                    Request
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Blood Group
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Quantity
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Location
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Donation Date
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>

                                <th />
                            </tr>
                        </thead>

                        <tbody>
                            {previousDonation.map((donation) => (
                                <tr
                                    key={donation.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="px-4 py-4 text-sm font-medium">
                                        #{donation.request.id}
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {donation.request.bloodGroup}
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {donation.request.requiredUnits} bag(s)
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {donation.request.hospitalLocation}
                                    </td>

                                    <td className="px-4 py-4 text-sm">
                                        {new Date(
                                            donation.request.requiredAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            {donation.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        {onView && (
                                            <button
                                                onClick={() =>
                                                    onView(donation.requestId)
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