
"use client";

import { BloodDonationAssignment } from "@/types/assignment.types";
import DonationRequestCard from "./donation-request-card";

interface DonationRequestGridProps {
    assignemts: BloodDonationAssignment[];

    onViewDetails: (
        request: BloodDonationAssignment
    ) => void;

    onAccept: (
        requestId: string
    ) => void;

    onReject: (
        requestId: string
    ) => void;

    onComplete: (
        requestId: string
    ) => void;

    acceptingRequestId?: string | null;
    rejectingRequestId?: string | null;
    completingRequestId?: string | null;
}

export default function DonationRequestGrid({
    assignemts,
    onViewDetails,
    onAccept,
    onReject,
    onComplete,
    acceptingRequestId,
    rejectingRequestId,
    completingRequestId,
}: DonationRequestGridProps) {
    if (!assignemts.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <span className="text-lg text-red-600">
                        ♥
                    </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    No assigned requests
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    You don't have any donation requests matching
                    the selected filter.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-5 md:grid-cols-2">
            {assignemts.map((assignemts) => (
                <DonationRequestCard
                    key={assignemts.id}
                    request={assignemts}
                    onViewDetails={onViewDetails}
                    onAccept={onAccept}
                    onReject={onReject}
                    onComplete={onComplete}
                    isAccepting={
                        acceptingRequestId === assignemts.id
                    }
                    isRejecting={
                        rejectingRequestId === assignemts.id
                    }
                    isCompleting={
                        completingRequestId === assignemts.id
                    }
                />
            ))}
        </div>
    );
}

